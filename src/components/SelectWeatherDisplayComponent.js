import React, { useState, useEffect } from 'react';

function ButtonComponent({ onLayerChange }) {
  // Initialize the selectedButtons state with 'WindSpeed' as a preselected value
  const [selectedButtons, setSelectedButtons] = useState(['WindSpeed']);

  function handleButtonClick(buttonName) {
    setSelectedButtons([buttonName]);
  }

  // Use useEffect to call onLayerChange after selectedButtons state has been updated
  useEffect(() => {
    onLayerChange(selectedButtons);
  }, [selectedButtons, onLayerChange]);

  return (
    <div style={{ width: '50%', backgroundColor: '#000', padding: '10px', borderRadius: '5px' }}>
      <div style={{ marginBottom: '10px', fontSize: '16px', color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>
        Selected Weather Layers
      </div>
      {['Temperature', 'WindSpeed', 'RelativeHumidity'].map((buttonName) => (
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

export default ButtonComponent;
