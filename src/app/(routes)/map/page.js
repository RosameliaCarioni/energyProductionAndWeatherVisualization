"use client";

//import MapComponent from "@/components/MapComponent";
// Dynamically import the MapComponent with SSR disabled
import dynamic from "next/dynamic";
const MapComponentWithNoSSR = dynamic(
  () => import("@/components/MapComponent"),
  {
    ssr: false, // This line is key to making sure the import is client-side only
  }
);
import GraphComponent from "@/components/GraphComponent";
import { getProduction } from "@/utils/getFarmsProduction";
import { getWindSpeed } from "@/utils/getWindSpeed";
import TimeSliderComponent from "@/components/TimeSliderComponent";
import SimpleListOfFarmsComponent from "@/components/SimpleListOfFarmsComponent";
import "../../../output.css";
import { useState, useEffect } from "react";
import { getFarmsMeta } from "@/utils/getFarmsMetaData";

export default function Map() {
  const [energyData, setEnergyData] = useState(undefined);
  const [windData, setWindData] = useState(undefined);
  const [selectedPlant, setSelectedPlant] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState(12);
  const [selectedDate, setSelectedDate] = useState(new Date("2021-11-25"));
  const [plantsArray, setPlants] = useState([]);
  const [hoverInfo, setHoverInfo] = useState(undefined);

  const handleTimeChange = (newTime) => {
    setSelectedTime(newTime);
  };
  const handleDateChange = (newDate) => {
    const date = new Date(newDate);
    setSelectedDate(date);
  };
  const handlePlantSelect = (plant) => {
    setEnergyData(undefined);
    setWindData(undefined);
    setSelectedPlant(plant);
  };
  const handlePlantHover = (plant) => {
    setHoverInfo(plant);
  };

  useEffect(() => {
    async function fetchData() {
      if (!selectedPlant || !selectedDate) return;
      const energy = await getProduction(
        selectedPlant.id,
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        selectedDate.getDate()
      );
      setEnergyData(energy);

      const wind = await getWindSpeed(
        selectedPlant.id,
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        selectedDate.getDate()
      );
      setWindData(wind);
    }
    const fetchPlants = async () => {
      const plants = await getFarmsMeta();
      setPlants(plants);
    };
    fetchPlants();

    fetchData();
  }, [selectedPlant, selectedDate]);

  return (
    <div>
      <div className="ml-24 grid grid-col-2 vh-100">
        <div className="overflow-y">
          {selectedPlant && (
            <div className="py-5">
              <p>DETAIL VIEW</p>
              <h1 className="text-blue text-none">{selectedPlant.name}</h1>
              <div className="mb-8">
                <p className="text-xl font-bold mb-4">Energy Output</p>
                <GraphComponent
                  graphValues={energyData}
                  chartTitle="Energy Output [MW]"
                  selectedTime={selectedTime}
                  selectedDate={selectedDate}
                />
              </div>
              <div>
                <p className="text-xl font-bold mb-4">Windspeed</p>
                <GraphComponent
                  graphValues={windData}
                  chartTitle="Windspeed [m/s]"
                  selectedTime={selectedTime}
                  selectedDate={selectedDate}
                />
              </div>
            </div>
          )}
          {!selectedPlant && (
            <div className="py-5">
              <p>LIST VIEW</p>
              <SimpleListOfFarmsComponent
                plantsArray={plantsArray}
                hoverInfo={hoverInfo}
                onSelectPlant={handlePlantSelect}
                onHoverPlant={handlePlantHover}
              />
            </div>
          )}
        </div>

        <div>
          <MapComponentWithNoSSR
            className="mr-2"
            onSelectPlant={handlePlantSelect}
            selectedPlant={selectedPlant}
            plantsArray={plantsArray}
            onHoverPlant={handlePlantHover}
            hoverInfo={hoverInfo}
            selectedDate={selectedDate}
            selectedTime = {selectedTime}
          >
            <TimeSliderComponent
              onTimeChange={handleTimeChange}
              onDateChange={handleDateChange}
            />
          </MapComponentWithNoSSR>
        </div>
      </div>
    </div>
  );
}
