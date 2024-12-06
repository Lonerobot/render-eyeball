import React, { useState, useEffect } from "react";
import styled from "styled-components";

// LIBRARIES
import { auth, googleProvider } from "../config/firebase";
import {
  signInWithRedirect,
  signInWithPopup,
  signOut,
  getRedirectResult,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

// NOTIFY
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// COMPONENTS
import ImageComponent from "./ImageComponent";
import Eyeball from "../assets/eyeball.png";
import Logo from "../assets/Logo";
import { GoogleIcon } from "../assets/icons";
import { COLORS } from "../theme";

// STYLED COMPONENTS
const HeaderContainer = styled.div`
  display: flex;
  align-items: center; /* Vertically aligns the logo and text */
  gap: 12px;
  justify-content: space-between;
`;

const LayoutTop = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding-bottom: 16px;
  justify-content: space-between;

`;

const LayoutIntraDiv = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding-bottom: 16px;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-family: "Orbitron", sans-serif;
  font-size: 3.2em;
  line-height: 1.1;
  color: wheat;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center; /* Vertically aligns the logo and text */
  gap: 12px;
  /* padding: 16px; */
  border: none;
  /* border-radius: 10px; */
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  justify-content: space-between;
  background-color: ${COLORS.primary};
  color: ${COLORS.textPrimary};
  width: 220px;
  min-width: 200px;
  /* height : 40px; */
`;

const getFirstName = (displayName) => {
  if (!displayName) return ""; // Handle cases where displayName might be empty or null
  return displayName.split(" ")[0]; // Split and return the first part
};

const Header = ({ mode, setMode, onToggleDetails, showDetails }) => {
  const [user] = useAuthState(auth);

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    if (user) {
      document.body.style.backgroundColor = "#243f26"; // Logged-in background color
    } else {
      document.body.style.backgroundColor = "#242424";
    }

    // Clean up when the component unmounts
    return () => {
      document.body.style.backgroundColor = "#242424"; // Reset to default on unmount
    };
  }, [user]);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;
      const firstName = getFirstName(user.displayName);

      setCurrentUser(firstName);

      setMode("edit");

      toast(`🦄 Welcome ${firstName}!`, {
        style: {
          backgroundColor: COLORS.toastBackground,
          colorProgressDark : COLORS.toastProgress,
          color: COLORS.toastText,
        },
        progressStyle: { backgroundColor: COLORS.backgroundFree }, // Change the progress bar color
      });
    } catch (error) {
      console.error("Error signing in with Google:", error.message, error.code);
      alert(`Error signing in: ${error.code} ${error.message}`); // Optional: Show a user-friendly alert
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);

      toast(`👋 Cheerio ${currentUser} 💚`, {
        style: {
          backgroundColor: COLORS.toastBackground,
          colorProgressDark : green,
          color: COLORS.toastText,
        },
        progressStyle: { backgroundColor: COLORS.backgroundFree }, // Change the progress bar color
      });

      setMode("view");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleAuthClick = async () => {
    if (user) {
      await handleLogout();
    } else {
      await signInWithGoogle();
    }
  };

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

  return (
    <div>
      <HeaderContainer>
        <LayoutIntraDiv>
          <ImageComponent
            src={Eyeball}
            alt="Sample Image"
            width="100px"
            height="100px"
          />
          <Title>Render Eyeball</Title>
        </LayoutIntraDiv>
        <LayoutIntraDiv>
          <Logo color={"#dbd475"} size={180}></Logo>
        </LayoutIntraDiv>
      </HeaderContainer>

      <LayoutTop>



        <IconButton className={"ui"} onClick={handleAuthClick}>
          <GoogleIcon color={COLORS.backgroundFree} size={24}></GoogleIcon>
          {user ? "Logout" : "Login with Google"}
        </IconButton>

        {user && (
        <button onClick={onToggleDetails} className={"ui"}>
          {showDetails ? "Hide Details" : "Show Details"}
        </button>
           )}


      </LayoutTop>
    </div>
  );
};

export default Header;
