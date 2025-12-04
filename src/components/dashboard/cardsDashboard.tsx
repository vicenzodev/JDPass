import { FaKey, FaClock, FaExclamationTriangle, FaBell } from "react-icons/fa";

interface KpisProps {
  kpis: {
    ativas: number;
    aVencer: number;
    vencidas: number;
    alertas: number;
  };
}

export default function CardsDashboard({ kpis }: KpisProps) {
  const cards = [
    { 
      title: "Senhas Ativas", 
      value: kpis.ativas, 
      icon: <FaKey />,
      color: "text-green-600 dark:text-green-400" 
    },
    { 
      title: "A Vencer (7 dias)",
      value: kpis.aVencer, 
      icon: <FaClock />, 
      color: "text-yellow-500 dark:text-yellow-400" 
    },
    { 
      title: "Senhas Vencidas",
      value: kpis.vencidas, 
      icon: <FaExclamationTriangle />, 
      color: "text-red-600 dark:text-red-400" 
    },
    { 
      title: "Alertas de Segurança", 
      value: kpis.alertas, 
      icon: <FaBell />, 
      color: "text-orange-500 dark:text-orange-400" 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-5 rounded-xl bg-card text-card-foreground border border-border shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div>
            <p className="text-foreground/80 text-sm font-medium">{card.title}</p>
            <p className="text-3xl font-bold text-foreground mt-1">{card.value}</p>
          </div>
          
          <div className={`text-3xl ${card.color} bg-opacity-10 p-3 rounded-full bg-background`}>
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
}