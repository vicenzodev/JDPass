import { formatDate } from "@/utils/data";
import { BiSolidNotepad } from "react-icons/bi";

interface LogItem {
  event: string; 
  date: Date;
  status: string;
  uta: { usuario: string }; 
}

export default function AtividadesRecentes({ logs }: { logs: LogItem[] }) {
  const getStatusInfo = (code: string) => {
    const status = Number(code);
    
    if (status >= 200 && status < 300) {
      return { label: 'Sucesso', className: 'badge-success' };
    }
    if (status >= 400 && status < 500) {
      return { label: 'Alerta', className: 'badge-warning' };
    }
    if (status >= 500) {
      return { label: 'Erro', className: 'badge-error' };
    }
    return { label: code, className: 'badge-default' };
  };

  return (
    <div className="p-5 bg-card border border-border rounded-xl shadow-sm min-h transition-colors duration-300">
      
      <h2 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
        <BiSolidNotepad size={24} className="text-foreground/60" /> Atividades Recentes
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-foreground/60 border-b border-border bg-background/50">
              <th className="text-left py-3 px-2 font-medium">Evento</th>
              <th className="text-left py-3 px-2 font-medium">Status</th>
              <th className="text-left py-3 px-2 font-medium">Usuário</th>
              <th className="text-left py-3 px-2 font-medium">Data</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? (
              logs.map((log, index) => {
                const { label, className } = getStatusInfo(log.status);
                
                return (
                  <tr key={index} className="border-b border-border hover:bg-background/50 transition-colors">
                    <td className="py-3 px-2 text-card-foreground">{log.event}</td>
                    
                    <td className="py-3 px-2">
                      <span className={`badge-base ${className}`}>
                        {label}
                      </span>
                    </td>
                    
                    <td className="py-3 px-2 text-foreground/70 font-medium">{log.uta.usuario}</td>
                    <td className="py-3 px-2 text-foreground/50 text-xs whitespace-nowrap">
                      {formatDate(log.date)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-center text-foreground/40">
                  Nenhuma atividade recente.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}