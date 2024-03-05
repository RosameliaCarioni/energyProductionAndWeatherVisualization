import React, { useState, useEffect } from 'react';

function ButtonComponent({ onLayerChange }) {
  // Initialize the selectedButtons state with 'WindSpeed' as a preselected value
  const [selectedButtons, setSelectedButtons] = useState(['WindSpeed']);

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
    <div>
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
