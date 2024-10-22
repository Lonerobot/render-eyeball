import React from 'react';
import './IconLabel.css';

import RamIcon from '../assets/ram.svg';
import CpuIcon from '../assets/cpu.svg';
import GpuIcon from '../assets/gpu.svg';

function convertMBtoGB(mb) {
    // Convert MB to GB and round to the nearest whole number
    const gb = Math.round(mb / 1024);
    
    // Return the value with "GB" appended
    return `${gb} GB`;
  }

const iconMap = {
    cpu: { icon: <img src={CpuIcon} alt="CPU" />, label: 'CPU' },
    ram: { icon: <img src={RamIcon} alt="RAM" />, label: 'RAM' },
    gpu: { icon: <img src={GpuIcon} alt="GPU" />, label: 'GPU' },
    // Add more types if needed
  };

const IconLabel = ({ type, data }) => {
const { icon, label } = iconMap[type] || { icon: '❓', label: 'Unknown' };

if ( type === "ram" ) {
    data = convertMBtoGB(data)
}

return (
    <div className="icon-label">
      <span className="icon">{icon}</span>
      <span className="label">{`${label}: ${data}`}</span>
    </div>
);
};

export default IconLabel;
  