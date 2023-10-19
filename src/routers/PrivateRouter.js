/* eslint-disable react/prop-types */
import React from "react";
// import PropTypes from 'prop-types'
import { Navigate, Outlet } from "react-router";

const PrivateRouters = () => {
  try {
    let isAuthenticated = JSON.parse(localStorage.getItem("user"));
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  } catch (error) {
    console.log(error.message);
    return <Navigate to="/error" />;
  }
};

export default PrivateRouters;
