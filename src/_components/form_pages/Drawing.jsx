import React, { useState, useEffect, useReducer } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BackButton from "@/Helper Components/BackButton";
import FormHeader from "@/Helper Components/FormHeader";

const initialState = [
  {
    drawing_voltage: 0,
    drawing_capacity: 0,
    drawing_short_circuit: 0,
    drawing_substation_feeder: "",
  },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELDS":
      const updatedState = state.map((item, index) =>
        index === 0 ? { ...item, [action.id]: action.payload } : item
      );
      sessionStorage.setItem("drawingDetails", JSON.stringify(updatedState));
      return updatedState;

    case "RESET_FIELDS":
      sessionStorage.removeItem("drawingDetails");
      return initialState;

    default:
      return state;
  }
};

const Drawing = () => {
  const navigate = useNavigate();
  const storedData =
    JSON.parse(sessionStorage.getItem("drawingDetails")) || initialState;
  const [form, dispatch] = useReducer(reducer, storedData);

  // Extract names_of_users from storedData or set default
  const [namesOfUsers, setNamesOfUsers] = useState(
    storedData[0]?.names_of_users || [{ userName: "" }]
  );

  useEffect(() => {
    const updatedForm = form.map((item, index) =>
      index === 0 ? { ...item, names_of_users: namesOfUsers } : item
    );
    sessionStorage.setItem("drawingDetails", JSON.stringify(updatedForm));
  }, [form, namesOfUsers]);

  const handleFieldChange = (e) => {
    dispatch({
      type: "UPDATE_FIELDS",
      id: e.target.id,
      payload: e.target.value,
    });
  };

  const handleNamesOfUsersChange = (index, value) => {
    const updatedNames = [...namesOfUsers];
    updatedNames[index].userName = value;
    setNamesOfUsers(updatedNames);

    // Ensure the form state also includes updated namesOfUsers
    dispatch({
      type: "UPDATE_FIELDS",
      id: "names_of_users",
      payload: updatedNames,
    });
  };

  const handleAddUser = () => {
    const updatedNames = [...namesOfUsers, { userName: "" }];
    setNamesOfUsers(updatedNames);

    dispatch({
      type: "UPDATE_FIELDS",
      id: "names_of_users",
      payload: updatedNames,
    });
  };

  const handleRemoveUser = (index) => {
    const updatedNames = namesOfUsers.filter((_, i) => i !== index);
    setNamesOfUsers(updatedNames);

    dispatch({
      type: "UPDATE_FIELDS",
      id: "names_of_users",
      payload: updatedNames,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Merge names_of_users into the form state
    const updatedForm = form.map((item, index) =>
      index === 0 ? { ...item, names_of_users: namesOfUsers } : item
    );

    console.log("Submitting Drawing Details:", updatedForm);
    // Add your submission logic here (e.g., API call, navigation, etc.)
  };

  return (
    <div className="w-full px-20 py-20 bg-cecOrange h-full">
      <div className="font-oxygen w-full md:w-4/5 bg-white rounded-md px-10 py-10 mx-auto">
        <FormHeader />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="font-bold text-xl">Drawing Details</h2>

          {/* Names of Users */}
          {namesOfUsers.map((user, index) => (
            <div
              key={index}
              className="grid w-full max-w-sm items-center gap-1.5"
            >
              <Label htmlFor={`userName-${index}`}>
                Name of User {index + 1}
              </Label>
              <div className="flex gap-2">
                <Input
                  type="text"
                  id={`userName-${index}`}
                  placeholder="Enter user name"
                  value={user.userName}
                  onChange={(e) =>
                    handleNamesOfUsersChange(index, e.target.value)
                  }
                />
                {namesOfUsers.length > 1 && (
                  <Button
                    type="button"
                    className="bg-red-500 text-white hover:bg-red-600"
                    onClick={() => handleRemoveUser(index)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          ))}
          <Button
            type="button"
            className="w-64 bg-cecOrange text-white hover:bg-[#8A5F00]"
            onClick={handleAddUser}
          >
            Add User
          </Button>

          {/* Other Fields */}
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="drawing_voltage">Voltage Level (kV)</Label>
            <Input
              type="number"
              id="drawing_voltage"
              placeholder=""
              value={form[0].drawing_voltage}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="drawing_capacity">
              Capacity of Connection Required (MVA)
            </Label>
            <Input
              type="number"
              id="drawing_capacity"
              placeholder=""
              value={form[0].drawing_capacity}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="drawing_short_circuit">
              Short Circuit Level (MVA)
            </Label>
            <Input
              type="number"
              id="drawing_short_circuit"
              placeholder=""
              value={form[0].drawing_short_circuit}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="drawing_substation_feeder">
              Name of Substation and Feeder
            </Label>
            <Input
              type="text"
              id="drawing_substation_feeder"
              placeholder=""
              value={form[0].drawing_substation_feeder}
              onChange={handleFieldChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="otherTransmissionConnections" />
            <Label htmlFor="otherTransmissionConnections">
              Does drawer have other points of transmission connection?
            </Label>
          </div>
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

export default Drawing;
