"use client";

import { useState, useEffect } from "react";
import PageTemplate from "@/components/pageTemplate";
import DataTable from "@/components/table";
import { columns } from "./options";
import { MdEdit } from "react-icons/md";
import { formatDate } from "@/utils/data";
import { BiTrash } from "react-icons/bi";

type Senha = {
  sistema: string;
  usuario: string;
  senhas: string;
  last_senha: string;
  last_change: Date;
  exp_date: Date;
  obs: string;
  utaId: number;
};

export default function ListarSenhasPage() {
  const [loading, setLoading] = useState(false);
  const [senhas, setSenhas] = useState<Senha[]>();

  const getPasswords = async () => {
     setLoading(true);
    try {
        const response = await fetch("/api/us", {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error("Senhas não encontradas");
        const data = await response.json();
        setSenhas(data);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const getTableData = () => {
    if (!senhas?.length) return [];

    return senhas.map((item) => ({
      sistema: item.sistema,
      usuario: item.usuario,
      lastChange: formatDate(item.last_change),
      expDate: formatDate(item.exp_date),
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
    <PageTemplate title="Gerenciar Senhas" routerBack="/dashboard">
      <DataTable
        data={getTableData()}
        columns={columns}
        loading={loading}
        onRefresh={() => {
          getPasswords();
        }}
        showAddButton
        filterOptions={[
          { label: "Sistema", value: "sistema", type: "text" },
          { label: "Usuário", value: "usuario", type: "text" },
          { label: "Ambiente", value: "ambiente", type: "text" },
        ]}
      />
    </PageTemplate>
  );
}
