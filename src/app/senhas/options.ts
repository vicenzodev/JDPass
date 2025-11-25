import { ColumnProps } from "@/utils/table";

export const columns: ColumnProps[] = [
    { heading: 'Sistema', value: 'sistema' },
    { heading: 'Usuário', value: 'usuario' },
    { heading: 'Ambiente', value: 'ambiente' },
    { heading: 'Ultima Alteração', value: 'lastChange', align: "center" },
    { heading: 'Data de Expiração', value: 'expDate', align: "center" },
    { heading: 'Ações', value: 'actions', align: "center" },
];