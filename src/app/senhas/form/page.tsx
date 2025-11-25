"use client";

import { InputWrapper } from "@/components/inputWrapper";
import PageTemplate from "@/components/pageTemplate";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
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
import { PiMonitor } from "react-icons/pi";

export default function SenhaAtivaForm() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showLastPassword, setShowLastPassword] = useState(false);
  const [utaId, setUtaId] = useState({ id: '', email: '' });
  const router = useRouter();

  useEffect(() => {
    const getResponse = async () => {
        const response = await fetch("/api/mw", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
        setUtaId(await response.json());
    }
    
    getResponse();
  }, []);
  

  const [formData, setFormData] = useState({
    sistema: "",
    usuario: "",
    senhas: "",
    ambiente: "",
    last_senha: "",
    last_change: "",
    exp_date: "",
    obs: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch("/api/us", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sistema: formData.sistema,
          usuario: formData.usuario,
          senhas: formData.senhas,
          last_senha: formData.last_senha,
          last_change: new Date().toISOString(),
          exp_date: formData.exp_date,
          ambiente: formData.ambiente,
          obs: formData.obs,
          uta_id: utaId.id,
        }),
      });

      if (!response.ok) throw new Error("Erro ao salvar");

      router.back();
    } catch (error) {
      console.error("Erro ao salvar:", error);
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
    <PageTemplate title="Cadastrar Senha Ativa" routerBack="/senhas">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-6">
              <InputWrapper
                label="Sistema / Aplicação"
                icon={<PiMonitor size={16} />}
              >
                <input
                  required
                  type="text"
                  name="sistema"
                  value={formData.sistema}
                  onChange={handleChange}
                  placeholder="Ex: ERP, Email Corporativo..."
                  className="w-full h-12 px-4 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800"
                />
              </InputWrapper>

              <InputWrapper label="Usuário / Login" icon={<BiUser size={16} />}>
                <input
                  required
                  type="text"
                  name="usuario"
                  value={formData.usuario}
                  onChange={handleChange}
                  placeholder="nome.sobrenome"
                  className="w-full h-12 px-4 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800"
                />
              </InputWrapper>

              <InputWrapper
                label="Data de Expiração"
                icon={<BiCalendar size={16} />}
              >
                <input
                  type="date"
                  name="exp_date"
                  value={formData.exp_date}
                  onChange={handleChange}
                  className="w-full h-12 px-4 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 cursor-pointer"
                />
              </InputWrapper>
            </div>

            <div className="space-y-6">
              <InputWrapper label="Senha Atual" icon={<BiKey size={16} />}>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="senhas"
                    value={formData.senhas}
                    onChange={handleChange}
                    className="w-full h-12 pl-4 pr-12 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800"
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

              <InputWrapper
                label="Última Senha (Antiga)"
                icon={<BiHistory size={16} />}
              >
                <div className="relative">
                  <input
                    type={formData.last_senha ? showLastPassword ? "text" : "password" : "text"}
                    name="last_senha"
                    value={formData.last_senha || "Nenhuma"}
                    onChange={handleChange}
                    placeholder="Opcional"
                    className="w-full h-12 px-4 bg-gray-200 border border-gray-300 rounded-lg flex items-center text-gray-700 select-none"
                    disabled
                  />
                  {formData.last_senha && (
                    <button
                        type="button"
                        onClick={() => setShowLastPassword(!showLastPassword)}
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-green-800"
                    >
                        {showLastPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </button>
                  )}
                </div>
              </InputWrapper>

              <InputWrapper label="Ambiente" icon={<PiMonitor size={16} />}>
                <select
                  required
                  name="ambiente"
                  value={formData.ambiente}
                  onChange={handleChange}
                  className="w-full h-12 px-4 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 text-gray-700 cursor-pointer"
                >
                  <option value="">Selecione...</option>
                  <option value="PROD">PROD</option>
                  <option value="HML">HML</option>
                  <option value="TESTE">TESTE</option>
                  <option value="DEV">DEV</option>
                </select>
              </InputWrapper>
            </div>
          </div>

          <div className="mb-8">
            <InputWrapper
              label="Última Alteração"
              icon={<BiCalendar size={16} />}
            >
              <div className="w-full h-12 px-4 bg-gray-200 border border-gray-300 rounded-lg flex items-center text-gray-700 italic select-none">
                {formData.last_change
                  ? new Date(formData.last_change).toLocaleString("pt-BR")
                  : 'Será definido como "Agora" ao salvar'}
              </div>
            </InputWrapper>
          </div>

          <div className="mb-8">
            <InputWrapper label="Observações" icon={null}>
              <textarea
                name="obs"
                rows={3}
                value={formData.obs}
                onChange={handleChange}
                placeholder="Detalhes adicionais..."
                className="w-full p-4 bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-800 resize-none"
              />
            </InputWrapper>
          </div>

          <div className="flex flex-col-reverse md:flex-row items-center justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-full md:w-auto h-12 px-8 flex items-center justify-center gap-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-800"
            >
              <BiX /> Cancelar
            </button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className={`w-full md:w-auto h-12 px-10 flex items-center justify-center gap-2 bg-green-800 text-white rounded-lg hover:bg-green-900 shadow-lg shadow-green-900/20 ${
                loading ? "opacity-70 cursor-wait" : ""
              }`}
            >
              {loading ? (
                <span className="animate-pulse">Salvando...</span>
              ) : (
                <>
                  <BiSave /> Salvar
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </PageTemplate>
  );
}
