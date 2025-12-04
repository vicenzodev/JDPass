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
import { FaChartLine } from "react-icons/fa";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

interface GraficoProps {
  dados: { date: string; count: number }[];
}

export default function GraficoSenhas({ dados }: GraficoProps) {
  
  const labels = dados.map(item => {
    const [ano, mes, dia] = item.date.split('-').map(Number);
    const d = new Date(ano, mes - 1, dia);
    
    const diaSemana = d.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
    const diaMes = d.getDate();
    return `${diaSemana} ${diaMes}`; 
  });

  const values = dados.map(item => item.count);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Senhas",
        data: values,
        borderColor: "#22c55e",
        backgroundColor: "rgba(34,197,94,0.2)",
        tension: 0.4,
        pointBackgroundColor: "#166534",
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { 
        mode: "index" as const, 
        intersect: false,
        backgroundColor: 'rgba(0,0,0,0.9)',
        padding: 10,
        callbacks: {
           title: (context: any) => context[0].label
        }
      },
    },
    scales: {
      x: { 
        grid: { display: false },
        ticks: { 
            font: { size: 11 },
            color: '#808080'
        }
      },
      y: { 
        beginAtZero: true, 
        ticks: { 
            stepSize: 1, 
            precision: 0,
            color: '#9ca3af'
        },
        grid: {
            color: 'rgba(156, 163, 175, 0.1)'
        }
      },
    },
  };

  return (
    <div className="p-5 bg-card border border-border rounded-xl shadow-sm w-full min-h transition-colors duration-300">
      
      <h2 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
        <FaChartLine size={20} className="text-foreground/60" /> Movimentação da Semana
      </h2>

      <div className="w-full h-[250px]">
        {dados.length > 0 ? (
           <Line data={chartData} options={options} />
        ) : (
           <div className="h-full flex items-center justify-center text-foreground/50">
             Carregando dados...
           </div>
        )}
      </div>
    </div>
  );
}