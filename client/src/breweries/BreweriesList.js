/**
 * Admin's list of all breweries with edit/delete brewery option
 * access from admin dashboard
 * url: /breweries
 */

import React, { useState, useEffect } from "react";
import BreweryCard from "./BreweryCard";
import LoadingSpinner from "../common/LoadingSpinner";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const BrweriesList = () => {
  const [breweries, setBreweries] = useState();
  const { auth } = useAuth();
  const navigate = useNavigate();
  console.log(
    "From BreweriesList---------------------------------------------"
  );
  console.log("auth::::::::::::::::::::::::::: ", auth);
  console.log("-------------------------------------------------------------");
  const END_POINT = `/breweries`;
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
        setBreweries(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log("Breweries:::::::::::::::::::------------------", breweries);

  const handleEdit = (e) => {
    console.log("You are editing brewery");
    console.log(e);
    console.log(e.target.parentElement);
    console.log(e.target.parentElement.id);
  };
  const handleDelete = (e) => {
    console.log("You are deleting brewery");
    console.log(e);
    console.log(e.target.parentElement);
    console.log(e.target.parentElement.id);
  };

  //   return (
  //     <div className="BreweriesList col-md-8 offset-md-2">
  //       <h1>Breweries List</h1>
  //       <div className="BreweriesList-list">
  //         {breweries.map((b) => (
  //           <BreweryCard
  //             key={b.id}
  //             breweryId={b.id}
  //             name={b.name}
  //             location={b.location}
  //           />
  //         ))}
  //       </div>
  //     </div>
  //   );
  return (
    <>
      <h3 className="BreweryList-title title mt-2">All breweries</h3>

      <div className="BreweryList-container">
        {breweries ? (
          <ul className="list-group">
            {breweries.map((b) => (
              <>
                <li
                  className="BreweryList-list-group-item list-group-item d-flex align-items-center"
                  key={b.id}
                  id={b.id}
                >
                  <div className="BreweryList-name ms-2 me-auto">
                    <div
                      className="fw-bold"
                      onClick={() =>
                        navigate(`/brewery`, {
                          state: {
                            breweryId: b.id,
                            breweryName: b.name,
                            breweryLocation: b.location,
                          },
                        })
                      }
                    >
                      {b.name}
                    </div>
                    {b.location}
                  </div>
                  <button
                    // onClick={() => alert(`You are editing ${b.brewery_name}`)}
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
                  </button>
                </li>
              </>
            ))}
          </ul>
        ) : (
          //   "Loading..."
          <LoadingSpinner />
        )}
      </div>
    </>
  );
};

export default BrweriesList;
