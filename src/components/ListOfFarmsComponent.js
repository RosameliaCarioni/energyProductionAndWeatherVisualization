"use client";
import "../../src/output.css";

import React, { useEffect, useState } from "react";
import { getFarmsMeta } from "@/utils/getFarmsMetaData";
import Container from "@/components/ContainerComponent";
import GraphComponent from "@/components/GraphComponent";
import { getProduction } from "@/utils/getFarmsProduction";
import { getTemperature } from "@/utils/getFarmsProduction";
import { getWindSpeed } from "@/utils/getFarmsProduction";
import { getEnergyAfterIceLoss } from "@/utils/getFarmsProduction";
import { getRelativeHumidity } from "@/utils/getFarmsProduction";
import { getWindDirection } from "@/utils/getFarmsProduction";
import GraphIcelossComponenet from "./GraphIcelossComponent";

export default function ListOfFarms({ date, selectedPriceArea }) {
  //const { date, selectedPriceArea } = props;  // Destructure date and selectedPriceArea from props

  const [data, setData] = useState(null); // Initialize state to hold your data
  const [energyData, setEnergyData] = useState(null);
  const [windSpeed, setwindSpeed] = useState(null);
  const [temperature, setTemperatureData] = useState(null);
  const [energyAfterIceLoss, setEnergyAfterIceLoss] = useState(null);
  const [relativeHumidity, setRelativeHumidity] = useState(null);
  const [windDirection, setWindDirection] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const metaResult = await getFarmsMeta();
      // Filter metaResult based on selectedPriceArea (which can contain multiple areas)
      const filteredMetaResult =
        selectedPriceArea && selectedPriceArea.length > 0
          ? metaResult.filter((item) =>
              selectedPriceArea.includes(item.price_area)
            )
          : metaResult;
      setData(filteredMetaResult);

      const parts = date.split("-");
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);

      const energyPromises = metaResult.map(async (item) => {
        try {
          const energy = await getProduction(item.id, year, month, day);
          return energy;
        } catch (error) {
          console.error(
            `Failed to fetch energy data for plant ${item.id}`,
            error
          );
          return [0]; // Return 0 for this plant if there's an error
        }
      });

      const windPromises = metaResult.map(async (item) => {
        try {
          const wind = await getWindSpeed(item.id, year, month, day);
          return wind;
        } catch (error) {
          console.error(
            `Failed to fetch wind data for plant ${item.id}`,
            error
          );
          return [0]; // Return 0 for this plant if there's an error
        }
      });

      const temperaturePromises = metaResult.map(async (item) => {
        try {
          const temperature = await getTemperature(item.id, year, month, day);
          return temperature;
        } catch (error) {
          console.error(
            `Failed to fetch wind data for plant ${item.id}`,
            error
          );
          return [0]; // Return 0 for this plant if there's an error
        }
      });
      const energyAfterIceLossPromises = metaResult.map(async (item) => {
        try {
          const energyAfterIceLoss = await getEnergyAfterIceLoss(
            item.id,
            year,
            month,
            day
          );
          return energyAfterIceLoss;
        } catch (error) {
          console.error(
            `Failed to fetch wind data for plant ${item.id}`,
            error
          );
          return [0]; // Return 0 for this plant if there's an error
        }
      });
      const relativeHumidityPromises = metaResult.map(async (item) => {
        try {
          const relativeHumidity = await getRelativeHumidity(
            item.id,
            year,
            month,
            day
          );
          return relativeHumidity;
        } catch (error) {
          console.error(
            `Failed to fetch wind data for plant ${item.id}`,
            error
          );
          return [0]; // Return 0 for this plant if there's an error
        }
      });

      const windDirectionPromises = metaResult.map(async (item) => {
        try {
          const windDirection = await getWindDirection(
            item.id,
            year,
            month,
            day
          );
          return windDirection;
        } catch (error) {
          console.error(
            `Failed to fetch wind data for plant ${item.id}`,
            error
          );
          return [0]; // Return 0 for this plant if there's an error
        }
      });

      // Resolve all promises and set the state
      Promise.all(energyPromises).then((energyResults) => {
        setEnergyData(energyResults);
      });

      Promise.all(windPromises).then((windResults) => {
        setwindSpeed(windResults);
      });

      Promise.all(temperaturePromises).then((temperatureResults) => {
        setTemperatureData(temperatureResults);
      });
      Promise.all(energyAfterIceLossPromises).then(
        (energyAfterIceLossResults) => {
          setEnergyAfterIceLoss(energyAfterIceLossResults);
        }
      );
      Promise.all(relativeHumidityPromises).then((relativeHumidityResults) => {
        setRelativeHumidity(relativeHumidityResults);
      });
      Promise.all(windDirectionPromises).then((windDirectionResults) => {
        setWindDirection(windDirectionResults);
      });
    }

    if ((date, selectedPriceArea)) {
      fetchData();
    }
  }, [date, selectedPriceArea]);

  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredData = data?.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  //console.log("Energy Array",energyData)

  return (
    <div className="flex flex-col gap-5 py-5" as="main">
      <input
        type="text"
        placeholder="Search by plant name"
        value={searchInput}
        onChange={handleSearchInputChange}
        className="font-black px-2 mb-4 w-33"
      />
      {filteredData?.map((item, index) => (
        <div key={item.id} className="overflow-hidden">
          {" "}
          {/* Use item.id as key if it's unique */}
          {/* Display the name in a text box */}
          <h2 className="text-none font-normal">{item.name}</h2>
          <div className="flex ">
            {/* Energy Output Graph */}
            <GraphIcelossComponenet
              energyData={
                energyData && energyData[index]
                  ? energyData[index]
                  : new Array(24).fill(0)
              }
              icelossData={
                energyAfterIceLoss && energyAfterIceLoss[index]
                  ? energyAfterIceLoss[index]
                  : new Array(24).fill(0)
              }
              maxCapacity={item.capacity_kw}
            />
            {/* Iceloss Data Graph */}
            <GraphComponent
              graphValues={
                energyAfterIceLoss && energyAfterIceLoss[index]
                  ? energyAfterIceLoss[index]
                  : new Array(24).fill(0)
              }
              chartTitle="Iceloss"
              yAxisTitle="%"
              lineColor="rgb(255, 99, 132)"
              lineBackgroundColor="rgb(255, 99, 132, 0.35)"
            />
            {/* Wind Data Graph */}
            <GraphComponent
              graphValues={
                windSpeed && windSpeed[index]
                  ? windSpeed[index]
                  : new Array(24).fill(0)
              }
              chartTitle="Wind Speed"
              yAxisTitle="m/s"
              lineColor="rgb(199, 218, 242)"
              lineBackgroundColor="rgb(199, 218, 242, 0.35)"
            />

            {/* Temperature Data Graph */}
            <GraphComponent
              graphValues={
                temperature && temperature[index]
                  ? temperature[index]
                  : new Array(24).fill(0)
              }
              chartTitle="Temperature"
              yAxisTitle="°C"
              lineColor="rgb(199, 218, 242)"
              lineBackgroundColor="rgb(199, 218, 242, 0.35)"
            />

            {/* energyAfterIceLoss Data Graph */}
            <GraphComponent
              graphValues={
                energyAfterIceLoss && energyAfterIceLoss[index]
                  ? energyAfterIceLoss[index]
                  : new Array(24).fill(0)
              }
              chartTitle="energyAfterIceLoss"
              yAxisTitle="MW"
              lineColor="rgb(199, 218, 242)"
              lineBackgroundColor="rgb(199, 218, 242, 0.35)"
            />

            {/* relativeHumidity Data Graph */}
            <GraphComponent
              graphValues={
                relativeHumidity && relativeHumidity[index]
                  ? relativeHumidity[index]
                  : new Array(24).fill(0)
              }
              chartTitle="relativeHumidity"
              yAxisTitle="RH"
              lineColor="rgb(199, 218, 242)"
              lineBackgroundColor="rgb(199, 218, 242, 0.35)"
            />

            {/* windDirection Data Graph */}
            <GraphComponent
              graphValues={
                windDirection && windDirection[index]
                  ? windDirection[index]
                  : new Array(24).fill(0)
              }
              chartTitle="windDirection"
              yAxisTitle="?"
              lineColor="rgb(199, 218, 242)"
              lineBackgroundColor="rgb(199, 218, 242, 0.35)"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
