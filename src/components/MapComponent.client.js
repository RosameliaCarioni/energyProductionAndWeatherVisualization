"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl"; // Import Mapbox GL
import "mapbox-gl/dist/mapbox-gl.css"; // Import stylesheet

const MapComponent = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 0],
      zoom: 1,
    });

    return () => map.remove();
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "400px" }} />
  );
};

export default MapComponent;
