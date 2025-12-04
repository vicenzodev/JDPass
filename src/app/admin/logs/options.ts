import { ColumnProps } from "@/utils/table";

export const columns: ColumnProps[] = [
    { heading: 'Evento', value: 'event' },
    { heading: 'Usuário', value: 'user', align: 'center' },
    { heading: 'E-mail', value: 'email', align: 'center' },
    { heading: 'Situação', value: 'status', align: 'center' },
    { heading: 'Data de Ocorrência', value: 'date', align: 'center' },
];

export const getStatusConfig = (code: string) => {
    const status = Number(code);
    
    if (status >= 200 && status < 300) {
      return 'Sucesso'
    }
    if (status >= 400 && status < 500) {
      return 'Alerta'
    }
    if (status >= 500) {
      return 'Erro'
    }
    return code
};