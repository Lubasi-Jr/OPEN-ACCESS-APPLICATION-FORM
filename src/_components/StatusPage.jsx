import React, { useEffect, useState } from "react";
import axiosInstance from "@/api/axiosInstance";
import BackButton from "@/Helper Components/BackButton";

const cases = ["PENDING", "APPROVED", "REJECTED"];

const colors = ["text-cecOrange", "text-cecRed", "text-green-600"];

const StatusPage = () => {
  const [application, setApplication] = useState();

  let applicationNumber;
  const path = window.location.pathname; // Get the full path'
  const parts = path.split("/"); // Split by '/'
  applicationNumber = parts[parts.length - 1];

  useEffect(() => {
    let refNum;
    const path = window.location.pathname; // Get the full path'
    const parts = path.split("/"); // Split by '/'
    refNum = parts[parts.length - 1];

    getApplication(refNum);
  }, []);

  async function getApplication(number) {
    try {
      const response = await axiosInstance.get(
        `/open-access/api/v1/application/${number}`
      );
      console.log("Search successful");
      setApplication(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  //application?.result?.approvalStatus;

  return (
    <>
      <div className="w-full px-20 py-20 bg-cecOrange h-screen">
        <div className="z-10 w-full md:w-4/5 bg-white rounded-md h-full px-10 py-10 mx-auto flex flex-col items-center justify-center gap-2">
          <div className="text-3xl font-oxygen">{applicationNumber}</div>
          <div className=" text-xl font-oxygen">
            {application?.result?.applicant?.fullName}
          </div>
          <div className="text-4xl font-oxygen mb-12">
            {`STATUS:   `}{" "}
            <span className={colors[application?.result?.approvalStatus]}>
              {cases[application?.result?.approvalStatus]}
            </span>
          </div>
          <BackButton backTo={"/"} />
        </div>
      </div>
    </>
  );
};

export default StatusPage;
