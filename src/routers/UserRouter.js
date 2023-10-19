import React from "react";
import { Navigate, Outlet } from "react-router";

const UserRouters = (role) => {
  let isAuthenticated = JSON.parse(localStorage.getItem("user"));
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default UserRouters;
