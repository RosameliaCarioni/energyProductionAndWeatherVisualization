"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import * as WeatherLayersClient from 'weatherlayers-gl/client';
import * as WeatherLayers from 'weatherlayers-gl';
import { MapboxOverlay } from '@deck.gl/mapbox';
import { ClipExtension } from '@deck.gl/extensions';
import MapGL, { Popup, Marker } from 'react-map-gl';
import {getFarmsMeta} from "@/utils/getFarmsMetaData"

function MapComponent() {
  const [viewState, setViewState] = useState({
    latitude: 60.4720,
    longitude: 8.4689,
    zoom: 3,
  });
  const popupRef = useRef(null);
  const [selectedPlant, setSelectedPlant] = useState(undefined);
  const [hoverInfo, setHoverInfo] = useState(false)
  const [plantsArray, setPlants] = useState([]);
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  
  const windSpeedPalette = [
    [0, '#ffffff'], // white
    [10, '#85ff73'], // green
    [12, '#f6ff73'], // yellow
    [17, '#ffde73'], // orange
    [30, '#f76060'] // red
  ];
  const WLConfig = {
    // particle layer
    particleWidth: 2,
    particleMaxAge: 25,
    particlePalette: windSpeedPalette,
    particleOpacity: 0.8,
    patricleSpeedFactor: 3,
    // raster layer
    rasterOpacity: 0.1,
    // common properties for all layers
    extensions: [new ClipExtension()],
    clipBounds: [-181, -85.051129, 181, 85.051129],
    // // markers
    // markerClassName: 'custom-marker',
    // markerBgImgUrl: 'url(/assets/pin.svg)',
    // markerWidth: '30px',
    // markerHeight: '30px',
    // markerBgSize: '100%',
  }

  const handleMarkerClick = (plant) => {
    setSelectedPlant(plant);
  }

  const onMapLoad = useCallback(async (event) => {
    const map = event.target;
      // Log the map instance itself
  console.log("Map instance:", map);
  // Log specific properties of the map's state
  console.log("Map center:", map.getCenter());
  console.log("Map zoom:", map.getZoom());
  console.log("Map bounds:", map.getBounds().toArray());

    const weatherLayersToken = process.env.NEXT_PUBLIC_WEATHERLAYERS_ACCESS_TOKEN;

    const client = new WeatherLayersClient.Client({
      accessToken: weatherLayersToken,
    });

    const dataset = 'gfs/wind_100m_above_ground';
    const datetimeRange = WeatherLayers.offsetDatetimeRange(new Date().toISOString(), 0, 24);

    try {
      const { title, unitFormat, attribution, referenceDatetimeRange, palette } = await client.loadDataset(dataset);
      const datetimes = await client.loadDatasetSlice(dataset, datetimeRange);
      const datetime = datetimes[0];
      const { image, image2, imageWeight, imageType, imageUnscale, bounds } = await client.loadDatasetData(dataset, datetime);

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
            width: WLConfig.particleWidth,
            maxAge: WLConfig.particleMaxAge,
            palette: WLConfig.particlePalette,
            opacity: WLConfig.particleOpacity,
            speedFactor: WLConfig.patricleSpeedFactor,
            extensions: WLConfig.extensions,
            clipBounds: WLConfig.clipBounds,
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
            opacity: WLConfig.rasterOpacity,
            extensions: WLConfig.extensions,
            clipBounds: WLConfig.clipBounds,
          }),
        ],
      });

      map.addControl(deckOverlay);
    } catch (error) {
      console.error("Failed to load weather data:", error);
    }
  }, []);

  useEffect(() => {
    popupRef.current?.trackPointer();
    const fetchPlants = async () => {
      const plants = await getFarmsMeta();
      setPlants(plants);
    };
    fetchPlants();
  }, []);
    

  return (
    <MapGL
    {...viewState}
      onMove={evt => setViewState(evt.viewState)}
      style={{width: '50%', height: '750px'}}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      projection={"mercator"}
      mapboxAccessToken={mapboxToken}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onLoad={onMapLoad}
    >
      {plantsArray.map(plant => (
        <Marker
          key={plant.id}
          latitude={plant.latitude}
          longitude={plant.longitude}
          // anchor="bottom"
        >
          <div
            onMouseEnter={() =>{
              setHoverInfo(plant)
              console.log(plant)
            }}
            onMouseLeave={() => setHoverInfo(undefined)}
            onClick={() => handleMarkerClick(plant)}
            style={{ cursor: 'pointer' }}
          >
            <img src ="assets/pin.svg" alt="Marker" style={{ width: '30px', height: '30px'}}/>
          </div>
        </Marker>
      ))}

      {hoverInfo && (
        <Popup
          latitude={hoverInfo.latitude}
          longitude={hoverInfo.longitude}
          closeButton={false}
          closeOnClick={false}
          ref={popupRef}
          anchor="bottom"
          className="z-50"
        >
          <div className="p-4 bg-white shadow-lg rounded-lg max-w-xs text-sm">
            <h1 className="text-lg font-bold mb-2">{hoverInfo.name}</h1>
            <p className="mb-1">Capacity: <span className="font-semibold">{hoverInfo.capacity_kw} kw</span></p>
            <p className="mb-1">Latitude: <span className="font-semibold">{hoverInfo.latitude}</span></p>
            <p className="mb-1">Longitude: <span className="font-semibold">{hoverInfo.longitude}</span></p>
            <p>ID: <span className="font-semibold">{hoverInfo.id}</span></p>
          </div>
        </Popup>
      )}
    </MapGL>
  );
};

export default MapComponent;