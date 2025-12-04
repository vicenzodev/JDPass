import { ElementType } from "react";
import { TbLayoutDashboard } from "react-icons/tb";
import { LuKeyRound } from "react-icons/lu";
import { FaHistory, FaUsers } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

type NavItem = {
  label: string;
  icon: ElementType<{
    className?: string;
  }>;
  prefix?: string;
  href?: string;
  children?: {
    label: string;
    href: string;
    icon: ElementType<{
      className?: string;
    }>;
  }[];
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
    href: "/senhas",
  },
  {
    label: "Gerenciamento de Usuários",
    icon: FaUsers,
    adminOnly: true,
    href: "/admin/usuarios",
  },
  {
    label: "Logs / Auditoria",
    icon: FaHistory,
    adminOnly: true,
    href: '/admin/logs'
  },
  {
    label: "Configurações",
    icon: IoMdSettings,
    href: '/configuracoes'
  },
];