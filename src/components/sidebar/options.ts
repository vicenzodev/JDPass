import { ElementType } from "react";
import { TbLayoutDashboard } from "react-icons/tb";
import { LuFileText, LuKeyRound } from "react-icons/lu";
import { FaHistory, FaUsers } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RiLogoutBoxRLine } from "react-icons/ri";

type NavItem = {
  label: string;
  icon: ElementType<{
    className?: string;
  }>;
  href?: string;
  children?: { label: string; href: string }[];
  adminOnly?: boolean;
};

export const navItems: NavItem[] = [
  {
    label: "Dashboard",
    icon: TbLayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Gerenciamento de Senhas",
    icon: LuKeyRound,
    children: [
      { label: "Senhas Ativas", href: "/senhas" },
      { label: "Senhas Temporárias", href: "/senhas/temporarias" },
    ],
  },
  {
    label: "Solicitações de Acesso",
    icon: LuFileText,
  },
  {
    label: "Perfis e Acessos",
    icon: FaUsers,
    adminOnly: true,
    children: [
      { label: "Gerenciar Usuários", href: "/admin/usuarios" },
      { label: "Gerenciar Perfis de Acesso", href: "/admin/perfis" },
    ],
  },
  {
    label: "Logs / Auditoria",
    icon: FaHistory,
    adminOnly: true,
  },
  {
    label: "Configurações",
    icon: IoMdSettings,
    adminOnly: true,
  },
];