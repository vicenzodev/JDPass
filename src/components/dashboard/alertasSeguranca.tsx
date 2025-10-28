import { FaExclamationTriangle } from "react-icons/fa";

export default function AlertasSeguranca() {
  const alerts = [
    { id: 1, msg: "Senha do sistema SAP expira em 2 dias", tipo: "warning" },
    { id: 2, msg: "Tentativa de acesso negada - usuário joao.souza", tipo: "danger" },
  ];

  return (
    <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
        <FaExclamationTriangle className="text-red-500" /> Alertas de Segurança
      </h2>
      <ul className="space-y-2 text-sm">
        {alerts.map((a) => (
          <li
            key={a.id}
            className={`p-2 rounded-lg ${
              a.tipo === "danger"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {a.msg}
          </li>
        ))}
      </ul>
    </div>
  );
}
