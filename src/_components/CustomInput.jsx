import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const CustomInput = ({ value, handleFieldChange, details }) => {
  function updateInput(e) {
    const id = e.target.id;
    const value = e.target.value;

    const argument = {
      id,
      value,
    };

    handleFieldChange(argument);
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={details.type}>{details?.label}</Label>
      <Input
        type={details?.type}
        id={details?.id}
        placeholder={details?.placeholder}
        value={value}
        onChange={updateInput}
      />
    </div>
  );
};

export default CustomInput;
