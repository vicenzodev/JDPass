"use client";

import { InputWrapper } from "@/components/inputWrapper";
import PageTemplate from "@/components/pageTemplate";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BiKey, BiSave, BiUser, BiX } from "react-icons/bi";
import { FaSuitcase } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { toast } from "react-toastify";

export default function UsuariosForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const editingId = searchParams.get("id");

  const [formData, setFormData] = useState({
    usuario: "",
    email: "",
    senha: "",
    cargo: "",
  });

  const isFormValid =
    formData.usuario.trim() !== "" &&
    formData.email.trim() !== "" &&
    (editingId || formData.senha.trim() !== "") &&
    formData.cargo !== "";

  useEffect(() => {
    if (!editingId) return;

    const loadData = async () => {
      try {
        const response = await fetch(`/api/uta?id=${editingId}`);
        if (!response.ok) throw new Error("Erro ao carregar usuário");

        const data = await response.json();

        setFormData({
          usuario: data.usuario || "",
          email: data.email || "",
          senha: "",
          cargo: String(data.cargo ?? ""),
        });
      } catch (err) {
        toast.error("Erro ao carregar dados do usuário.");
      }
    };

    loadData();
  }, [editingId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    setLoading(true);

    try {
      const response = await fetch(
        `/api/uta${editingId ? `?id=${editingId}` : ""}`,
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuario: formData.usuario,
            email: formData.email,
            senha: formData.senha || undefined,
            cargo: Number(formData.cargo),
          }),
        }
      );

      if (!response.ok) throw new Error("Erro ao salvar");

      toast.success(
        editingId
          ? "Usuário atualizado com sucesso!"
          : "Usuário cadastrado com sucesso!"
      );

      router.back();
    } catch (error) {
      toast.error("Ocorreu um erro ao salvar o usuário.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <PageTemplate
      title={editingId ? "Editar Usuário" : "Cadastrar Usuário"}
      routerBack="/admin/usuarios"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full bg-card/90 backdrop-blur-lg rounded-2xl shadow-xl border border-border overflow-hidden transition-colors duration-300"
      >
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <InputWrapper
              label="Nome do Usuário"
              icon={<BiUser size={16} />}
              required={true}
            >
              <input
                required
                type="text"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                placeholder="Ex: João Silva"
                className="input-base w-full rounded-lg px-4 focus:ring-2 focus:ring-[var(--brand-color)] focus:border-transparent"
              />
            </InputWrapper>

            <InputWrapper
              label="Cargo"
              icon={<FaSuitcase size={14} />}
              required={true}
            >
              <select
                required
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                className="input-base w-full rounded-lg px-4 focus:ring-2 focus:ring-[var(--brand-color)] focus:border-transparent cursor-pointer"
              >
                <option value="">Selecione...</option>
                <option value="0">Operacional</option>
                <option value="1">Supervisor</option>
                <option value="2">Gestor</option>
                <option value="3">Gerente</option>
              </select>
            </InputWrapper>

            <InputWrapper
              label="E-mail / Login"
              icon={<MdOutlineEmail size={16} />}
              required={true}
            >
              <input
                required
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="joao.silva"
                className="input-base w-full rounded-lg px-4 focus:ring-2 focus:ring-[var(--brand-color)] focus:border-transparent"
              />
            </InputWrapper>

            <InputWrapper
              label="Senha"
              icon={<BiKey size={16} />}
              required={!editingId}
            >
              <div className="relative">
                <input
                  required={!editingId}
                  type={showPassword ? "text" : "password"}
                  name="senha"
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder={
                    editingId
                      ? "Deixe em branco para manter a mesma senha"
                      : "************"
                  }
                  className="input-base w-full rounded-lg px-4 pr-12 focus:ring-2 focus:ring-[var(--brand-color)] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-foreground/50 hover:text-[var(--brand-color)] transition-colors"
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={20} />
                  ) : (
                    <AiFillEye size={20} />
                  )}
                </button>
              </div>
            </InputWrapper>
          </div>

          <div className="flex flex-col-reverse md:flex-row items-center justify-end gap-4 pt-6 border-t border-border">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full md:w-auto h-12 px-8 flex items-center justify-center gap-2 border border-border text-foreground/70 rounded-lg hover:bg-background hover:text-foreground transition-colors"
            >
              <BiX size={20} /> Cancelar
            </button>

            <motion.button
              whileTap={!loading && isFormValid ? { scale: 0.95 } : {}}
              type="submit"
              disabled={loading || !isFormValid}
              className={`w-full md:w-auto px-10 flex items-center justify-center gap-2 shadow-lg transition-all btn-primary
                ${
                  loading || !isFormValid
                    ? "opacity-50 cursor-not-allowed shadow-none bg-gray-400 dark:bg-gray-600"
                    : "shadow-[var(--brand-color)]/20"
                }
              `}
            >
              {loading ? (
                <span className="animate-pulse">Salvando...</span>
              ) : (
                <>
                  <BiSave size={20} /> Salvar
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </PageTemplate>
  );
}