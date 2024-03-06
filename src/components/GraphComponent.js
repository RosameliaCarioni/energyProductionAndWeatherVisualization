"use client";
//import { getProduction } from "@/utils/getFarmsProduction";
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
  graphValues,
  chartTitle,
  selectedTime,
  selectedDate,
  yAxisTitle,
  lineColor,
  lineBackgroundColor,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const selectedLabel = `${selectedTime}`;
  const chartData = {
    //x-axis:
    labels: [
      "0",
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

    //y-values:
    datasets: [
      {
        label: !isLoading ? chartTitle : "Loading data...",
        data: !isLoading ? graphValues : Array(24).fill(0),
        borderColor: !isLoading ? lineColor : "rgb(30, 30, 30)",
        backgroundColor: lineBackgroundColor,
      },
    ],
  };
  const options = {
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
  }, [graphValues]);

  if (isLoading) {
    return (
      <div className="animate-pulse graph">
        <Line data={chartData} options={options} />
      </div>
    );
  }

  return (
    <div className="graph">
      {isLoading ? (
        renderSkeletonLoader()
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
}
export default GraphComponent;
