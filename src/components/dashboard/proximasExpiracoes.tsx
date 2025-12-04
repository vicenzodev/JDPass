import { FaCalendarTimes } from "react-icons/fa";

interface Expiracao {
  sistema: string; 
  usuario: string; 
  exp_date: Date; 
}

export default function ProximasExpiracoes({ expiracoes }: { expiracoes: Expiracao[] }) {
  
  const diasParaVencer = (data: Date) => {
    const hoje = new Date();
    const diffTime = Math.abs(data.getTime() - hoje.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-5 bg-card border border-border rounded-xl shadow-sm transition-colors duration-300">
      
      <h2 className="text-lg font-semibold text-card-foreground mb-3 flex items-center gap-2">
        <FaCalendarTimes className="text-foreground/60" />
        Próximas Expirações
      </h2>
      
      <div className="space-y-3">
        {expiracoes.length > 0 ? (
          expiracoes.map((item, index) => {
            const dias = diasParaVencer(new Date(item.exp_date));
            return (
              <div 
                key={index}
                className="expiration-item"
              >
                <div>
                  <p className="font-medium text-card-foreground">{item.sistema}</p>
                  
                  <p className="text-xs text-foreground/60">Usuário: {item.usuario}</p>
                </div>
                
                <div className="text-right">
                  <span className="expiration-days">
                    {dias} dias
                  </span>
                  <span className="text-[10px] text-foreground/40">restantes</span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-4 text-foreground/50 text-sm bg-background/50 rounded-lg border border-border">
            Nenhuma senha vencendo em breve. Tudo ok! 🎉
          </div>
        )}
      </div>
    </div>
  );
}