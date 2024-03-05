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
          border: 1px solid #ccc;
          border-radius: 5px;
          overflow: hidden;
        }
        .switch-btn {
          flex: 1;
          padding: 6px 15px;
          cursor: pointer;
          background-color: #f0f0f0;
          border: none;
          outline: none;
          font-size: 20px;
        }
        .switch-btn.active {
          background-color: #007bff;
          color: white;
        }
      `}</style>
    </div>
  );
}

export default EnergyIceLossSwitchButton;
