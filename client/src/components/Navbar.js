import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          <img
            src="./images/beer_logo.svg"
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block me-1"
          />
          Brewery Finder
        </NavLink>

        {auth.user ? (
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <NavLink to="/user" className="nav-link">
                Welcome {auth?.user?.first_name}!
              </NavLink>
            </li>
            <li className="nav-item">
              {auth.user.is_admin ? (
                <NavLink to="/admin" className="nav-link">
                  Admin Dashboard
                </NavLink>
              ) : (
                <NavLink to="/breweries" className="nav-link">
                  Breweries
                </NavLink>
              )}
            </li>
            <li>
              <NavLink
                to="/"
                onClick={() => {
                  setAuth({});
                  navigate("/");
                }}
                className="nav-link"
              >
                Logout
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/register" className="nav-link">
                SignUp
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;