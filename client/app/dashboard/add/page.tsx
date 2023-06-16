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
import { addNewValuesObject } from "@/redux/userSlice";

export default function Admin() {
  const router = useRouter();
  const { user, newValuesObject } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    isEmpty(user) === true && router.push("/login");
  }, [user]);

  const addCandidate = async (values: any) => {
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
  const [uploadedImage, setUploadedImage] = useState("" as any);
  const [imageLink, setImageLink] = useState("");
  const [valuesObject, setValuesObject] = useState({} as any);

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      matric: "",
      level: "",
      email: "",
      phone: "",
      office: "",
      department: "",
      description: "",
    },
    onSubmit: async (values, { resetForm }) => {
      if (uploadedImage !== "") {
        await uploadImage(uploadedImage);
      }
      // addCandidate();
      resetForm({
        values: {
          firstName: "",
          lastName: "",
          matric: "",
          level: "",
          email: "",
          phone: "",
          office: "",
          department: "",
          description: "",
        },
      });
    },
  });

  const handleValidation = (e: any) => {
    const { name, value } = e.target;
    setValidationData(() => ({ ...validationData, [name]: value }));
  };

  const uploadImage = async (files: any) => {
    const formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "elwz3bl2");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/depqqbyyn/image/upload",
        formData
      );

      setImageLink(res.data.url);
      const newObject = { ...values, image: res.data.url };
      addCandidate({ ...values, image: res.data.url });
      return res.data.url;
    } catch (error) {
      console.log(error);
    }
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

          <InputField
            label="Department"
            name="department"
            placeholder="e.g Biochemistry"
            handleBlur={handleBlur}
            handleChange={handleChange}
            value={values["department"]}
            type="text"
          />

          <InputField
            label="Image"
            name="image"
            placeholder=""
            handleChange={(e) => {
              if (e?.target?.files !== null) {
                setUploadedImage(e?.target?.files[0]);
              }
            }}
            type="file"
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
