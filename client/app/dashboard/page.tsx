// "use client";

import Button from "@/components/Button";
import InputField from "@/components/Input";
import TextContainer from "@/components/login/TextContainer";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";

const Dashboard = async () => {
  //   const [loading, setLoading] = useState(false);
  //   const [candidateData, setCandidateData] = useState([]);

  const getAllCandidate = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/findAllCandidates`
      );
      // Process the response data

      if (response.status === 200) {
        //   toast.success(response.data.message);
        return response.data;
      } else {
        toast.error(response.data.message);
      }

      // Return any relevant data from the response
      //   return response;
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error(error);
    }
  };

  const sortByRole = (data: any) => {
    const sortedData = [...data].sort((a, b) => {
      if (a.role < b.role) return -1;
      if (a.role > b.role) return 1;
      return 0;
    });

    return sortedData;
  };

  const candidateData = await getAllCandidate();
  console.log(candidateData);
  //   const sortedData = sortByRole(candidateData);
  //   console.log(sortedData);

  return (
    <div className="overflow-y-scroll p-4 md:p-6 h-full w-full  text-black">
      <h1 className="text-[30px] font-bold ">Candidate List</h1>
      {/* {candidateData?.map((candidate: any) => (
        <div className="flex flex-col gap-2">
          <h1>All Candidates</h1>
        </div>
      ))} */}
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Dashboard;
