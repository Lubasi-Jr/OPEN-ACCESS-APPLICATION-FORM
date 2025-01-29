import React, { useState, useEffect, useReducer } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BackButton from "@/Helper Components/BackButton";
import FormHeader from "@/Helper Components/FormHeader";

const initialFiles = [];

const documentReducer = (state, action) => {
  switch (action.type) {
    case "ADD_DOCUMENT":
      const newState = [
        ...state.filter((doc) => doc.type !== action.payload.type),
        action.payload,
      ];
      sessionStorage.setItem("attachments", JSON.stringify(newState)); //Update documents into the session
      return newState;
    case "RESET_FIELDS":
      sessionStorage.removeItem("attachments");
      return initialFiles;
    default:
      return state;
  }
};

const Attachments = () => {
  const navigate = useNavigate();
  const storedData =
    JSON.parse(sessionStorage.getItem("attachments")) || initialFiles;

  const [documents, documentDispatch] = useReducer(documentReducer, storedData); // useReducer for documents

  useEffect(() => {
    sessionStorage.setItem("attachments", JSON.stringify(documents)); // Ensure state is always saved
  }, [documents]);

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if the file is a PDF
    if (file.type !== "application/pdf") {
      alert("Only PDF documents are allowed.");
      return;
    }

    const id = e.target.id; // This will be "taxCertificate" or "proofOfFunds"
    const type = id === "taxCertificate" ? 0 : 1; // Assign type based on input
    const fileName = file.name;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const filePath = reader.result; // Base64 or URL

      // Dispatch new document
      documentDispatch({
        type: "ADD_DOCUMENT",
        payload: { type, fileName, filePath },
      });
    };
  };

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Submitting Attachments", documents);
    navigate("/declaration");
  }

  return (
    <div className="w-full px-20 py-20 bg-cecOrange h-full">
      <div className="font-oxygen w-full md:w-4/5 bg-white rounded-md px-10 py-10 mx-auto">
        <FormHeader />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Link to="/search" className="text-sm underline text-cecOrange">
            Already have an access code? Click here to view your application
            status
          </Link>

          <h2 className="font-bold text-xl">
            Attachments <span>(All Documents must be PDF only)</span>
          </h2>

          <div className="grid w-full max-w-sm items-center gap-1.5 ">
            <Label htmlFor="taxCertificate">
              27. ZRA Tax Clearance certificate
            </Label>
            <input
              className="mt-6 block w-full text-sm text-gray-900 border border-black/35 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
              aria-describedby="file_input_help"
              id="taxCertificate"
              type="file"
              onChange={handleDocumentUpload}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5 ">
            <Label htmlFor="proofOfFunds">
              28. Declaration of funds to support financial variability,
              accompanied by proof of fund or latest accounts where applicable
            </Label>
            <input
              className="block w-full text-sm text-gray-900 border border-black/35 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
              aria-describedby="file_input_help"
              id="proofOfFunds"
              type="file"
              onChange={handleDocumentUpload}
            />
          </div>

          {/* Breakpoint */}

          <div className="flex justify-center space-x-3">
            <Button
              type="submit"
              className="w-64 bg-cecOrange text-white hover:bg-[#8A5F00]"
            >
              Proceed
            </Button>
            <Button
              type="button"
              className="w-64 border border-black text-black"
              variant="outline"
              onClick={() => dispatch({ type: "RESET_FIELDS" })}
            >
              Reset
            </Button>
          </div>
          <BackButton backTo={"/"} />
        </form>
      </div>
    </div>
  );
};

export default Attachments;
