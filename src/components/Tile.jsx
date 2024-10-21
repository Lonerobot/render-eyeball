import React from 'react';
import './Tile.css';
import IconLabel from './IconLabel';

import computerIcon from '../assets/computerA.svg';

import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.js"; 

const Tile = ({ computer, mode, toggleStatus }) => {
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

  return (
    <button
      className={`tile ${isFree ? 'free' : 'occupied'}`}
      onClick={handleClick}
      disabled={mode !== 'edit'}
      
    >
      
      <div className="div-layout-side">
        <img className="icon-main" src={computerIcon} alt="GPU" />
        <h3>{name}</h3>
      </div>

      <IconLabel type="cpu" data={cpu}></IconLabel>
      <IconLabel type="ram" data={ram}></IconLabel>
      <IconLabel type="gpu" data={gpu}></IconLabel>
  
    </button>
  );
};

export default Tile;
