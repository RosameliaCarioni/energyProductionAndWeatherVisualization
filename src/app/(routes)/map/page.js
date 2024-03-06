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
import EnergyAfterIceLossLegendComponent from "@/components/EnergyAfterIceLossLegendComponent";
import GraphIcelossComponenet from "@/components/GraphIcelossComponent";
import SelectWeatherDisplayComponent from "@/components/SelectWeatherDisplayComponent";
import EnergyIceLossSwitchButton from "@/components/EnergyIceLossSwitchButton";
import ModelSelectComponent from "@/components/ModelSelectComponent"; 
import FilterPropertiesComponent from "@/components/FilterPropertiesComponent";


export default function Map() {
  const [energyData, setEnergyData] = useState(undefined);
  const [allEnergyData, setAllEnergyData] = useState(undefined)
  const [windData, setWindData] = useState(undefined);
  const [icelossData, setEnergyAfterIcelossData] = useState(undefined);
  const [selectedPlant, setSelectedPlant] = useState(undefined);
  const [selectedTime, setSelectedTime] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date("2021-11-25"));
  const [plantsArray, setPlants] = useState([]);
  const [hoverInfo, setHoverInfo] = useState(undefined);
  const [selectedGraphs, setSelectedGraphs] = useState(["ws", "ice"]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentSwitchOption, setCurrentSwitchOption] = useState('Energy Production');
  const [selectedLayer, setSelectedLayer] = useState(["WindSpeed"]);

  const graphTypes = ["ws", "hum", "temp", "ice"];
  // Add a state to keep track of the sorting
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  

  // Function to handle the sort order change
  const handleSortOrderChange = (selectedProperty, order) => {
    // If the selected model is "Alphabetical", then sort by the plant's name
    if (selectedProperty === 'Alphabetically') {
      setSortConfig({ key: 'name', direction: order });
    }
    if (selectedProperty === 'Energy Production') {
      setSortConfig({key : 'production', direction: order})
    }
    if (selectedProperty === 'Capacity') {
      setSortConfig({ key: 'capacity_kw', direction: order });
    }
    if (selectedProperty === 'North to South') {
      setSortConfig({ key: 'latitude', direction: order });
    }
    if (selectedProperty === 'West to East') {
      setSortConfig({ key: 'longitude', direction: order });
    }
    if (selectedProperty === 'Energy After Ice Loss') {
      setSortConfig({ key: 'productionIceLoss', direction: order });
    }
    // Implement sorting logic for other cases if needed...
  };

  const handleSwitchChange = (option) => {
    setCurrentSwitchOption(option);
  };

  const handleLayerChange = (newLayer) => {
    setSelectedLayer(newLayer);
  };
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
    // Fetch plants and handle sorting whenever sortConfig changes
    const fetchPlants = async () => {
      //let plants = await getFarmsMeta();
      
    
      plantsArray.sort((a, b) => {
          let aValue = a[sortConfig.key];
          let bValue = b[sortConfig.key];
        
          // Check if the sorting is supposed to be numeric
          if (sortConfig.key !== 'name') { // Assuming 'name' is the key for alphabetic sorting
            aValue = parseFloat(aValue);
            bValue = parseFloat(bValue);
          } else { // For alphabetic sorting, convert to lowercase for case-insensitive comparison
            aValue = aValue.toLowerCase();
            bValue = bValue.toLowerCase();
          }
        
          if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
          return 0;
        });

      let productionValues = plantsArray.map(plant => plant.production);  
      setAllEnergyData(productionValues); // Update your state or variable that holds allEnergyData
      }

      fetchPlants();

    },[sortConfig]);
    


  useEffect(() => {
    // Define a new function that will fetch energy data for all plants
    const fetchEnergyDataForAllPlants = async (plants) => {
      let plantWithProduction = []; // Declare plantWithProduction here to increase its scope

      // Map over the plants and get the energy data for each plant
      const promises = plants.map(plant => getProduction(
        plant.id,
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        selectedDate.getDate()
      ));
  
      // Resolve all the promises
      const results = await Promise.all(promises);
      // Update the state with the fetched energy data
      const resultsForHour = results.map(plantData => {
        return plantData[selectedTime] ? parseFloat(plantData[selectedTime]) : null;
      });
      setAllEnergyData(resultsForHour);
      // Check if resultsForHour contains any non-null values
      if (resultsForHour.some(value => value !== null)) {
        // Add 'production' field to each plant and create a new array for production values
        plantWithProduction = plants.map((plant, index) => {
        // Add the 'production' field to each plant object
        plant.production = resultsForHour[index];
        // Return the production value to build the productionValues array
        return plant;
      });
        setPlants(plantWithProduction)
      }
    };

    const fetchIceLossDataForAllPlants = async (plants) => {
      let plantWithIceLoss = []; // Declare plantWithProduction here to increase its scope

      // Map over the plants and get the energy data for each plant
      const promises = plants.map(plant => getEnergyAfterIceLoss(
        plant.id,
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        selectedDate.getDate()
      ));
  
      // Resolve all the promises
      const results = await Promise.all(promises);
      // Update the state with the fetched energy data
      const resultsForHour = results.map(plantData => {
        return plantData[selectedTime] ? parseFloat(plantData[selectedTime]) : null;
      });
      //setAllIceLossData(resultsForHour);
      // Check if resultsForHour contains any non-null values
      if (resultsForHour.some(value => value !== null)) {
        // Add 'production' field to each plant and create a new array for production values
        plantWithIceLoss = plants.map((plant, index) => {
        // Add the 'production' field to each plant object
        plant.productionIceLoss = resultsForHour[index];
        // Return the production value to build the productionValues array
        return plant;
      });
        setPlants(plantWithIceLoss)
      }
    };
  
    const fetchPlants = async () => {
      const plants = await getFarmsMeta();
      setPlants(plants);
      // After fetching the plants, fetch the energy data for all plants
      fetchEnergyDataForAllPlants(plants);
      fetchIceLossDataForAllPlants(plants);
    };
    
    // Call the fetchPlants function when the component mounts
    fetchPlants();
  }, [selectedDate, selectedTime]); // Dependence on selectedDate to re-fetch if it changes

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
      <div className="ml-16 grid grid-col-2 vh-100">
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
                    <div className="absolute mt-1 w-48 bg-dark shadow-md z-10 p-3">
                      {graphTypes.map((type) => (
                        <div key={type} className="flex items-center">
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
                {selectedGraphs.includes("ice") && (
                  <GraphIcelossComponenet
                    energyData={energyData}
                    icelossData={icelossData}
                    selectedTime={selectedTime}
                    selectedDate={selectedDate}
                    maxCapacity={selectedPlant.capacity_kw}
                    yAxisTitle="MW"
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
              <div>
                {selectedGraphs.includes("hum") && (
                  <GraphComponent
                    graphValues={windData}
                    chartTitle="Humidity"
                    selectedTime={selectedTime}
                    selectedDate={selectedDate}
                    yAxisTitle="RH"
                  />
                )}
              </div>
              <div>
                {selectedGraphs.includes("temp") && (
                  <GraphComponent
                    graphValues={windData}
                    chartTitle="Temperature"
                    selectedTime={selectedTime}
                    selectedDate={selectedDate}
                    yAxisTitle="°C"
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
              <FilterPropertiesComponent onSortOrderChange={handleSortOrderChange}/>
          
              <SimpleListOfFarmsComponent
                plantsArray={searchInput ? filteredPlantsArray : plantsArray}
                energyData={allEnergyData}
                selectedHour={selectedTime}
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
            switchOption={currentSwitchOption}
            selectedLayer={selectedLayer}
          >
             <ModelSelectComponent />
            <EnergyIceLossSwitchButton onSwitchChange={handleSwitchChange} />
            <div className="flex flex-col items-end w-full">
              {currentSwitchOption === 'Energy Production' ? (
                <EnergyProductionLegendComponent />
              ) : (
                <EnergyAfterIceLossLegendComponent />
              )}
              <TimeSliderComponent
                onTimeChange={handleTimeChange}
                onDateChange={handleDateChange}
              />
            </div>
            <SelectWeatherDisplayComponent onLayerChange={handleLayerChange} />
          </MapComponentWithNoSSR>
        </div>
      </div>
    </div>
  );
}
