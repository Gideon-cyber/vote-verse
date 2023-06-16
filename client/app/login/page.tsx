"use client";

import Button from "@/components/Button";
import InputField from "@/components/Input";
import AuthContainer from "@/components/login/AuthContainer";
import TextContainer from "@/components/login/TextContainer";
import { useFormik } from "formik";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import {
  useRouter,
  useParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addUser } from "@/redux/userSlice";
import axiosInstance from "@/utils/axiosInstance";
import { isEmpty } from "@/utils";

export default function Login() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    isEmpty(user) === false && router.push("/dashboard");
  }, []);

  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [validationData, setValidationData] = useState({
    otp: "",
  });
  const [voterData, setVoterData] = useState({
    matric: "",
  });
  const [voter, setVoter] = useState({} as any);
  const [otp, setOTP] = useState(0);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post(`/adminLogin`, {
        email,
        password,
      });

      // Process the response data

      if (response?.data?.success === true) {
        {
          !id
            ? toast.success("Login successful")
            : toast.success(response?.data?.message);
        }

        dispatch(addUser(response?.data?.admin));
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

  const voterLogin = async (matric: string) => {
    try {
      const response = await axiosInstance.post(`/voterLogin`, {
        matric,
      });

      // Process the response data

      if (response?.data?.success === true) {
        toast.success(response?.data?.message);
        setVoter(response?.data?.voter);
        setOTP(response?.data?.otp);
        setShowOTP(true);
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
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      setLoading(true);
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

  const handleVoterLogin = (e: any) => {
    const { name, value } = e.target;
    setVoterData(() => ({ ...voterData, [name]: value }));
  };

  const verifyOTP = async (otpParam: string) => {
    const newOtp = parseInt(otpParam);

    if (newOtp === otp) {
      toast.success("OTP verified successfully");
      setTimeout(() => {
        dispatch(addUser(voter));
        router.push("/dashboard");
      }, 2000);
    }
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
                value={validationData.otp || ""}
                type="text"
              />

              <Button
                label="Validate OTP"
                type="button"
                OnClick={() => {
                  // toast.error("Election has ended");
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
            {id ? (
              <div className="flex items-start w-full gap-5 flex-col">
                <InputField
                  label="Matric No"
                  name="matric"
                  placeholder="eg. 180419"
                  handleBlur={handleVoterLogin}
                  handleChange={handleVoterLogin}
                  type="text"
                />

                <Button
                  label="Login"
                  type="submit"
                  OnClick={() => {
                    voterLogin(voterData.matric);
                    // toast.error("Voting has ended");
                  }}
                  loading={loading}
                />
              </div>
            ) : (
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
            )}
            {!id && (
              <div className="text-[14px] leading-[150%] font-medium text-grey-primary tracking-[0.01em]">
                Don't have an account?{" "}
                <Link href="/register" className="text-blue-primary">
                  Sign up here
                </Link>
              </div>
            )}
          </div>
        )}
        <ToastContainer autoClose={2000} />
      </TextContainer>
    </AuthContainer>
  );
}
