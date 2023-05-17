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
  const {
    values,
    handleChange,
    handleBlur,
    isSubmitting,
    handleSubmit,
    setSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      //   setSubmitting(false);
    },
  });
  return (
    <AuthContainer>
      <TextContainer>
        <div className="w-full flex items-center lg:items-start flex-col gap-6">
          <div className="flex items-center lg:items-start gap-2 flex-col">
            <h1 className="text-black text-[30px] lg:text-[48px] leading-[150%] font-bold text-center lg:text-left">
              Hey, We are glad you chose Vote-Verse!
            </h1>
            <p className="text-grey-primary">Fill this form to get started</p>
          </div>
          <form
            className="flex items-start w-full gap-5 flex-col"
            onSubmit={handleSubmit}
          >
            <InputField
              label="Email"
              name="email"
              placeholder="voteverse@gmail.com"
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values["email"]}
              type="text"
            />

            <InputField
              label="Password"
              name="password"
              placeholder="*********"
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values["password"]}
              type="password"
            />

            <Button
              label="Sign up"
              type="submit"
              OnClick={() => {}}
              disabled={isSubmitting}
              loading={loading}
            />
          </form>
          <div className="text-[14px] leading-[150%] font-medium text-grey-primary tracking-[0.01em]">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-primary">
              Login here
            </Link>
          </div>
        </div>
      </TextContainer>
    </AuthContainer>
  );
}
