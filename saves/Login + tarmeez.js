import "./Login.css";
import React, { useEffect, useState } from "react";
import logo from "../../assets/icons/Facebook-logo-light.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//* ========= LoginBtnClicked ======== //
function LoginBtnClicked(Username, Password) {
  const BaseURL = "https://tarmeezacademy.com/api/v1";
  const url = BaseURL + "/users";
  const Param = {
    username: Username,
    password: Password,
  };

  axios
    .get(url)
    .then((element) => {
      console.log("ok");
    })
    .catch((error) => {
      console.log(error.response.data.message);
    })
    .then();
}
//* ========= LoginBtnClicked ======== //

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
  const [userName, SetUserName] = useState("OMARES");
  const [password, SetPassword] = useState("123456");

  const Submit = (e) => {
    e.preventDefault();

    navigate("/home");
  };

  return (
    <div className="FormCard">
      <form onSubmit={Submit}>
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
      <button className="RegisterBtn">Create new account</button>
    </div>
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
  const [data, setData] = useState(null);

  let url = `https://tarmeezacademy.com/api/v1/login`;

  useEffect(() => {
    axios
      .post(url, {
        username: "OMARES",
        password: "123456",
      })
      .then(setData)
      .then(() => {
        console.log("ok");
      });
  }, []);
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
