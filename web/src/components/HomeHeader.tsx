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
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Incomes",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Outcomes",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 500 })),
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
export default function HomeHeader({ user }: { user: IUser | undefined }) {
  return (
    <div className="home-header">
      <h3 className="title">
        Hi, {user?.firstName} {user?.lastName}
      </h3>
      <Bar options={options} data={data} />
    </div>
  );
}
