import React, { useState, useEffect } from 'react';

function PriceAreaComponent({ onLayerChange }) {
  // Initialize the selectedButtons state with 'WindSpeed' as a preselected value
  const [selectedButtons, setSelectedButtons] = useState([]);

  function handleButtonClick(buttonName) {
    setSelectedButtons((prevSelectedButtons) => {
      // Toggle the selection state of the button
      if (prevSelectedButtons.includes(buttonName)) {
        return prevSelectedButtons.filter((name) => name !== buttonName);
      } else {
        return [...prevSelectedButtons, buttonName];
      }
    });
  }

  // Use useEffect to call onLayerChange after selectedButtons state has been updated
  useEffect(() => {
    onLayerChange(selectedButtons);
  }, [selectedButtons, onLayerChange]);

  return (
    <div style={{ width: '50%', backgroundColor: '#000', padding: '10px', borderRadius: '5px' }}>
      <div style={{ marginBottom: '10px', fontSize: '16px', color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
        Selected Price Areas
      </div>
      {['N01', 'N02', 'N03', 'N04', 'N05'].map((buttonName) => (
        <button
          key={buttonName}
          style={{
            opacity: selectedButtons.includes(buttonName) ? 1 : 0.5,
            cursor: 'pointer',
            marginBottom: '10px',
          }}
          onClick={() => handleButtonClick(buttonName)}
        >
          {buttonName}
        </button>
      ))}
    </div>
  );
}

export default PriceAreaComponent;
