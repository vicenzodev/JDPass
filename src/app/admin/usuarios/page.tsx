"use client";

import { useState, useEffect } from "react";
import PageTemplate from "@/components/pageTemplate";
import DataTable from "@/components/table";
import { MdEdit } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { columns } from "./options";
import ConfirmDialog from "@/components/confirmDialog";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Usuario = {
  id: string;
  usuario: string;
  email: string;
  cargo: number;
};

export default function ListarSenhasPage() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<Usuario[]>();

  const router = useRouter();

  const getUsers = async () => {
     setLoading(true);
    try {
        const response = await fetch("/api/uta", {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) throw new Error("Senhas não encontradas");
        const data = await response.json();
        setUsers(data);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (id: string) => {
      try {
        const res = await fetch(`/api/uta?id=${id}`, {
          method: "DELETE",
        });
  
        if (!res.ok) throw new Error("Erro ao excluir usuário");
  
        setUsers((prev) => prev?.filter((s) => s.id !== id));
        
        toast.success("Usuário excluído com sucesso!");
      } catch (err) {
        toast.error("Erro ao excluir o usuário");
      }
    };

  const getTableData = () => {
    if (!users?.length) return [];

    return users.map((item) => ({
      usuario: item.usuario,
      email: item.email,
      cargo: item.cargo,
      actions: (
        <span className="flex justify-center gap-4">
          <button title="Editar" onClick={() => router.push(`/admin/usuarios/form?id=${item.id}`)}>
            <MdEdit size={18} />
          </button>
          <ConfirmDialog
            trigger={
              <button title="Excluir">
                <BiTrash size={18} />
              </button>
            }
            title="Excluir Usuário?"
            description="Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita."
            onConfirm={() => handleDelete(item.id)}
          />
        </span>
      ),
    }));
  };

  return (
    <PageTemplate title="Gerenciar Usuários" routerBack="/dashboard">
      <DataTable
        data={getTableData()}
        columns={columns}
        loading={loading}
        onRefresh={() => {
          getUsers();
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
