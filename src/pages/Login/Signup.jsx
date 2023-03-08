import React, { useRef, useState } from "react";
import { Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useGlobalState } from "../../context/GlobalProvider";
import { RiCloseFill } from "react-icons/ri";
import { IoMdHelpCircle } from "react-icons/io";
import "./Signup.css";
import { signup } from "../../firebase/auth";

const Header = ({ closeModal }) => {
  return (
    <header className="position-relative">
      <div className="p-3 pb-0">
        <h3 className="m-0">Sign Up</h3>
        <div className="subTitleModal">It’s quick and easy.</div>
      </div>
      <div
        className="position-absolute top-0 end-0 p-2 cursor-pointer"
        style={{ color: "#737373", cursor: "pointer" }}
        onClick={closeModal}
      >
        <RiCloseFill className="fs-3" />
      </div>
      <hr className="my-2" />
    </header>
  );
};

const Signup = () => {
  const { modalSignup, hideModalSignup } = useGlobalState();
  const maleRef = useRef();
  const femaleRef = useRef();
  const [newUser, setNewUser] = useState(null);

  const formHandler = ({ target }) => {
    if (target.id === "male") {
      setNewUser({
        ...newUser,
        male: !!target.value,
        female: !target.value,
      });
    } else if (target.id === "female") {
      setNewUser({
        ...newUser,
        male: !target.value,
        female: !!target.value,
      });
    } else {
      setNewUser({
        ...newUser,
        [target.id]: target.value,
      });
    }
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    const username = newUser.firstName + " " + newUser.lastName;
    const email = newUser.email;
    const pass = newUser.password;

    try {
      await signup({ username, email, pass, newUser });
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <>
      <Modal show={modalSignup} onHide={hideModalSignup}>
        <Header closeModal={hideModalSignup} />
        <Modal.Body>
          <Form onSubmit={signupHandler}>
            <Row>
              <Form.Group className="col mb-3" controlId="firstName">
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  onChange={formHandler}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="col" controlId="lastName">
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  onChange={formHandler}
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="email">
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={formHandler}
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="password">
              <Form.Control
                type="password"
                placeholder="New Password"
                onChange={formHandler}
              />
            </Form.Group>

            {/* Birthday */}
            <div style={{ fontSize: "12px", marginBottom: "2px" }}>
              Birthday{" "}
              <span
                style={{
                  fontSize: "14px",
                  color: "#737373",
                  cursor: "pointer",
                }}
              >
                <IoMdHelpCircle />
              </span>
            </div>
            <Row>
              <Form.Group
                className="col mb-2"
                controlId="day"
                onChange={formHandler}
              >
                <Form.Select>
                  <option>Day</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                  <option value="13">13</option>
                  <option value="14">14</option>
                  <option value="15">15</option>
                  <option value="16">16</option>
                  <option value="17">17</option>
                  <option value="18">18</option>
                  <option value="19">19</option>
                  <option value="20">20</option>
                  <option value="21">21</option>
                  <option value="22">22</option>
                  <option value="23">23</option>
                  <option value="24">24</option>
                  <option value="25">25</option>
                  <option value="26">26</option>
                  <option value="27">27</option>
                  <option value="28">28</option>
                  <option value="29">29</option>
                  <option value="30">30</option>
                  <option value="31">31</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="col mb-2"
                controlId="month"
                onChange={formHandler}
              >
                <Form.Select>
                  <option>Month</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="col mb-2"
                controlId="year"
                onChange={formHandler}
              >
                <Form.Select>
                  <option>Year</option>
                  <option value="1940">1940</option>
                  <option value="1941">1941</option>
                  <option value="1942">1942</option>
                  <option value="1943">1943</option>
                  <option value="1944">1944</option>
                  <option value="1945">1945</option>
                  <option value="1946">1946</option>
                  <option value="1947">1947</option>
                  <option value="1948">1948</option>
                  <option value="1949">1949</option>
                  <option value="1950">1950</option>
                  <option value="1951">1951</option>
                  <option value="1952">1952</option>
                  <option value="1953">1953</option>
                  <option value="1954">1954</option>
                  <option value="1955">1955</option>
                  <option value="1956">1956</option>
                  <option value="1957">1957</option>
                  <option value="1958">1958</option>
                  <option value="1959">1959</option>
                  <option value="1960">1960</option>
                  <option value="1961">1961</option>
                  <option value="1962">1962</option>
                  <option value="1963">1963</option>
                  <option value="1964">1964</option>
                  <option value="1965">1965</option>
                  <option value="1966">1966</option>
                  <option value="1967">1967</option>
                  <option value="1968">1968</option>
                  <option value="1969">1969</option>
                  <option value="1970">1970</option>
                  <option value="1971">1971</option>
                  <option value="1972">1972</option>
                  <option value="1973">1973</option>
                  <option value="1974">1974</option>
                  <option value="1975">1975</option>
                  <option value="1976">1976</option>
                  <option value="1977">1977</option>
                  <option value="1978">1978</option>
                  <option value="1979">1979</option>
                  <option value="1980">1980</option>
                  <option value="1981">1981</option>
                  <option value="1982">1982</option>
                  <option value="1983">1983</option>
                  <option value="1984">1984</option>
                  <option value="1985">1985</option>
                  <option value="1986">1986</option>
                  <option value="1987">1987</option>
                  <option value="1988">1988</option>
                  <option value="1989">1989</option>
                  <option value="1990">1990</option>
                  <option value="1991">1991</option>
                  <option value="1992">1992</option>
                  <option value="1993">1993</option>
                  <option value="1994">1994</option>
                  <option value="1995">1995</option>
                  <option value="1996">1996</option>
                  <option value="1997">1997</option>
                  <option value="1998">1998</option>
                  <option value="1999">1999</option>
                  <option value="2000">2000</option>
                  <option value="2001">2001</option>
                  <option value="2002">2002</option>
                  <option value="2003">2003</option>
                  <option value="2004">2004</option>
                  <option value="2005">2005</option>
                  <option value="2006">2006</option>
                  <option value="2007">2007</option>
                  <option value="2008">2008</option>
                  <option value="2009">2009</option>
                  <option value="2010">2010</option>
                  <option value="2011">2011</option>
                  <option value="2012">2012</option>
                  <option value="2013">2013</option>
                  <option value="2014">2014</option>
                  <option value="2015">2015</option>
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </Form.Select>
              </Form.Group>
            </Row>

            {/* Gender */}
            <div
              style={{
                fontSize: "12px",
                marginBottom: "2px",
                paddingLeft: "2px",
              }}
            >
              Gender{" "}
              <span
                style={{
                  fontSize: "14px",
                  color: "#737373",
                  cursor: "pointer",
                }}
              >
                <IoMdHelpCircle />
              </span>
            </div>
            <Row className="mb-3 px-3 gap-4">
              <Form.Group
                className="col border rounded p-2 d-flex justify-content-between"
                style={{ cursor: "pointer" }}
                onClick={() => femaleRef.current.click()}
              >
                <div className="px-2">Female</div>
                <div className="text-end px-1">
                  <input
                    name="gender"
                    type="radio"
                    id="female"
                    className="form-radio-input"
                    ref={femaleRef}
                    onChange={formHandler}
                  />
                </div>
              </Form.Group>

              <Form.Group
                className="col border rounded p-2 d-flex justify-content-between"
                style={{ cursor: "pointer" }}
                onClick={() => maleRef.current.click()}
              >
                <div className="px-2">Male</div>
                <div className="text-end px-1">
                  <input
                    name="gender"
                    type="radio"
                    id="male"
                    className="form-radio-input"
                    ref={maleRef}
                    onChange={formHandler}
                  />
                </div>
              </Form.Group>

              <Form.Group className="col border rounded p-2 d-flex justify-content-between">
                <div className="px-2" style={{ display: "inline-block" }}>
                  Custom
                </div>
                <div className="text-end px-1">
                  <input
                    name="gender"
                    type="radio"
                    className="form-radio-input"
                    disabled
                  />
                </div>
              </Form.Group>
            </Row>

            {/* Text footer */}

            <div style={{ fontSize: "11px" }}>
              People who use our service may have uploaded your contact
              information to Facebook.
              <a href="/#"> Learn more</a>.
            </div>
            <div className="my-2" style={{ fontSize: "11px" }}>
              <p>
                By clicking Sign Up, you agree to our
                <a href="/#"> Terms</a>, <a href="/#"> Privacy Policy </a> and{" "}
                <a href="/#"> Cookies Policy</a>. You may receive SMS
                Notifications from us and can opt out any time.
              </p>
            </div>

            <div className="text-center mt-4 mb-2">
              <Button
                className="btnSignup"
                variant="primary"
                type="submit"
                onClick={hideModalSignup}
              >
                Sign Up
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Signup;
