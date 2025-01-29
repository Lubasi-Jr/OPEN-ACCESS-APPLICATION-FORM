import React, { useState, useEffect, useReducer } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BackButton from "@/Helper Components/BackButton";
import UnitsPicker from "@/Helper Components/UnitsPicker";
import FormHeader from "@/Helper Components/FormHeader";

const initialState = {
  capacity: 0,
  capacityType: 0,
  demand: 0,
  demandType: 0,
  system_period: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELDS":
      const newState = { ...state, [action.id]: action.payload };
      sessionStorage.setItem("capacityDetails", JSON.stringify(newState)); // Save to local storage
      return newState;
    case "RESET_FIELDS":
      sessionStorage.removeItem("capacityDetails"); // Clear local storage
      return initialState;
    default:
      return state;
  }
};

const Capacity = () => {
  const navigate = useNavigate();
  const storedData =
    JSON.parse(sessionStorage.getItem("capacityDetails")) || initialState;
  const [form, dispatch] = useReducer(reducer, storedData);

  useEffect(() => {
    sessionStorage.setItem("capacityDetails", JSON.stringify(form)); // Ensure state is always saved
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
    console.log("Submitting Capacity:", form);
    navigate("/"); // Adjust the navigation as needed
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

          <h2 className="font-bold text-xl">Details of Capacity and Period</h2>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="capacity">12. Capacity applied for (MVA/MW)</Label>
            <div className="flex gap-2 items-start">
              <Input
                type="number"
                id="capacity"
                placeholder=""
                value={form.capacity}
                onChange={handleFieldChange}
              />
              <UnitsPicker type="capacity" dispatch={dispatch} />
            </div>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="demand">13. Average demand (MVA/MW)</Label>
            <div className="flex gap-2 items-start">
              <Input
                type="number"
                id="demand"
                placeholder=""
                value={form.demand}
                onChange={handleFieldChange}
              />
              <UnitsPicker type="demand" dispatch={dispatch} />
            </div>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="system_period">
              14. Period for which Use of System is applied for
            </Label>
            <Input
              type="text"
              id="system_period"
              placeholder=""
              value={form.system_period}
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

export default Capacity;
