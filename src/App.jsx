// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./pages/PrivateRoute"; // Import the PrivateRoute

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer 
        position="top-center" 
        autoClose={2000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false}        
        draggable 
        theme="dark" 
      />
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        
        {/* Protect the Home route with PrivateRoute */}
        <Route 
          path="/" 
          element={
            <PrivateRoute element={<Home />} /> 
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
