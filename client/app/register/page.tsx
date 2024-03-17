"use client";

import Button from "@/components/Button";
import InputField from "@/components/Input";
import AuthContainer from "@/components/login/AuthContainer";
import TextContainer from "@/components/login/TextContainer";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAppDispatch } from "@/redux/hooks";
import { addUser } from "@/redux/userSlice";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";

export default function Login() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const register = async () => {
    try {
      const response = await axiosInstance.post(`/registerAdmin`, {
        ...values,
      });

      // Process the response data

      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
        dispatch(addUser(response?.data?.identity));

        router.push("/dashboard");
      } else {
        toast.error(response.data.message);
      }

      // Return any relevant data from the response
      return response.data;
    } catch (error: any) {
      // Handle any errors that occur during the API call
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };
  const {
    values,
    handleChange,
    handleBlur,
    isSubmitting,
    handleSubmit,
    setSubmitting,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      Department: "",
      matric: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      register();
      setLoading(false);
      values.firstName = "";
      values.lastName = "";
      values.email = "";
      values.matric = "";
      values.Department = "";
      values.password = "";

      //   setSubmitting(false);
    },
  });
  return (
    <AuthContainer>
      <TextContainer>
        <div className="w-full flex items-center lg:items-start flex-col gap-6 h-full overflow-y-hidden">
          <div className="flex items-center lg:items-start gap-2 flex-col">
            <h1 className="text-black text-[30px] lg:text-[48px] leading-[150%] font-bold text-center lg:text-left">
              Hey, We are glad you chose Vote-Verse!
            </h1>
            <p className="text-grey-primary">Fill this form to get started</p>
          </div>
          <form
            className="flex items-start w-full gap-5 flex-col overflow-y-scroll h-[300px]"
            onSubmit={handleSubmit}
          >
            <InputField
              label="First Name"
              name="firstName"
              placeholder="Angel"
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values["firstName"]}
              type="text"
            />
            <InputField
              label="Last Name"
              name="lastName"
              placeholder="Gabriel"
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values["lastName"]}
              type="text"
            />
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
              label="Department"
              name="Department"
              placeholder="e.g bic"
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values["Department"]}
              type="text"
            />

            <InputField
              label="Matric No"
              name="matric"
              placeholder="e.g 180419"
              handleBlur={handleBlur}
              handleChange={handleChange}
              value={values["matric"]}
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
        <ToastContainer autoClose={2000} />
      </TextContainer>
    </AuthContainer>
  );
}
