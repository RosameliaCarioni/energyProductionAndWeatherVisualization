import React, { useState } from 'react';

function EnergyIceLossSwitchButton({onSwitchChange}) {
  const [option, setOption] = useState('Energy Production');

  const toggleOption = () => {
    const newOption = option === 'Energy Production' ? 'Ice Loss' : 'Energy Production';
    setOption(newOption);
    // Call the callback function passing the new option
    onSwitchChange(newOption);
  };

  return (
    <div className="switch-button">
      <button onClick={toggleOption} className={`switch-btn ${option === 'Energy Production' ? 'active' : ''}`}>
        Energy Production
      </button>
      <button onClick={toggleOption} className={`switch-btn ${option === 'Ice Loss' ? 'active' : ''}`}>
        Ice Loss
      </button>

      <style jsx>{`
        .switch-button {
          display: flex;
          overflow: hidden;
          width: 250px; 
          border-radius: 0.375rem 0.375rem 0 0;
        }
        .switch-btn {
          flex: 1;
          padding: 5px 5px;
          cursor: pointer;
          background-color: #f0f0f0;
          border: none;
          outline: none;
          font-size: 10px;
          color: #272727;
        }
        .switch-btn.active {
          background-color: #272727;
          color: white;
        }
      `}</style>
    </div>
  );
}

export default EnergyIceLossSwitchButton;
