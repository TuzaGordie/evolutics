export class Interest {
  dateFrom: string;
  description: string;
  interestGroup: string;
  interestRateValuesList: IRateVersion[];
  table: string;
  tableFormat: string
}

export interface IRateVersion {
  code: string;
  dateFrom: string;
  rate: number;
}