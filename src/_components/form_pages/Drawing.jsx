import React, { useEffect, useReducer } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BackButton from "@/Helper Components/BackButton";
import FormHeader from "@/Helper Components/FormHeader";

const templateDrawing = {
  voltage: 0,
  voltageUnit: 0,
  capacityRequired: 0,
  capacityRequiredUnit: 0,
  shortCircuitLevel: 0,
  shortCircuitLevelUnit: 0,
  substationFeederName: "",
  users: [{ userName: "" }],
};

const initialState = [templateDrawing];

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELDS":
      return state.map((item, index) =>
        index === action.drawingIndex
          ? { ...item, [action.field]: action.payload }
          : item
      );

    case "UPDATE_USERS":
      return state.map((item, index) =>
        index === action.drawingIndex
          ? { ...item, users: action.payload }
          : item
      );

    case "ADD_DRAWING":
      return [...state, { ...templateDrawing }];

    case "DELETE_DRAWING":
      return state.filter((_, index) => index !== action.drawingIndex);

    case "RESET_FIELDS":
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

  // Persist to session storage
  useEffect(() => {
    sessionStorage.setItem("drawingDetails", JSON.stringify(form));
  }, [form]);

  const handleFieldChange = (e, drawingIndex) => {
    dispatch({
      type: "UPDATE_FIELDS",
      field: e.target.id,
      payload: e.target.value,
      drawingIndex,
    });
  };

  const handleAddUser = (drawingIndex) => {
    const updatedUsers = [...form[drawingIndex].users, { userName: "" }];
    dispatch({
      type: "UPDATE_USERS",
      payload: updatedUsers,
      drawingIndex,
    });
  };

  const handleRemoveUser = (drawingIndex, userIndex) => {
    const updatedUsers = form[drawingIndex].users.filter(
      (_, i) => i !== userIndex
    );
    dispatch({
      type: "UPDATE_USERS",
      payload: updatedUsers,
      drawingIndex,
    });
  };

  const handleUserChange = (drawingIndex, userIndex, value) => {
    const updatedUsers = form[drawingIndex].users.map((user, index) =>
      index === userIndex ? { ...user, userName: value } : user
    );
    dispatch({
      type: "UPDATE_USERS",
      payload: updatedUsers,
      drawingIndex,
    });
  };

  const handleAddDrawing = () => {
    dispatch({ type: "ADD_DRAWING" });
  };

  const handleDeleteDrawing = (index) => {
    dispatch({ type: "DELETE_DRAWING", drawingIndex: index });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Drawing Details:", form);
    navigate("/attachments");
  };

  return (
    <div className="w-full px-20 py-20 bg-cecOrange h-full">
      <div className="font-oxygen w-full md:w-4/5 bg-white rounded-md px-10 py-10 mx-auto">
        <FormHeader />
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="font-bold text-xl">Drawing Details</h2>

          {form.map((drawing, drawingIndex) => (
            <div key={drawingIndex} className="border-b pb-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">
                  Drawing Point #{drawingIndex + 1}
                </h3>
                <Button
                  type="button"
                  onClick={() => handleDeleteDrawing(drawingIndex)}
                  className="bg-red-500 text-white hover:bg-red-600"
                  disabled={form.length === 1}
                >
                  Delete
                </Button>
              </div>

              {/* Users */}
              <div className="ml-4 mb-4">
                {drawing.users.map((user, userIndex) => (
                  <div
                    key={userIndex}
                    className="grid w-full max-w-sm items-center gap-1.5 mb-2"
                  >
                    <Label htmlFor={`userName-${drawingIndex}-${userIndex}`}>
                      Name of User {userIndex + 1}
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        type="text"
                        id={`userName-${drawingIndex}-${userIndex}`}
                        placeholder="Enter user name"
                        value={user.userName}
                        required
                        onChange={(e) =>
                          handleUserChange(
                            drawingIndex,
                            userIndex,
                            e.target.value
                          )
                        }
                      />
                      {drawing.users.length > 1 && (
                        <Button
                          type="button"
                          className="bg-red-500 text-white hover:bg-red-600"
                          onClick={() =>
                            handleRemoveUser(drawingIndex, userIndex)
                          }
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  className="w-64 bg-cecOrange text-white hover:bg-[#8A5F00] mt-2"
                  onClick={() => handleAddUser(drawingIndex)}
                >
                  Add User
                </Button>
              </div>

              {/* Drawing Fields */}
              <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
                <Label htmlFor={`voltage-${drawingIndex}`}>
                  Voltage Level (kV)
                </Label>
                <Input
                  type="number"
                  id="voltage"
                  value={drawing.voltage}
                  required
                  onChange={(e) => handleFieldChange(e, drawingIndex)}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
                <Label htmlFor={`capacityRequired-${drawingIndex}`}>
                  Capacity of Connection Required (MVA)
                </Label>
                <Input
                  type="number"
                  id="capacityRequired"
                  value={drawing.capacityRequired}
                  onChange={(e) => handleFieldChange(e, drawingIndex)}
                  required
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 mb-2">
                <Label htmlFor={`shortCircuitLevel-${drawingIndex}`}>
                  Short Circuit Level (MVA)
                </Label>
                <Input
                  type="number"
                  id="shortCircuitLevel"
                  value={drawing.shortCircuitLevel}
                  required
                  onChange={(e) => handleFieldChange(e, drawingIndex)}
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 mb-4">
                <Label htmlFor={`substationFeederName-${drawingIndex}`}>
                  Name of Substation and Feeder
                </Label>
                <Input
                  type="text"
                  id="substationFeederName"
                  value={drawing.substationFeederName}
                  onChange={(e) => handleFieldChange(e, drawingIndex)}
                  required
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            className="w-64 bg-cecOrange text-white hover:bg-[#8A5F00]"
            onClick={handleAddDrawing}
          >
            Add New Drawing Point
          </Button>

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
          <BackButton backTo={"/injection"} />
        </form>
      </div>
    </div>
  );
};

export default Drawing;
