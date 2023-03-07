import "./Login.css";
import React, { useState } from "react";
import logo from "../../assets/icons/Facebook-logo-light.png";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../../context/GlobalProvider";
import Signup from "./Signup";
import { signin } from "../../firebase/auth";
import AlertMessage from "../../components/AlertMessage";
import { Form, Card, Button } from "react-bootstrap";
import protectAfterLogin from "../../utils/protectAfterLogin";

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
  console.log("login");
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

export default protectAfterLogin(Login);
