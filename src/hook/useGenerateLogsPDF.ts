"use client";

import { jsPDF } from "jspdf";
import autoTable, { RowInput } from "jspdf-autotable";

type LogItem = {
  event: string;
  status: string | number;
  date: string | Date;
  uta: {
    usuario: string;
    email: string;
  };
};

export function useGenerateLogsPDF() {
  const generatePDF = async (logs: LogItem[]) => {
    if (!logs || logs.length === 0) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Relatório de Logs - John Deere Pass", 15, 20);

    doc.setFontSize(11);
    doc.text(`Gerado em: ${new Date().toLocaleString("pt-BR")}`, 15, 28);

    autoTable(doc, {
      startY: 40,
      head: [["Evento", "Usuário", "Email", "Status", "Data"]],

      body: logs.map((log): RowInput => {
        const raw = String(log.status);

        let statusText = "Desconhecido";

        if (raw === "200") statusText = "Sucesso";
        else if (raw.startsWith("5")) statusText = "Erro";
        else if (raw.startsWith("4")) statusText = "Alerta";
        else if (["erro","alerta","sucesso"].includes(raw.toLowerCase()))
          statusText = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();

        return [
          log.event,
          log.uta.usuario,
          log.uta.email,
          statusText,
          new Date(log.date).toLocaleString("pt-BR"),
        ];
      }),

      styles: { fontSize: 10, cellPadding: 3 },

      headStyles: {
        fillColor: [0, 100, 0],
        textColor: 255,
        fontStyle: "bold",
      },

      alternateRowStyles: { fillColor: [245, 245, 245] },

      margin: { left: 14, right: 14 },
    });

    doc.save(`relatorio_logs_${new Date().toLocaleString("pt-BR").substring(0, 10)}.pdf`);
  };

  return { generatePDF };
}
