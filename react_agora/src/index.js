import React from "react";
import ReactDOM from "react-dom/client";
import "./css/style.css";
import App from "./components/App.js";

const rootNode = document.getElementById("root");

ReactDOM.createRoot(rootNode).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
