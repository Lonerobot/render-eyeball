// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./pages/PrivateRoute"; // Import the PrivateRoute

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { db } from "./config/firebase";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";

import styled from "styled-components";

import { COLORS } from "./theme";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppDiv = styled.div`
  text-align: left;
  position: absolute;
  top: 4%;
  left: 10%;
  right: 10%;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center; /* Vertically aligns the logo and text */
  gap: 12px;
  padding: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  width: 300px;
  justify-content: space-evenly;
  background-color: ${COLORS.primary};
  color: ${COLORS.textPrimary};
  width: 220px;
  height: 40px;
`;

const App = () => {
  const [mode, setMode] = useState("view"); // 'view' or 'edit'
  const [computers, setComputers] = useState([]);
  const [showDetails, setShowDetails] = useState(false); // State to control showing details
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    // Subscribe to the 'computers' collection
    const unsubscribe = onSnapshot(collection(db, "computers"), (snapshot) => {
      const computersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComputers(computersData);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "free" ? "occupied" : "free"; // Toggle status
      const docRef = doc(db, "computers", id); // Replace 'computers' with your collection name
      await updateDoc(docRef, { status: newStatus }); // Update Firestore with the new status
      console.log("Status updated to:", newStatus);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleToggleDetails = () => {
    setShowDetails((prev) => !prev); // Toggle the state
  };

  return (

      <div className="App">
        <ToastContainer 
        position="top-right" 
        autoClose={2000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false}        
        draggable 
        theme="dark" 
      />
        <AppDiv>
          <div>
            <Header
              mode={mode}
              setMode={setMode}
              onToggleDetails={handleToggleDetails}
              showDetails={showDetails}
            />

            <TileGrid
              computers={computers}
              mode={mode}
              toggleStatus={toggleStatus}
              showDetails={showDetails}
            />
          </div>
          <div className="div-layout-bottom">
            <ModifiedLabel />
            <KeyLabel />
          </div>
        </AppDiv>
      </div>

  );
}

export default App;
