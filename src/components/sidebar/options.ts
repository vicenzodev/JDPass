import { ElementType } from "react";
import { TbLayoutDashboard } from "react-icons/tb";
import { LuFileText, LuKeyRound } from "react-icons/lu";
import { FaHistory, FaUser, FaUsers } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdAccessTime } from "react-icons/md";

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
    prefix: "/senhas",
    children: [
      { label: "Senhas Ativas", icon: RiLockPasswordFill, href: "/senhas/ativas" },
      { label: "Senhas Temporárias", icon: MdAccessTime, href: "/senhas/temporarias" },
    ],
  },
  {
    label: "Solicitações de Acesso",
    icon: LuFileText,
  },
  {
    label: "Usuários e Perfis",
    icon: FaUsers,
    adminOnly: true,
    prefix: "/admin",
    children: [
      { label: "Gerenciar Usuários", icon: FaUser, href: "/admin/usuarios" },
      { label: "Gerenciar Perfis de Acesso", icon: CgProfile, href: "/admin/perfis" },
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