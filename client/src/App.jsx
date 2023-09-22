import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CamperPage } from "./components/pages/CamperPage";

export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/camperPage" element={<CamperPage />} />
        </Routes>
      </Router>
    </div>
  );
}