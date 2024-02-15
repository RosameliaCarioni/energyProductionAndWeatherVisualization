"use client";
import React from "react";
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
  ],

  //y-values:
  datasets: [
    {
      label: "Energy prediction",
      data: [4, 5, 6, 7, 3, 5, 3, 2, 5],
      borderColor: "rgb(135, 211, 184)",
    },
  ],
};

//
function GraphComponent() {
  return (
    <div>
      <Line data={chartData} />
    </div>
  );
}
export default GraphComponent;
