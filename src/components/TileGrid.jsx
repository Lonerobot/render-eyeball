import React from 'react';
import Tile from './Tile';
import './TileGrid.css'; // Create corresponding CSS for grid layout
import { useState } from 'react';

const TileGrid = ({ computers, mode, toggleStatus, showDetails}) => {
//   return (
//     <div className="tile-grid">
//       {computers.map((computer) => (
//         <Tile
//           key={computer.id}
//           computer={computer}
//           mode={mode}
//           toggleStatus={toggleStatus}
//         />
//       ))}
//     </div>
//   );
// };

return (
  <div>
    <div className="tile-grid">
      {computers.map(computer => (
        <Tile 
          key={computer.id} 
          computer={computer} 
          mode={mode} 
          toggleStatus={toggleStatus}
          showDetails={showDetails} // Pass showDetails to Tile
        />
      ))}
    </div>
  </div>
);
};

export default TileGrid;
