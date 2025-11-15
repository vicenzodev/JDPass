"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"usuario" | "chave">("usuario");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [chave, setChave] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
        
    try {
        const response = await fetch("/api/login", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, senha, chave}),
        });
        const {data, success} = await response.json();
        if (!data) throw new Error(success ?? "Erro ao buscar condomínios")
    } catch (e: any) {
        setError(e.message ?? "Erro inesperado");
    } finally {
        setLoading(false);
    }

    // if ((mode === "usuario" && email === "admin@john.deere" && senha === "123456") || (mode === "chave" && chave === "JD-ACCESS-001")) {
    //   setLoading(true);
    //   router.replace("/dashboard");
    // } else {
    //   setError("Credenciais inválidas. Tente novamente.");
    // }
  };

  return (
     <div className="relative min-h-screen flex items-center justify-center bg-black">
      <Image
        src="/bg-john-deere.jpg"
        alt="John Deere Background"
        fill
        priority
        className="object-cover opacity-90"
      />

      <div className="absolute inset-0 bg-black/50" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded-2xl w-full max-w-lg p-10 pt-8 h-[54vh] flex flex-col justify-between"
      >
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-white">John Deere Pass</h1>
          <p className="text-green-200 mt-2 text-center text-sm max-w-sm">
            Acesse o sistema de gerenciamento de senhas corporativas
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-center">
          <div className="relative w-full flex-1 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {mode === "usuario" ? (
                <motion.div
                  key="usuario"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full space-y-6"
                >
                  <div className="w-full">
                    <label className="block text-md font-semibold text-white">
                      E-mail corporativo
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 w-full border border-white/30 bg-white/20 rounded-md p-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
                      placeholder="nome.sobrenome@deere.com"
                      required
                    />
                  </div>

                  <div className="w-full">
                    <label className="block text-md font-semibold text-white">
                      Senha
                    </label>
                    <div className="relative w-full">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="mt-2 w-full border border-white/30 bg-white/20 rounded-md p-3 text-white placeholder-gray-300 focus:ring-2 focus:ring-green-400 outline-none"
                        placeholder="**************"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-2/6 text-white"
                      >
                        {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                      </button>
                    </div>
                  </div>

                </motion.div>
              ) : (
                <motion.div
                  key="chave"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col items-center justify-center"
                >
                  <div className="w-full">
                      <label className="block text-md font-semibold text-white text-center mb-2">
                        Chave de acesso
                      </label>
                      <input
                        type="text"
                        value={chave}
                        onChange={(e) => setChave(e.target.value)}
                        className="w-full border border-white/30 bg-white/20 rounded-md p-3 text-white 
                                  placeholder-gray-300 focus:ring-2 focus:ring-green-400 outline-none text-center"
                        placeholder="JD-ACCESS-001"
                        required
                      />
                    </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md font-semibold text-lg hover:bg-green-700 transition cursor-pointer"
          >
            {loading ? "Entrando..." : "Entrar"}
          </motion.button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={() => {
              setMode(mode === "usuario" ? "chave" : "usuario")
              setError("");
            }}
            className="text-sm text-green-300 font-medium hover:text-green-200 transition cursor-pointer"
          >
            {mode === "usuario"
              ? "Entrar com chave de acesso"
              : "Entrar com usuário e senha"}
          </button>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-red-300 text-sm text-center mt-2"
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
