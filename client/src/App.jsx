import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CamperPage } from "./components/pages/CamperPage";
import { SignIn } from "./components/pages/SignIn";
import { TrainerPage } from "./components/pages/TrainerPage";
import { SignUp } from "./components/pages/SignUp";
import { SupportPage } from "./components/pages/SupportPage";

export default function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/camperPage" element={<CamperPage />} />
          <Route path="/trainerPage" element={<TrainerPage />} />
          <Route path="/supportPage" element={<SupportPage />} />
        </Routes>
      </Router>
  );
}