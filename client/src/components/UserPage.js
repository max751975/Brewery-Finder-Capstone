import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../CSS/UserPage.css";

const UserPage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img
              src="./images/brewery-background_1.jpg"
              className="card-img"
              alt="..."
            />
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">Profile</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  First Name: {auth?.user?.first_name}
                </li>
                <li className="list-group-item">
                  Last Name: {auth?.user?.last_name}
                </li>
                <li className="list-group-item">E-mail: {auth?.user?.email}</li>
                <li className="list-group-item">
                  Location: {auth?.user?.location}
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
          onClick={() => navigate("/breweries")}
        >
          Breweries
        </button>
      </div>
    </>
  );
};

export default UserPage;
