import React from 'react';
import './Tile.css';
import IconLabel from './IconLabel';

import { COLORS } from '../theme';
import { ComputerIcon } from '../assets/icons.jsx';
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../config/firebase"; 
import { useAuthState } from "react-firebase-hooks/auth";


const Tile = ({ computer, mode, toggleStatus, showDetails }) => {
  const { id, name, status, cpu, ram, gpu } = computer;
  const isFree = status === 'free';
  
  // Get the current user from Firebase Auth
  const [user] = useAuthState(auth); // This will return the user object if logged in

  // Update the timestamp and modifiedBy when a tile is clicked
  const handleClick = async (computerId) => {
    // Your existing logic for handling tile click
    if (mode === 'edit') {
      toggleStatus(id, status);
    }

    // Update the last modified time in Firestore with server timestamp and the current user
    const docRef = doc(db, "settings", "lastModified");

    if (user) {
      // Set both the timestamp and the modifiedBy field
      await updateDoc(docRef, {
        timestamp: serverTimestamp(),
        modifiedBy: user.displayName // Set the displayName of the logged-in user
      });
    }
  };

  // Set color based on the status of the tile
  const iconColor = isFree ? COLORS.textFree : COLORS.textOccupied; // Use your desired colors here

  return (
    <button
      className={`tile ${isFree ? 'free' : 'occupied'}`}
      onClick={handleClick}
      disabled={mode !== 'edit'}
    >
      <div className="div-layout-side">
        <ComputerIcon color={iconColor} size={40} />
        <h3 style={{ color: iconColor }}>{name}</h3>
      </div>

      {showDetails && (
        <>
          <IconLabel type="cpu" color={iconColor} size={24} data={cpu} />
          <IconLabel type="ram" color={iconColor} size={24} data={ram} />
          <IconLabel type="gpu" color={iconColor} size={24} data={gpu} />
        </>
      )}

    </button>
  );
};

export default Tile;
