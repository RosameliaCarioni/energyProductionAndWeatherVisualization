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
} from "chart.js";
import { Line } from "react-chartjs-2";
import annotationPlugin from 'chartjs-plugin-annotation';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

function GraphComponent({graphValues, chartTitle, selectedTime, selectedDate}) {

  const hasData = graphValues && graphValues.length > 0;
  const selectedLabel = `PH${selectedTime}`;
  const chartData = {
    //x-axis:
    labels: ["PH1", "PH2", "PH3", "PH4", "PH5", "PH6", "PH7", "PH8", "PH9", "PH10", "PH11", "PH12", "PH13", "PH14", "PH15", "PH16", "PH17", "PH18", "PH19", "PH20", "PH21", "PH22", "PH23", "PH24"],

    //y-values:
    datasets: [
      {
        label: chartTitle || 'No Data',
        data: hasData ? graphValues : Array(24).fill(0),
        borderColor: "rgb(135, 211, 184)",
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    plugins: {
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: 0,
            yMax: chartData.datasets[0].data.reduce((a, b) => Math.max(a, b), 0),
            xMin: chartData.labels.indexOf(selectedLabel),
            xMax: chartData.labels.indexOf(selectedLabel),
            borderColor: 'rgba(255, 99, 132, 0.5)',
            borderWidth: 2,
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '400px', height: '200px' }}>
      <Line data={chartData} options={options}/>
    </div>
  );
}
export default GraphComponent;
