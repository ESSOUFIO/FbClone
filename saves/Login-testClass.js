import "./Login.css";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import logo from "../../assets/icons/Facebook-logo-light.png";

export default class Login extends Component {
  submit = (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <div className="Login">
        <div className="TitlesWrap">
          <div className="Title">
            <img src={logo} alt="" />
            <h2>Connect with friends and the world around you on Facebook.</h2>
          </div>
        </div>
        <div className="FormWrap">
          <div className="FormCard">
            <form onSubmit={this.submit}>
              <input
                type="text"
                placeholder="Username or phone number"
                autoFocus
              />
              <input type="password" placeholder="Password" />
              <button className="LoginBtn">Log In</button>
            </form>
            <a href="https://">Forgot password?</a>
            <hr style={{}} />
            <button className="RegisterBtn">Create new account</button>
          </div>
          <div className="FormWrapFooter">
            <a href="/#">Create a Page</a>
            <span> for a celebrity, brand or business.</span>
          </div>
        </div>
      </div>
    );
  }
}
