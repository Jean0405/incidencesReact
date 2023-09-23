import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CamperPage } from "./components/pages/CamperPage";
import { SignIn } from "./components/pages/SignIn";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/camperPage" element={<CamperPage />} />
        </Routes>
      </Router>
    </div>
  );
}