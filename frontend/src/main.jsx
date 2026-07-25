import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./styles.css";

import { ElectionProvider } from "./context/ElectionContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ElectionProvider>
        <App />
      </ElectionProvider>
    </BrowserRouter>
  </React.StrictMode>
);