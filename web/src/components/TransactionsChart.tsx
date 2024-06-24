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
import LoadingOverlay from "./LoadingOverlay";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface ChartProps {
  income?: number[];
  expense?: number[];
  labels?: string[];
  isLoading?: boolean;
}

export default function TransactionsChart({
  income,
  expense,
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
        label: "Income",
        data: income,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Expense",
        data: expense,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <div className="transactions-chart">
      {isLoading && <LoadingOverlay large={false} />}
      <Bar options={options} data={data} />
    </div>
  );
}
