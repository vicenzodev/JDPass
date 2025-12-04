"use client";

import { InputWrapper } from "@/components/inputWrapper";
import PageTemplate from "@/components/pageTemplate";
import { parseLocalDate } from "@/utils/data";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  BiCalendar,
  BiHistory,
  BiKey,
  BiSave,
  BiUser,
  BiX,
} from "react-icons/bi";
import { FaRegStickyNote } from "react-icons/fa";
import { PiMonitor } from "react-icons/pi";
import { toast } from "react-toastify";

export default function SenhaAtivaForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLastPassword, setShowLastPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const editingId = searchParams.get("id");

  const [formData, setFormData] = useState({
    sistema: "",
    usuario: "",
    senhas: "",
    ambiente: "",
    last_senha: "",
    exp_date: "",
    obs: "",
  });

  const isFormValid =
    formData.sistema.trim() !== "" &&
    formData.usuario.trim() !== "" &&
    formData.senhas.trim() !== "" &&
    formData.ambiente.trim() !== "" &&
    formData.exp_date.trim() !== "" &&
    formData.obs.trim() !== "";

  useEffect(() => {
    if (!editingId) return;

    const loadData = async () => {
      try {
        const response = await fetch(`/api/us?id=${editingId}`);
        if (!response.ok) throw new Error("Erro ao carregar dados");

        const data = await response.json();

        setFormData({
          sistema: data.sistema || "",
          usuario: data.usuario || "",
          senhas: data.senhas || "",
          ambiente: data.ambiente || "",
          last_senha: data.last_senha || "",
          exp_date: data.exp_date?.substring(0, 10) || "",
          obs: data.obs || "",
        });
      } catch (err) {
        toast.error("Erro ao carregar dados da senha.");
      }
    };

    loadData();
  }, [editingId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    setLoading(true);

    try {
      const { last_senha, ...dataToSend } = formData;

      const response = await fetch(
        `/api/us${editingId ? `?id=${editingId}` : ""}`,
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...dataToSend,
            exp_date: parseLocalDate(formData.exp_date),
          }),
        }
      );

      if (!response.ok) throw new Error("Erro ao salvar");

      toast.success(
        editingId
          ? "Senha atualizada com sucesso!"
          : "Senha cadastrada com sucesso!"
      );

      router.back();
    } catch (error) {
      toast.error("Ocorreu um erro ao salvar a senha.");
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
      title={editingId ? "Editar Senha" : "Cadastrar Senha"}
      routerBack="/senhas"
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
              label="Sistema / Aplicação"
              icon={<PiMonitor size={16} />}
              required={true}
            >
              <input
                required
                type="text"
                name="sistema"
                value={formData.sistema}
                onChange={handleChange}
                placeholder="Ex: ERP, Email Corporativo..."
                className="input-base w-full rounded-lg px-4 focus:ring-2 focus:ring-[var(--brand-color)] focus:border-transparent"
              />
            </InputWrapper>

            <InputWrapper
              label="Ambiente"
              icon={<PiMonitor size={16} />}
              required={true}
            >
              <select
                required
                name="ambiente"
                value={formData.ambiente}
                onChange={handleChange}
                className="input-base w-full rounded-lg px-4 focus:ring-2 focus:ring-[var(--brand-color)] focus:border-transparent cursor-pointer"
              >
                <option value="">Selecione...</option>
                <option value="PROD">PROD</option>
                <option value="HML">HML</option>
                <option value="TESTE">TESTE</option>
                <option value="DEV">DEV</option>
              </select>
            </InputWrapper>

            <InputWrapper
              label="Usuário / Login"
              icon={<BiUser size={16} />}
              required={true}
            >
              <input
                required
                type="text"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                placeholder="E-mail usado na aplicação"
                className="input-base w-full rounded-lg px-4 focus:ring-2 focus:ring-[var(--brand-color)] focus:border-transparent"
              />
            </InputWrapper>

            <InputWrapper
              label="Senha Atual"
              icon={<BiKey size={16} />}
              required={true}
            >
              <div className="relative">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="senhas"
                  value={formData.senhas}
                  onChange={handleChange}
                  placeholder="**************"
                  className="input-base w-full rounded-lg pl-4 pr-12 focus:ring-2 focus:ring-[var(--brand-color)] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-foreground/50 hover:text-[var(--brand-color)] transition-colors"
                >
                  {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                </button>
              </div>
            </InputWrapper>

            <InputWrapper
              label="Data de Expiração"
              icon={<BiCalendar size={16} />}
              required={true}
            >
              <input
                required
                type="date"
                name="exp_date"
                value={formData.exp_date}
                onChange={handleChange}
                className="input-base w-full rounded-lg px-4 focus:ring-2 focus:ring-[var(--brand-color)] focus:border-transparent cursor-pointer"
              />
            </InputWrapper>

            <InputWrapper
              label="Última Senha (Antiga)"
              icon={<BiHistory size={16} />}
            >
              <div className="relative">
                <input
                  type={
                    formData.last_senha
                      ? showLastPassword
                        ? "text"
                        : "password"
                      : "text"
                  }
                  name="last_senha"
                  value={formData.last_senha || "Nenhuma"}
                  onChange={handleChange}
                  placeholder="Opcional"
                  className="input-base w-full rounded-lg px-4 disabled:bg-background disabled:text-foreground/50 select-none cursor-not-allowed border-border"
                  disabled
                />
                {formData.last_senha && (
                  <button
                    type="button"
                    onClick={() => setShowLastPassword(!showLastPassword)}
                    className="absolute right-3 top-3.5 text-foreground/50 hover:text-[var(--brand-color)] transition-colors"
                  >
                    {showLastPassword ? (
                      <AiFillEyeInvisible size={20} />
                    ) : (
                      <AiFillEye size={20} />
                    )}
                  </button>
                )}
              </div>
            </InputWrapper>
          </div>

          <div className="mb-8">
            <InputWrapper
              label="Observações"
              icon={<FaRegStickyNote size={16} />}
              required
            >
              <textarea
                required
                name="obs"
                rows={3}
                value={formData.obs}
                onChange={handleChange}
                placeholder="Detalhes adicionais..."
                className="input-base w-full rounded-lg p-4 resize-none h-auto min-h-[100px] focus:ring-2 focus:ring-[var(--brand-color)] focus:border-transparent"
              />
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
                  <BiSave size={18} /> Salvar
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </PageTemplate>
  );
}
