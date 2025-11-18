"use client";

import AtividadesRecentes from "@/components/dashboard/atvidadesRecentes";
import CardsDashboard from "@/components/dashboard/cardsDashboard";
import GraficoSenhas from "@/components/dashboard/graficoSenhas";
import SolicitacoesRecentes from "@/components/dashboard/solicitacoesRecentes";
import AlertasSeguranca from "@/components/dashboard/alertasSeguranca";

export default function DashboardPage() {

  
  
  return (
    <div className="px-8 py-4 min-h-screen">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Painel de Controle</h1>
        <p className="text-gray-500">
          Bem-vindo ao John Deere Pass! Acompanhe as atividades, solicitações e status do sistema.
        </p>
      </header>

      <CardsDashboard />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <div className="space-y-6">
          <SolicitacoesRecentes />
          <AtividadesRecentes />
        </div>

        <div className="space-y-6">
          <GraficoSenhas />
          <AlertasSeguranca />
        </div>
      </div>
    </div>
  );
}
