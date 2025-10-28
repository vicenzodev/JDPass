export default function AtividadesRecentes() {
  const logs = [
    { id: 1, acao: "Gerou senha para SAP", usuario: "maria.silva", data: "27/10/2025 10:23" },
    { id: 2, acao: "Aprovou solicitação de joao.souza", usuario: "gabriel.teixera", data: "26/10/2025 16:12" },
  ];

  return (
    <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">
        Atividades Recentes
      </h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500 border-b border-gray-200">
            <th className="text-left py-2">Mensagem</th>
            <th className="text-left">Usuário</th>
            <th className="text-left">Data</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-b border-gray-100">
              <td className="py-2">{log.acao}</td>
              <td>{log.usuario}</td>
              <td>{log.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
