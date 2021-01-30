import React, { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { authService } from "../service/auth";

const Navbar = ({ visibility, setNavigationOn, setIsLogged }) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    authService.logout();
    setIsLogged(false);
    setShouldRedirect(true);
  };

  if (shouldRedirect) {
    return <Redirect to="/" />;
  } else {
    return (
      <nav className={visibility ? "" : "hidden"}>
        <i onClick={() => setNavigationOn(false)} className="fas fa-times"></i>
        <ul>
          <li>
            <NavLink to="/mycombinations">MyCombinations</NavLink>
          </li>
          <li>
            <NavLink to="/combinations">Combinations</NavLink>
          </li>
          <li>
            <NavLink to="/table">Table</NavLink>
          </li>
          <li>
            <NavLink to="/">Statistics</NavLink>
          </li>
          <li>
            <NavLink to="/">History</NavLink>
          </li>
          <li>
            <NavLink to="/">Blog</NavLink>
          </li>
          <li>
            <NavLink to="/admin">Admin</NavLink>
          </li>
          <li>
            <a href="/" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    );
  }
};

export default Navbar;
