"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import * as WeatherLayersClient from "weatherlayers-gl/client";
import * as WeatherLayers from "weatherlayers-gl";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { ClipExtension } from "@deck.gl/extensions";
import MapGL, { Popup, Marker, Source, Layer } from "react-map-gl";
import MarkerIconComponent from "./MarkerIconComponent";
import {
  getProductionInHour,
  getProductionAfterIceLossInHour,
} from "@/utils/getFarmsProduction";
import geojson from "@/data/world.json";

function MapComponent({
  onSelectPlant,
  selectedPlant,
  children,
  plantsArray,
  hoverInfo,
  icelossPercentage,
  //energyOutput,
  selectedDate,
  selectedTime,
  switchOption,
  selectedLayer,
  allEnergyData,
}) {
  // console.log("selected time");
  // console.log(selectedTime);
  //console.log("energy output");
  //console.log(energyOutput);
  // console.log("hoverinfo");
  // console.log(hoverInfo);
  const [viewState, setViewState] = useState({
    latitude: 60.472,
    longitude: 8.4689,
    zoom: 4,
  });
  const cancelRequest = useRef(false);
  const popupRef = useRef(null);
  const mapRef = useRef(null);
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const [map, setMap] = useState(null);
  const [energyData, setEnergyData] = useState(null);
  const [energyDataAfterIceLoss, setEnergyDataAfterIceLoss] = useState(null);
  const [polygonHoverInfo, setPolygonHoverInfo] = useState(null);
  const [hoveredPlant, setHoveredPlant] = useState(null);

  const windSpeedPalette = [
    [0, [233, 236, 239]], // very light grey, calm
    [5, [178, 211, 233]], // modified with #87D3B8, gentle breeze
    [10, [135, 206, 235]], // light sky blue, moderate wind
    [15, [255, 218, 185]], // peach, fresh breeze
    [20, [250, 128, 114]], // salmon, strong wind
    [25, [220, 20, 60]], // crimson, very strong wind
  ];

  const temperaturePalette = [
    [-40, [233, 236, 239]], // very light grey, extremely cold
    [-30, [178, 211, 233]], // modified with #87D3B8, very cold
    [-20, [135, 206, 235]], // light sky blue, cold
    [-10, [255, 255, 255]], // white, chilly
    [0, [255, 218, 185]], // peach, freezing point
    [10, [250, 128, 114]], // salmon, cool
    [20, [255, 165, 0]], // orange, mild
    [30, [255, 69, 0]], // red-orange, warm
    [40, [220, 20, 60]], // crimson, hot
  ];

  const humidityPalette = [
    [100, [250, 128, 114]], // salmon, saturated
    [80, [255, 218, 185]], // peach, very high
    [60, [135, 206, 235]], // light sky blue, high
    [40, [178, 211, 233]], // modified with #87D3B8, moderate
    [20, [233, 236, 239]], // very light grey, dry
    [0, [250, 250, 250]], // almost white, very dry
  ];

  const WLConfig = {
    // particle layer
    particleWidth: 2,
    particleMaxAge: 25,
    palette: windSpeedPalette,
    particleOpacity: 0.8,
    particleSpeedFactor: 5,
    imageSmoothing: 5,
    imageUnscale: [-127, 128],
    // raster layer
    rasterOpacity: 0.4,
    // common properties for all layers
    extensions: [new ClipExtension()],
    clipBounds: [-23.5, 29.5, 45.0, 70.5],
    bounds: [-23.5, 29.5, 45.0, 70.5],

    tempPalette: temperaturePalette,
    tempUnscale: [-40, 40],

    humPalette: humidityPalette,
    humUnscale: [0, 100],
  };

  const geojsonLayerStyle = {
    id: "polygonLayer",
    type: "fill",
    paint: {
      "fill-color": [
        "case",
        [
          "==",
          ["get", "zoneName"],
          polygonHoverInfo ? polygonHoverInfo.zoneName : "",
        ],
        "#ffa500", // highlight color when hovered
        "#555555", // default color
      ],
      "fill-opacity": 0.8,
      "fill-outline-color": "#000",
      "line-width": 4,
    },
    beforeId: "waterway-label",
  };

  const deckOverlay = new MapboxOverlay({
    interleaved: true,
    layers: [],
  });

  const handleMarkerClick = (plant, event) => {
    // Prevent the map click event from firing when a marker is clicked
    event.stopPropagation();

    if (selectedPlant && plant.id === selectedPlant.id) {
      // deselects it
      onSelectPlant(undefined);
    } else {
      // selects a plant
      onSelectPlant(plant);
    }
  };

  const handleMapClick = (event) => {
    // Use the map reference to check if the click was on the canvas
    if (mapRef.current && mapRef.current.getMap()) {
      const map = mapRef.current.getMap();
      const canvas = map.getCanvas();
      if (event.target === map) {
        // clicked on map - deselect farm
        onSelectPlant(undefined);
      }
    }
  };

  const onMouseMove = (event) => {
    const { features, lngLat } = event;
    const hoveredFeature =
      features && features.find((f) => f.layer.id === "polygonLayer");

    if (hoveredFeature) {
      setPolygonHoverInfo({
        zoneName: hoveredFeature.properties.zoneName,
        lng: lngLat.lng,
        lat: lngLat.lat,
      });
    } else {
      setPolygonHoverInfo(null);
    }
  };

  const onMapLoad = useCallback(async (event) => {
    const newMap = event.target;
    setMap(newMap);
  }, []);

  const setWeatherLayers = async (
    activeWeatherImages,
    activeWeatherOptions
  ) => {
    const weatherLayersToken =
      process.env.NEXT_PUBLIC_WEATHERLAYERS_ACCESS_TOKEN;

    const client = new WeatherLayersClient.Client({
      accessToken: weatherLayersToken,
    });

    // only add overlay once
    if (!map.hasControl(deckOverlay)) {
      map.addControl(deckOverlay);
    }

    try {
      const rebaseWindImage = await WeatherLayers.loadTextureData(
        activeWeatherImages.wind
      );

      const rebaseTempImage = await WeatherLayers.loadTextureData(
        activeWeatherImages.temp
      );

      const rebaseHumImage = await WeatherLayers.loadTextureData(
        activeWeatherImages.hum
      );

      const layers = [
        ...(activeWeatherOptions.wind
          ? [
              new WeatherLayers.RasterLayer({
                id: "raster",
                image: rebaseWindImage,
                imageType: "VECTOR",
                imageUnscale: WLConfig.imageUnscale,
                palette: WLConfig.palette,

                opacity: WLConfig.rasterOpacity,
                extensions: WLConfig.extensions,
                clipBounds: WLConfig.clipBounds,
                bounds: WLConfig.bounds,
                imageSmoothing: WLConfig.imageSmoothing,
              }),
            ]
          : []),
        ...(activeWeatherOptions.wind
          ? [
              new WeatherLayers.ParticleLayer({
                id: "particle",
                image: rebaseWindImage,
                imageUnscale: WLConfig.imageUnscale,
                width: WLConfig.particleWidth,
                maxAge: WLConfig.particleMaxAge,
                palette: WLConfig.palette,
                opacity: WLConfig.particleOpacity,
                speedFactor: WLConfig.particleSpeedFactor,
                extensions: WLConfig.extensions,
                clipBounds: WLConfig.clipBounds,
                bounds: WLConfig.bounds,
                imageSmoothing: WLConfig.imageSmoothing,
              }),
            ]
          : []),
        ...(activeWeatherOptions.temp
          ? [
              new WeatherLayers.RasterLayer({
                id: "raster",
                image: rebaseTempImage,
                imageUnscale: WLConfig.tempUnscale,
                palette: WLConfig.tempPalette,
                opacity: WLConfig.rasterOpacity,
                extensions: WLConfig.extensions,
                clipBounds: WLConfig.clipBounds,
                bounds: WLConfig.bounds,
                imageSmoothing: WLConfig.imageSmoothing,
              }),
            ]
          : []),
        ...(activeWeatherOptions.hum
          ? [
              new WeatherLayers.RasterLayer({
                id: "raster",
                image: rebaseHumImage,
                imageUnscale: WLConfig.humUnscale,
                palette: WLConfig.humPalette,
                opacity: WLConfig.rasterOpacity,
                extensions: WLConfig.extensions,
                clipBounds: WLConfig.clipBounds,
                bounds: WLConfig.bounds,
                imageSmoothing: WLConfig.imageSmoothing,
              }),
            ]
          : []),
      ];

      deckOverlay.setProps({
        layers,
      });
    } catch (error) {
      console.error(
        "Something went wrong when adding weather layers or retrieving image(s): ",
        error
      );
    }
  };

  const getMarkerColor = (plant) => {
    if (switchOption == "Ice Loss") {
      return markerIceLoss(plant.id);
    } else if (switchOption == "Energy Production") {
      return markerEnergyProduction(plant.id, plant.capacity_kw);
    }
  };

  const markerIceLoss = (plantID) => {
    const energy = energyData[plantID - 1];
    const energyIceLoss = energyDataAfterIceLoss[plantID - 1];

    // Check if energy is zero or not a number (NaN) - if so: the iceLoss is 0, so the plant is not affected by it
    if (!energy || isNaN(energy) || energy == 0.0) {
      console.log(plantID, "Invalid energy value:", energy);
      return "#3BCA6D";
    }

    const ratio = 1 - energyIceLoss / energy; // the ratio represents the percentage of energy lost due to icing

    if (ratio > 0.9) {
      // Loss of energy due to icing is very high
      return "#fc6e51";
    } else if (ratio > 0.7) {
      return "#fcb941";
    } else if (ratio > 0.5) {
      return "#fed766";
    } else if (ratio > 0.3) {
      return "#b8e986";
    } else {
      return "#7bdcb5";
    }
  };

  const markerEnergyProduction = (plantID, capacity_kw) => {
    if (energyData == null) {
      return 0;
    }
    const current_energy = energyData[plantID - 1];
    const casted_energy = Number(current_energy);
    const capacity = capacity_kw / 1000; // From KW to MW
    const ratio = casted_energy / capacity;

    if (ratio > 0.8) {
      // Farm is producing almost at full capacity
      return "#7bdcb5";
    } else if (ratio > 0.6) {
      return "#b8e986";
    } else if (ratio > 0.4) {
      return "#fed766";
    } else if (ratio > 0.2) {
      return "#fcb941";
    } else {
      return "#fc6e51";
    }
  };

  //////////////////
  useEffect(() => {
    cancelRequest.current = true; // Signal to ignore results of any ongoing async operations

    if (map && selectedDate) {
      cancelRequest.current = false; // Reset for a new request
      // Initialize a new state for active layers
      const newActiveLayers = {
        wind: false,
        temp: false,
        hum: false,
      };

      // Iterate over the selectedLayer array and update newActiveLayers accordingly
      selectedLayer.forEach((layer) => {
        if (layer === "WindSpeed") {
          newActiveLayers.wind = true;
        } else if (layer === "Temperature") {
          newActiveLayers.temp = true;
        } else if (layer === "RelativeHumidity") {
          newActiveLayers.hum = true;
        }
      });

      popupRef.current?.trackPointer();

      const prefix = "./assets/weather_data/";
      const numTemp = parseInt(selectedTime, 10);
      const number = numTemp < 10 ? `0${numTemp}` : `${numTemp}`;
      const activeWeatherImages = {
        wind: prefix + "wind/wind_20211125" + number + ".png",
        temp: prefix + "temperature/temperature_20211125" + number + ".png",
        hum: prefix + "humidity/humidity_20211125" + number + ".png",
      };

      setWeatherLayers(activeWeatherImages, newActiveLayers);

      async function fetchData() {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();

        // Current energy production
        const energyPromises = plantsArray.map(async (item) => {
          try {
            const energy = await getProductionInHour(
              item.id,
              year,
              month,
              day,
              selectedTime
            );
            return energy;
          } catch (error) {
            console.error(
              `Failed to fetch energy data for plant ${item.id}`,
              error
            );
            return [0]; // Return 0 for this plant if there's an error
          }
        });

        // After fetching data, check if the request is still relevant
        Promise.all(energyPromises).then((energyResults) => {
          if (cancelRequest.current) return; // Ignore this result because a new request has been made
          setEnergyData(energyResults);
        });

        // Energy after Ice Loss
        const energyAfterIceLossPromises = plantsArray.map(async (item) => {
          try {
            const energy = await getProductionAfterIceLossInHour(
              item.id,
              year,
              month,
              day,
              selectedTime
            );
            return energy;
          } catch (error) {
            console.error(
              `Failed to fetch energy data after ice loss for plant ${item.id}`,
              error
            );
            return [0]; // Return 0 for this plant if there's an error
          }
        });

        // Resolve all promises and set the state
        Promise.all(energyAfterIceLossPromises).then((energyResults) => {
          if (cancelRequest.current) return; // Ignore this result because a new request has been made
          setEnergyDataAfterIceLoss(energyResults);
        });
      }

      if (selectedDate) {
        fetchData();
      }
    }
  }, [selectedLayer, selectedDate, selectedTime, map]);

  function formatCoordinates(coordinate, type) {
    const degrees = Math.abs(coordinate);
    const direction =
      coordinate >= 0
        ? type === "latitude"
          ? "N"
          : "E"
        : type === "latitude"
        ? "S"
        : "W";

    // Use toFixed(4) to get 4 decimal places for the degrees
    const formattedCoordinate = degrees.toFixed(4);

    // Return the formatted string
    return `${formattedCoordinate}° ${direction}`;
  }

  return (
    <div className="relative w-full h-full">
      <MapGL
        {...viewState}
        ref={mapRef}
        onMove={(evt) => setViewState(evt.viewState)}
        //onMoveStart={handleMoveStart}
        onClick={handleMapClick} // Use the new handler for map clicks
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/iv24/cltfp43bi003g01qx60ll6gci"
        projection={"mercator"}
        mapboxAccessToken={mapboxToken}
        //onViewportChange={(nextViewport) => setViewport(nextViewport)}
        onLoad={onMapLoad}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setPolygonHoverInfo(null)}
        interactiveLayerIds={["polygonLayer"]}
      >
        <Source id="polygonSource" type="geojson" data={geojson}>
          <Layer {...geojsonLayerStyle} />
        </Source>
        {polygonHoverInfo && !hoverInfo && (
          <Popup
            latitude={polygonHoverInfo.lat}
            longitude={polygonHoverInfo.lng}
            closeButton={false}
            closeOnClick={false}
            offsetTop={-30}
          >
            <div>
              <p>{polygonHoverInfo.zoneName}</p>
            </div>
          </Popup>
        )}
        {plantsArray.map((plant) => (
          <Marker
            key={plant.id}
            latitude={plant.latitude}
            longitude={plant.longitude}
            anchor="bottom"
          >
            <div
              onMouseEnter={() => setHoveredPlant(plant)}
              onMouseLeave={() => setHoveredPlant(null)}
              onClick={(event) => handleMarkerClick(plant, event)} // Pass the event to the click handler
              style={{ cursor: "pointer" }}
            >
              {(selectedPlant && selectedPlant.id === plant.id) ||
              (hoverInfo && hoverInfo.id === plant.id) ? (
                <img
                  src="/assets/pin_selected.svg"
                  style={{ width: "30px", height: "30px" }}
                />
              ) : (
                <MarkerIconComponent
                  getMarkerColor={() => getMarkerColor(plant)}
                  style={{ opacity: 0.7, width: "30px", height: "30px" }}
                />
              )}
            </div>
          </Marker>
        ))}

        {hoveredPlant && (
          <div>
            <Popup
              latitude={hoveredPlant.latitude}
              longitude={hoveredPlant.longitude}
              closeButton={false}
              closeOnClick={false}
              ref={popupRef}
              anchor="top"
              offsetTop={-30}
            >
              <div>
                <p className="font-bold text-xxl mb-1">{hoveredPlant.name}</p>
                <p className="text-xs font-thin mb-2">
                  {formatCoordinates(hoveredPlant.latitude, "latitude")},{" "}
                  {formatCoordinates(hoveredPlant.longitude, "longitude")}
                </p>
                <p>
                  <b>Capacity:</b>{" "}
                  <span className="font-blue">
                    {hoveredPlant.capacity_kw / 1000} MW
                  </span>
                </p>
                <p>
                  <b>Energy production: </b>
                  {allEnergyData && allEnergyData[(hoveredPlant.id)-1] !== undefined 
                    ? allEnergyData[(hoveredPlant.id)-1].toFixed(2) 
                    : 'Loading ...'}
                  {console.log("ICE LOSS ",icelossPercentage)}
                  <span className="font-blue">{} MW</span>
                </p>
                <p>
                  <b>Current ice-loss: </b>
                  {icelossPercentage && icelossPercentage[(hoveredPlant.id)-1] !== undefined 
                    ? icelossPercentage[(hoveredPlant.id)-1]
                    : 'Loading ...'}
                     <span className="font-red">%</span>
                </p>
                <p>
                  <b>Price area:</b>{" "}
                  <span className="font-blue">{hoveredPlant.price_area}</span>
                </p>
              </div>
            </Popup>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-4 flex justify-center">
          {children}
        </div>
      </MapGL>
    </div>
  );
}

export default MapComponent;
