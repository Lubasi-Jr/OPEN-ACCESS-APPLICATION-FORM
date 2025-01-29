import { useState } from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeForm from "./_components/HomeForm";
import CompletionPage from "./_components/CompletionPage";
import ApplicationSearch from "./_components/ApplicationSearch";
import StatusPage from "./_components/StatusPage";
import Capacity from "./_components/form_pages/Capacity";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeForm />} />
          <Route path="/capacity" element={<Capacity />} />

          <Route path="/submit/:refNum" element={<CompletionPage />} />
          <Route path="/status/:refNum" element={<StatusPage />} />
          <Route path="/search" element={<ApplicationSearch />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
