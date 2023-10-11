interface IProductList {
  active: boolean;
  product: string;
  productClass: string;
}

interface IAgentInformation {
  active?: any;
  approved?: any;
  approvedBy?: any;
  approvedOn?: any;
  branch: string;
  clientNo: string;
  createdBy?: any;
  email?: any;
  hierarchyAgentNo: string;
  hierarchyAgentType: string;
  hierarchyManager: string;
  id: number;
  name: string;
  no: string;
  productList: IProductList[];
  servicingAgent?: any;
  type: string;
}

interface ILicense {
  active: boolean;
  certificateNumber: string;
  expiryDate: string;
  issueDate: string;
  licenceType: string;
  licenseAuthority: string;
}

interface IPaymentInformation {
  active: boolean;
  agentPaymentCurrency: string;
  bankNo: string;
  commStatementActionBasis: string;
  commTaxRate: number;
  control: boolean;
  currencyRule: string;
  frequency: string;
  holdPayments: boolean;
  minPayAmount: number;
  payAgentCommToAgency: boolean;
  payeeName: string;
  payeeNo: string;
  paymentMethod: string;
  payoutCharge: number;
  payoutMethod: string;
  proportion: number;
}

export interface IAgentInfo {
  agentInformation: IAgentInformation;
  license: ILicense;
  paymentInformation: IPaymentInformation;
}
