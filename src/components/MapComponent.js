"use client";

import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as WeatherLayersClient from 'weatherlayers-gl/client';
import * as WeatherLayers from 'weatherlayers-gl';
import { MapboxOverlay } from '@deck.gl/mapbox';
import { ClipExtension } from '@deck.gl/extensions';
import {getFarmsLatitude, getFarmsLongitude} from "@/utils/getFarmsLocation"



function mapComponent() {
  const mapContainerRef = useRef(null);


  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [60.4720, 8.4689],
      zoom: 3,
      projection: 'mercator'
    });

    map.on('load', async () => {
      const latitudes = await getFarmsLongitude()
      const datetimeRange = WeatherLayers.offsetDatetimeRange(new Date().toISOString(), 0, 24);
      const client = new WeatherLayersClient.Client({
        accessToken: process.env.NEXT_PUBLIC_WEATHERLAYERS_ACCESS_TOKEN,
      });

      // load dataset slice, load data in the first available datetime
      const dataset = 'gfs/wind_10m_above_ground';
      const {title, unitFormat, attribution, referenceDatetimeRange, palette} = await client.loadDataset(dataset);
      const {datetimes} = await client.loadDatasetSlice(dataset, datetimeRange);
      const datetime = datetimes[0];
      const {image, image2, imageWeight, imageType, imageUnscale, bounds} = await client.loadDatasetData(dataset, datetime);

      const windSpeedPalette = [
        [0, '#ffffff'], // white
        [10, '#85ff73'], // green
        [15, '#f6ff73'], // yellow
        [20, '#ffde73'], // orange
        [30, '#f76060'] // red
      ];
      

      const deckOverlay = new MapboxOverlay({
        layers: [
          new WeatherLayers.ParticleLayer({
            id: 'particle',
            // data properties
            image,
            image2,
            // imageSmoothing: config.imageSmoothing,
            // imageInterpolation: config.imageInterpolation,
            imageWeight,
            imageType,
            imageUnscale,
            // imageMinValue: config.imageMinValue > 0 ? config.imageMinValue : null,
            // imageMaxValue: config.imageMaxValue > 0 ? config.imageMaxValue : null,
            bounds,
            // style properties
            // animate: config.particle.animate,
            width: 2,
            maxAge: 25,
            palette: windSpeedPalette,
            opacity: 0.8,
            // animate: true,
            speedFactor: 3,
            extensions: [new ClipExtension()],
            clipBounds: [-181, -85.051129, 181, 85.051129],
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
            opacity: 0.2,
            extensions: [new ClipExtension()],
            clipBounds: [-181, -85.051129, 181, 85.051129],
          }),
        ],

      });

      map.addControl(deckOverlay);
    });

    return () => map.remove();
  }, []);

  return (
    <div ref={mapContainerRef} style={{ width: "50%", height: "600px" }} />
  );
};

export default mapComponent; 