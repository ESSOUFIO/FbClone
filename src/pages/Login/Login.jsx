import "./Login.css";
import React, { useEffect, useState } from "react";
import logo from "../../assets/icons/Facebook-logo-light.png";
import { useNavigate } from "react-router-dom";
import { useGlobalUI } from "../../context/UIProvider";
import Signup from "./Signup";
import { useSession } from "../../context/UserProvider";

const TitlesWrap = () => {
  return (
    <div className="TitlesWrap">
      <div className="Title">
        <img src={logo} alt="" />
        <h2>Connect with friends and the world around you on Facebook.</h2>
      </div>
    </div>
  );
};

const FormCard = (props) => {
  const navigate = useNavigate();
  const [userName, SetUserName] = useState("");
  const [password, SetPassword] = useState("");

  const { showModalSignup } = useGlobalUI();
  const loginHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="FormCard">
        <form onSubmit={loginHandler}>
          <input
            type="text"
            value={userName}
            onChange={(event) => SetUserName(event.target.value)}
            placeholder="Username or phone number"
            autoFocus
          />
          <input
            type="password"
            value={password}
            onChange={(event) => SetPassword(event.target.value)}
            placeholder="Password"
          />
          <button type="submit" className="LoginBtn">
            Log In
          </button>
        </form>
        <a href="https://">Forgot password?</a>
        <hr style={{}} />
        <button className="RegisterBtn" onClick={showModalSignup}>
          Create new account
        </button>
      </div>
      <Signup />
    </>
  );
};

const FormWrapFooter = () => {
  return (
    <div className="FormWrapFooter">
      <a href="/#">Create a Page</a>
      <span> for a celebrity, brand or business.</span>
    </div>
  );
};

export const Login = () => {
  const navigate = useNavigate();
  const { user } = useSession();
  console.log("from Login: ", user);

  if (user) navigate("/home");
  return (
    <div className="Login">
      <TitlesWrap />
      <div className="FormWrap">
        <FormCard />
        <FormWrapFooter />
      </div>
    </div>
  );
};
