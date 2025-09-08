import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utils/auth";

const ProtectedRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // If no token → go to login (which is "/")
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // If token expired → clear and go login
  if (isTokenExpired()) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return <Navigate to="/" replace />;
  }

  // If role mismatch
  if (roleRequired && role !== roleRequired) {
    return <Navigate to="/" replace />;
  }

  // Else allow access
  return children;
};

export default ProtectedRoute;
