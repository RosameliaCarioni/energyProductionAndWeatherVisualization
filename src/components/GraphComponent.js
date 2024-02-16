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
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function GraphComponent(props) {
  console.log(props.graphValues);
  const chartData = {
    //x-axis:
    labels: [
      "00.00",
      "01.00",
      "02.00",
      "03.00",
      "04.00",
      "05.00",
      "06.00",
      "07.00",
      "08.00",
      "09.00",
      "10.00",
      "11.00",
      "12.00",
      "13.00",
      "14.00",
      "15.00",
      "16.00",
      "17.00",
      "18.00",
      "19.00",
      "20.00",
      "21.00",
      "22.00",
      "23.00",
      "24.00",
    ],

    //y-values:
    datasets: [
      {
        label: props.chartTitle,
        data: props.graphValues,
        borderColor: "rgb(135, 211, 184)",
      },
    ],
  };
  return (
    <div style={{ width: '400px', height: '200px' }}>
      <Line data={chartData} options={{ maintainAspectRatio: false }}/>
    </div>
  );
}
export default GraphComponent;
