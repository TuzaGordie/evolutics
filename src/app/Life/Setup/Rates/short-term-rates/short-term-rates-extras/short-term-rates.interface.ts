export interface IShortTermRateValue {
  active: boolean;
  code: string;
  days: number;
  factor: number;
  shortTermRateId: number;
}

export interface IShortTermRate {
  code: any;
  active: boolean;
  companyCode: string;
  createdBy: string;
  createdOn: string;
  description: string;
  shortTermRateValuesList: IShortTermRateValue[];
  updatedOn: string;
}
