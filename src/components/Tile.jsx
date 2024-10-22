import React from 'react';
import './Tile.css';
import IconLabel from './IconLabel';

// import computerIcon from '../assets/computerA.svg';

import ComputerIcon from '../assets/Icons';

import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.js"; 


const Tile = ({ computer, mode, toggleStatus , showDetails}) => {
  const { id, name, status , cpu , ram , gpu} = computer;
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
const iconColor = isFree ? '#3ad625' : '#333333'; // Use your desired colors here

  return (
    <button
      className={`tile ${isFree ? 'free' : 'occupied'}`}
      onClick={handleClick}
      disabled={mode !== 'edit'}      
    >
        <div className="div-layout-side">
        {/* <img className="icon-main" src={computerIcon} alt="GPU" /> */}

        <ComputerIcon color={iconColor} size={40}></ComputerIcon>

        <h3 style={{ color: iconColor }}>{name}</h3>
      </div>

      {/* <IconLabel type="cpu" data={cpu}></IconLabel>
      <IconLabel type="ram" data={ram}></IconLabel>
      <IconLabel type="gpu" data={gpu}></IconLabel> */}

      {showDetails && (
        <>
          <IconLabel type="cpu" data={cpu} />
          <IconLabel type="ram" data={ram} />
          <IconLabel type="gpu" data={gpu} />
        </>
      )}

  
    </button>
  );
};

export default Tile;
