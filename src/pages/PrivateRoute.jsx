// PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase"; // Adjust the path to your Firebase config

const PrivateRoute = ({ element }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>; 
  }

  // If the user is not logged in, redirect to the Sign In page
  if (!user) {
    return <Navigate to="/signin" />;
  }

  return element; // If logged in, return the requested element
};

export default PrivateRoute;
