import React, { useRef, useState } from "react";
import { Button, Card, Container, Form, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/icons/Facebook-logo-light.png";
import { forgotAccount, signin } from "../../firebase/auth";
import AlertMessage from "../../components/AlertMessage";

const Header = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    document.body.style.cursor = "wait";
    try {
      await signin(email, password);
      setTimeout(() => {
        navigate("/");
      }, 200);
    } catch (error) {
      console.log(error.message);
    }
    document.body.style.cursor = "default";
  };

  return (
    <Navbar bg="white" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            alt=""
            src={logo}
            height="30"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll></Nav>
          <Form
            className="d-flex gap-2"
            style={{ minWidth: "580px", maxHeight: "80px" }}
            onSubmit={loginHandler}
          >
            <Form.Control
              type="email"
              placeholder="Email or phone"
              style={{ flex: "0 0 180px" }}
              value={email}
              onChange={(event) => SetEmail(event.target.value)}
            />
            <Form.Control
              type="password"
              placeholder="Password"
              style={{ flex: "0 0 180px" }}
              value={password}
              onChange={(event) => SetPassword(event.target.value)}
            />
            <Button
              variant="primary"
              style={{ flex: "0 0 80px" }}
              type="submit"
            >
              Log In
            </Button>
            <Link
              to={"/login/forgot-account"}
              style={{ marginTop: "5px", flex: "0 0 auto" }}
            >
              Forgot Account?
            </Link>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

const ForgotAccount = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const emailRef = useRef();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await forgotAccount(emailRef.current.value);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className="ForgotAccount">
        <Card
          className="rounded-3 shadow-sm"
          style={{
            width: "30rem",
            transform: "translate(0, -10vh)",
          }}
        >
          <Card.Body className="p-0">
            <Card.Title className="pt-3 ps-3">Find your account</Card.Title>
            <hr style={{ borderTop: "1px solid gray" }} />
            {!!error && (
              <AlertMessage
                variant={"danger"}
                message={error}
                style={{ margin: "10px 15px" }}
              />
            )}
            {success && (
              <AlertMessage
                variant={"success"}
                message={"Check your email to reset your password."}
                style={{ margin: "10px 15px" }}
              />
            )}
            <p className="px-4 pb-2">
              Please enter your email or mobile number to search for your
              account.
            </p>
            <Form className="mb-3" onSubmit={onSubmit}>
              <Form.Group className="px-3  mb-1">
                <Form.Control
                  style={{ padding: "12px 12px" }}
                  type="email"
                  placeholder="Email or Phone number"
                  ref={emailRef}
                  autoFocus
                />
              </Form.Group>
              <hr
                style={{ borderTop: "1px solid gray", marginBottom: "20px" }}
              />
              <div className="d-flex flex-row-reverse gap-2 px-3">
                <Button
                  type="submit"
                  variant="primary"
                  className="px-3 fw-bold"
                >
                  Search
                </Button>
                <Button
                  style={{
                    color: "#5b5b5b",
                    background: "lightgray",
                    border: "none",
                  }}
                  className="px-3 fw-bold"
                  onClick={() => navigate("/login")}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default ForgotAccount;
