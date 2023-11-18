import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import "../CSS/AdminDash.css";

const AdminDash = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className="AdminDash-container">
        <h1>Admin Dashboard</h1>
        <div className="AdminDash-card">
          <h2>Links</h2>
          <ul className="AdminDash-list-group list-group">
            <li className="list-group-item">
              <Link to="/users">Go to the Users page</Link>
            </li>
            <li className="list-group-item">
              <Link to="/breweries">Go to the Breweries page</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminDash;
