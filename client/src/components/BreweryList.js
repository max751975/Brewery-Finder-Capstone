import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import Brewery from "./Brewery";
import "../CSS/BreweryList.css";

const BreweryList = () => {
  const [data, setData] = useState(null);
  const { auth } = useAuth();
  console.log("auth: ", auth);
  const END_POINT = `/users/${auth?.user?.id}/breweries`;
  const TOKEN = auth.token;
  console.log(END_POINT);

  const body = JSON.stringify({ _token: auth.token });
  console.log(body);
  const headers = { Authorization: `Bearer ${auth.token}` };

  useEffect(() => {
    const response = axios
      .get(END_POINT)
      .then((res) => setData(res.data.breweries))
      .then((data) => console.log("data from axios:", data))
      .catch((error) => console.log(error));
  }, []);

  //   useEffect(() => console.log("data: ", data), [data]);

  return (
    <>
      <h2>Brewery List</h2>

      <div>
        {data ? (
          <ul className="list-group">
            {data.map((d) => (
              <>
                {/* <li>
                  {d.brewery_name} / {d.location}
                </li> */}
                <li className="list-group-item d-flex align-items-center">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{d.brewery_name}</div>
                    {d.location}
                  </div>
                  <button
                    onClick={() => alert(`You are editing ${d.brewery_name}`)}
                    className="badge bg-success rounded-pill"
                  >
                    edit
                  </button>
                  <button
                    onClick={() =>
                      alert(`You are trying to delete ${d.brewery_name}`)
                    }
                    className="badge bg-danger rounded-pill"
                  >
                    delete
                  </button>
                </li>
              </>
            ))}
          </ul>
        ) : (
          "Loading..."
        )}
      </div>
    </>
  );
};

export default BreweryList;
