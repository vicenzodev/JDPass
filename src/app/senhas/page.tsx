"use client";

import { useState, useEffect } from "react";
import PageTemplate from "@/components/pageTemplate";
import DataTable from "@/components/table";
import { columns } from "./options";
import { MdEdit, MdSync } from "react-icons/md";
import { formatDate } from "@/utils/data";
import { BiTrash } from "react-icons/bi";
import { useRouter } from "next/navigation";
import ConfirmDialog from "@/components/confirmDialog";
import { toast } from "react-toastify";
import { AiFillWarning } from "react-icons/ai";

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

  const resetExpiredPassword = async () => {
    try {
      const res = await fetch("/api/reset", {
        method: 'GET',
      })

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.error || "Falha ao resetar senhas");
      }

      const result = await res.json();
      toast.success("Senhas resetadas com sucesso!");

      getPasswords();
    } catch (error:any) {
      toast.error(error.message || "Erro ao resetar senhas");
    }
  }

  const resetPassword = async (userId: string) => {
    try {
      const res = await fetch("/api/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data?.error || "Erro ao resetar senha");
      }

      const result = await res.json();
      toast.success(result.message || "Senha resetada!");

      getPasswords();
    } catch (err: any) {
      toast.error(err.message || "Erro ao resetar senha individual");
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
      lastChange: formatDate(item.last_change, true),
      expDate: formatDate(item.exp_date),
      actions: (
        <span className="flex justify-center gap-4">
          <ConfirmDialog
            trigger={
              <button title="Resetar Senha">
                <MdSync size={20} />
              </button>
            }
            title="Resetar Senha"
            description="Tem certeza que deseja resetar esta senha? Essa ação criará uma senha aleatória para o item."
            onConfirm={() => resetPassword(item.id)}
            variant="success"
            icon={<AiFillWarning size={24} />}
          />
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
            icon={<AiFillWarning size={24} />}
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
          { label: "Cargo", value: "cargo", type: "select", options: [
            { label: "DEV", value: "DEV" },
            { label: "TESTE", value: "TESTE" },
            { label: "HML", value: "HML" },
            { label: "PROD", value: "PROD" },
          ] },
        ]}
        extraButtons={[
          {
            label: "Resetar Senhas",
            icon: <MdSync size={18} />,
            onClick: resetExpiredPassword,
            variant: "default",
            confirmation: {
              title: "Resetar Senhas Expiradas",
              description: "Você tem certeza que deseja resetar todas as senhas expiradas? Essa ação afetará múltiplos registros.",
              variant: "success",
              icon: <AiFillWarning size={24} />,
              confirmLabel: "Sim, Resetar"
            }
          },
        ]}
      />
    </PageTemplate>
  );
}
