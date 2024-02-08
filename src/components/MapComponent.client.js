"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl"; // Import Mapbox GL
import "mapbox-gl/dist/mapbox-gl.css"; // Import stylesheet
//import "@weatherlayers/gl/dist/weatherlayers-gl.css"; // Import WeatherLayers stylesheet
//import WeatherLayers from "@weatherlayers/gl"; // Import WeatherLayers GL JS
import * as WeatherLayersClient from 'weatherlayers-gl/client';

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

    // Initialize WeatherLayers after the map loads
    map.on('load', () => {
      const client = new WeatherLayersClient.Client({
        accessToken: process.env.NEXT_PUBLIC_WEATHERLAYERS_ACCESS_TOKEN, // Replace with your WeatherLayers access token
        datetimeInterpolate: true,
        //map: map, // Pass the Mapbox map instance
      });
      
      // Add a specific weather layer, for example, 'temperature'
      //client.addLayer("temperature");
    });

    return () => map.remove();
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "400px" }} />
  );
};

export default MapComponent;
