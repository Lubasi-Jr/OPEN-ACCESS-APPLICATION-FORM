import React, { useState, useEffect } from "react";
import BackButton from "@/Helper Components/BackButton";
import { ClipLoader } from "react-spinners";

const CompletionPage = () => {
  let refNum;
  const path = window.location.pathname; // Get the full path'
  const parts = path.split("/"); // Split by '/'
  refNum = parts[parts.length - 1];

  const [copied, setCopied] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }, []);

  const handleCopy = () => {
    const textToCopy = refNum; // Hardcoded value from input
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="w-full px-20 py-20 bg-cecOrange h-screen">
      <div className="z-10 w-full md:w-4/5 bg-white rounded-md h-full px-10 py-10 mx-auto flex flex-col items-center justify-center gap-2">
        {isLoading ? (
          <ClipLoader loading={isLoading} size={150} color="#AD7900" />
        ) : (
          <>
            <h2 className="text-3xl whitespace-wrap">Submission Completed!!</h2>
            <h2 className="text-2xl whitespace-wrap">REFERENCE NUMBER:</h2>

            <div className="w-full max-w-[16rem]">
              <div className="relative">
                <input
                  id="access_code"
                  type="text"
                  className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4"
                  value={refNum}
                  disabled
                  readOnly
                />
                <button
                  onClick={handleCopy}
                  className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 hover:bg-gray-100 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border h-8"
                >
                  {copied ? (
                    <span className="inline-flex items-center text-cecOrange">
                      <svg
                        className="w-3 h-3 me-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 12"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5.917 5.724 10.5 15 1.5"
                        />
                      </svg>
                      <span className="text-xs font-semibold">Copied</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center">
                      <svg
                        className="w-3 h-3 me-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 20"
                      >
                        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                      </svg>
                      <span className="text-xs font-semibold">Copy</span>
                    </span>
                  )}
                </button>
              </div>
            </div>

            <h2 className="text-xl text-cecOrange mb-12">
              You may also check your email inbox for the access code.
            </h2>
            <BackButton backTo={"/"} />
          </>
        )}
        {/* <>
          <h2 className="text-3xl whitespace-wrap">Submission Completed!!</h2>
          <h2 className="text-2xl whitespace-wrap">REFERENCE NUMBER:</h2>

          <div className="w-full max-w-[16rem]">
            <div className="relative">
              <input
                id="access_code"
                type="text"
                className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4"
                value={refNum}
                disabled
                readOnly
              />
              <button
                onClick={handleCopy}
                className="absolute end-2.5 top-1/2 -translate-y-1/2 text-gray-900 hover:bg-gray-100 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border h-8"
              >
                {copied ? (
                  <span className="inline-flex items-center text-cecOrange">
                    <svg
                      className="w-3 h-3 me-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 12"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5.917 5.724 10.5 15 1.5"
                      />
                    </svg>
                    <span className="text-xs font-semibold">Copied</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center">
                    <svg
                      className="w-3 h-3 me-1.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                    </svg>
                    <span className="text-xs font-semibold">Copy</span>
                  </span>
                )}
              </button>
            </div>
          </div>

          <h2 className="text-xl text-cecOrange mb-12">
            You may also check your email inbox for the access code.
          </h2>
          <BackButton backTo={"/"} />
        </> */}
      </div>
    </div>
  );
};

export default CompletionPage;
