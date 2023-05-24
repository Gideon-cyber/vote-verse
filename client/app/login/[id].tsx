"use client";

import Button from "@/components/Button";
import InputField from "@/components/Input";
import AuthContainer from "@/components/login/AuthContainer";
import TextContainer from "@/components/login/TextContainer";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  useRouter,
  useParams,
  useSearchParams,
  usePathname,
} from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  console.log(pathname);
  const id = searchParams.get("id");
  console.log(id);
  console.log(params);
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [validationData, setValidationData] = useState({
    otp: "",
  });
  const [admin, setAdmin] = useState({} as any);
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/adminLogin`,
        {
          email,
          password,
        }
      );

      // Process the response data
      console.log(response.data);

      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
        setAdmin(response?.data?.admin);
        setShowOTP(true);
      } else {
        toast.error(response.data.message);
      }

      // Return any relevant data from the response
      return response.data;
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error(error);
    }
  };

  const verifyOTP = async (otp: string) => {
    const data = {
      matric: admin?.matric.toString(),
      otp,
    };
    console.log(data);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/verifyotp`,
        {
          ...data,
        }
      );

      // Process the response data

      if (response.status === 201) {
        toast.success(response.data.message);
        // router.push("/dashboard");
      } else {
        toast.error(response.data.message);
      }

      // Return any relevant data from the response
      return response.data;
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error(error);
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
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
      login(values.email, values.password);
      setSubmitting(false);
      setLoading(false);
      //   setSubmitting(false);
    },
  });

  const handleValidation = (e: any) => {
    const { name, value } = e.target;
    setValidationData(() => ({ ...validationData, [name]: value }));
  };

  const handleVerify = async () => {
    console.log(validationData);
  };
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
                Enter the 4 digit OTP sent to your email address
              </p>
            </div>
            <div className="flex items-start w-full gap-5 flex-col">
              <InputField
                label="OTP"
                name="otp"
                placeholder="Enter OTP"
                handleBlur={handleValidation}
                handleChange={handleValidation}
                type="text"
              />

              <Button
                label="Validate OTP"
                type="button"
                OnClick={() => {
                  verifyOTP(validationData.otp);
                }}
              />
            </div>
          </div>
        ) : (
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
                loading={loading}
              />
            </form>
            <div className="text-[14px] leading-[150%] font-medium text-grey-primary tracking-[0.01em]">
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-primary">
                Sign up here
              </Link>
            </div>
          </div>
        )}
        <ToastContainer autoClose={2000} />
      </TextContainer>
    </AuthContainer>
  );
}
