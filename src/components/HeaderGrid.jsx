import React, { useState } from 'react';
import Header from './Header';
import TileGrid from './TileGrid';

const HeaderGrid = ({ computers, mode, toggleStatus }) => {
  const [showDetails, setShowDetails] = useState(false); // State to control showing details

  const handleToggleDetails = () => {
    setShowDetails(prev => !prev); // Toggle the state
  };

  return (
    <div>
      <Header onToggleDetails={handleToggleDetails} showDetails={showDetails} />
      <TileGrid computers={computers} mode={mode} toggleStatus={toggleStatus} showDetails={showDetails} />
    </div>
  );
};

export default HeaderGrid;
