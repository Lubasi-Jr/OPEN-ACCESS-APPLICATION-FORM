import React, { useReducer, useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { NRCPattern, namePattern, phoneNumberPattern } from "@/regex_constants";
import axiosInstance from "@/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const terms = [
  { id: "short", type: "Short-Term", value: 0 },
  { id: "medium", type: "Medium-Term", value: 1 },
  { id: "long", type: "Long-Term", value: 2 },
];
const acks = [
  "a) I am duly authorized to make this declaration",
  "b) I am the designated person responsible for this application",
  "c) I have read and understood this form and all accompanying regulations related hereto and",
  "d) all information provide herein is to the best of my knowledge true and correct",
];

const initialFiles = {
  ZRA: null,
  fundsDeclaration: null,
  signature: null,
};

const initialForm = {
  /* Details of Applicant */
  name: "",
  address: "",
  telephone: "",
  email: "",
  term: 0,

  /* Contact Person */
  contact_name: "",
  contact_title: "",
  contact_address: "",
  contact_email: "",
  cellphone: "",
  board_licenses: "",

  /* Capacity and Period  */
  capacity: "",
  demand: "",
  system_period: "",

  /* Injection Point Details  */
  utility: "",
  voltage: "",
  connection_capacity: "",
  short_circuit: "",
  substation_feeder: "",

  /* Drawing Point Details */
  names_of_users: "",
  drawing_drawing_voltage: "",
  drawing_capacity: "",
  drawing_short_circuit: "",
  drawing_substation_feeder: "",
  drawing_system_connections: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELDS":
      return { ...state, [action.id]: action.payload };
    case "RESET_FIELDS":
      return initialForm;
    default:
      return state;
  }
};

const documentReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELDS":
      return { ...state, [action.id]: action.payload };
    case "RESET_FIELDS":
      return initialFiles;
    default:
      return state;
  }
};

const HomeForm = () => {
  const [form, dispatch] = useReducer(reducer, initialForm);
  const [documents, documentDispatch] = useReducer(
    documentReducer,
    initialFiles
  );

  const navigate = useNavigate(); //To be used when form is successfully submitted

  //Captcha security
  const [isVerified, setIsVerified] = useState(true);
  const handleCaptcha = (value) => {
    if (value) {
      setIsVerified(true);
      console.log(value);
    } else {
      setIsVerified(false);
    }
  };

  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    const id = e.target.id;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64File = reader.result.split(",")[1];

      //Update the state
      documentDispatch({ type: "UPDATE_FIELDS", id: id, payload: base64File });
    };
  };

  const handleFieldChange = (e) => {
    const { id, value } = e.target;
    dispatch({ type: "UPDATE_FIELDS", id: id, payload: value });
  };

  const handleTermChange = (value) => {
    dispatch({ type: "UPDATE_FIELDS", id: "term", payload: value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log(form);
    //console.log(documents);
  };

  const resetFields = () => {
    return;
  };

  return (
    <div className="w-full px-20 py-20 bg-cecOrange h-full">
      <div className="font-oxygen z-10 w-full md:w-4/5 bg-white rounded-md h-auto px-10 py-10 mx-auto flex flex-col items-start gap-2">
        <div className="flex gap-12 items-start justify-start w-auto mb-0">
          <img
            src="cec-OG-logo-transparent.png"
            alt="CEC Logo"
            height={100}
            width={100}
          />

          <h1 className="font-bold font-raleway text-3xl mt-5 md:mt-8">
            APPLICATION FOR OPEN ACCESS
          </h1>
        </div>

        <form
          onSubmit={handleClick}
          className="grid w-full grid-cols-1 md:grid-cols-2 px-5 py-5 gap-4"
        >
          <a
            href="#"
            className="font-light text-sm underline text-cecOrange mt-5 md:mt-8 md:col-span-2"
          >
            Already have an access code? Click here to view your application
            status
          </a>

          <h1 className="font-bold font-raleway text-xl mt-5 md:mt-8 md:col-span-2">
            Details of the Applicant{" "}
          </h1>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">1. Applicant name</Label>
            <Input
              type="text"
              id="name"
              placeholder=""
              value={form.name}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="address">2. Physical Address</Label>
            <Textarea
              placeholder="Type your address here."
              id="address"
              value={form.address}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="telephone">3. Telephone Numbers</Label>
            <Input
              type="text"
              id="telephone"
              placeholder=""
              value={form.telephone}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">4. Email address</Label>
            <Input
              type="email"
              id="email"
              placeholder=""
              value={form.email}
              onChange={handleFieldChange}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="term">5. Term of Applicaiton</Label>
            <RadioGroup
              defaultValue={terms[0].type}
              onValueChange={handleTermChange}
            >
              {terms.map((term, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={term.value} id={term.id} />
                  <Label htmlFor="term">{term.type}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <h1 className="font-bold text-xl mt-5 md:mt-8 md:col-span-2">
            Contact Person
          </h1>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="contact_name">6. Full name</Label>
            <Input
              type="text"
              id="contact_name"
              placeholder=""
              value={form.contact_name}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="contact_title">7. Title</Label>
            <Input
              type="text"
              id="contact_title"
              placeholder=""
              value={form.contact_title}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="contact_address">8. Physical Address</Label>
            <Textarea
              value={form.contact_address}
              onChange={handleFieldChange}
              placeholder="Type your address here."
              id="contact_address"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="cellphone">9. Cellphone Number</Label>
            <Input
              type="text"
              id="cellphone"
              placeholder=""
              value={form.cellphone}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="contact_email">10. Email address</Label>
            <Input
              type="email"
              id="contact_email"
              placeholder=""
              value={form.contact_email}
              onChange={handleFieldChange}
            />
          </div>

          <div className="grid w-full gap-1.5">
            <Label htmlFor="board_licenses">
              11. This application for a grant of:
              <br />
              Details of Energy Regulation Board Licenses held, if any held the
              applicant.
            </Label>
            <Textarea
              placeholder=""
              id="board_licenses"
              value={form.board_licenses}
              onChange={handleFieldChange}
            />
          </div>
          <h1 className="font-bold text-xl mt-5 md:mt-8 md:col-span-2">
            Details of Capacity and Period
          </h1>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="capacity">12. Capacity applied for (MVA/MW)</Label>
            <Input
              type="number"
              id="capacity"
              placeholder=""
              value={form.capacity}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="demand">13. Average demand (MVA/MW)</Label>
            <Input
              type="number"
              id="demand"
              placeholder=""
              value={form.demand}
              onChange={handleFieldChange}
            />
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
          <h1 className="font-bold text-xl mt-5 md:mt-8 md:col-span-2">
            Injection Point Details
          </h1>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="utility">15. Name of Utility</Label>
            <Input
              type="text"
              id="utility"
              placeholder=""
              value={form.utility}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="voltage">16. Voltage level (kV)</Label>
            <Input
              type="number"
              id="voltage"
              placeholder=""
              value={form.voltage}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="connection_capacity">
              17. Capacity of Connection required (MVA)
            </Label>
            <Input
              type="number"
              id="connection_capacity"
              placeholder=""
              value={form.connection_capacity}
              onChange={handleFieldChange}
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="short_circuit">18. Short circuit level (MVA)</Label>
            <Input
              type="number"
              id="short_circuit"
              placeholder=""
              value={form.short_circuit}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="substation_feeder">
              19. Name of Substation and Feeder
            </Label>
            <Input
              type="text"
              id="substation_feeder"
              placeholder=""
              value={form.substation_feeder}
              onChange={handleFieldChange}
            />
          </div>

          <h1 className="font-bold text-xl mt-5 md:mt-8 md:col-span-2">
            Drawing Point Details
          </h1>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="name_of_users">20. Names of users</Label>
            <Textarea
              placeholder=""
              id="name_of_users"
              value={form.name_of_users}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="drawing_voltage">21. Voltage (kV)</Label>
            <Input
              type="number"
              id="drawing_voltage"
              placeholder=""
              value={form.drawing_voltage}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="drawing_capacity">
              22. Capacity of Connection required (MVA)
            </Label>
            <Input
              type="number"
              id="drawing_capacity"
              placeholder=""
              value={form.drawing_capacity}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="drawing_short_circuit">
              23. Short Circuit Level
            </Label>
            <Input
              type="text"
              id="drawing_short_circuit"
              placeholder=""
              value={form.drawing_short_circuit}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="drawing_substation_feeder">
              24. Name of Substation and Feeder
            </Label>
            <Input
              type="text"
              id="drawing_substation_feeder"
              placeholder=""
              value={form.drawing_substation_feeder}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="drawing_system_connecitons">
              25. Other Transmission System connections
            </Label>
            <Input
              type="text"
              id="drawing_system_connections"
              placeholder=""
              value={form.drawing_system_connections}
              onChange={handleFieldChange}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="drawer_other_points">
              26. Does drawer have other points of Transmission connection
            </Label>
            <RadioGroup defaultValue="NO">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Yes" id="yes" />
                <Label htmlFor="drawer_connections">Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="No" id="no" />
                <Label htmlFor="drawer_connections">No</Label>
              </div>
            </RadioGroup>
          </div>
          <h1 className="font-bold  text-xl mt-5 md:mt-8 md:col-span-2">
            Attachments <br />
            <span className="font-semibold text-sm text-neutral-500 mb-4 text-md mt-5 md:mt-8 md:col-span-2">
              Please tick to show that the required documents are attached.
              After finalizing, please date and sign the attached checklist and
              send together with the application
            </span>
          </h1>

          <div className="grid w-full max-w-sm items-center gap-1.5 ">
            <Label htmlFor="ZRA">27. ZRA Tax Clearance certificate</Label>
            <input
              className="mt-6 block w-full text-sm text-gray-900 border border-black/35 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
              aria-describedby="file_input_help"
              id="ZRA"
              type="file"
              onChange={handleDocumentUpload}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 ">
            <Label htmlFor="fundsDeclaration">
              28. declaration of funds to support financial variability,
              accompanied by proof of fund or latest accounts where applicable
            </Label>
            <input
              className="block w-full text-sm text-gray-900 border border-black/35 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
              aria-describedby="file_input_help"
              id="fundsDeclaration"
              type="file"
              onChange={handleDocumentUpload}
            />
          </div>

          <h1 className="font-bold text-xl mt-5 md:mt-8 md:col-span-2">
            Declaration by Applicant
          </h1>
          <div className="flex flex-col gap-1 mt-5 md:mt-8 md:col-span-2 border border-neutral-500 px-4 py-3 rounded-md">
            <div className="flex items-center gap-2">
              <p className="block">I</p>
              <input
                placeholder="fullname"
                type="text"
                className="bg-transparent border-b border-black focus:border-b focus:outline-none px-2 py-1"
              />
            </div>
            <p className="block">
              hereby, declare that all information provided herein is my
              personal knowledge and that:
            </p>
            {acks.map((ack, index) => (
              <p key={index}>{ack}</p>
            ))}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 ">
            <Label htmlFor="signature">Upload signature</Label>
            <input
              className="block w-full text-sm text-gray-900 border border-black/35 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
              aria-describedby="file_input_help"
              id="signature"
              type="file"
              onChange={handleDocumentUpload}
            />
          </div>

          <div className="flex items-center justify-center gap-2 mt-5 md:mt-8 md:col-span-2">
            {isVerified ? (
              <>
                <Button
                  type="submit"
                  className="w-[250px]"
                  onClick={handleClick}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  className="w-[250px] border border-black text-black"
                  variant="outline"
                  onClick={resetFields}
                >
                  Reset
                </Button>
              </>
            ) : (
              <ReCAPTCHA
                onChange={handleCaptcha}
                sitekey="6Le90sQqAAAAAGR2kM-fSs__PTGEG5HjkM-w0piV"
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomeForm;
