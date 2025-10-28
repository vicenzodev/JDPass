"use client";

import ActivityLog from "@/components/dashboard/activityLog";
import DashboardCards from "@/components/dashboard/dashboardCards";
import PasswordStatsChart from "@/components/dashboard/passwordStatsChart";
import RequestsOverview from "@/components/dashboard/requestOverview";
import SecurityAlerts from "@/components/dashboard/securityAlerts";

export default function DashboardPage() {
  
  return (
    <div className="px-8 py-4 min-h-screen">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Painel de Controle</h1>
        <p className="text-gray-500">
          Bem-vindo ao John Deere Pass! Acompanhe as atividades, solicitações e status do sistema.
        </p>
      </header>

      <DashboardCards />

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-6">
        <div className="space-y-6">
          <RequestsOverview />
          <ActivityLog />
        </div>

        <div className="space-y-6">
          <PasswordStatsChart />
          <SecurityAlerts />
        </div>
      </div>
    </div>
  );
}
