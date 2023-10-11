export interface IAccountPost {
  accCode: IAccountCode;
  accCodeMapping: IAccountCodeMapping[];
}

export interface  IAccountCode {
  accountGroup: string;
  accountType: string;
  code: string;
  description: string;
  ledgerCode: string;
  reasonCode: string;
  id: number
}

export interface IAccountCodeMapping {
  accCodesId: number;
  companyCode: string;
  id: number;
  ledgerCode: string;
}

export interface ICreateBank {
  code: string;
  branch: string;
  country: string;
  description: string;
  hqAddress: string;
  hqCity: string;
  hqSortCode: string;
  hqTown: string;
  id: number
}


export interface ICreateSortCode {
    address: string;
    city: string;
    code: string;
    country: string;
    hq: true;
    sortCode: string;
    title: string;
    town: string

}
