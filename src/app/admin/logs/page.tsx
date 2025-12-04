"use client";

import { useState, useEffect } from "react";
import PageTemplate from "@/components/pageTemplate";
import DataTable from "@/components/table";
import { MdEdit } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { formatDate, parseLocalDate } from "@/utils/data";
import { Usuario } from "../usuarios/page";
import { columns, getStatusConfig } from "./options";
import { IoMdCloudDownload } from "react-icons/io";
import { useGenerateLogsPDF } from "@/hook/useGenerateLogsPDF";
import { DateRangeDialog } from "@/components/dateRangeDialog";
import { toast } from "react-toastify";

type Logs = {
  event: string;
  status: string;
  date: Date;
  uta: Usuario;
};

export default function ListarLogsPage() {
  const [loading, setLoading] = useState(false);
  const [openPeriodModal, setOpenPeriodModal] = useState(false);
  const [logs, setLogs] = useState<Logs[]>();
  const { generatePDF } = useGenerateLogsPDF();

  const handleGenerateReport = (start: string, end: string) => {
    const startDate = parseLocalDate(start);
    const endDate = parseLocalDate(end);
    endDate.setHours(23, 59, 59, 999);

    const filtered = logs?.filter(log => {
      const d = new Date(log.date);
      return d >= startDate && d <= endDate;
    }) ?? [];

    if (filtered.length === 0) {
      return toast.error("Não existem logs nesse espaço de data");
    }

    generatePDF(filtered);
  };

  const getLogs = async () => {
     setLoading(true);
    try {
        const response = await fetch("/api/logs", {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error("Logs não encontradas");
        const data = await response.json();
        setLogs(data);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    getLogs();
  }, []);

  const getTableData = () => {
    if (!logs?.length) return [];

    return logs.map((item) => ({
      event: item.event,
      user: item.uta.usuario,
      email: item.uta.email,
      status: getStatusConfig(item.status),
      date: formatDate(item.date),
    }));
  };

  return (
    <PageTemplate title="Logs / Auditoria" routerBack="/dashboard">
      <DataTable
        data={getTableData()}
        columns={columns}
        loading={loading}
        onRefresh={() => {
          getLogs();
        }}
        showAddButton={false}
        filterOptions={[
          { label: "Situação", value: "status", type: "select", options: [
            { label: "Sucesso", value: "Sucesso" },
            { label: "Alerta", value: "Alerta" },
            { label: "Erro", value: "Erro" },
          ] },
          { label: "Usuário", value: "user", type: "text" },
        ]}
        extraButtons={[
          {
            label: "Gerar Relatório",
            icon: <IoMdCloudDownload  size={18} />,
            onClick: () => setOpenPeriodModal(true),
            variant: "default",
          },
        ]}
      />

      <DateRangeDialog
        open={openPeriodModal}
        onOpenChange={setOpenPeriodModal}
        onConfirm={handleGenerateReport}
      />
    </PageTemplate>
  );
}
