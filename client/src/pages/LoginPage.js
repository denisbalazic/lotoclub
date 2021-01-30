import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { authService } from "../service/auth";

const LoginPage = ({ setIsLogged }) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await authService.login(user);
    if (res.success) {
      setShouldRedirect(true);
      setIsLogged(true);
    } else {
      setError(res.error.message);
      setUser({ username: "", password: "" });
    }
  };

  if (shouldRedirect) {
    return <Redirect to="/combinations" />;
  } else {
    return (
      <main>
        <i className="fas fa-dice-d20"></i>
        <form id="form" action="" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter username"
              value={user.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              value={user.password}
              onChange={handleChange}
            />
            <small>{error}</small>
          </div>
          <button id="submit-btn">Submit</button>
        </form>
        <i className="fas fa-hand-holding-usd"></i>
        <i className="fas fa-handshake"></i>
      </main>
    );
  }
};

export default LoginPage;
