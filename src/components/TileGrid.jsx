import React from 'react';
import Tile from './Tile';
import './TileGrid.css'; // Create corresponding CSS for grid layout

const TileGrid = ({ computers, mode, toggleStatus }) => {
  return (
    <div className="tile-grid">
      {computers.map((computer) => (
        <Tile
          key={computer.id}
          computer={computer}
          mode={mode}
          toggleStatus={toggleStatus}
        />
      ))}
    </div>
  );
};

export default TileGrid;
