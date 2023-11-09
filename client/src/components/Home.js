import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    navigate("/login");
  };
  return (
    <>
      <h1 className="header mt-3">Welcome to Brewery Finder</h1>
      <div className="container mt-5">
        <Link to="/login">Login Page</Link>
        <br />
        <Link to="/register">Sign Up Page</Link>
        <div>
          <button className="btn btn-sm btn-info mt-3" onClick={logout}>
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
