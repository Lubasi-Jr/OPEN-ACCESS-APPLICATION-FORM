import { useState } from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeForm from "./_components/HomeForm";
import CompletionPage from "./_components/CompletionPage";
import ApplicationSearch from "./_components/ApplicationSearch";
import StatusPage from "./_components/StatusPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeForm />} />
          <Route path="/submit/:refNum" element={<CompletionPage />} />
          <Route path="/status/:refNum" element={<StatusPage />} />
          <Route path="/search" element={<ApplicationSearch />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
