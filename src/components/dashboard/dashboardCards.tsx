import { FaKey, FaUserShield, FaClock, FaBell, FaUsers } from "react-icons/fa";

export default function DashboardCards() {
  const cards = [
    { title: "Senhas Ativas", value: 128, icon: <FaKey />, color: "text-green-600" },
    { title: "Senhas Temporárias", value: 14, icon: <FaClock />, color: "text-yellow-500" },
    { title: "Solicitações Pendentes", value: 5, icon: <FaUserShield />, color: "text-blue-600" },
    { title: "Alertas de Segurança", value: 2, icon: <FaBell />, color: "text-red-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 cursor-pointer">
      {cards.map((card, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-5 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition"
        >
          <div>
            <p className="text-gray-500 text-sm">{card.title}</p>
            <p className="text-3xl font-bold text-gray-800">{card.value}</p>
          </div>
          <div className={`text-3xl ${card.color}`}>{card.icon}</div>
        </div>
      ))}
    </div>
  );
}
