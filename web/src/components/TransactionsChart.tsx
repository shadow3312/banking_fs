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
import { useRecoilValue } from "recoil";
import { selectedBankAtom } from "@/state/atom";
import Spinner from "./Spinner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface ChartProps {
  incomes: number[];
  outcomes: number[];
  labels: string[];
  isLoading?: boolean;
}

export default function TransactionsChart({
  incomes,
  outcomes,
  labels,
  isLoading = false,
}: ChartProps) {
  const selectedBank = useRecoilValue(selectedBankAtom);

  const options = {
    responsive: true,
    barThickness: 12,
    maxBarThickness: 12,
    borderRadius: 6,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${selectedBank?.name} - ${selectedBank?.mask}`,
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 20,
          },
        },
      },
    },
  };
  const data = {
    labels,
    datasets: [
      {
        label: "Incomes",
        data: incomes,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Outcomes",
        data: outcomes,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute left-0 grid h-full w-full place-items-center border bg-black/30 dark:bg-black/60">
          <Spinner large />
        </div>
      )}
      <Bar options={options} data={data} />
    </div>
  );
}
