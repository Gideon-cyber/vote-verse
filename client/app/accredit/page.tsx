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
import axiosInstance from "@/utils/axiosInstance";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const [validationData, setValidationData] = useState({
    otp: "",
  });

  const getOTP = async () => {
    const data = {
      matric: values.matric,
    };
    try {
      const response = await axiosInstance.post(`/getotp`, {
        ...data,
      });

      // Process the response data
      // console.log(response);

      if (response.status === 201) {
        toast.success(response.data.message);
        // router.push("/dashboard");
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

  const verifyOTP = async (otp: string) => {
    const data = {
      matric: values.matric,
      otp,
    };
    try {
      const response = await axiosInstance.post(`/verifyotp`, {
        ...data,
      });

      // Process the response data

      if (response.status === 201) {
        toast.success(response.data.message, {
          autoClose: 2000000,
        });
        // router.push("/dashboard");
      } else if (response.status === 403) {
        toast.error(response.data.message);
      }

      // Return any relevant data from the response
      return response.data;
    } catch (error: any) {
      // Handle any errors that occur during the API call
      console.error(error);
      toast.error(error?.response?.data?.message);
      setShowOTP(false);
    }
  };

  const handleValidation = (e: any) => {
    const { name, value } = e.target;
    setValidationData(() => ({ ...validationData, [name]: value }));
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
      matric: "",
    },
    onSubmit: (values) => {
      setSubmitting(true);
      setLoading(true);
      // verifyOTP(values.matric);
      // getOTP();
      toast.error("Accreditation has now ended");
      setTimeout(() => {
        setLoading(false);
        setSubmitting(false);
        // setShowOTP(true);
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
                value={validationData["otp"]}
                type="text"
              />

              <Button
                label="Submit"
                type="button"
                OnClick={() => {
                  verifyOTP(validationData.otp);
                  setIsDisabled(true);
                }}
                disabled={isDisabled}
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
        <ToastContainer autoClose={2000} />
      </TextContainer>
    </AuthContainer>
  );
}
