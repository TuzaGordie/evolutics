export interface Tax {
  code: string;
  dateFrom: string;
  description: string;
  rate: number;
  rateTable: string;
  rateValuesList: IRateVersion[];
  table: string;
  taxGroup: string
}

export interface IRateVersion {
  code: string;
  dateFrom: string;
  rate: number;
} 
