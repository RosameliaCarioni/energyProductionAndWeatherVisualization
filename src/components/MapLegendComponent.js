import React, { useEffect, useState } from 'react';

const MapLegendComponent = ({ weatherData }) => {

  if (!weatherData || !weatherData.data) {
    // Handle the case when weatherData or weatherData.data is undefined
    return null; // Or display a placeholder, error message, or loading spinner
  }

  console.log(weatherData);
  return (
    <div>
      <div className="flex flex-col bg-dark rounded-md mt-4 mb-2">
        <p>{weatherData.title}</p>
        {weatherData.data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div
              className="color-box"
              style={{ backgroundColor: `rgba(255, ${Math.round(255 - item.value * 255)}, 0, 1)` }}
            ></div>
            <div className='text-xs'>{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapLegendComponent;