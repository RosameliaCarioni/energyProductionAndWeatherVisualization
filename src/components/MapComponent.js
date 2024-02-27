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
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const [energyData, setEnergyData] = useState(null); // Initialize state to hold your data


  const windSpeedPalette = [
    [0, "#ffffff"], // white
    // [10, '#85ff73'], // green
    // [12, '#f6ff73'], // yellow
    // [17, '#ffde73'], // orange
    [30, "#f76060"], // red
  ];

  const WLConfig = {
    // particle layer
    particleWidth: 2,
    particleMaxAge: 25,
    particlePalette: windSpeedPalette,
    particleOpacity: 0.8,
    patricleSpeedFactor: 5,
    imageSmoothing: 5,
    imageUnscale: [-127, 128],
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
  };

  const handleMarkerClick = (plant) => {
    if (selectedPlant && plant.id === selectedPlant.id) {
      // Deselect the currently selected plant
      onSelectPlant(undefined);
    } else {
      // Select the clicked plant
      onSelectPlant(plant);
    }
  };

  const handleMoveStart = () => {
    onSelectPlant(undefined);
  };

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

      const deckOverlay = new MapboxOverlay({
        interleaved: true,
        layers: [
          new WeatherLayers.ParticleLayer({
            id: "particle",
            // data properties
            image: rebaseWindImage,
            // image2,
            //imageWeight,
            // imageType: "VECTOR",
            imageUnscale: WLConfig.imageUnscale,
            bounds: [-180, -90, 180, 90],
            width: WLConfig.particleWidth,
            maxAge: WLConfig.particleMaxAge,
            palette: WLConfig.particlePalette,
            opacity: WLConfig.particleOpacity,
            speedFactor: WLConfig.patricleSpeedFactor,
            extensions: WLConfig.extensions,
            clipBounds: WLConfig.clipBounds,
            imageSmoothing: WLConfig.imageSmoothing,
          }),
          // new WeatherLayers.RasterLayer({
          //   id: 'raster',
          //   // data properties
          //   image,
          //   image2,
          //   imageWeight,
          //   imageType,
          //   imageUnscale,
          //   bounds,
          //   // style properties
          //   palette,
          //   opacity: WLConfig.rasterOpacity,
          //   extensions: WLConfig.extensions,
          //   clipBounds: WLConfig.clipBounds,
          // }),
        ],
      });

      map.addControl(deckOverlay);
    } catch (error) {
      console.error("Failed to load weather data:", error);
    }
  }, []);

  const getMarkerColor = (plantID, capacity_kw) => {
    if (energyData == null) {
      return 0
    } 
    const current_energy = energyData[plantID];
    const casted_energy = Number(current_energy); 
    const capacity = capacity_kw/1000;  // From KW to MW 
    const ratio = casted_energy / capacity; 
   //console.log('plant id: ', plantID,  '  capacity: ', typeof(capacity), 'ratio: ', ratio)

  
   if (ratio > 1){
    return '#44ce1b';
   } else if ( ratio > 0.8){
    return '#3BCA6D'; 
   }else if (ratio > 0.6){
    return '#bbdb44'; 
   } else if (ratio > 0.4){
    return '#f7e379'; 
   }else if (ratio > 0.2){
    return '#f2a134'; 
   } else{
    return '#e51f1f';
   }

  } 


  useEffect(() => {
    popupRef.current?.trackPointer();
    
    async function fetchData() {
        const year = selectedDate.getFullYear();
        const month = selectedDate.getMonth() + 1;
        const day = selectedDate.getDate();
       

        const energyPromises = plantsArray.map(async (item) => {  
            try {
                const energy = await getProductionInHour(item.id, year, month, day, selectedTime);
                return energy;
            } catch (error) {
                console.error(`Failed to fetch energy data for plant ${item.id}`, error);
                return [0]; // Return 0 for this plant if there's an error
            }
        });

        // Resolve all promises and set the state
        Promise.all(energyPromises).then(energyResults => {
            setEnergyData(energyResults);
        });

    }

    if (selectedDate) {
        fetchData();
    }
}, [selectedDate, selectedTime]);

function formatCoordinates(coordinate, type) {
  const degrees = Math.abs(coordinate);
  const direction = coordinate >= 0 ? (type === 'latitude' ? 'N' : 'E') : (type === 'latitude' ? 'S' : 'W');

  // Use toFixed(4) to get 4 decimal places for the degrees
  const formattedCoordinate = degrees.toFixed(4);

  // Return the formatted string
  return `${formattedCoordinate}° ${direction}`;
}

return (
  <div className="relative w-full h-full">
    <MapGL
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      onMoveStart={handleMoveStart}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/iv24/clsq58r47006b01pk05dpavbj"
      projection={"mercator"}
      mapboxAccessToken={mapboxToken}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
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
            onMouseEnter={() => {
              handlePlantHover(plant);
            }}
            onMouseLeave={() => handlePlantHover(undefined)}
            onClick={() => handleMarkerClick(plant)}
            style={{ cursor: "pointer" }}
          >
            {
              (selectedPlant && selectedPlant.id === plant.id) ||
              (hoverInfo && hoverInfo.id === plant.id) ? (
                <img
                  src="/assets/pin_selected.svg"
                  style={{ width: "30px", height: "30px" }}
                />
              ) : (
                <MarkerIconComponent 
                getMarkerColor={() => getMarkerColor(plant.id, plant.capacity_kw)}
                style={{opacity: 0.7, width: "30px", height: "30px"}}
                />
              )
            }
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
              <p className="text-xs font-thin mb-2">{formatCoordinates(hoverInfo.latitude, 'latitude')}, {formatCoordinates(hoverInfo.longitude, 'longitude')}</p>              
              <p><b>Capacity:</b> <span className="font-blue">{hoverInfo.capacity_kw / 1000} MW</span></p>
              <p><b>Current energy output:</b> <span className="font-blue">XX kWh</span></p>
              <p><b>Current ice-loss:</b> <span className="font-red">x%</span></p>
              <p><b>Current wind speed:</b> <span className="font-blue">12 m/s</span></p>
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
