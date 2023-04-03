import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import GlobalProvider from "./context/GlobalProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import ForgotAccount from "./pages/Login/ForgotAccount";
import Saved from "./pages/Saved/Saved";
import RootLayout from "./pages/RootLayout";
import Profile from "./pages/Profile/Profile";
import Bookmarks from "./pages/Bookmarks/Bookmarks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "saved",
        element: <Saved />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "bookmarks",
        element: <Bookmarks />,
      },
    ],
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
  <GlobalProvider>
    <RouterProvider router={router} />
  </GlobalProvider>
);
