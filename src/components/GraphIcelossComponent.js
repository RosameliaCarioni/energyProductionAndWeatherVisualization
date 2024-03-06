"use client";
import React, { useState, useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Colors,
} from "chart.js";
import { Line } from "react-chartjs-2";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
  Colors
);

function GraphIcelossComponenet({
  energyData, // New prop for energy data
  icelossData, // New prop for iceloss data
  chartTitle,
  selectedTime,
  selectedDate,
  maxCapacity,
  yAxisTitle,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const selectedLabel = `${selectedTime}`;
  const chartData = {
    labels: [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
    ],
    datasets: [
      {
        label: "Energy Output",
        data: !isLoading ? energyData : Array(24).fill(0),
        borderColor: !isLoading ? "rgb(135, 211, 184)" : "rgb(30, 30, 30)",
        backgroundColor: "rgb(135, 211, 184, 0.35)",
      },
      {
        label: "Max Capacity",
        data: !isLoading
          ? Array(24).fill(maxCapacity / 1000)
          : Array(24).fill(0),
        borderColor: "rgb(255, 231, 104)", // Yellow color for imax capacity
        backgroundColor: "rgb(255, 231, 104, 0.35)",
        pointRadius: 0,
        borderWidth: 1,
      },
    ],
  };
  // Options remain unchanged
  const options = {
    elements: {
      //point: { pointRadius: 0 },
    },
    maintainAspectRatio: false,
    stepped: true,
    scales: {
      y: {
        grid: {
          color: "rgb(98,98,98)",
        },
        ticks: {
          color: "rgb(214,214,214)",
        },
        title: {
          display: true,
          text: "MW",
          padding: 2,
          color: "rgb(214,214,214)",
        },
        beginAtZero: true,
      },
      x: {
        grid: {
          color: "rgb(98,98,98)",
        },
        ticks: {
          color: "rgb(214,214,214)",
          maxRotation: 0,
          minRotation: 0,
        },

        title: {
          display: true,
          text: "Power Hour",
          padding: 2,
          color: "rgb(214,214,214)",
        },
      },
    },

    plugins: {
      legend: {
        labels: {
          color: "rgb(214,214,214)",
          fontSize: 18,
        },
      },
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: 0,
            yMax: "max",
            xMin: chartData.labels.indexOf(selectedLabel),
            xMax: chartData.labels.indexOf(selectedLabel),
            //colors controlling the timeslider
            borderColor: "rgba(255, 0, 0)",
            borderWidth: 3,
          },
        },
      },
    },
  };

  useEffect(() => {
    if (
      (energyData && energyData.length > 0) ||
      (icelossData && icelossData.length > 0)
    ) {
      setIsLoading(false);
    } else {
      console.log("loading");
      setIsLoading(true);
    }
  }, [energyData, icelossData]);

  // Render logic remains unchanged
  return (
    <div className="graph">
      {isLoading ? (
        <div className="animate-pulse">Loading...</div>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
}
export default GraphIcelossComponenet;
