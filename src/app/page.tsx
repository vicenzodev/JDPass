"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, senha: senha }),
      });
      if (!response.ok) throw new Error("Usuário ou senha incorretos");
      router.replace("/dashboard");
    } catch (e: any) {
      setError(e.message ?? "Credenciais inválidas. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <Image
        src="/bg-john-deere.jpg"
        alt="John Deere Background"
        fill
        priority
        className="object-cover opacity-90"
      />

      <div className="absolute inset-0 bg-black/60" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-4 md:mx-0 p-8 md:p-10 rounded-2xl shadow-2xl backdrop-blur-md bg-white/10 border border-white/20 flex flex-col gap-5"
      >
        <div className="flex flex-col items-center text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            John Deere Pass
          </h1>
          <p className="text-green-200 mt-2 text-sm md:text-base max-w-xs leading-relaxed">
            Acesse o sistema de gerenciamento corporativo
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <AnimatePresence mode="wait">
            <motion.div
              key="inputs"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-3"
            >
              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-200 mb-1.5 ml-1">
                  E-mail corporativo
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/20 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:bg-black/40 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all outline-none"
                  placeholder="nome.sobrenome@deere.com"
                  required
                />
              </div>

              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-200 mb-1.5 ml-1">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="w-full bg-black/20 border border-white/20 rounded-lg pl-4 pr-12 py-3 text-white placeholder-white/40 focus:bg-black/40 focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all outline-none"
                    placeholder="**************"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-white/70 hover:text-white transition-colors rounded-full hover:bg-white/10"
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible size={22} />
                    ) : (
                      <AiFillEye size={22} />
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold text-lg shadow-lg shadow-green-900/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Entrando...
              </span>
            ) : (
              "Entrar"
            )}
          </motion.button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <p className="text-red-300 bg-red-900/20 border border-red-500/30 rounded-md p-3 text-sm text-center">
                {error}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}