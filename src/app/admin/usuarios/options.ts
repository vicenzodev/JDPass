import { ColumnProps } from "@/utils/table";

export const columns: ColumnProps[] = [
    { heading: 'Nome de Usuário', value: 'usuario' },
    { heading: 'E-mail', value: 'email', align: 'center' },
    { heading: 'Cargo', value: 'cargo', align: "center" },
    { heading: 'Ações', value: 'actions', align: "center" },
];

export const getCargoLabel = (cargo: number): string => {
  const roles: Record<number, string> = {
    0: "Operacional",
    1: "Supervisor",
    2: "Gestor",
    3: "Gerente",
  };

  return roles[cargo] ?? "Desconhecido";
};