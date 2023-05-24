import Button from "@/components/Button";
import InputField from "@/components/Input";
import TextContainer from "@/components/login/TextContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { useRouter } from "next/navigation";

const Admin = async () => {
  const AllVoter = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/findAllUsers`
      );

      console.log(response);
      // Process the response data

      if (response.status === 200) {
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

  const Voters = await AllVoter();
  const nav = [" View all Voters"];
  let selected = 0;

  return (
    <div className="overflow-y-scroll p-4 md:p-6 h-full w-full text-black flex items-start flex-col gap-3">
      <div className="w-full flex gap-2">
        {nav.map((item, index) => (
          <div key={index}>
            <span
              className={`${
                selected === index && "text-blue-secondary font-semibold"
              } cursor-pointer`}
            >
              {item}
            </span>
            <span className={`${index === 1 && "hidden"}`}> |</span>
          </div>
        ))}
      </div>

      <div className="px-4 overflow-x-auto w-full">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="pb-3.5 pr-3 text-left text-sm font-semibold text-gray-900 "
                >
                  FirstName
                </th>
                <th
                  scope="col"
                  className="pb-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                >
                  Last Name
                </th>
                <th
                  scope="col"
                  className="pb-3.5 px-3 text-left text-sm font-semibold text-gray-900"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="pb-3.5 pl-3 text-left text-sm font-semibold text-gray-900"
                >
                  Matric
                </th>
              </tr>
            </thead>
            {/* {loading ? (
                <tbody className="relative w-[500px] h-[200px]">
                  <tr className="h-5 w-5 absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2">
                    <td>
                      <img
                        src="/spinner-small.gif"
                        alt="spinner"
                        className="w-full"
                      />
                    </td>
                  </tr>
                </tbody>
              ) : ( */}
            <tbody className="divide-y divide-gray-200">
              {Voters?.length === 0 && (
                <tr className="italic text-background-color text-[12px] leading-[12px]">
                  <td className="px-[63px] pt-4 pb-[90px]">No Voters Yet</td>
                </tr>
              )}

              {Voters?.map((voter: any, index: number) => {
                return (
                  <tr key={index}>
                    <td className="py-4 whitespace-normal pl-4 pr-3 sm:pl-6 md:pl-0 max-w-[308px]">
                      {voter?.firstName}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3">
                      {voter?.lastName}
                    </td>
                    <td className="whitespace-nowrap py-4 px-3 leading-[18px] text-background-color">
                      {voter?.email}
                    </td>
                    <td
                      className={`whitespace-nowrap py-4 px-3  leading-[20px] font-b-600 `}
                    >
                      {voter?.matric}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* )} */}
          </table>
        </div>
      </div>

      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Admin;
