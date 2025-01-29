import React, { useState, useEffect, useReducer } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BackButton from "@/Helper Components/BackButton";
import FormHeader from "@/Helper Components/FormHeader";

const initialState = [
  {
    utilityName: "",
    voltageLevel: 0,
    voltageLevelUnit: 0,
    capacityRequired: 0,
    capacityRequiredUnit: 0,
    shortCircuitLevel: 0,
    shortCircuitLevelUnit: 0,
    substationFeederName: "",
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELDS":
      const updatedState = state.map((item, index) =>
        index === 0 ? { ...item, [action.id]: action.payload } : item
      );
      sessionStorage.setItem("injectionDetails", JSON.stringify(updatedState));
      return updatedState;

    case "RESET_FIELDS":
      sessionStorage.removeItem("injectionDetails");
      return initialState;

    default:
      return state;
  }
};

const Injection = () => {
  const navigate = useNavigate();
  const storedData =
    JSON.parse(sessionStorage.getItem("injectionDetails")) || initialState;
  const [form, dispatch] = useReducer(reducer, storedData);

  useEffect(() => {
    sessionStorage.setItem("injectionDetails", JSON.stringify(form)); // Ensure state is always saved
  }, [form]);

  const handleFieldChange = (e) => {
    dispatch({
      type: "UPDATE_FIELDS",
      id: e.target.id,
      payload: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Injection:", form);
    navigate("/drawing"); // Adjust the navigation as needed
  };

  return (
    <div className="w-full px-20 py-20 bg-cecOrange h-full">
      <div className="font-oxygen w-full md:w-4/5 bg-white rounded-md px-10 py-10 mx-auto">
        <FormHeader />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Link to="/search" className="text-sm underline text-cecOrange">
            Already have an access code? Click here to view your application
            status
          </Link>

          <h2 className="font-bold text-xl">Injection Point Details</h2>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="utilityName">15. Name of Utility</Label>
            <Input
              type="text"
              id="utilityName"
              placeholder=""
              value={form[0].utilityName}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="voltageLevel">16. Voltage level (kV)</Label>
            <Input
              type="number"
              id="voltageLevel"
              placeholder=""
              value={form[0].voltageLevel}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="capacityRequired">
              17. Capacity of Connection required (MVA)
            </Label>
            <Input
              type="number"
              id="capacityRequired"
              placeholder=""
              value={form[0].capacityRequired}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="shortCircuitLevel">
              18. Short circuit level (MVA)
            </Label>
            <Input
              type="number"
              id="shortCircuitLevel"
              placeholder=""
              value={form[0].shortCircuitLevel}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="substationFeederName">
              19. Name of Substation and Feeder
            </Label>
            <Input
              type="text"
              id="substationFeederName"
              placeholder=""
              value={form[0].substationFeederName}
              onChange={handleFieldChange}
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

export default Injection;
