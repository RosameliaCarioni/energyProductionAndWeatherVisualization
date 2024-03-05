"use client"
import { useState } from "react";
import SelectWeatherDisplayComponent from "@/components/SelectWeatherDisplayComponent"

export default function Graphs() {
  //fetching the plant data
  //const energyData = await getProduction(6, 2021, 6, 19);
  //console.log("Energydata:", energyData);
  //fetching the wind data
  //const windData = await getWindSpeed(6, 2021, 6, 19);
  //console.log("Winddata:", windData);
  const [selectedLayer, setSelectedLayer] = useState("WindSpeed");


  const handleLayerChange = (newLayer) => {
    setSelectedLayer(newLayer);
  };

  return (
    <div>
      <h1>First graph</h1>
      { <SelectWeatherDisplayComponent onLayerChange={handleLayerChange} />}
      { console.log("LAYER ",selectedLayer)}
      
    </div>
  );  
}
