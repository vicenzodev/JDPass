"use client";

import { useEffect, useState } from "react";
import CardsDashboard from "@/components/dashboard/cardsDashboard";
import GraficoSenhas from "@/components/dashboard/graficoSenhas";
import GraficoDistribuicao from "@/components/dashboard/graficoDistribuicao";
import ProximasExpiracoes from "@/components/dashboard/proximasExpiracoes";
import AtividadesRecentes from "@/components/dashboard/atvidadesRecentes";
import { IDashboardData } from "./type";

export default function DashboardPage() {
  const [data, setData] = useState<IDashboardData | null>(null);
  const [userCargo, setUserCargo] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboardRes, userRes] = await Promise.all([
          fetch("/api/dashboard"),
          fetch("/api/mw") 
        ]);

        if (dashboardRes.ok) {
          const dashboardData = await dashboardRes.json();
          setData(dashboardData);
        }

        if (userRes.ok) {
          const userData = await userRes.json();
          setUserCargo(userData.cargo);
        }

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen transition-colors duration-300 bg-brackground">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 text-foreground"></div>
      </div>
    );
  }

  if (!data) return <div className="p-8 text-gray-800 dark:text-gray-300">Erro ao carregar dados.</div>;

  return (
    <div className="px-8 py-6 min-h-screen bg-background transition-colors duration-300">
      <header className="mb-5">
        <h1 className="text-3xl font-bold text-foreground">Painel de Controle</h1>
        
        <p className="text-foreground/60 mt-1">
          Bem-vindo ao John Deere Pass! Acompanhe as atividades e status do sistema.
        </p>
      </header>

      <CardsDashboard kpis={data.kpis} />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <div className="xl:col-span-1 space-y-6">
          <GraficoSenhas dados={data.graficos.semanal} />
          
          {userCargo !== null && userCargo == 3 && (
            <AtividadesRecentes logs={data.listas.atividadesRecentes} />
          )}
        </div>

        <div className="space-y-6">
          <GraficoDistribuicao dados={data.graficos.distribuicao} />
          <ProximasExpiracoes expiracoes={data.listas.proximasExpiracoes} />
        </div>
      </div>
    </div>
  );
}
