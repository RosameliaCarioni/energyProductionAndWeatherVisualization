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

function GraphComponent({
  graphValues, // New prop for energy data
  icelossData, // New prop for iceloss data
  chartTitle,
  selectedTime,
  selectedDate,
  maxCapacity,
  yAxisTitle,
  lineColor,
  lineBackgroundColor,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const selectedLabel = `${selectedTime}`;

  const datasets = [
    {
      label: chartTitle,
      data: !isLoading ? graphValues : Array(24).fill(0),
      borderColor: !isLoading ? lineColor : "rgb(30, 30, 30)",
      backgroundColor: lineBackgroundColor,
    },
  ];

  if (!!maxCapacity) {
    datasets.push({
      label: "Max Capacity",
      data: !isLoading ? Array(24).fill(maxCapacity / 1000) : Array(24).fill(0),
      borderColor: "rgb(255, 231, 104)", // Yellow color for max capacity
      backgroundColor: "rgb(255, 231, 104, 0.35)",
      pointRadius: 0,
      borderWidth: 1,
    });
  }

  // Conditionally add the "Ice Loss" dataset if icelossData is not undefined
  if (!!icelossData) {
    datasets.push({
      label: "Energy Output w. Iceloss",
      data: !isLoading ? icelossData : Array(24).fill(0),
      borderColor: "rgb(255, 99, 132)", // Red color for ice loss
      backgroundColor: "rgb(255, 99, 132, 0.35)",
    });
  }
  const chartData = {
    labels: Array.from({ length: 24 }, (_, i) => i.toString()),
    datasets: datasets,
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
        title: { display: true, text: "MW", padding: 2 },
        beginAtZero: true,
        title: {
          display: true,
          text: yAxisTitle,
          padding: 2,
          color: "rgb(214,214,214)",
        },
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
    if (graphValues && graphValues.length > 0) {
      setIsLoading(false);
    } else {
      console.log("loading");
      setIsLoading(true);
    }
  }, [graphValues, icelossData]);

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
export default GraphComponent;
