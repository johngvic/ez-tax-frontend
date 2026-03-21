export enum TaxCalculationType {
  ExclusaoPisCofins = 'EXCLUSAO_PIS_COFINS'
}

export enum ExclusaoPisCofinsStatus {
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Completed = 'COMPLETED',
  Failed = 'FAILED'
}

export type ExclusaoPisCofinsJob = {
  calculationId: string;
  cnpj: string;
  type: TaxCalculationType;
  status: ExclusaoPisCofinsStatus;
  fileSize: number;
  createdAt: string;
  updatedAt: string;
}
