import React from 'react';
import './Tile.css';
import IconLabel from './IconLabel';

// import computerIcon from '../assets/computerA.svg';

import { COLORS } from '../theme';
import ComputerIcon from '../assets/ComputerIcon.jsx';

import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.js";


const Tile = ({ computer, mode, toggleStatus, showDetails }) => {
  const { id, name, status, cpu, ram, gpu } = computer;
  const isFree = status === 'free';

  // Update the timestamp when a tile is clicked
  const handleClick = async (computerId) => {
    // Your existing logic for handling tile click
    if (mode === 'edit') {
      toggleStatus(id, status);
    }

    // Update the last modified time in Firestore with server timestamp
    const docRef = doc(db, "settings", "lastModified");
    await updateDoc(docRef, {
      timestamp: serverTimestamp(),
    });

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
        {/* <img className="icon-main" src={computerIcon} alt="GPU" /> */}

        <ComputerIcon color={iconColor} size={40} />
        {/* </ComputerIcon> */}

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
