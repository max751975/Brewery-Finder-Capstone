import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../CSS/UserPage.css";

const UserPage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <div className="UserPage-card card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src="./images/brewery-background_1.jpg"
              className="card-img"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Profile</h5>
              <ul className="UserPage-list-group list-group list-group-flush">
                <li className="list-group-item">
                  <b>First Name: </b>
                  {auth?.user?.first_name}
                </li>
                <li className="list-group-item">
                  <b>Last Name:</b> {auth?.user?.last_name}
                </li>
                <li className="list-group-item">
                  <b>E-mail:</b> {auth?.user?.email}
                </li>
                <li className="list-group-item">
                  <b>Location:</b> {auth?.user?.location}
                </li>
                <li className="list-group-item">
                  <b>{auth?.user?.is_admin ? "Admin" : ""}</b>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* <img
              src="./images/brewery-background_1.jpg"
              className="card-img"
              alt="..."
            /> */}
      {/* <h1>
        Welcome, {auth?.user?.first_name} {auth?.user?.last_name}{" "}
      </h1>
      <h2>That's the list of your favorite breweries</h2>
      <p>You are logged in with username: {auth?.user?.username}</p>
      <p>You are located at: {auth?.user?.location}</p> */}
      <div>
        <button
          className="btn btn-large btn-primary"
          onClick={() => navigate("/user/breweries")}
        >
          Breweries
        </button>
      </div>
    </>
  );
};

export default UserPage;
