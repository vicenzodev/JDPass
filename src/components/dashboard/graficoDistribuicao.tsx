"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { FaLock } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DistribuicaoProps {
  dados: { sistema: string; count: number }[];
}

export default function GraficoDistribuicao({ dados }: DistribuicaoProps) {
  
  const backgroundColors = [
    "#367C2B",
    "#FFDE00",
    "#2563EB",
    "#F97316",
    "#64748B",
  ];

  const chartData = {
    labels: dados.map(d => d.sistema),
    datasets: [
      {
        label: "Senhas",
        data: dados.map(d => d.count),
        backgroundColor: backgroundColors,
        borderColor: "transparent", 
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          font: { size: 11 },
          color: '#808080'
        },
      },
    },
  };

  return (
    <div className="p-5 bg-card border border-border rounded-xl shadow-sm w-full transition-colors duration-300">
      
      <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
        <FaLock size={20} className="text-gray-500 dark:text-gray-400" /> Senhas por Sistema
      </h2>

      <div className="w-full h-[200px]">
        {dados.length > 0 ? (
           <Doughnut data={chartData} options={options} />
        ) : (
           <div className="h-full flex items-center justify-center text-foreground">
             Sem dados
           </div>
        )}
      </div>
    </div>
  );
}