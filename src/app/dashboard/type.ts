export interface IDashboardData {
  kpis: {
    ativas: number;
    aVencer: number;
    vencidas: number;
    alertas: number;
  };
  listas: {
    atividadesRecentes: { 
      event: string; 
      date: Date;
      status: string;
      uta: { usuario: string }; 
    }[];
    proximasExpiracoes: { 
      sistema: string; 
      usuario: string; 
      exp_date: Date; 
    }[];
  };
  graficos: {
    semanal: { date: string; count: number }[];
    distribuicao: { sistema: string; count: number }[];
  };
}