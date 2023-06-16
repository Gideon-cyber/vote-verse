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
import { capitalize, isEmpty } from "@/utils";
import Image from "next/image";

interface MyObject {
  [key: string]: any;
}

const Dashboard = () => {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  useEffect(() => {
    isEmpty(user) === true && router.push("/login");
  }, [user]);

  const [loading, setLoading] = useState(false);
  const [candidateData, setCandidateData] = useState([] as any);
  const [votingData, setVotingData] = useState({} as any);
  const [undecidedVotes, setUndecidedVotes] = useState([] as any);
  const [divColors, setDivColors] = useState([] as any[]);
  const [reload, setReload] = useState(false);

  const [selectedDivs, setSelectedDivs] = useState([] as any[]);

  const toggleBG = (outerIndex: number, innerIndex: number) => {
    const selectedDivIndex = selectedDivs.findIndex(
      (div: any) => div.outerIndex === outerIndex
    );

    if (
      selectedDivIndex !== -1 &&
      selectedDivs[selectedDivIndex].innerIndex === innerIndex
    ) {
      // Toggle between black and green if the same div is clicked twice
      setDivColors((prevColors) => {
        const updatedColors = [...prevColors];
        const currentColor = updatedColors[outerIndex][innerIndex];
        updatedColors[outerIndex][innerIndex] =
          currentColor === "#e9ebee" ? "green" : "#e9ebee";
        return updatedColors;
      });
    } else {
      // Update the selected div and reset previously selected div's background color within the same array
      const updatedSelectedDivs: any = selectedDivs.filter(
        (div: any) => div.outerIndex !== outerIndex
      );
      updatedSelectedDivs.push({ outerIndex, innerIndex });

      setDivColors((prevColors) => {
        const updatedColors = [...prevColors];
        if (selectedDivIndex !== -1) {
          const { outerIndex: prevOuterIndex, innerIndex: prevInnerIndex } =
            selectedDivs[selectedDivIndex];
          updatedColors[prevOuterIndex][prevInnerIndex] = "#e9ebee";
        }
        updatedColors[outerIndex][innerIndex] = "green";
        return updatedColors;
      });

      setSelectedDivs(updatedSelectedDivs);
    }
  };

  const updateCandidateData = async (newData: any[]) => {
    setCandidateData(newData);
  };

  const getAllCandidate = async () => {
    try {
      const response = await axiosInstance.get(`/findAllCandidates`);

      if (response.status === 200) {
        //   toast.success(response.data.message);
        const newData: { role: string; data: any }[] = sortByRole(
          response.data
        );

        updateCandidateData(newData).then(() => setReload(!reload));
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

  const vote = async () => {
    const newData = {
      candidate1: votingData?.president,
      candidate2: votingData?.vicepresident,
      // candidate3: votingData?.sports,
      candidate4: votingData?.gensec,
      // candidate5: votingData?.social,
      candidate6: votingData?.pro,
      candidate7: votingData?.finsec,
      candidate8: votingData?.treasurer,
      candidate9: votingData?.ags,
      candidate10: votingData?.specialduties,
      candidate11: votingData?.flc1,
      candidate12: votingData?.flc2,
    };
    try {
      const response = await axiosInstance.post(`/updateThisUser`, {
        matric: user?.matric,
        ...newData,
      });
      // Process the response data

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

  const countNullValuesByKeys = (data: any[]) => {
    const counts = {} as any;

    data.forEach((obj) => {
      const keys = Object.keys(obj);

      keys.forEach((key) => {
        if (obj[key] === "null") {
          if (counts[key]) {
            counts[key]++;
          } else {
            counts[key] = 1;
          }
        }
      });
    });

    return Object.entries(counts);
  };

  const FindThisVoter = async (params: null | string) => {
    try {
      const response = await axiosInstance.post(`/findThisUser`, {
        parameter: params,
      });
      // Process the response data
      const nullCount = countNullValuesByKeys(response?.data?.users);
      setUndecidedVotes(nullCount);

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

  const toggleKeyValuePair = (
    obj: MyObject,
    key: string,
    value: any
  ): MyObject => {
    const newKey = key.toLowerCase();
    const updatedObj = { ...obj };

    if (updatedObj[newKey] === value) {
      delete updatedObj[newKey];
      toast.error(`You unselected ${value} for ${key}`);
    } else {
      updatedObj[newKey] = value;
      toast.success(`You selected ${value} for ${key}`);
    }

    setVotingData(updatedObj);
    return updatedObj;
  };

  useEffect(() => {
    getAllCandidate();
    FindThisVoter("null");
  }, []);

  useEffect(() => {
    setDivColors((prevColors) => {
      const newColors = candidateData.map((obj: any) =>
        Array(obj.data.length).fill("#e9ebee")
      );
      return prevColors.length === 0 ? newColors : prevColors;
    });
  }, [reload]);

  return (
    <div className="overflow-y-scroll p-4 md:p-6 h-full w-full  text-black">
      <h1 className="text-[30px] font-bold mb-2">Candidate List</h1>
      {candidateData?.length === 0 ? (
        <div>
          <p className="text-[20px] font-semibold">No candidate yet</p>
        </div>
      ) : (
        candidateData?.map(
          (data: { role: string; data: any }, outerIndex: number) => (
            <div
              className="flex flex-col gap-2 min-h-[200px] overflow-x-scroll w-full"
              key={outerIndex}
            >
              <h1 className="text-[20px] font-semibold">
                {data.role === "ags"
                  ? "Assistant Gen. Sec"
                  : data.role === "finsec"
                  ? "Financial Sec."
                  : data.role === "gensec"
                  ? "General Sec."
                  : data.role === "specialDuties"
                  ? "Special Duties Officer"
                  : data.role === "vicepresident"
                  ? "Vice President"
                  : capitalize(data.role)}
              </h1>
              <div className="flex gap-2 items-center w-[90%]">
                {data.data?.map((item: any, innerIndex: number) => (
                  <div
                    key={innerIndex}
                    className="flex items-center flex-col min-w-[200px] rounded-lg p-4 gap-2 mb-4"
                    style={{
                      backgroundColor:
                        divColors[outerIndex]?.[innerIndex] || "",
                    }}
                  >
                    <div className="w-[100px] h-[100px] rounded-full bg-slate-400 flex items-center justify-center overflow-hidden">
                      {item?.image !== "" ? (
                        <Image
                          src={item?.image}
                          alt="placeholder"
                          width={120}
                          height={120}
                        />
                      ) : (
                        <Image
                          src="/images/placeholder.jpg"
                          alt="placeholder"
                          width={120}
                          height={120}
                        />
                      )}
                    </div>
                    <div className="flex items-center flex-col">
                      <h3 className="font-semibold text-center">
                        {item.firstName} {item.lastName}
                      </h3>
                      {user?.role === "admin" && (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">Votes:</span>
                          <span>{item?.vote}</span>
                        </div>
                      )}
                    </div>
                    {user?.role === "voter" && (
                      <div className="w-full px-5">
                        <Button
                          label="Vote"
                          type="button"
                          OnClick={() => {
                            toggleKeyValuePair(
                              votingData,
                              data.role,
                              item.firstName
                            );
                            toggleBG(outerIndex, innerIndex);
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

      {user?.role === "admin" && (
        <div className="flex flex-col gap-2">
          <h3 className="text-[24px] leading-[30px] font-bold">
            Undecided/Null Votes
          </h3>
          <div className="flex flex-col">
            {undecidedVotes.map((undecidedVote: any[], index: number) => (
              <div key={index} className="flex items-center gap-2">
                <span className="font-bold">{undecidedVote[0]}:</span>
                <span>{undecidedVote[1]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Dashboard;
