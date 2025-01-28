import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CustomTextArea = ({ details, value, handleFieldChange }) => {
  function updateTextArea(e) {
    const id = e.target.id;
    const value = e.target.value;

    const argument = {
      id,
      value,
    };

    handleFieldChange(argument);
  }
  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor={details?.id}>{details?.label}</Label>
      <Textarea
        placeholder={details?.placeholder}
        id={details?.id}
        value={value}
        onChange={updateTextArea}
      />
    </div>
  );
};

export default CustomTextArea;
