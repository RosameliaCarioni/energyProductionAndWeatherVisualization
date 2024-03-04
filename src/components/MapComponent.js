"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import * as WeatherLayersClient from "weatherlayers-gl/client";
import * as WeatherLayers from "weatherlayers-gl";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { ClipExtension } from "@deck.gl/extensions";
import MapGL, { Popup, Marker } from "react-map-gl";
import MarkerIconComponent from "./MarkerIconComponent";
import { getProductionInHour } from "@/utils/getFarmsProduction";

function MapComponent({
  onSelectPlant,
  selectedPlant,
  children,
  plantsArray,
  onHoverPlant,
  hoverInfo,
  selectedDate,
  selectedTime,
}) {
  const [viewState, setViewState] = useState({
    latitude: 60.472,
    longitude: 8.4689,
    zoom: 3,
  });
  const popupRef = useRef(null);
  const mapRef = useRef(null); // create a ref for the map
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const [energyData, setEnergyData] = useState(null); // Initialize state to hold your data

  const windSpeedPalette = [
    [0, [204, 229, 255]], // light blue
    [5, [100, 149, 237]], // cobalt blue
    [10, [60, 179, 113]], // sea green
    [15, [255, 193, 37]], // golden yellow
    [20, [255, 69, 0]], // red-orange
    [25, [148, 0, 211]], // dark violet
  ];

  const temperaturePalette = [
    [-40, [0, 0, 255]], // deep blue
    [-30, [100, 149, 237]], // deeper blue
    [-20, [135, 206, 250]], // blue
    [-10, [173, 216, 230]], // light blue
    [0, [255, 255, 255]], // white
    [10, [255, 255, 0]], // yellow
    [20, [255, 165, 0]], // orange
    [30, [255, 69, 0]], // red-orange
    [40, [255, 0, 0]], // red
  ];

  const humidityPalette = [
    [0, [255, 139, 0]], // deep orange
    [20, [255, 179, 71]], // lighter orange
    [40, [255, 214, 102]], // soft yellow
    [60, [204, 229, 255]], // light blue
    [80, [100, 149, 237]], // cobalt blue
    [100, [0, 0, 255]], // deep blue
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
    rasterOpacity: 0.5,
    // common properties for all layers
    extensions: [new ClipExtension()],
    clipBounds: [-23.5, 29.5, 45.0, 70.5],
    bounds: [-23.5, 29.5, 45.0, 70.5],

    tempPalette: temperaturePalette,
    tempUnscale: [-40, 40],

    humPalette: humidityPalette,
    humUnscale: [0, 100],
  };

  const handleMarkerClick = (plant, event) => {
    // Prevent the map click event from firing when a marker is clicked
    event.stopPropagation();
    
    if (selectedPlant && plant.id === selectedPlant.id) { // deselects it 
      onSelectPlant(undefined);
    } else { // selects a plant 
      onSelectPlant(plant);

    }
  };

  const handleMapClick = (event) => {
    // Use the map reference to check if the click was on the canvas
    if (mapRef.current && mapRef.current.getMap()) {
      const map = mapRef.current.getMap();
      const canvas = map.getCanvas();
      if (event.target === map) { // clicked on map - deselect farm 
        onSelectPlant(undefined);
      }
    }
  };
  

  //const handleMoveStart = () => {
  //  onSelectPlant(undefined);
  //};

  const handlePlantHover = (plant) => {
    onHoverPlant(plant);
  };

  const onMapLoad = useCallback(async (event) => {
    const map = event.target;

    const weatherLayersToken =
      process.env.NEXT_PUBLIC_WEATHERLAYERS_ACCESS_TOKEN;

    const client = new WeatherLayersClient.Client({
      accessToken: weatherLayersToken,
    });

    try {
      const rebaseWindImage = await WeatherLayers.loadTextureData(
        "./assets/weather-images/20211125_wind.png"
      );

      const rebaseTempImage = await WeatherLayers.loadTextureData(
        "./assets/weather-images/20211125_temp.png"
      );

      const rebaseHumImage = await WeatherLayers.loadTextureData(
        "./assets/weather-images/20211125_relative_humidity.png"
      );

      const deckOverlay = new MapboxOverlay({
        interleaved: true,
        layers: [
          // new WeatherLayers.RasterLayer({
          //   id: "raster",
          //   // data properties
          //   image: rebaseWindImage,
          //   imageType: "VECTOR",
          //   imageUnscale: WLConfig.imageUnscale,
          //   palette: WLConfig.palette,

          //   opacity: WLConfig.rasterOpacity,
          //   extensions: WLConfig.extensions,
          //   clipBounds: WLConfig.clipBounds,
          //   bounds: WLConfig.bounds,
          //   imageSmoothing: WLConfig.imageSmoothing,
          // }),
          new WeatherLayers.ParticleLayer({
            id: "particle",
            // data properties
            image: rebaseWindImage,
            // image2,
            //imageWeight,
            // imageType: "VECTOR",
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
          // new WeatherLayers.RasterLayer({
          //   id: "raster",
          //   // data properties
          //   image: rebaseTempImage,
          //   // imageType: "VECTOR",
          //   imageUnscale: WLConfig.tempUnscale,
          //   palette: WLConfig.tempPalette,

          //   opacity: WLConfig.rasterOpacity,
          //   extensions: WLConfig.extensions,
          //   clipBounds: WLConfig.clipBounds,
          //   bounds: WLConfig.bounds,
          //   imageSmoothing: WLConfig.imageSmoothing,
          // }),
          new WeatherLayers.RasterLayer({
            id: "raster",
            // data properties
            image: rebaseHumImage,
            // imageType: "VECTOR",
            imageUnscale: WLConfig.humUnscale,
            palette: WLConfig.humPalette,

            opacity: WLConfig.rasterOpacity,
            extensions: WLConfig.extensions,
            clipBounds: WLConfig.clipBounds,
            bounds: WLConfig.bounds,
            imageSmoothing: WLConfig.imageSmoothing,
          }),
        ],
      });

      map.addControl(deckOverlay);
    } catch (error) {
      console.error("Failed to load weather data:", error);
    }
  }, []);

  const getMarkerColor = (plantID, capacity_kw) => {
    if (energyData == null) {
      return 0;
    }
    const current_energy = energyData[plantID - 1];
    const casted_energy = Number(current_energy);
    const capacity = capacity_kw / 1000; // From KW to MW
    const ratio = casted_energy / capacity;
    //console.log('In marker ',' plant id: ', plantID,  '  capacity: ', capacity, 'current production: ', current_energy, ' date: ', selectedDate, ' time: ', selectedTime, ' ratio: ', ratio)
    if (ratio >= 1) {
      return "#44ce1b";
    } else if (ratio > 0.8) {
      return "#3BCA6D";
    } else if (ratio > 0.6) {
      return "#bbdb44";
    } else if (ratio > 0.4) {
      return "#f7e379";
    } else if (ratio > 0.2) {
      return "#f2a134";
    } else {
      return "#e51f1f";
    }
  };

  useEffect(() => {
    popupRef.current?.trackPointer();

    async function fetchData() {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth() + 1;
      const day = selectedDate.getDate();

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

      // Resolve all promises and set the state
      Promise.all(energyPromises).then((energyResults) => {
        setEnergyData(energyResults);
      });
    }

    if (selectedDate) {
      fetchData();
    }
  }, [selectedDate, selectedTime]);

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
        ref = {mapRef}
        onMove={(evt) => setViewState(evt.viewState)}
        //onMoveStart={handleMoveStart}
        onClick={handleMapClick} // Use the new handler for map clicks
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/iv24/clsq58r47006b01pk05dpavbj"
        projection={"mercator"}
        mapboxAccessToken={mapboxToken}
        //onViewportChange={(nextViewport) => setViewport(nextViewport)}
        onLoad={onMapLoad}
      >
        {plantsArray.map((plant) => (
          <Marker
            key={plant.id}
            latitude={plant.latitude}
            longitude={plant.longitude}
            anchor="bottom"
          >
            <div
              onMouseEnter={() => handlePlantHover(plant)}
              onMouseLeave={() => handlePlantHover(undefined)}
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
                  getMarkerColor={() =>
                    getMarkerColor(plant.id, plant.capacity_kw)
                  }
                  style={{ opacity: 0.7, width: "30px", height: "30px" }}
                />
              )}
            </div>
          </Marker>
        ))}

        {hoverInfo && (
          <div>
            <Popup
              latitude={hoverInfo.latitude}
              longitude={hoverInfo.longitude}
              closeButton={false}
              closeOnClick={false}
              ref={popupRef}
              anchor="top"
              offsetTop={-30}
            >
              <div>
                <p className="font-bold text-xxl mb-1">{hoverInfo.name}</p>
                <p className="text-xs font-thin mb-2">
                  {formatCoordinates(hoverInfo.latitude, "latitude")},{" "}
                  {formatCoordinates(hoverInfo.longitude, "longitude")}
                </p>
                <p>
                  <b>Capacity:</b>{" "}
                  <span className="font-blue">
                    {hoverInfo.capacity_kw / 1000} MW
                  </span>
                </p>
                <p>
                  <b>Current energy output:</b>{" "}
                  <span className="font-blue">XX kWh</span>
                </p>
                <p>
                  <b>Current ice-loss:</b> <span className="font-red">x%</span>
                </p>
                <p>
                  <b>Current wind speed:</b>{" "}
                  <span className="font-blue">12 m/s</span>
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
