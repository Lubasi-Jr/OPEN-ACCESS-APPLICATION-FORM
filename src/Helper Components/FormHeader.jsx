import React from "react";

const FormHeader = () => {
  return (
    <div className="flex gap-12 items-start pr-4 justify-start w-auto mb-0">
      <img
        src="cec-OG-logo-transparent.png"
        alt="CEC Logo"
        height={100}
        width={100}
      />
      <h1 className="font-bold text-xl lg:text-3xl">
        APPLICATION FOR OPEN ACCESS
      </h1>
    </div>
  );
};

export default FormHeader;
