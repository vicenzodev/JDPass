"use client";

import { useEffect, useState } from "react";
import PageTemplate from "@/components/pageTemplate";
import { 
  FaUser, 
  FaPalette, 
  FaGlobe, 
  FaFont, 
  FaMoon, 
  FaSun, 
  FaDesktop, 
  FaPen, 
  FaSave,
  FaTimes
} from "react-icons/fa";
import { ExpandableCard } from "@/components/expandableCard";
import { toast } from "react-toastify";
import { useSettings } from "@/contexts/settingsContext";

export default function Configuracoes() {
  const [openPerfil, setOpenPerfil] = useState(false);
  const [openAparencia, setOpenAparencia] = useState(false);

  const { theme, setTheme, fontSize, setFontSize } = useSettings();

  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    id: "",
    usuario: "",
    email: "",
    senha: "",
    cargo: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/api/uta/me");
        if (!response.ok) throw new Error("Erro ao carregar usuário");

        const data = await response.json();

        setUser({
          id: data.id,
          usuario: data.usuario,
          email: data.email,
          senha: "",
          cargo: String(data.cargo),
        });

      } catch (err) {
        toast.error("Erro ao carregar dados do usuário.");
      }
    };
  
    loadData();
  }, []);

  const getRoleInfo = (roleId: number) => {
    switch(roleId) {
      case 3: return { label: "Gerente", color: "bg-red-100 text-red-700 border-red-200" };
      case 2: return { label: "Supervisor", color: "bg-green-100 text-green-700 border-green-200" };
      case 1: return { label: "Colaborador", color: "bg-blue-100 text-blue-700 border-blue-200" };
      default: return { label: "Operacional", color: "bg-gray-100 text-gray-700 border-gray-200" };
    }
  };

  const roleInfo = getRoleInfo(Number(user.cargo));

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/uta/me?id=${user.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuario: user.usuario,
            email: user.email,
            senha: user.senha || undefined,
            cargo: Number(user.cargo),
          }),
        }
      );

      if (!response.ok) throw new Error("Erro ao salvar");

      toast.success("Usuário atualizado com sucesso!");
    } catch (error) {
      toast.error("Ocorreu um erro ao atualizar o usuário.");
    } finally {
      setIsEditing(false);
    }
    console.log("Perfil salvo:", user);
  };

  return (
    <PageTemplate title="Configurações" routerBack="/dashboard">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start w-full">
          
          <ExpandableCard
            title="Meu Perfil"
            subtitle="Conta e Dados Pessoais"
            icon={<FaUser />}
            isOpen={openPerfil}
            onToggle={() => setOpenPerfil(!openPerfil)}
          >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-border flex items-center justify-center text-2xl font-bold text-foreground/50 border-2 border-card shadow-sm">
                    {user.usuario.charAt(0)}
                  </div>
                  <div>
                      <p className="text-foreground font-bold text-lg">{user.usuario}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-foreground/60 text-sm font-medium mb-1">Nome Completo</label>
                    <input 
                      type="text" 
                      disabled={!isEditing}
                      value={user.usuario}
                      onChange={(e) => setUser({...user, usuario: e.target.value})}
                      className={`w-full p-2.5 rounded-lg border transition-all duration-300 ${
                        isEditing 
                          ? "border-green-500 ring-1 ring-green-500 bg-card text-card-foreground" 
                          : "border-border bg-background text-foreground/60"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-foreground/60 text-sm font-medium mb-1">E-mail Corporativo</label>
                    <input 
                      type="email" 
                      disabled={!isEditing}
                      value={user.email}
                      onChange={(e) => setUser({...user, email: e.target.value})}
                      className={`w-full p-2.5 rounded-lg border transition-all duration-300 ${
                        isEditing 
                        ? "border-green-500 ring-1 ring-green-500 bg-card text-card-foreground" 
                        : "border-border bg-background text-foreground/60"
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-foreground/60 text-sm font-medium mb-1">Nível de Acesso</label>
                    <input 
                      type="text" 
                      disabled={true}
                      value={`${roleInfo.label}`}
                      className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground/40 cursor-not-allowed"
                    />
                    <p className="text-xs text-foreground/40 mt-1">O nível de acesso é gerenciado pelo gerente.</p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  {isEditing ? (
                    <>
                      <button onClick={() => setIsEditing(false)} className="px-4 py-2 text-sm border border-border text-foreground/70 hover:bg-background rounded-lg transition flex items-center gap-2">
                        <FaTimes /> Cancelar
                      </button>
                      <button onClick={handleSaveProfile} className="px-4 py-2 text-sm bg-green-600 text-white hover:bg-green-700 rounded-lg shadow-sm transition flex items-center gap-2">
                        <FaSave /> Salvar
                      </button>
                    </>
                  ) : (
                    <button onClick={() => setIsEditing(true)} className="px-4 py-2 text-sm border border-border text-card-foreground hover:bg-background rounded-lg transition flex items-center gap-2">
                      <FaPen className="text-xs" /> Editar Perfil
                    </button>
                  )}
                </div>
              </div>
          </ExpandableCard>

          <ExpandableCard
            title="Aparência e Acessibilidade"
            subtitle="Interface e Preferências"
            icon={<FaPalette />}
            isOpen={openAparencia}
            onToggle={() => setOpenAparencia(!openAparencia)}
          >
              <div className="space-y-8">
                <div>
                  <label className="flex items-center gap-2 text-card-foreground font-semibold mb-3">
                    <span className="text-foreground/50"><FaDesktop /></span> Tema
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'light', label: 'Claro', icon: <FaSun />, activeColor: 'ring-yellow-400 bg-yellow-50 text-yellow-700' },
                      { id: 'dark', label: 'Escuro', icon: <FaMoon />, activeColor: 'ring-gray-600 bg-gray-800 text-white' },
                      { id: 'system', label: 'Sistema', icon: <FaDesktop />, activeColor: 'ring-blue-400 bg-blue-50 text-blue-700' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setTheme(opt.id as any)}
                        className={`flex flex-col items-center justify-center py-3 border rounded-lg transition-all ${
                          theme === opt.id 
                            ? `ring-2 border-transparent ${opt.activeColor}` 
                            : 'border-border hover:bg-background text-foreground/60'
                        }`}
                      >
                        <span className="mb-1 text-lg">{opt.icon}</span>
                        <span className="text-xs font-medium">{opt.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-card-foreground font-semibold mb-3">
                      <span className="text-foreground/50"><FaFont /></span> Fonte
                    </label>
                    <div className="px-2 py-4 bg-background rounded-lg border border-border">
                      <input 
                        type="range" min="1" max="3" step="1"
                        value={fontSize}
                        onChange={(e) => setFontSize(Number(e.target.value) as any)}
                        className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-green-600"
                      />
                      <div className="flex justify-between mt-2 text-xs text-foreground/60 font-medium">
                        <span>Pequeno</span><span>Padrão</span><span>Grande</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </ExpandableCard>

        </div>
      </div>
    </PageTemplate>
  );
}