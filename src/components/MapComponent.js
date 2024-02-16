"use client";

import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as WeatherLayersClient from 'weatherlayers-gl/client';
import * as WeatherLayers from 'weatherlayers-gl';
import { MapboxOverlay } from '@deck.gl/mapbox';
import { ClipExtension } from '@deck.gl/extensions';
import {getFarmsMeta} from "@/utils/getFarmsMetaData"

function MapComponent() {
  const [activePlant, setActivePlant] = useState(undefined);
  const mapContainerRef = useRef(null);
  
  const windSpeedPalette = [
    [0, '#ffffff'], // white
    [10, '#85ff73'], // green
    [12, '#f6ff73'], // yellow
    [17, '#ffde73'], // orange
    [30, '#f76060'] // red
  ];
  const mapConfig = {
    // mapbox config
    mapStyle: "mapbox://styles/mapbox/dark-v11",
    mapCenter: [8.4689, 60.4720],
    mapZoom: 3,
    mapProjection: 'mercator',
    // particle layer
    particleWidth: 2,
    particleMaxAge: 25,
    particlePalette: windSpeedPalette,
    particleOpacity: 0.8,
    patricleSpeedFactor: 3,
    // raster layer
    rasterOpacity: 0.2,
    // common properties for all layers
    extensions: [new ClipExtension()],
    clipBounds: [-181, -85.051129, 181, 85.051129],
    // markers
    markerClassName: 'custom-marker',
    markerBgImgUrl: 'url(/assets/pin.svg)',
    markerWidth: '30px',
    markerHeight: '30px',
    markerBgSize: '100%',
  }

  const handlePlantClick = () => {
    setActivePlant()
  }


  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    console.log(mapConfig.mapContainer)
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapConfig.mapStyle,
      center: mapConfig.mapCenter,
      zoom: mapConfig.mapZoom,
      projection: mapConfig.mapProjection
    });

    map.on('load', async () => {
      const datetimeRange = WeatherLayers.offsetDatetimeRange(new Date().toISOString(), 0, 24);
      const client = new WeatherLayersClient.Client({
        accessToken: process.env.NEXT_PUBLIC_WEATHERLAYERS_ACCESS_TOKEN,
      });

      let plants, title, unitFormat, attribution, referenceDatetimeRange, palette, datetimes, datetime, image, image2, imageWeight, imageType, imageUnscale, bounds;
      const dataset = 'gfs/wind_100m_above_ground';
      try {
        // load dataset slice, load data in the first available datetime
        plants = await getFarmsMeta();
        ({title, unitFormat, attribution, referenceDatetimeRange, palette} = await client.loadDataset(dataset));
        datetimes = await client.loadDatasetSlice(dataset, datetimeRange);
        datetime = datetimes[0];
        ({image, image2, imageWeight, imageType, imageUnscale, bounds} = await client.loadDatasetData(dataset, datetime));
      } catch (error) {
        console.error(error);
      }

    
      const deckOverlay = new MapboxOverlay({
        interleaved: true,
        layers: [
          new WeatherLayers.ParticleLayer({
            id: 'particle',
            // data properties
            image,
            image2,
            imageWeight,
            imageType,
            imageUnscale,
            bounds,
            width: mapConfig.particleWidth,
            maxAge: mapConfig.particleMaxAge,
            palette: mapConfig.particlePalette,
            opacity: mapConfig.particleOpacity,
            speedFactor: mapConfig.patricleSpeedFactor,
            extensions: mapConfig.extensions,
            clipBounds: mapConfig.clipBounds,
          }),
          new WeatherLayers.RasterLayer({
            id: 'raster',
            // data properties
            image,
            image2,
            imageWeight,
            imageType,
            imageUnscale,
            bounds,
            // style properties
            palette,
            opacity: mapConfig.rasterOpacity,
            extensions: mapConfig.extensions,
            clipBounds: mapConfig.clipBounds,
          }),
        ],
      });

      map.addControl(deckOverlay);
      plants.forEach(plant => {
        
        const marker = document.createElement('div');
        marker.className = mapConfig.markerClassName;
        marker.style.backgroundImage = mapConfig.markerBgImgUrl;
        marker.style.width = mapConfig.markerWidth;
        marker.style.height = mapConfig.markerHeight;
        marker.style.backgroundSize = mapConfig.markerBgSize;

        new mapboxgl.Marker(marker)
          .setLngLat([plant.longitude, plant.latitude])
          .addTo(map);
      });
    });

    return () => map.remove();
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: "50%", height: "600px" }} />
  );
};

export default MapComponent; 