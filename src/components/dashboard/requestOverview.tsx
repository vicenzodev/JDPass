export default function RequestsOverview() {
  const requests = [
    { id: 1, sistema: "SAP", usuario: "maria.silva", status: "Pendente" },
    { id: 2, sistema: "Portal RH", usuario: "joao.souza", status: "Aprovado" },
  ];

  return (
    <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        Solicitações Recentes
      </h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500 border-b border-gray-200">
            <th className="text-left py-2">Sistema</th>
            <th className="text-left">Usuário</th>
            <th className="text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id} className="border-b border-gray-100">
              <td className="py-2">{r.sistema}</td>
              <td>{r.usuario}</td>
              <td
                className={`font-medium ${
                  r.status === "Pendente"
                    ? "text-yellow-600"
                    : r.status === "Aprovado"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {r.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
