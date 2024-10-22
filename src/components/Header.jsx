import React from 'react';
import ImageComponent from './ImageComponent';
import Logo from '../assets/eyeball.png'
import styled from 'styled-components';

import { useState } from 'react';

// import { db } from '../firebase';
// import { collection, doc, updateDoc, onSnapshot } from 'firebase/firestore';

// Styled component for the container div, using Flexbox to align items horizontally
const HeaderContainer = styled.div`
  display: flex;
  align-items: center; /* Vertically aligns the logo and text */
  gap: 12px;
`;

// const [showDetails, setShowDetails] = useState(false); // State to control showing details

// const handleToggleDetails = () => {
//   setShowDetails(prev => !prev); // Toggle the state
// };

const Header = ({ mode, setMode , onToggleDetails, showDetails }) => {
  return (
    <div>
      <HeaderContainer >
        <ImageComponent src={Logo} alt="Sample Image" width="100px" height="100px" />
        <h1>Render Eyeball</h1>
      </HeaderContainer>

      <div className="div-layout-top" >
        <button
          onClick={() => setMode('view')}
          className={mode === 'view' ? 'active' : ''}
        >
          View Mode
        </button>
        <button
          onClick={() => setMode('edit')}
          className={mode === 'edit' ? 'active' : ''}
        >
          Edit Mode
        </button>
        
        <button onClick={onToggleDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
        </button>

      </div>
    </div>
  );
};

export default Header;
