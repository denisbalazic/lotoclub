/**
 * TODO: Handle successful registartion with message
 * TODO: Handle server errors and connection errors with message
 * TODO: Create helper module for validating form inputs
 */
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { authService } from "../service/auth";

function checkEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(email).toLowerCase())) {
    return true;
  } else {
    return false;
  }
}

const RegisterPage = () => {
  const [fields, setFields] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    passcode: "",
  });
  const [errors, setErrors] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validate = () => {
    const { username, email, password, password2, passcode } = fields;
    const errors = {};
    if (username.length > 16) errors["username"] = "Username should have less then 16 characters";
    if (username.length < 3) errors["username"] = "Username should have at least 3 characters";
    if (username === "") errors["username"] = "Username is required";
    if (!checkEmail(email)) errors["email"] = "Email is not valid";
    if (email === "") errors["email"] = "Email is required";
    if (password.length < 6) errors["password"] = "Password should have at least 6 characters";
    if (password === "") errors["password"] = "Password is required";
    if (password !== password2) errors["password2"] = "Passwords do not match";
    if (password2 === "") errors["password2"] = "Password confirmation is required";
    if (passcode === "") errors["passcode"] = "Passcode is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const setResponseErrors = (msg) => {
    const errors = {};
    const field = msg.split(":")[0];
    if (field === "email") errors["email"] = "There is user with this email";
    if (field === "username") errors["username"] = "Username is taken";
    if (field === "passcode") errors["passcode"] = "Passcode is incorect";
    setErrors(errors);
  };

  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidated = validate();
    if (isValidated) {
      const res = await authService.register({
        username: fields.username,
        password: fields.password,
        email: fields.email,
        passcode: fields.passcode,
      });
      if (res.success) {
        //TODO: handle successful registration with message
        setShouldRedirect(true);
      } else {
        setResponseErrors(res.error.message);
      }
    }
  };

  const { username, email, password, password2, passcode } = fields;
  if (shouldRedirect) {
    return <Redirect to="/combinations" />;
  } else {
    return (
      <main>
        <i className="fas fa-dice-d20"></i>
        <form id="form" action="">
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter username"
              value={username}
              onChange={handleChange}
            />
            <div className="error-msg">{errors.username}</div>
          </div>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={handleChange}
            />
            <div className="error-msg">{errors.email}</div>
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={handleChange}
            />
            <div className="error-msg">{errors.password}</div>
          </div>
          <div className="form-control">
            <label htmlFor="password2">Confirm password</label>
            <input
              id="password2"
              type="password"
              name="password2"
              placeholder="Repeat password"
              value={password2}
              onChange={handleChange}
            />
            <div className="error-msg">{errors.password2}</div>
          </div>
          <div className="form-control">
            <label htmlFor="passcode">Passcode</label>
            <input
              id="passcode"
              type="text"
              name="passcode"
              placeholder="Enter passcode"
              value={passcode}
              onChange={handleChange}
            />
            <div className="error-msg">{errors.passcode}</div>
          </div>
          <button id="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </form>
        <i className="fas fa-hand-holding-usd"></i>
        <i className="fas fa-handshake"></i>
      </main>
    );
  }
};

export default RegisterPage;
