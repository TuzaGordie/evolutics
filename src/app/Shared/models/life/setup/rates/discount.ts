export interface Discount {
  code: string;
  dateFrom: string;
  description: string;
  discRateGroup: string;
  discRateValuesList: IRateVersion[];
  discountTable: string;
  probWin: number;
  rate: number;
  wheel: boolean;
}

export interface IRateVersion {
  dateFrom: string;
  dateTo: string;
  fixedRate: number;
  maxRate: number;
  promoCode: string;
  auto: boolean;
} 