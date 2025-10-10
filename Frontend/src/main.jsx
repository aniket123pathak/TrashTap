import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import HomePage from "./landing_page/Home/HomePage";
import LoginPage from "./landing_page/Login/LoginPage";
import SignupPage from "./landing_page/Signup/SignupPage";
import CitizenPage from "./landing_page/CitizenInterface/CitizenPage";

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/citizen" element={<CitizenPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
