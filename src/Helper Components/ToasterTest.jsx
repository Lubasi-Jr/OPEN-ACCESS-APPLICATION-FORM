import React from "react";
import { toast } from "sonner";

const ToasterTest = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-slate-600">
      <button
        className="text-lg"
        onClick={() => {
          toast("A server side error occured. Try again later", {
            className: "text-xl font-oxygen p-5 min-w-[300px]",
          });
        }}
      >
        Toast
      </button>
    </div>
  );
};

export default ToasterTest;
