import React, { useReducer, useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import axiosInstance from "@/api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import acks from "@/form_constants/Acks";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FormHeader from "@/Helper Components/FormHeader";
import { toast } from "sonner";

// Add validation functions
const validateContactName = (name) => {
  const regex = /^[A-Za-z\s'-]+$/;
  return regex.test(name);
};

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const terms = [
  { id: "short", type: "Short-Term", value: 0 },
  { id: "medium", type: "Medium-Term", value: 1 },
  { id: "long", type: "Long-Term", value: 2 },
];

const initialState = {
  name: "",
  address: "",
  telephone: "",
  email: "",
  term: 0,
  contact_name: "",
  contact_title: "",
  contact_address: "",
  contact_email: "",
  cellphone: "",
  board_licenses: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELDS":
      const newState = { ...state, [action.id]: action.payload };
      sessionStorage.setItem("applicantDetails", JSON.stringify(newState)); // Save to local storage
      return newState;
    case "RESET_FIELDS":
      sessionStorage.removeItem("applicantDetails"); // Clear local storage
      return initialState;
    default:
      return state;
  }
};

const HomeForm = () => {
  const navigate = useNavigate();
  const storedData =
    JSON.parse(sessionStorage.getItem("applicantDetails")) || initialState;
  const [form, dispatch] = useReducer(reducer, storedData);

  useEffect(() => {
    sessionStorage.setItem("applicantDetails", JSON.stringify(form)); // Ensure state is always saved
  }, [form]);

  const handleFieldChange = (e) => {
    dispatch({
      type: "UPDATE_FIELDS",
      id: e.target.id,
      payload: e.target.value,
    });
  };

  const handleTermChange = (value) => {
    dispatch({ type: "UPDATE_FIELDS", id: "term", payload: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    let isValid = true;

    // Validate contact name
    if (!validateContactName(form.contact_name)) {
      toast.error("Contact name must not contain numbers");
      isValid = false;
    }

    // Validate emails
    if (!validateEmail(form.email)) {
      toast.error("Invalid email format for applicant email");
      isValid = false;
    }

    if (!validateEmail(form.contact_email)) {
      toast.error("Invalid email format for contact email");
      isValid = false;
    }

    // If validation fails, stop submission
    if (!isValid) return;

    console.log("Submitting:", form);
    navigate("/capacity");
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

          <h2 className="font-bold text-xl">Details of the Applicant</h2>

          <div className="w-1/2">
            <Label htmlFor="name">1. Applicant Name (Company Name)</Label>
            <Input
              type="text"
              id="name"
              value={form.name}
              onChange={handleFieldChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="address">2. Physical Address</Label>
            <Textarea
              id="address"
              value={form.address}
              onChange={handleFieldChange}
              required
            />
          </div>

          <div className="w-1/2">
            <Label htmlFor="telephone">3. Telephone Number</Label>
            <Input
              type="number"
              id="telephone"
              value={form.telephone}
              onChange={handleFieldChange}
              required
            />
          </div>

          <div className="w-1/2">
            <Label htmlFor="email">4. Email Address</Label>
            <Input
              type="email"
              id="email"
              value={form.email}
              onChange={handleFieldChange}
              pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
              required
            />
          </div>

          <div>
            <Label>5. Term of Application</Label>
            <RadioGroup
              defaultValue={terms[0].type}
              onValueChange={handleTermChange}
            >
              {terms.map((term) => (
                <div key={term.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={term.value} id={term.id} />
                  <Label htmlFor={term.id}>{term.type}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <h2 className="font-bold text-xl">Contact Person</h2>

          <div className="w-1/2">
            <Label htmlFor="contact_name">6. Full Name</Label>
            <Input
              type="text"
              id="contact_name"
              value={form.contact_name}
              onChange={handleFieldChange}
              pattern="[A-Za-z\s'-]+"
              title="Name should not contain numbers"
              required
            />
          </div>

          <div className="w-1/2">
            <Label htmlFor="contact_title">7. Title</Label>
            <Input
              type="text"
              id="contact_title"
              value={form.contact_title}
              onChange={handleFieldChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="contact_address">8. Physical Address</Label>
            <Textarea
              id="contact_address"
              value={form.contact_address}
              onChange={handleFieldChange}
              required
            />
          </div>

          <div className="w-1/2">
            <Label htmlFor="cellphone">9. Cellphone Number</Label>
            <Input
              type="number"
              id="cellphone"
              value={form.cellphone}
              onChange={handleFieldChange}
              required
            />
          </div>

          <div className="w-1/2">
            <Label htmlFor="contact_email">10. Email Address</Label>
            <Input
              type="email"
              id="contact_email"
              value={form.contact_email}
              onChange={handleFieldChange}
              pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
              required
            />
          </div>

          <div>
            <Label htmlFor="board_licenses">
              11. This application for a grant of: Details of Energy Regulation
              Board Licenses held, if any held the applicant
            </Label>
            <Textarea
              id="board_licenses"
              value={form.board_licenses}
              onChange={handleFieldChange}
              required
            />
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
        </form>
      </div>
    </div>
  );
};

export default HomeForm;
