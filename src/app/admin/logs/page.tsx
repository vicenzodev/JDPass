"use client";

import { useState, useEffect } from "react";
import PageTemplate from "@/components/pageTemplate";
import DataTable from "@/components/table";
import { MdEdit } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { columns } from "../usuarios/options";

type Logs = {
  usuario: string;
  email: string;
  cargo: number;
};

export default function ListarSenhasPage() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<Logs[]>();

  const getLogs = async () => {
     setLoading(true);
    try {
        const response = await fetch("/api/uta", {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error("Senhas não encontradas");
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
      usuario: item.usuario,
      email: item.email,
      cargo: item.cargo,
      actions: (
        <span className="flex justify-center gap-4">
          <button title="Editar">
            <MdEdit size={18} />
          </button>
          <button title="Excluir">
            <BiTrash size={18} />
          </button>
        </span>
      ),
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
        showAddButton
        filterOptions={[
          { label: "Usuário", value: "usuario", type: "text" },
          { label: "Cargo", value: "cargo", type: "text" },
        ]}
      />
    </PageTemplate>
  );
}
