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
import {
  getProduction,
  getEnergyAfterIceLoss,
  getWindSpeed,
} from "@/utils/getFarmsProduction";
import TimeSliderComponent from "@/components/TimeSliderComponent";
import SimpleListOfFarmsComponent from "@/components/SimpleListOfFarmsComponent";
import "../../../output.css";
import { useState, useEffect } from "react";
import { getFarmsMeta } from "@/utils/getFarmsMetaData";
import EnergyProductionLegendComponent from "@/components/EnergyProductionLegendComponent";
import GraphIcelossComponenet from "@/components/GraphIcelossComponent";

export default function Map() {
  const [energyData, setEnergyData] = useState(undefined);
  const [windData, setWindData] = useState(undefined);
  const [icelossData, setEnergyAfterIcelossData] = useState(undefined);
  const [selectedPlant, setSelectedPlant] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState(12);
  const [selectedDate, setSelectedDate] = useState(new Date("2021-11-25"));
  const [plantsArray, setPlants] = useState([]);
  const [hoverInfo, setHoverInfo] = useState(undefined);
  const [selectedGraphs, setSelectedGraphs] = useState(["ws", "ice"]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const graphTypes = ["ws", "hum", "temp", "ice"];

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
    setEnergyAfterIcelossData(undefined);
    setSelectedPlant(plant);
  };
  const handlePlantHover = (plant) => {
    setHoverInfo(plant);
  };
  const handleClickClose = () => {
    setSelectedPlant(undefined);
  };
  const handleGraphSelection = (graph) => {
    setSelectedGraphs((prevSelectedGraphs) => {
      if (prevSelectedGraphs.includes(graph)) {
        return prevSelectedGraphs.filter((g) => g !== graph);
      } else {
        return [...prevSelectedGraphs, graph];
      }
    });
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const [searchInput, setSearchInput] = useState("");
  const [filteredPlantsArray, setFilteredPlantsArray] = useState(plantsArray);

  const handleSearchInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);

    const filteredArray = plantsArray.filter((plant) =>
      plant.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    setFilteredPlantsArray(filteredArray);
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

      const energyAfterIceloss = await getEnergyAfterIceLoss(
        selectedPlant.id,
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        selectedDate.getDate()
      );
      setEnergyAfterIcelossData(energyAfterIceloss);

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
              <div className="flex justify-between items-center w-full">
                <p>DETAIL VIEW</p>
                <button className="mr-4" onClick={handleClickClose}>
                  CLOSE
                </button>
              </div>

              <div className="flex justify-between items-center w-full">
                <h1 className="font-blue text-none">{selectedPlant.name}</h1>
                <div className="relative mr-4">
                  <button
                    onClick={toggleDropdown}
                    className="px-4 py-2 bg-gray-200"
                  >
                    Graph Types
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute mt-1 w-48 bg-white shadow-md z-10">
                      {graphTypes.map((type) => (
                        <div key={type} className="flex items-center p-2">
                          <input
                            type="checkbox"
                            id={type}
                            checked={selectedGraphs.includes(type)}
                            onChange={() => handleGraphSelection(type)}
                            className="mr-2"
                          />
                          <label htmlFor={type}>{type.toUpperCase()}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-8">
                <p className="text-xl font-bold mb-4">
                  Energy and Iceloss Output
                </p>
                {selectedGraphs.includes("ice") && (
                  <GraphIcelossComponenet
                    energyData={energyData}
                    icelossData={icelossData}
                    chartTitle="Energy Output [MW]"
                    selectedTime={selectedTime}
                    selectedDate={selectedDate}
                  />
                )}
              </div>
              <div>
                {selectedGraphs.includes("ws") && (
                  <GraphComponent
                    graphValues={windData}
                    chartTitle="Windspeed"
                    selectedTime={selectedTime}
                    selectedDate={selectedDate}
                    yAxisTitle="m/s"
                  />
                )}
              </div>
            </div>
          )}
          {!selectedPlant && (
            <div className="py-5">
              <p>LIST VIEW</p>
              <h1>All Farms</h1>
              <input
                type="text"
                placeholder="Search by plant name"
                value={searchInput}
                onChange={handleSearchInputChange}
                className="font-black px-2 mb-4"
              />
              <SimpleListOfFarmsComponent
                plantsArray={searchInput ? filteredPlantsArray : plantsArray}
                hoverInfo={hoverInfo}
                onSelectPlant={handlePlantSelect}
                onHoverPlant={handlePlantHover}
              />
            </div>
          )}
        </div>

        <div className="w-full">
          <MapComponentWithNoSSR
            className="mr-2"
            onSelectPlant={handlePlantSelect}
            selectedPlant={selectedPlant}
            plantsArray={searchInput ? filteredPlantsArray : plantsArray}
            onHoverPlant={handlePlantHover}
            hoverInfo={hoverInfo}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
          >
            <div className="flex flex-col items-end w-full">
              <EnergyProductionLegendComponent />
              <TimeSliderComponent
                onTimeChange={handleTimeChange}
                onDateChange={handleDateChange}
              />
            </div>
          </MapComponentWithNoSSR>
        </div>
      </div>
    </div>
  );
}
