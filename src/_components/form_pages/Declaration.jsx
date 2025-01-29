import React, { useState, useEffect, useReducer } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BackButton from "@/Helper Components/BackButton";
import FormHeader from "@/Helper Components/FormHeader";
import { ClipLoader } from "react-spinners";
import { Checkbox } from "@/components/ui/checkbox";
import ReCAPTCHA from "react-google-recaptcha";
import acks from "@/form_constants/Acks";

const Declaration = () => {
  //const [name, setName] = useState("");
  const [applicantDetails, setApplicantDetails] = useState();
  const [isLoading, setLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    //Get all the objects from the session
    setApplicantDetails(
      JSON.parse(sessionStorage.getItem("applicantDetails")) || {}
    );

    setTimeout(() => setLoading(false), 2000);
  }, []);

  //Captcha security
  const handleCaptcha = (value) => {
    if (value) {
      setIsVerified(true);
      //console.log(value);
    } else {
      setIsVerified(false);
    }
  };

  //Checkbox change
  const handleCheckboxChange = (checked) => {
    setIsChecked(checked); // Update checkbox state
  };

  async function handleSubmit(e) {
    e.preventDefault();
    //If checkbox is not ticked, return
    if (!isChecked) {
      setError("You must accept the terms and conditions to proceed.");
      return;
    }

    // If all validations pass, proceed with submission
    console.log("Proceed to submit form");
  }

  return (
    <div className="w-full px-20 py-20 bg-cecOrange h-full">
      <div className="font-oxygen w-full md:w-4/5 bg-white rounded-md px-10 py-10 mx-auto">
        <FormHeader />
        {isLoading ? (
          <>
            <div className="flex items-center justify-center">
              <ClipLoader loading={isLoading} size={150} color="#AD7900" />
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Link to="/search" className="text-sm underline text-cecOrange">
              Already have an access code? Click here to view your application
              status
            </Link>

            <h2 className="font-bold text-xl">Declaration by Applicant</h2>
            <div className="flex flex-col gap-1 mt-5 md:mt-8 md:col-span-2 border border-neutral-500 px-4 py-3 rounded-md">
              <div className="flex items-center gap-2">
                <p className="block">I</p>
                <input
                  placeholder="fullname"
                  type="text"
                  className="bg-transparent border-b border-black focus:border-b focus:outline-none px-2 py-1"
                  value={applicantDetails?.contact_name}
                />
              </div>
              <p className="block">
                hereby, declare that all information provided herein is my
                personal knowledge and that:
              </p>
              {acks.map((ack, index) => (
                <p key={index}>{ack}</p>
              ))}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={isChecked}
                  onCheckedChange={handleCheckboxChange}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            {/* Breakpoint */}

            <div className="flex items-center justify-center gap-2 mt-5 md:mt-8 md:col-span-2">
              {isVerified ? (
                <>
                  <Button
                    type="submit"
                    className="w-64 bg-cecOrange text-white hover:bg-[#8A5F00]"
                  >
                    Submit
                  </Button>
                </>
              ) : (
                <ReCAPTCHA
                  onChange={handleCaptcha}
                  sitekey="6Le90sQqAAAAAGR2kM-fSs__PTGEG5HjkM-w0piV"
                />
              )}
            </div>
            <BackButton backTo={"/"} />
          </form>
        )}
      </div>
    </div>
  );
};

export default Declaration;

/* {
  isLoading ? (
    <>
      <ClipLoader loading={isLoading} size={150} color="#AD7900" />
    </>
  ) : (
    `Applicant name is : ${applicantDetails?.contact_name}`
  );
} */
