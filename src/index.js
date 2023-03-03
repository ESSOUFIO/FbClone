import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UIProvider from "./context/UIProvider";
import UserProvider from "./context/UserProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <UIProvider>
      <App />
    </UIProvider>
  </UserProvider>
);
