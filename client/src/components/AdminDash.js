import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

const AdminDash = () => {
  const { auth } = useAuth();

  return (
    <>
      <h1>Admin Dashboard</h1>
    </>
  );
};

export default AdminDash;
