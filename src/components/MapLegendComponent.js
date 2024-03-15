import React, { useEffect, useState } from "react";

const MapLegendComponent = ({ weatherData, visible }) => {
  if (!weatherData || !weatherData.data) {
    // Handle the case when weatherData or weatherData.data is undefined
    return null; // Or display a placeholder, error message, or loading spinner
  }
  return (
    <div>
      {visible && (
        <div className="flex flex-col items-end bg-dark rounded-md mb-2 p-3">
          {weatherData.data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="text-xs mr-2">{item.label}</div>
              <div
                className="color-box"
                style={{
                  backgroundColor: `${item.color}`
                }}
                ></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MapLegendComponent;
