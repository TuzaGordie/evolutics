export class CreatePayInMethod {
  constructor(
    public payinMethod: PayinMethod,
    public payinMethodCompany: PayinMethodCompany[]
  ) {}
}
export class PayinMethod {
  accountCode: string;
  ammendedBy: string;
  createdBy: string;
  daysToClear: number;
  ddRequired: boolean;
  description: string;
  code: string;
  id: number;
}

export class PayinMethodCompany {
  id: number;
  rowId: number;
  authBy: string = 'user';
  companyCode: string;
  createdBy: string = 'user';
  deleted: boolean = false;
}
