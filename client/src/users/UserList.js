/**
 * Admin's list of all users with edit/delete brewery option
 * access from admin dashboard
 * url: /users
 */

import React, { useState, useEffect } from "react";

import LoadingSpinner from "../common/LoadingSpinner";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import "../CSS/UserList.css";

const UserList = () => {
  const [users, setUsers] = useState();
  const { auth } = useAuth();
  const navigate = useNavigate();
  console.log("From UserList---------------------------------------------");
  console.log("auth::::::::::::::::::::::::::: ", auth);
  console.log("-------------------------------------------------------------");
  const END_POINT = `/users`;
  const TOKEN = auth.token;
  console.log("END_POINT:::::::::::::", END_POINT);

  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(END_POINT, config);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  console.log("Users:::::::::::::::::::------------------", users);

  return (
    <>
      <h3 className="UserList-title title mt-2">All users</h3>

      <div className="UserList-container container">
        {users ? (
          <ul className="list-group">
            {users.map((u) => (
              <Link className="UserList" to={`/users/${u.id}`}>
                <li
                  className="UserList-list-group-item list-group-item d-flex align-items-center"
                  key={u.id}
                  id={u.id}
                >
                  <div className="UserList-name ms-2 me-auto">
                    <div>
                      <b>{u.username}</b>/ {u.firstName} {u.lastName}
                    </div>
                  </div>
                </li>
              </Link>
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

export default UserList;
