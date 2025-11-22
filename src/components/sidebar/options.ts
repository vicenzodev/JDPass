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
    href: "/senhas",
  },
  {
    label: "Usuários",
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