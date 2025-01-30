import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import BackButton from "@/Helper Components/BackButton";
import { useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axiosInstance";
import ReCAPTCHA from "react-google-recaptcha";
import { ClipLoader } from "react-spinners";

const ApplicationSearch = () => {
  const [refNum, setRefNum] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [isVerified, setIsVerified] = useState(false);
  const handleCaptcha = (value) => {
    if (value) {
      setIsVerified(true);
      //console.log(value);
    } else {
      setIsVerified(false);
    }
  };

  async function handleClick() {
    console.log("Attempting to search for application");
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        `/open-access/api/v1/application/${refNum}`
      );
      console.log(response.data);
      console.log("Search successful");
      //Store the application search data into the session storage. To avoid too many API calls
      sessionStorage.setItem(
        "currentApplication",
        JSON.stringify(response.data)
      );
      setLoading(false);

      //Navigate to the status page and receive the sessionStorage
      navigate(`/status/${refNum}`);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <div className="w-full px-20 py-20 bg-cecOrange h-screen">
      <div className="z-10 w-full md:w-4/5 bg-white rounded-md h-full px-10 py-10 mx-auto flex flex-col items-center justify-center gap-2">
        {isVerified ? (
          loading ? (
            <ClipLoader />
          ) : (
            <>
              <h2 className="text-3xl whitespace-wrap">
                Enter Reference Number below to check for application status
              </h2>
              <Input
                type="text"
                className="w-[250px] border border-neutral-500 rounded-md focus:outline-none"
                placeholder="REFERENCE NUMBER"
                value={refNum}
                onChange={(e) => setRefNum(e.target.value)}
              />
              <Button
                onClick={handleClick}
                className="bg-cecOrange text-white text-center h-[40px] w-[40px] rounded-full hover:bg-[#8C6200] mb-12"
              >
                <Search size={15} />
              </Button>
              <BackButton backTo={"/"} />
            </>
          )
        ) : (
          <ReCAPTCHA
            onChange={handleCaptcha}
            sitekey="6Le90sQqAAAAAGR2kM-fSs__PTGEG5HjkM-w0piV"
          />
        )}
      </div>
    </div>
  );
};

export default ApplicationSearch;
