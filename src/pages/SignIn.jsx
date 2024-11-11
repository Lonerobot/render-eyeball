import { useEffect, useState } from "react";

import React from "react";
import "../App.css";

import { Navigate, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GoogleIcon ,CubeIcon, Logo} from "../assets/icons";

import styled from "styled-components";

import { COLORS } from "../theme";

const StyledH3 = styled.h3`
  color: ${(props) => props.textcolor || COLORS.textPrimary};
`;

const TitleH3 = styled.h3`
  color: ${(props) => props.textcolor || COLORS.textPrimary};
  font-family: "Orbitron", sans-serif;
  letter-spacing: 0.5em; /* Increases space between letters */
`;

const SignInContainer = styled.div`
  display: flex;
  align-items: center; /* Vertically aligns the logo and text */
  flex-direction: column;
  background-color: ${COLORS.background};
  padding: 60px;
  gap: 12px;
  border: none;
  border-radius: 10px;
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
  color: ${COLORS.textPrimary};
`;

const getFirstName = (displayName) => {
  if (!displayName) return ""; // Handle cases where displayName might be empty or null
  return displayName.split(" ")[0]; // Split and return the first part
};

function SignIn() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate(); // Initialize navigate

  // If user is authenticated, redirect to home page
  useEffect(() => {
    if (user) {
      navigate("/"); // Redirect to the home page
    }
  }, [user, navigate]);

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const user = result.user;
      const firstName = getFirstName(user.displayName);

      toast(`🦄 Welcome ${firstName}!`, {
        style: {
          backgroundColor: COLORS.background,
          color: COLORS.textPrimary,
        },
        progressStyle: { backgroundColor: "#da22ff" }, // Change the progress bar color
      });

      navigate("/"); // Redirect to /home after login
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <SignInContainer>
      <CubeIcon color={COLORS.textPrimary} size={70}></CubeIcon>

      <Logo color={COLORS.textPrimary} size={300} />
      <TitleH3 textcolor={COLORS.textPrimary}>RENDER EYEBALL</TitleH3>


      <StyledH3 textcolor={COLORS.textPrimary}>Click Below to Login </StyledH3>
      <IconButton onClick={signInWithGoogle}>
        <GoogleIcon color={COLORS.textPrimary} size={30}></GoogleIcon>
        Sign In With Google
      </IconButton>
    </SignInContainer>
  );
}

export default SignIn;
