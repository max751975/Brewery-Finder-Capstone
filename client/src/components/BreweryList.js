/**
 * List of user's breweries
 * url: /user/breweries
 *
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import Brewery from "./Brewery";
import "../CSS/BreweryList.css";
import LoadingSpinner from "../common/LoadingSpinner";

const BreweryList = () => {
  const [data, setData] = useState(null);
  const { auth } = useAuth();
  const navigate = useNavigate();
  console.log("From BreweryList---------------------------------------------");
  console.log("auth::::::::::::::::::::::::::: ", auth);
  console.log("-------------------------------------------------------------");
  const END_POINT = `/users/${auth?.user?.id}/breweries`;
  const TOKEN = auth.token;
  console.log(END_POINT);

  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(END_POINT, config);
        setData(response.data.breweries);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [auth.token]);

  console.log("Data:::::::::::::::::::------------------", data);

  // const handleEdit = (e) => {
  //   console.log("You are editing brewery");
  //   console.log(e);
  //   console.log(e.target.parentElement);
  //   console.log(e.target.parentElement.id);
  // };
  // const handleDelete = (e) => {
  //   console.log("You are deleting brewery");
  //   console.log(e);
  //   console.log(e.target.parentElement);
  //   console.log(e.target.parentElement.id);
  // };

  return (
    <>
      <h2 className="BreweryList-title title">Brewery List</h2>

      <div className="BreweryList-container">
        {data ? (
          <ul className="list-group">
            {data.map((d) => (
              <>
                {/* <li>
                  {d.brewery_name} / {d.location}
                </li> */}
                <li
                  className="BreweryList-list-group-item list-group-item d-flex align-items-center"
                  key={d.brewery_id}
                  id={d.brewery_id}
                >
                  <div className="BreweryList-name ms-2 me-auto">
                    <div
                      className="fw-bold"
                      onClick={() =>
                        navigate(`/brewery`, {
                          state: {
                            breweryId: d.brewery_id,
                            breweryName: d.brewery_name,
                            breweryLocation: d.location,
                          },
                        })
                      }
                    >
                      {d.brewery_name}
                    </div>
                    {d.location}
                  </div>
                  {/* <button
                    // onClick={() => alert(`You are editing ${d.brewery_name}`)}
                    onClick={handleEdit}
                    className="badge bg-success rounded-pill"
                  >
                    edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="badge bg-danger rounded-pill"
                  >
                    delete
                  </button> */}
                </li>
              </>
            ))}
          </ul>
        ) : (
          // "Loading..."
          <LoadingSpinner />
        )}
      </div>
    </>
  );
};

export default BreweryList;
