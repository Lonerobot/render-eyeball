import React from 'react';

import CpuIcon from '../assets/CpuIcon';
import GpuIcon from '../assets/GpuIcon';
import RamIcon from '../assets/RamIcon';

import styled from 'styled-components';

// Define the styled span
const StyledSpan = styled.span`
  color: ${(props) => props.color || 'black'}; // Fallback to black if no color is passed
  font-size: 10px;
  margin-left: 10px;
`;

const StyledDiv = styled.div`
    display: flex;
    align-items: center;
    text-align: left;
`;

function convertMBtoGB(mb) {
  // Convert MB to GB and round to the nearest whole number
  const gb = Math.round(mb / 1024);

  // Return the value with "GB" appended
  return `${gb} GB`;
}

const IconLabel = ({ type, color, data }) => {

  const iconMap = {
    cpu: { icon: <CpuIcon color={color} size={20} />, label: 'CPU' },
    ram: { icon: <RamIcon color={color} size={20} />, label: 'RAM' },
    gpu: { icon: <GpuIcon color={color} size={20} />, label: 'GPU' },
  };

  const { icon, label } = iconMap[type] || { icon: '❓', label: 'Unknown' };

  if (type === "ram") {
    data = convertMBtoGB(data)
  }

  return (
    <StyledDiv>
      {icon}
      <StyledSpan color={color} >{`${label}: ${data}`}</StyledSpan>
    </StyledDiv>
  );
};

export default IconLabel;
