"use client";

import Button from "@/components/Button";
import InputField from "@/components/Input";
import TextContainer from "@/components/login/TextContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { useRouter } from "next/navigation";

import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import axiosInstance from "@/utils/axiosInstance";
import { isEmpty } from "@/utils";

export default function Admin() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    isEmpty(user) === true && router.push("/login");
  }, [user]);

  const addCandidate = async () => {
    try {
      const response = await axiosInstance.post(`/candidate`, {
        ...values,
        level: parseInt(values.level),
      });

      // Process the response data

      if (response.status === 201) {
        toast.success("Candidate added successfully");
        values.firstName = "";
        values.lastName = "";
        values.email = "";
        values.matric = "";
        values.level = "";
        values.phone = "";
        values.office = "";
        values.description = "";
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

  const addVoter = async () => {
    try {
      const response = await axiosInstance.post(`/register`, {
        ...validationData,
        admin: user?.matric,
      });

      // Process the response data

      if (response.status === 200) {
        toast.success("Voter added successfully");

        validationData.firstName = "";
        validationData.lastName = "";
        validationData.email = "";
        validationData.matric = "";
        setValidationData(() => {
          return { ...validationData };
        });
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

  const [validationData, setValidationData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    matric: "",
  });

  const nav = ["Add Candidate", "Add Voter"];
  const [selected, setSelected] = useState(0);

  const { values, handleBlur, handleChange, handleSubmit, isSubmitting } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        matric: "",
        level: "",
        email: "",
        phone: "",
        office: "",
        description: "",
      },
      onSubmit: (values, { resetForm }) => {
        addCandidate();
        resetForm({
          values: {
            firstName: "",
            lastName: "",
            matric: "",
            level: "",
            email: "",
            phone: "",
            office: "",
            description: "",
          },
        });
      },
    });

  const handleValidation = (e: any) => {
    const { name, value } = e.target;
    setValidationData(() => ({ ...validationData, [name]: value }));
  };
  return (
    <div className="overflow-y-scroll p-4 md:p-6 h-full w-full md:w-1/2 text-black flex items-start flex-col gap-3">
      <div className="w-full flex gap-2">
        {nav.map((item, index) => (
          <div key={index}>
            <span
              className={`${
                selected === index && "text-blue-secondary font-semibold"
              } cursor-pointer`}
              onClick={() => setSelected(index)}
            >
              {item}
            </span>
            <span className={`${index === 1 && "hidden"}`}> |</span>
          </div>
        ))}
      </div>
      {/**/}
      {selected === 0 ? (
        <form
          className="flex items-start w-full gap-5 flex-col "
          onSubmit={handleSubmit}
        >
          <InputField
            label="First Name"
            name="firstName"
            placeholder="eg. Adebayo"
            handleBlur={handleBlur}
            handleChange={handleChange}
            value={values["firstName"]}
            type="text"
          />

          <InputField
            label="Last Name"
            name="lastName"
            placeholder="eg. Richard"
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
            label="Matric Number"
            name="matric"
            placeholder="eg. 123456"
            handleBlur={handleBlur}
            handleChange={handleChange}
            value={values["matric"]}
            type="text"
          />

          <InputField
            label="Level"
            name="level"
            placeholder="300"
            handleBlur={handleBlur}
            handleChange={handleChange}
            value={values["level"]}
            type="text"
          />

          <InputField
            label="Phone Number"
            name="phone"
            placeholder="eg. 08012345678"
            handleBlur={handleBlur}
            handleChange={handleChange}
            value={values["phone"]}
            type="tel"
          />

          <InputField
            label="Office"
            name="office"
            placeholder="eg. President"
            handleBlur={handleBlur}
            handleChange={handleChange}
            value={values["office"]}
            type="text"
          />

          <InputField
            label="Description"
            name="description"
            placeholder="Write a short description"
            handleBlur={handleBlur}
            handleChange={handleChange}
            value={values["description"]}
            type="text"
          />

          <Button
            label="Add Candidate"
            type="submit"
            OnClick={() => {}}
            disabled={isSubmitting}
            loading={false}
          />
        </form>
      ) : (
        <div className="flex items-start w-full gap-5 flex-col">
          <InputField
            label="First Name"
            name="firstName"
            placeholder="eg. Adebayo"
            handleBlur={handleValidation}
            handleChange={handleValidation}
            value={validationData["firstName"] || ""}
            type="text"
          />

          <InputField
            label="Last Name"
            name="lastName"
            placeholder="eg. Richard"
            handleBlur={handleValidation}
            handleChange={handleValidation}
            value={validationData["lastName"] || ""}
            type="text"
          />

          <InputField
            label="Email"
            name="email"
            placeholder="voteverse@gmail.com"
            handleBlur={handleValidation}
            handleChange={handleValidation}
            value={validationData["email"] || ""}
            type="text"
          />

          <InputField
            label="Matric Number"
            name="matric"
            placeholder="eg. 123456"
            handleBlur={handleValidation}
            handleChange={handleValidation}
            value={validationData["matric"] || ""}
            type="text"
          />

          <Button
            label="Add Voter"
            type="button"
            OnClick={() => {
              addVoter();
            }}
          />
        </div>
      )}
      <ToastContainer autoClose={2000} />
    </div>
  );
}
