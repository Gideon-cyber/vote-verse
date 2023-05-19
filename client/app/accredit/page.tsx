"use client";

import Button from "@/components/Button";
import InputField from "@/components/Input";
import AuthContainer from "@/components/login/AuthContainer";
import TextContainer from "@/components/login/TextContainer";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const {
    values,
    handleChange,
    handleBlur,
    isSubmitting,
    handleSubmit,
    setSubmitting,
  } = useFormik({
    initialValues: {
      matric: "",
    },
    onSubmit: (values) => {
      setSubmitting(true);
      setLoading(true);
      console.log(values);
      setTimeout(() => {
        setLoading(false);
        setSubmitting(false);
        setShowOTP(true);
      }, 3000);
      //   setSubmitting(false);
    },
  });
  return (
    <AuthContainer>
      <TextContainer>
        {showOTP ? (
          <div className="w-full flex items-center lg:items-start flex-col gap-6">
            <div className="flex items-center lg:items-start gap-2 flex-col">
              <h1 className="text-black text-[30px] lg:text-[40px] leading-[150%] font-bold">
                Email Verification
              </h1>
              <p className="text-grey-primary">
                Enter the 6 digit OTP sent to your email address
              </p>
            </div>
            <div className="flex items-start w-full gap-5 flex-col">
              <InputField
                label="OTP"
                name="otp"
                placeholder="Enter OTP"
                handleBlur={handleBlur}
                handleChange={handleChange}
                type="text"
              />

              <Button
                label="Submit"
                type="submit"
                OnClick={() => {}}
                disabled={isSubmitting}
                loading={loading}
              />
            </div>
          </div>
        ) : (
          <div className="w-full flex items-center lg:items-start flex-col gap-6">
            <div className="flex items-center lg:items-start gap-2 flex-col">
              <h1 className="text-black text-[30px] lg:text-[40px] leading-[150%] font-bold">
                Welcome to the elections
              </h1>
              <p className="text-grey-primary">
                Input your matriculation number below in order to be accredited
                as a voter{" "}
              </p>
            </div>
            <form
              className="flex items-start w-full gap-5 flex-col"
              onSubmit={handleSubmit}
            >
              <InputField
                label="Matric number"
                name="matric"
                placeholder="190419"
                handleBlur={handleBlur}
                handleChange={handleChange}
                value={values["matric"]}
                type="text"
              />

              <Button
                label="Get Accredited"
                type="submit"
                OnClick={() => {}}
                disabled={isSubmitting}
                loading={loading}
              />
            </form>
          </div>
        )}
      </TextContainer>
    </AuthContainer>
  );
}
