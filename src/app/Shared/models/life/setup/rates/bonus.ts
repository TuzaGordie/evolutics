export interface Bonus {
  bonusCalcBasis: string;
  bonusRateGroup: string;
  bonusRateValuesList: IRateVersion[];
  code: string;
  dateFrom: string;
  description: string;
  table: string;
}

export interface IRateVersion {
  auto: true;
  dateFrom: string;
  dateTo: string;
  fixedRate: number;
  maxRate: number;
} 