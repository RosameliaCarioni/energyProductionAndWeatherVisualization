"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as WeatherLayersClient from 'weatherlayers-gl/client';
import * as WeatherLayers from 'weatherlayers-gl';
import { MapboxOverlay } from '@deck.gl/mapbox';

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

    map.on('load', async () => {
      const client = new WeatherLayersClient.Client({
        accessToken: process.env.NEXT_PUBLIC_WEATHERLAYERS_ACCESS_TOKEN,
      });

      const datetimeRange = WeatherLayers.offsetDatetimeRange(new Date().toISOString(), 0, 24);
      const dataset = 'gfs/wind_10m_above_ground';
      const {datetimes} = await client.loadDatasetSlice(dataset, datetimeRange);
      const datetime = datetimes[0]; 
      const {image, bounds} = await client.loadDatasetData(dataset, datetime);

      const deckOverlay = new MapboxOverlay({
        layers: [
          new WeatherLayers.ParticleLayer({
            id: 'wind-particle',
            data: null,
            image: image,
            bounds: [-180, -90, 180, 90],
            visible: true,
            opacity: 0.8,
            width: 10,
            numParticles: 20000
          }),
        ],
      });

      map.addControl(deckOverlay);
    });

    return () => map.remove();
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: "100%", height: "400px" }} />
  );
};

export default MapComponent;
