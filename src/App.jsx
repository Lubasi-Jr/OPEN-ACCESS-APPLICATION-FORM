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

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeForm />} />
          <Route path="/capacity" element={<Capacity />} />
          <Route path="/attachments" element={<Attachments />} />
          <Route path="/declaration" element={<Declaration />} />
          <Route path="/injection" element={<Injection />} />

          <Route path="/submit/:refNum" element={<CompletionPage />} />
          <Route path="/status/:refNum" element={<StatusPage />} />
          <Route path="/search" element={<ApplicationSearch />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
