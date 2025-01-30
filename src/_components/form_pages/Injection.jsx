import React, { useState, useEffect, useReducer } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BackButton from "@/Helper Components/BackButton";
import FormHeader from "@/Helper Components/FormHeader";

// Template for new injection points
const templateInjection = {
  utilityName: "",
  voltageLevel: 0,
  voltageLevelUnit: 0,
  capacityRequired: 0,
  capacityRequiredUnit: 0,
  shortCircuitLevel: 0,
  shortCircuitLevelUnit: 0,
  substationFeederName: "",
};

const initialState = [templateInjection];

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELDS":
      return state.map((item, index) =>
        index === action.index
          ? { ...item, [action.field]: action.payload }
          : item
      );

    case "ADD_INJECTION":
      return [...state, { ...templateInjection }];

    case "DELETE_INJECTION":
      return state.filter((_, index) => index !== action.index);

    case "RESET_FIELDS":
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

  // Persist to session storage
  useEffect(() => {
    sessionStorage.setItem("injectionDetails", JSON.stringify(form));
  }, [form]);

  const handleFieldChange = (e, index) => {
    dispatch({
      type: "UPDATE_FIELDS",
      field: e.target.dataset.field,
      payload: e.target.value,
      index: index,
    });
  };

  const handleAddInjection = () => {
    dispatch({ type: "ADD_INJECTION" });
  };

  const handleDeleteInjection = (index) => {
    dispatch({ type: "DELETE_INJECTION", index });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Injections:", form);
    navigate("/drawing");
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

          {form.map((injection, index) => (
            <div key={index} className="border-b pb-4 mb-4 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold mb-2">
                  Injection Point #{index + 1}
                </h3>
                <Button
                  type="button"
                  onClick={() => handleDeleteInjection(index)}
                  className="bg-red-500 text-white hover:bg-red-600"
                  disabled={form.length === 1} // Prevent deleting the last item
                >
                  Delete
                </Button>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor={`utilityName-${index}`}>
                  15. Name of Utility
                </Label>
                <Input
                  type="text"
                  data-field="utilityName"
                  id={`utilityName-${index}`}
                  value={injection.utilityName}
                  onChange={(e) => handleFieldChange(e, index)}
                  required
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor={`voltageLevel-${index}`}>
                  16. Voltage level (kV)
                </Label>
                <Input
                  type="number"
                  data-field="voltageLevel"
                  id={`voltageLevel-${index}`}
                  value={injection.voltageLevel}
                  onChange={(e) => handleFieldChange(e, index)}
                  required
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor={`capacityRequired-${index}`}>
                  17. Capacity of Connection required (MVA)
                </Label>
                <Input
                  type="number"
                  data-field="capacityRequired"
                  id={`capacityRequired-${index}`}
                  value={injection.capacityRequired}
                  onChange={(e) => handleFieldChange(e, index)}
                  required
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor={`shortCircuitLevel-${index}`}>
                  18. Short circuit level (MVA)
                </Label>
                <Input
                  type="number"
                  data-field="shortCircuitLevel"
                  id={`shortCircuitLevel-${index}`}
                  value={injection.shortCircuitLevel}
                  onChange={(e) => handleFieldChange(e, index)}
                  required
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor={`substationFeederName-${index}`}>
                  19. Name of Substation and Feeder
                </Label>
                <Input
                  type="text"
                  data-field="substationFeederName"
                  id={`substationFeederName-${index}`}
                  value={injection.substationFeederName}
                  onChange={(e) => handleFieldChange(e, index)}
                  required
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            onClick={handleAddInjection}
            className="w-64 bg-cecOrange text-white hover:bg-[#8A5F00]"
          >
            Add New Injection Point
          </Button>

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
          <BackButton backTo={"/capacity"} />
        </form>
      </div>
    </div>
  );
};

export default Injection;
