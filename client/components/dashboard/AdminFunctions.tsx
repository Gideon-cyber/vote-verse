"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Button from "../Button";
import { toast } from "react-toastify";

const AdminFunctions = () => {
  const [accreditationStatus, setAccreditationStatus] = useState("false");
  const [votingStatus, setVotingStatus] = useState("false");
  const [loader, setLoader] = useState(false);
  const [votingLoader, setVotingLoader] = useState(false);

  const getAccreditationStatus = async () => {
    try {
      const response = await axiosInstance.get(`/accredit/status`);
      // Process the response data
      if (response.status === 200 || response?.data?.has_error === false) {
        setAccreditationStatus(response.data["is_accredit"].toString());
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      // Handle any errors that occur during the API call
      console.error(error);
      toast.error(error?.message);
    }
  };

  const updateAccreditationStatus = async () => {
    try {
      setLoader(true);
      const response = await axiosInstance.post(`/accredit/status`, {
        is_accredit: accreditationStatus === "true" ? false : true,
      });
      // Process the response data
      if (response.status === 200 || response?.data?.has_error === false) {
        setAccreditationStatus(response.data["is_accredit"].toString());
        setLoader(false);
        toast.success("Accreditation status updated successfully");
      } else {
        toast.error(response.data.message);
        setLoader(false);
      }
    } catch (error: any) {
      // Handle any errors that occur during the API call
      setLoader(false);
      console.error(error);
      toast.error(error?.message);
    }
  };

  const getVotingStatus = async () => {
    try {
      const response = await axiosInstance.get(`/vote/status`);
      // Process the response data
      if (response.status === 200 || response?.data?.has_error === false) {
        setVotingStatus(response.data.can_vote.toString());
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      // Handle any errors that occur during the API call
      console.error(error);
      toast.error(error?.message);
    }
  };

  const updateVotingStatus = async () => {
    try {
      setVotingLoader(true);
      const response = await axiosInstance.post(`/vote/status`, {
        can_vote: votingStatus === "true" ? false : true,
      });
      // Process the response data
      if (response.status === 200 || response?.data?.has_error === false) {
        setVotingStatus(response.data["can_vote"].toString());
        setVotingLoader(false);
        toast.success("Voting status updated successfully");
      } else {
        toast.error(response.data.message);
        setVotingLoader(false);
      }
    } catch (error: any) {
      // Handle any errors that occur during the API call
      setVotingLoader(false);
      console.error(error);
      toast.error(error?.message);
    }
  };

  useEffect(() => {
    getAccreditationStatus();
    getVotingStatus();
  });

  return (
    <div className="flex items-center flex-col md:flex-row justify-between gap-2 w-full">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <h2 className="text-base font-bold">Accreditation Status: </h2>
          <span className="text-base"> {accreditationStatus}</span>
        </div>

        <Button
          label="Update"
          type="button"
          OnClick={() => {
            updateAccreditationStatus();
          }}
          loading={loader}
        />
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <h2 className="text-base font-bold">Voting Status: </h2>
          <span className="text-base">{votingStatus}</span>
        </div>

        <Button
          label="Update"
          type="button"
          OnClick={() => {
            updateVotingStatus();
          }}
          loading={votingLoader}
        />
      </div>
    </div>
  );
};

export default AdminFunctions;
