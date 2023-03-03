import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Home, Login } from "./pages";
import { useState } from "react";

function App() {
  let firstPage = <Login />;

  const token = localStorage.getItem("token");

  if (token != null) {
    firstPage = <Home />;
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={firstPage} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

// TODO: scroll bars
// TODO: make the stories buttons work
// TODO: Responsive
