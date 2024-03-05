'use client'
import React, { useState } from 'react';

function ButtonComponent({onLayerChange}) {
  const [selectedButton, setSelectedButton] = useState('WindSpeed');

  function handleButtonClick(buttonName) {
    setSelectedButton(buttonName);
    onLayerChange(buttonName)
  }

  return (
    <div>
      {['Temperature', 'WindSpeed', 'RelativeHumidity'].map((buttonName) => (
        <button
          key={buttonName}
          style={{
            opacity: selectedButton === buttonName ? 1 : 0.5,
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
