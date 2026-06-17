import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Packs from "./packs";
import Gifs from "./Gifs";
import Requests from "./requests";
import FvgifyTerms from "./FvgifyTerms";
import PrivacyPolicy from "./PrivacyPolicy";
import Admin from "./admin";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/packs" element={<Packs />} />
        <Route path="/packs/:packId" element={<Packs />} />
        <Route path="/gifs" element={<Gifs />} />
        <Route path="/gifs/:packId" element={<Gifs />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/fvgify-terms-of-service" element={<FvgifyTerms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);