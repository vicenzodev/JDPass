"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const data = {
  labels: ["Seg", "Ter", "Qua", "Qui", "Sex"],
  datasets: [
    {
      label: "Senhas Geradas",
      data: [12, 20, 18, 25, 22],
      borderColor: "#22c55e",
      backgroundColor: "rgba(34,197,94,0.2)",
      tension: 0.4,
      pointBackgroundColor: "#166534",
      pointRadius: 5,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { mode: "index" as const, intersect: false },
  },
  scales: {
    x: { grid: { display: false } },
    y: { beginAtZero: true },
  },
};

export default function GraficoSenhas() {
  return (
    <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm w-full">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        Senhas Geradas na Semana
      </h2>

      <div className="w-full h-[250px]">
        <div className="w-full h-full">
          <Line data={data} options={options} width="100%" height="100%" />
        </div>
      </div>
    </div>
  );
}
