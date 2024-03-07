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
    <div className="bg-dark p-3 mb-2 flex flex-col items-end rounded-md">
      <div>
        <p className='text-sm'>Weather Layer</p>
      </div>
      <div className='flex flex-col items-end'>
        {['Temperature', 'WindSpeed', 'RelativeHumidity'].map((buttonName) => (
          <button
            key={buttonName}
            style={{
              color: selectedButtons.includes(buttonName) ? '#5fbeb3' : '#fff',
              opacity: selectedButtons.includes(buttonName) ? 1 : 0.5,
              cursor: 'pointer',
              marginBottom: '5px',
              marginTop: '5px'
            }}
            className='text-xs font-blue'
            onClick={() => handleButtonClick(buttonName)}
          >
            {buttonName}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ButtonComponent;
