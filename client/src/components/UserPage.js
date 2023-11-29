import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../CSS/UserPage.css";
// import axios from "../api/axios";
import axios from "axios";

const UserPage = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  const findBreweries = async (location) => {
    alert(`Looking for breweries around ${location}`);
    try {
      const response = await axios.get(
        "https://api.openbrewerydb.org/v1/breweries?by_postal=44107&per_page=3"
      );
      setData(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="UserPage-card card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src="./images/brewery-background_1.jpg"
              className="card-img"
              alt="brewery-background"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              {/* <h5 className="card-title">Profile</h5>
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
              </ul> */}
              <div>
                <button
                  className="btn btn-large btn-primary"
                  onClick={() => navigate(`/users/${auth?.user?.id}/breweries`)}
                >
                  Your Breweries
                </button>
                {/* <button
                  className="btn btn-large btn-success ms-2"
                  onClick={(e) => findBreweries(auth?.user?.location)}
                >
                  Find Breweries
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
