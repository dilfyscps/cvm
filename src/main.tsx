import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Packs from "./packs";
import Requests from "./requests";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/packs" element={<Packs />} />
        <Route path="/requests" element={<Requests />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);