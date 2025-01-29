import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UnitsPicker = ({ type, dispatch }) => {
  const [unit, setUnit] = useState("MVA");

  // Function to update the correct type in the reducer
  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);

    const newType = newUnit === "MVA" ? 0 : 1; // MVA -> 0, MW -> 1

    // Dispatch the appropriate action to update the state based on the type
    dispatch({
      type: "UPDATE_FIELDS",
      id: `${type}Type`, // This will dynamically target either 'capacityType' or 'demandType'
      payload: newType,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {unit}
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>Select Unit</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={unit} onValueChange={handleUnitChange}>
          <DropdownMenuRadioItem value="MVA">MVA</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="MW">MW</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UnitsPicker;
