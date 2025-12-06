import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import "./assets/css/flaticon.css";
import "./assets/css/linearicons.css";
import "./assets/css/magnific-popup.css";
import "./assets/css/nice-select.css";
import "./assets/css/slicknav.min.css";
import "./assets/css/style.css";
import "./assets/css/jquery-ui.min.css";
import "./assets/css/font-awesome.min.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
