"use client";

import { useState, useEffect } from "react";
import PageTemplate from "@/components/pageTemplate";
import DataTable from "@/components/table";
import { columns } from "./options";
import { MdEdit } from "react-icons/md";
import { formatDate } from "@/utils/data";
import { BiTrash } from "react-icons/bi";
import { useRouter } from "next/navigation";
import ConfirmDialog from "@/components/confirmDialog";
import { toast } from "react-toastify";

type Senha = {
  id: string;
  sistema: string;
  usuario: string;
  senhas: string;
  last_senha: string;
  last_change: Date;
  exp_date: Date;
  ambiente: string;
  obs: string;
  utaId: number;
};

export default function ListarSenhasPage() {
  const [loading, setLoading] = useState(false);
  const [senhas, setSenhas] = useState<Senha[]>();

  const router = useRouter();

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

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/us?id=${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Erro ao excluir senha");

      setSenhas((prev) => prev?.filter((s) => s.id !== id));
      
      toast.success("Senha excluída com sucesso!");
    } catch (err) {
      toast.error("Erro ao excluir a senha");
    }
  };

  const getTableData = () => {
    if (!senhas?.length) return [];

    const sorted = [...senhas].sort(
      (a, b) => new Date(b.last_change).getTime() - new Date(a.last_change).getTime()
    );

    return sorted.map((item) => ({
      sistema: item.sistema,
      usuario: item.usuario,
      ambiente: item.ambiente,
      lastChange: formatDate(item.last_change),
      expDate: formatDate(item.exp_date),
      actions: (
        <span className="flex justify-center gap-4">
          <button title="Editar" onClick={() => router.push(`/senhas/form?id=${item.id}`)}>
            <MdEdit size={18} />
          </button>
          <ConfirmDialog
            trigger={
              <button title="Excluir">
                <BiTrash size={18} />
              </button>
            }
            title="Excluir Senha?"
            description="Tem certeza que deseja excluir esta senha? Esta ação não pode ser desfeita."
            onConfirm={() => handleDelete(item.id)}
          />
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
