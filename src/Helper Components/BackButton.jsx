import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const BackButton = ({ backTo }) => {
  return (
    <Link to={backTo}>
      <p className="flex items-center justify-start gap-2">
        <ArrowLeft size={20} />
        <span className="text-sm">Back</span>
      </p>
    </Link>
  );
};

export default BackButton;
