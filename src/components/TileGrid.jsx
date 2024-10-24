import React from 'react';
import Tile from './Tile';

import { useState } from 'react';


import styled from 'styled-components';


const TileGridLayout = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); 
    gap: 10px; 
    width: 90vw;
    max-width: 100%; 
    margin: 0 auto;
    box-sizing: border-box;
`;

const TileGrid = ({ computers, mode, toggleStatus, showDetails}) => {
return (
    <TileGridLayout>
      {computers.map(computer => (
        <Tile 
          key={computer.id} 
          computer={computer} 
          mode={mode} 
          toggleStatus={toggleStatus}
          showDetails={showDetails} // Pass showDetails to Tile
        />
      ))}
    </TileGridLayout>
);
};

export default TileGrid;
