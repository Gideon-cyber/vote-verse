"use client";

import Button from "@/components/Button";
import InputField from "@/components/Input";
import TextContainer from "@/components/login/TextContainer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";

const Dashboard = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [candidateData, setCandidateData] = useState([] as any);
  const [votingData, setVotingData] = useState({} as any);

  const getAllCandidate = async () => {
    try {
      const response = await axiosInstance.get(`/findAllCandidates`);
      // Process the response data
      console.log(response);

      if (response.status === 200) {
        //   toast.success(response.data.message);
        const newData: { role: string; data: any }[] = sortByRole(
          response.data
        );
        console.log(newData);
        setCandidateData(newData);
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

  const vote = async () => {
    const newData = {
      candidate1: votingData?.president,
      candidate2: votingData?.vicePresident,
      candidate3: votingData?.sport,
      candidate4: votingData?.gensec,
      candidate5: votingData?.social,
      candidate6: votingData?.pro,
      candidate7: votingData?.finsec,
      candidate8: votingData?.treasurer,
      candidate9: votingData?.AGS,
    };
    try {
      const response = await axiosInstance.post(`/updateThisUser`, {
        matric: user?.matric,
        ...newData,
      });
      // Process the response data
      console.log(response);

      if (response.status === 200) {
        toast.success(response.data.message);
        // router.push("/login?id");
      } else {
        toast.error(response.data.message);
      }

      // Return any relevant data from the response
      //   return response;
    } catch (error: any) {
      // Handle any errors that occur during the API call
      console.error(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const sortByRole = (data: any) => {
    const keys = Object.entries(data);
    const sortedData = keys.map((key) => {
      return {
        role: key[0],
        data: key[1],
      };
    });

    return sortedData;
  };

  useEffect(() => {
    getAllCandidate();
  }, []);

  //   console.log(candidateData);
  //   const sortedData = sortByRole(candidateData);
  //   console.log(sortedData);

  return (
    <div className="overflow-y-scroll p-4 md:p-6 h-full w-full  text-black">
      <h1 className="text-[30px] font-bold mb-2">Candidate List</h1>
      {candidateData?.length === 0 ? (
        <div>
          <p className="text-[20px] font-semibold">No candidate yet</p>
        </div>
      ) : (
        candidateData?.map(
          (data: { role: string; data: any }, index: number) => (
            <div
              className="flex flex-col gap-2 min-h-[200px] overflow-x-scroll"
              key={index}
            >
              <h1 className="text-[20px] font-semibold">{data.role}</h1>
              <div className="flex gap-2 items-center w-full">
                {data.data?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center flex-col min-w-[300px] bg-off-white rounded-lg py-4 gap-2 mb-4"
                  >
                    <div className="w-[100px] h-[100px] rounded-full bg-slate-400"></div>
                    <div className="flex items-center flex-col">
                      <h3
                        className="font-semibold"
                        onClick={() => console.log(votingData)}
                      >
                        {item.firstName} {item.lastName}
                      </h3>
                    </div>
                    {user?.role === "voter" && (
                      <div className="w-full px-5">
                        <Button
                          label="Vote"
                          type="button"
                          OnClick={() => {
                            const name = `${item.firstName} ${item.lastName}`;
                            toast.success(`You voted for ${name}`);
                            const key = data.role.toLowerCase();
                            const newData = { ...votingData, [key]: name };
                            setVotingData(newData);
                          }}
                          // disabled={isSubmitting}
                          loading={false}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        )
      )}

      {user?.role === "voter" && (
        <Button
          label="Cast/submit Vote"
          type="button"
          OnClick={() => {
            vote();
          }}
          // disabled={isSubmitting}
          loading={false}
        />
      )}
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Dashboard;
