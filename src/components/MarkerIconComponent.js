import React from 'react';

const MarkerIconComponent = ({ getMarkerColor, style }) => (
  <svg
    width={style?.width || "30px"} // Use style.width if provided, otherwise default to "30px"
    height={style?.height || "30px"} // Use style.height if provided, otherwise default to "30px"
    viewBox="0 0 15 15"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    fill={getMarkerColor()}
    stroke="#ffffff"
    strokeWidth="0.15"
    style={{ opacity: style?.opacity || 1 }} // Use style.opacity if provided, otherwise default to 1 (fully opaque)
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
    <g id="SVGRepo_iconCarrier">
      <path id="path4133" d="M7.5,0C5.0676,0,2.2297,1.4865,2.2297,5.2703 C2.2297,7.8378,6.2838,13.5135,7.5,15c1.0811-1.4865,5.2703-7.027,5.2703-9.7297C12.7703,1.4865,9.9324,0,7.5,0z"/>
    </g>
  </svg>
);

export default MarkerIconComponent;
