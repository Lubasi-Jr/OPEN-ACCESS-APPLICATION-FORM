import { useState } from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeForm from "./_components/HomeForm";
import CompletionPage from "./_components/CompletionPage";
import ApplicationSearch from "./_components/ApplicationSearch";
import StatusPage from "./_components/StatusPage";
import Capacity from "./_components/form_pages/Capacity";
import Attachments from "./_components/form_pages/Attachments";
import Declaration from "./_components/form_pages/Declaration";
import Injection from "./_components/form_pages/Injection";
import Drawing from "./_components/form_pages/Drawing";
import { Toaster } from "sonner";
import ToasterTest from "./Helper Components/ToasterTest";

function App() {
  return (
    <>
      <Toaster richColors position="bottom-right" />
      <Router>
        <Routes>
          <Route path="/" element={<HomeForm />} />
          <Route path="/capacity" element={<Capacity />} />
          <Route path="/attachments" element={<Attachments />} />
          <Route path="/declaration" element={<Declaration />} />
          <Route path="/injection" element={<Injection />} />
          <Route path="/drawing" element={<Drawing />} />

          <Route path="/submit/:refNum" element={<CompletionPage />} />
          <Route path="/status/:refNum" element={<StatusPage />} />
          <Route path="/search" element={<ApplicationSearch />} />

          {/* <Route path="/testing" element={<ToasterTest />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
