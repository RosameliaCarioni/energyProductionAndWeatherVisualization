"use client"

import MapComponent from "@/components/MapComponent";
import GraphComponent from "@/components/GraphComponent";
import { getProduction } from "@/utils/getFarmsProduction";
import { getWindSpeed } from "@/utils/getWindSpeed";
import '../../../output.css';
import { useState, useEffect } from "react";

export default function Map() {
  const [energyData, setEnergyData] = useState(null);
  const [windData, setWindData] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const handleSelectPlant = (plant) => {
    setSelectedPlant(plant);
  };

    useEffect(() => {
      async function fetchData() {
          const energy = await getProduction(6, 2021, 6, 19);
          setEnergyData(energy);

          const wind = await getWindSpeed(6, 2021, 6, 19);
          setWindData(wind);
      }
      
      fetchData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
        <div class="flex flex-col space-y-4">
            <div className="mb-8">
                <h1 className="text-xl font-bold mb-4">Energy Output</h1>
                <GraphComponent graphValues={energyData} chartTitle="Energy Output" />
            </div>
            <div>
                <h1 className="text-xl font-bold mb-4">Windspeed</h1>
                <GraphComponent graphValues={windData} chartTitle="Windspeed" />
            </div>
        </div>

        <div>
            {selectedPlant && <h1>Selected plant is {selectedPlant.name}</h1>}
            <MapComponent onSelectPlant={handleSelectPlant}/>
        </div>
    </div>
  );


  
  
  
    
    
    
}
