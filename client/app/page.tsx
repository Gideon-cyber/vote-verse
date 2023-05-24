"use client";

import Button from "@/components/Button";
import InputField from "@/components/Input";
import AuthContainer from "@/components/login/AuthContainer";
import TextContainer from "@/components/login/TextContainer";
import { useFormik } from "formik";
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

// export const getServerSideProps: GetServerSideProps = async () => {
//   return {
//     redirect: {
//       destination: "/login",
//       permanent: false,
//     },
//   };
// };

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, []);

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
      console.log(values);
      setSubmitting(false);
      //   setSubmitting(false);
    },
  });
  return (
    <AuthContainer>
      <TextContainer>
        <div className="w-full flex items-center lg:items-start flex-col gap-6">
          <div className="flex items-center lg:items-start gap-2 flex-col">
            <h1 className="text-black text-[30px] lg:text-[48px] leading-[150%] font-bold">
              Hey, Welcome back!
            </h1>
            <p className="text-grey-primary">We are happy to see you back!</p>
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
              label="Login"
              type="submit"
              OnClick={() => {}}
              disabled={isSubmitting}
              // loading={loading}
            />
          </form>

          <div className="text-[14px] leading-[150%] font-medium text-grey-primary tracking-[0.01em]">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-primary">
              Sign up here
            </Link>
          </div>
        </div>

        <ToastContainer autoClose={2000} />
      </TextContainer>
    </AuthContainer>
  );
}
