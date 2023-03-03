import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import UIProvider from "./context/UIProvider";
import UserProvider from "./context/UserProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
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
