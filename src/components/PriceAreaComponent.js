import React, { useState, useEffect } from 'react';

function PriceAreaComponent({ onLayerChange }) {
  const [selectedButtons, setSelectedButtons] = useState([]);

  function handleButtonClick(buttonName) {
    setSelectedButtons((prevSelectedButtons) => {
      if (prevSelectedButtons.includes(buttonName)) {
        return prevSelectedButtons.filter((name) => name !== buttonName);
      } else {
        return [...prevSelectedButtons, buttonName];
      }
    });
  }

  useEffect(() => {
    onLayerChange(selectedButtons);
  }, [selectedButtons, onLayerChange]);

  return (
    <div className="flex">
      <p className="font-bold mb-2 mr-4">Select Price Areas:</p>
      <div>
        {['N01', 'N02', 'N03', 'N04', 'N05'].map((buttonName) => (
          <button
            key={buttonName}
            className="bg-blue-10 px-2 mr-2 text-white rounded-md priceMapButton z-index"
            style={{
              backgroundColor: selectedButtons.includes(buttonName)
                ? '#5fbeb3'
                : '#353535',
              cursor: 'pointer',
              marginBottom: '10px',
              color: '#fffff',
              transition: 'background-color 0.3s ease', // Add a smooth transition
            }}
            onClick={() => handleButtonClick(buttonName)}
          >
            {buttonName}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PriceAreaComponent;