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
          cargo: String(data.cargo || ""),
        });
      } catch (err) {
        toast.error("Erro ao carregar dados do usuário.");
      }
    };

    loadData();
  }, [editingId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/uta${editingId ? `?id=${editingId}` : ""}`, {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario: formData.usuario,
          email: formData.email,
          senha: formData.senha || undefined, // se vazio no PATCH → não altera
          cargo: Number(formData.cargo),
        }),
      });

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <PageTemplate
      title={editingId ? "Editar Usuário" : "Cadastrar Usuário"}
      routerBack="/usuarios"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* COLUNA 1 */}
            <div className="space-y-6">
              <InputWrapper label="Nome do Usuário" icon={<BiUser size={16} />}>
                <input
                  required
                  type="text"
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleChange}
                  placeholder="nome do usuário"
                  className="w-full h-12 px-4 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800"
                />
              </InputWrapper>

              <InputWrapper label="E-mail / Login" icon={<MdOutlineEmail size={16} />}>
                <input
                  required
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nome.sobrenome"
                  className="w-full h-12 px-4 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800"
                />
              </InputWrapper>
            </div>

            <div className="space-y-6">
              <InputWrapper label="Senha" icon={<BiKey size={16} />}>
                <div className="relative">
                  <input
                    type={formData.senha ? (showPassword ? "text" : "password") : "text"}
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    placeholder={editingId ? "Deixe em branco para manter" : "************"}
                    className="w-full h-12 px-4 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400 hover:text-green-800"
                  >
                    {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </button>
                </div>
              </InputWrapper>

              <InputWrapper label="Cargo" icon={<FaSuitcase size={16} />}>
                <select
                  required
                  name="cargo"
                  value={formData.cargo}
                  onChange={handleChange}
                  className="w-full h-12 px-4 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 text-gray-700 cursor-pointer"
                >
                  <option value="">Selecione...</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              </InputWrapper>
            </div>
          </div>

          <div className="flex flex-col-reverse md:flex-row items-center justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full md:w-auto h-12 px-8 flex items-center justify-center gap-2 border border-gray-300 text-gray-600 text-lg rounded-lg hover:bg-gray-100 hover:text-gray-800"
            >
              <BiX size={24} /> Cancelar
            </button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className={`w-full md:w-auto h-12 px-10 flex items-center justify-center gap-2 bg-green-800 text-white text-lg rounded-lg hover:bg-green-900 shadow-lg shadow-green-900/20 ${
                loading ? "opacity-70 cursor-wait" : ""
              }`}
            >
              {loading ? (
                <span className="animate-pulse">Salvando...</span>
              ) : (
                <>
                  <BiSave size={24} /> Salvar
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </PageTemplate>
  );
}
