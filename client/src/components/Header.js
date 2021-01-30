import React from "react";
import { Link } from "react-router-dom";

const Header = ({ isLogged, setNavigationOn }) => {
  return (
    <header>
      <div id="logo">
        <Link to="/">Lotoklub#1</Link>
      </div>
      {!isLogged ? (
        <div id="menu">
          <ul>
            <Link to="/login">
              <i className="fas fa-user-ninja"></i>
            </Link>
            <Link to="/register">
              <i className="fas fa-user-plus"></i>
            </Link>
          </ul>
        </div>
      ) : (
        <div id="menu">
          <ul>
            <li onClick={() => setNavigationOn(true)}>
              <i className="fas fa-bars"></i>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
