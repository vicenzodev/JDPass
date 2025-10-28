import { ColumnProps } from "@/utils/table";
import { ReactNode } from "react";

type Senha = {
  id: string;
  identificador: string;
  tipo: string;
  perfil: string;
  dataCriacao: string;
  validade: string;
};

export const mockSenhas: Senha[] = [
  {
    id: "b0e78498-9d13-4504-b8b6-d6d67a3a2302",
    identificador: "admin.portal.company",
    tipo: "Senha de Sistema",
    perfil: "admin",
    dataCriacao: "2024-11-05T09:12:34.000Z",
    validade: "2026-11-05T09:12:34.000Z"
  },
  {
    id: "a1f2c3d4-5b6e-7f80-1234-abcdef012345",
    identificador: "gitlab.ci",
    tipo: "Senha de Serviço",
    perfil: "ci/cd",
    dataCriacao: "2025-02-14T14:00:00.000Z",
    validade: "2026-02-14T14:00:00.000Z"
  },
  {
    id: "c3d2e1f0-9a87-6543-210f-0a1b2c3d4e5f",
    identificador: "email.marketing",
    tipo: "Senha Pessoal",
    perfil: "marketing",
    dataCriacao: "2024-08-20T08:30:00.000Z",
    validade: "2025-08-20T08:30:00.000Z"
  },
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    identificador: "db.production",
    tipo: "Senha de Banco",
    perfil: "db-admin",
    dataCriacao: "2023-12-01T02:15:00.000Z",
    validade: "2026-12-01T02:15:00.000Z"
  },
  {
    id: "9b0d3f1a-2c4e-4a6b-8d9f-123456789abc",
    identificador: "aws.root",
    tipo: "Senha Crítica",
    perfil: "cloud-admin",
    dataCriacao: "2025-06-01T11:45:00.000Z",
    validade: "2026-06-01T11:45:00.000Z"
  },
  {
    id: "123e4567-e89b-12d3-a456-426614174000",
    identificador: "vpn.remote",
    tipo: "Senha de Acesso",
    perfil: "remote",
    dataCriacao: "2025-01-10T06:00:00.000Z",
    validade: "2026-01-10T06:00:00.000Z"
  },
  {
    id: "6fa459ea-ee8a-3ca4-894e-db77e160355e",
    identificador: "slack.workspace",
    tipo: "Senha Pessoal",
    perfil: "eng",
    dataCriacao: "2024-03-22T16:20:00.000Z",
    validade: "2025-03-22T16:20:00.000Z"
  },
  {
    id: "2c1b3a4d-5e6f-7a8b-9c0d-112233445566",
    identificador: "payments.gateway",
    tipo: "Senha de Serviço",
    perfil: "finance",
    dataCriacao: "2024-10-30T10:10:10.000Z",
    validade: "2026-10-30T10:10:10.000Z"
  },
  {
    id: "0f8fad5b-d9cb-469f-a165-70867728950e",
    identificador: "k8s.cluster",
    tipo: "Senha de Sistema",
    perfil: "ops",
    dataCriacao: "2025-04-18T12:00:00.000Z",
    validade: "2027-04-18T12:00:00.000Z"
  },
  {
    id: "7f6e5d4c-3b2a-1908-7f6e-5d4c3b2a1908",
    identificador: "backup.sftp",
    tipo: "Senha de Serviço",
    perfil: "backup",
    dataCriacao: "2024-07-01T01:30:00.000Z",
    validade: "2025-07-01T01:30:00.000Z"
  },
  {
    id: "55a1b2c3-d4e5-f678-90ab-cdef12345678",
    identificador: "jira.instance",
    tipo: "Senha Pessoal",
    perfil: "product",
    dataCriacao: "2025-09-02T09:00:00.000Z",
    validade: "2026-09-02T09:00:00.000Z"
  },
  {
    id: "3b241101-e2bb-4255-8caf-4136c566a962",
    identificador: "monitoring.prometheus",
    tipo: "Senha de Serviço",
    perfil: "monitor",
    dataCriacao: "2024-12-15T07:45:00.000Z",
    validade: "2026-12-15T07:45:00.000Z"
  },
  {
    id: "d94f3f01-3c9b-4f1a-8a2b-abcdefabcdef",
    identificador: "crm.sales",
    tipo: "Senha Pessoal",
    perfil: "sales",
    dataCriacao: "2023-05-11T13:22:00.000Z",
    validade: "2025-05-11T13:22:00.000Z"
  },
  {
    id: "e1cbb0c0-0000-4d1a-9f6b-0f0f0f0f0f0f",
    identificador: "cdn.admin",
    tipo: "Senha de Sistema",
    perfil: "cdn-admin",
    dataCriacao: "2025-03-03T03:03:03.000Z",
    validade: "2027-03-03T03:03:03.000Z"
  },
  {
    id: "aa12bb34-cc56-dd78-ee90-112233445566",
    identificador: "analytics.bigquery",
    tipo: "Senha de Serviço",
    perfil: "data",
    dataCriacao: "2024-01-20T20:20:20.000Z",
    validade: "2026-01-20T20:20:20.000Z"
  },
  {
    id: "0a1b2c3d-4e5f-6789-0abc-def123456789",
    identificador: "ssh.deploy",
    tipo: "Chave/Senha",
    perfil: "deploy",
    dataCriacao: "2025-08-08T08:08:08.000Z",
    validade: "2026-08-08T08:08:08.000Z"
  },
  {
    id: "faceb00c-dead-beef-cafe-000000000001",
    identificador: "proxy.reverse",
    tipo: "Senha de Sistema",
    perfil: "network",
    dataCriacao: "2024-05-05T05:05:05.000Z",
    validade: "2025-11-05T05:05:05.000Z"
  },
  {
    id: "00112233-4455-6677-8899-aabbccddeeff",
    identificador: "helpdesk.ticket",
    tipo: "Senha Pessoal",
    perfil: "support",
    dataCriacao: "2025-07-21T15:30:00.000Z",
    validade: "2026-07-21T15:30:00.000Z"
  },
  {
    id: "abcdefab-cdef-abcd-efab-cdefabcdef12",
    identificador: "service.redis",
    tipo: "Senha de Serviço",
    perfil: "cache",
    dataCriacao: "2024-09-09T09:09:09.000Z",
    validade: "2026-09-09T09:09:09.000Z"
  },
  {
    id: "ffeeddaa-ccbbaa99-8877-6655-443322110000",
    identificador: "test.temp",
    tipo: "Senha Temporária",
    perfil: "tester",
    dataCriacao: "2025-10-01T00:00:00.000Z",
    validade: "2025-10-31T23:59:59.000Z"
  }
];

export const columns: ColumnProps[] = [
    { heading: 'Identificador', value: 'identificador' },
    { heading: 'Tipo', value: 'tipo' },
    { heading: 'Perfil', value: 'perfil' },
    { heading: 'Data de Criação', value: 'dataCriacao', align: "center" },
    { heading: 'Validade', value: 'validade', align: "center" },
    { heading: 'Ações', value: 'actions', align: "center" },
];