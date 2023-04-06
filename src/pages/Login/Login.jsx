import "./Login.css";
import React, { useState } from "react";
import logo from "../../assets/icons/Facebook-logo-light.png";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../../context/GlobalProvider";
import Signup from "./Signup";
import { signin } from "../../firebase/auth";
import AlertMessage from "../../components/Alerts/AlertMessage";
import { Form, Card, Button } from "react-bootstrap";
import protectAfterLogin from "../../utils/protectAfterLogin";
import { useMediaQuery } from "react-responsive";

const TitlesWrap = ({ isDesktopMedium, isMobile }) => {
  return (
    <div
      className="TitlesWrap"
      style={{ textAlign: `${isDesktopMedium ? "left" : "center"}` }}
    >
      <div className="Title">
        <img
          src={logo}
          alt=""
          style={{
            height: `${isDesktopMedium ? "55px" : isMobile ? "45px" : "35px"}`,
          }}
        />
        {isMobile && (
          <h2 style={{ fontSize: `${isDesktopMedium ? "28px" : "22px"}` }}>
            Connect with friends and the world around you on Facebook.
          </h2>
        )}
      </div>
    </div>
  );
};

const FormCard = () => {
  const [email, SetEmail] = useState("omar.essoufi@gmail.com");
  const [password, SetPassword] = useState("111222");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { showModalSignup } = useGlobalState();
  const loginHandler = async (e) => {
    e.preventDefault();
    setError("");
    document.body.style.cursor = "wait";
    try {
      await signin(email, password);
      setTimeout(() => {
        navigate("/");
      }, 200);
    } catch (error) {
      setError(error.message);
    }
    document.body.style.cursor = "default";
  };

  return (
    <>
      <Card className="FormCard">
        <Card.Body>
          <Form onSubmit={loginHandler}>
            {!!error && <AlertMessage variant={"danger"} message={error} />}
            <Form.Group className="mb-1">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => SetEmail(event.target.value)}
                autoFocus
                style={{ height: "50px" }}
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Control
                type="password"
                value={password}
                onChange={(event) => SetPassword(event.target.value)}
                placeholder="Password"
                style={{ height: "50px" }}
              />
            </Form.Group>
            <Button className="LoginBtn" type="submit" variant="primary">
              Log In
            </Button>
          </Form>
          <div className="text-center">
            <Link to="/login/forgot-account">Forgot Account?</Link>
          </div>
          <hr />
          <div className="text-center">
            <Button className="RegisterBtn" onClick={showModalSignup}>
              Create new account
            </Button>
          </div>
        </Card.Body>
      </Card>
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

const Login = () => {
  const isDesktopMedium = useMediaQuery({ query: "(min-width: 1000px)" });
  const isMobile = useMediaQuery({ query: "(min-width: 550px)" });
  return (
    <div
      className="Login"
      style={{
        flexDirection: `${isDesktopMedium ? "row" : "column"}`,
        justifyContent: `${isDesktopMedium ? "space-evenly" : ""}`,
      }}
    >
      <TitlesWrap isDesktopMedium={isDesktopMedium} isMobile={isMobile} />
      <div
        className="FormWrap"
        style={{
          maxWidth: `${isMobile ? "400px" : "100%"}`,
          alignItems: `center`,
        }}
      >
        <FormCard />
        <FormWrapFooter />
      </div>
    </div>
  );
};

export default protectAfterLogin(Login);
