"use client";

import { useState, useEffect } from "react";
import PageTemplate from "@/components/pageTemplate";
import DataTable from "@/components/table";
import { columns, mockSenhas } from "./options";
import { MdEdit } from "react-icons/md";
import { formatDate } from "@/utils/data";
import { BiTrash } from "react-icons/bi";

type Senha = {
  id: string;
  identificador: string;
  tipo: string;
  perfil: string;
  dataCriacao: string;
  validade: string;
};

export default function ListarSenhasPage() {

  const [loading, setLoading] = useState(false);
  const [senhas, setSenhas] = useState<Senha[]>(mockSenhas);

  const getTableData = () => {
    if (!senhas?.length) return [];

    return senhas.map((item) => ({
        identificador: item.identificador,
        tipo: item.tipo,
        perfil: item.perfil,
        dataCriacao: formatDate(item.dataCriacao),
        validade: formatDate(item.validade),
        actions: (
            <span className="flex justify-center gap-4">
                <button
                    title="Editar"
                >
                    <MdEdit size={18} />
                </button>
                <button
                    title="Excluir"
                >
                    <BiTrash size={18} />
                </button>
            </span>
        )
    }));
  };  

  return (
        <PageTemplate title="Senhas Ativas" routerBack="/dashboard">
            <DataTable
                data={getTableData()}
                columns={columns}
                loading={loading}
                onRefresh={() => {
                    setLoading(true);
                    setTimeout(() => setLoading(false), 1000);
                    setSenhas(mockSenhas);
                }}
                showAddButton
                filterOptions={[
                    { label: "Identificador", value: "identificador", type: "text" },
                    { label: "Perfil", value: "perfil", type: "select", options: ["Admin", "User", "Guest"] },
                    { label: "Tipo", value: "tipo", type: "text" },
                ]}
            />
      </PageTemplate>
  );
}
