// components/Home.jsx
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase"; // Adjust the path to your Firebase config

import { db } from "../config/firebase";
import { collection, doc, updateDoc, onSnapshot } from "firebase/firestore";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

import Header from "../components/Header";
import TileGrid from "../components/TileGrid";
import KeyLabel from "../components/KeyLabel";
import ModifiedLabel from "../components/ModifiedLabel";

import {Logo, CubeIcon} from "../assets/icons";

import styled from "styled-components";

import { COLORS } from "../theme";

const AppDiv = styled.div`
text-align: left;
position: absolute;
top: 4%;
left: 10%;
right: 10%;
`;

const StyledH3 = styled.h3`
  color: ${COLORS.textPrimary};
 `;

const TitleH3 = styled.h3`
  color: ${COLORS.textPrimary};
  font-family: 'Orbitron', sans-serif;
  letter-spacing: 0.5em; /* Increases space between letters */

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
  background-color: ${COLORS.background};
  color:${COLORS.textPrimary};
`;

// const HomeContainer = styled.div`
//   display: flex;
//   align-items: center; /* Vertically aligns the logo and text */
//   flex-direction: column;
//   background-color: ${COLORS.background};
//   padding: 60px;
//   border: none;
//   border-radius: 10px;
// `;

const Home = () => {
  const [user] = useAuthState(auth); // Get user state from Firebase auth

  const [mode, setMode] = useState("view"); // 'view' or 'edit'
  const [computers, setComputers] = useState([]);

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

  // Set all computers to "occupied"
  const setAllToOccupied = async () => {
    try {
      const batch = computers.map(async (computer) => {
        const docRef = doc(db, "computers", computer.id);
        await updateDoc(docRef, { status: "occupied" });
      });
      await Promise.all(batch);
      console.log("All computers set to occupied");
    } catch (error) {
      console.error("Error setting all to occupied:", error);
    }
  };

  // Set all computers to "free"
  const setAllToFree = async () => {
    try {
      const batch = computers.map(async (computer) => {
        const docRef = doc(db, "computers", computer.id);
        await updateDoc(docRef, { status: "free" });
      });
      await Promise.all(batch);
      console.log("All computers set to free");
    } catch (error) {
      console.error("Error setting all to free:", error);
    }
  };

  const [showDetails, setShowDetails] = useState(false); // State to control showing details

  const handleToggleDetails = () => {
    setShowDetails((prev) => !prev); // Toggle the state
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {

        toast('You have been signed out.', {
          style: { backgroundColor: COLORS.backgroundfree, color: COLORS.background ,  fontFamily: 'Roboto' , fontStyle: 'bold'},
          progressStyle: { backgroundColor: '#de4a0b' },
        });


      })
      .catch((error) => {
        console.error("Error signing out: ", error);
        toast.error("Error signing out."); // Error toast
      });
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (

      // <div className="App">
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
          {mode === "edit" && (
            <button className="view action" onClick={() => setAllToOccupied()}>
              Set All Occupied
            </button>
          )}
          <ModifiedLabel />
          <KeyLabel />
        </div>
        <StyledH3>Logged in as {user.displayName}</StyledH3>
      <IconButton onClick={handleLogout}>Log out</IconButton>


      </AppDiv>













  );
};

export default Home;
