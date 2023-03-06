import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import UIProvider from "./context/UIProvider";
import UserProvider from "./context/UserProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages";
import Home from "./pages/Home/Home";
import ForgotAccount from "./pages/Login/ForgotAccount";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/login/forgot-account",
    element: <ForgotAccount />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserProvider>
    <UIProvider>
      <RouterProvider router={router} />
    </UIProvider>
  </UserProvider>
);
