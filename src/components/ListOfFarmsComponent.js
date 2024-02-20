"use client";
import '../../src/output.css';

import React, { useEffect, useState } from 'react';
import { getFarmsMeta } from "@/utils/getFarmsMetaData";
import Container from "@/components/ContainerComponent";
import GraphComponent from '@/components/GraphComponent';
import { getProduction } from "@/utils/getFarmsProduction";
import { getWindSpeed } from "@/utils/getWindSpeed";

export default function ListOfFarms(props) {
    
    const [data, setData] = useState(null); // Initialize state to hold your data
    const [energyData, setEnergyData] = useState(null)
    const [windData, setWindData] = useState(null)

    useEffect(() => {
      async function fetchData() {
          const metaResult = await getFarmsMeta();
          setData(metaResult);
  
          const parts = props.date.split('-');
          const year = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10);
          const day = parseInt(parts[2], 10);
  
          const energyPromises = metaResult.map(async (item) => {
              try {
                  const energy = await getProduction(item.id, year, month, day);
                  return energy;
              } catch (error) {
                  console.error(`Failed to fetch energy data for plant ${item.id}`, error);
                  return [0]; // Return 0 for this plant if there's an error
              }
          });
  
          const windPromises = metaResult.map(async (item) => {
              try {
                  const wind = await getWindSpeed(item.id, year, month, day);
                  return wind;
              } catch (error) {
                  console.error(`Failed to fetch wind data for plant ${item.id}`, error);
                  return [0]; // Return 0 for this plant if there's an error
              }
          });
  
          // Resolve all promises and set the state
          Promise.all(energyPromises).then(energyResults => {
              setEnergyData(energyResults);
          });
  
          Promise.all(windPromises).then(windResults => {
              setWindData(windResults);
          });
      }
  
      if (props.date) {
          fetchData();
      }
  }, [props.date]);
  

    console.log("Energy Array",energyData)

    return (
      <div className="flex flex-col gap-5 py-5" as="main">
          {data?.map((item, index) => (
              <div key={item.id} className="overflow-hidden"> {/* Use item.id as key if it's unique */}
                  {/* Display the name in a text box */}
                  <h2 className='text-none font-normal'>{item.name}</h2>

                  <div className='flex '>
                    {/* Energy Output Graph */}
                    {console.log("DATA ",energyData)}
                    <GraphComponent 
                        graphValues={energyData && energyData[index] ? energyData[index] : new Array(24).fill(0)} 
                        chartTitle="Energy Output"
                    />
    
                    {/* Wind Data Graph */}
                    <GraphComponent 
                        graphValues={windData && windData[index] ? windData[index] : new Array(24).fill(0)} 
                        chartTitle="Wind Data"
                    />
                  </div>
              </div>
          ))}
      </div>
  );
  
}
