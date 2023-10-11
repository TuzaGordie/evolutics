import { ICodeDescription } from 'src/app/Shared/models/index.model';

  interface CompaniesAllowed {
  id?: number;
  productCode?: string;
  companyCode: string;
}

 interface CurrencyAllowed {
  id?: number;
  productCode?: string;
  description?: any;
  validCurrency: string;
}

export interface IProductBasic {
  allowCreditNote: boolean;
  autoConvertQuote: boolean;
  autoReconcileSuspense: boolean;
  busLine: string;
  closedToNewBusiness: boolean;
  code: string;
  companiesAllowed: CompaniesAllowed[];
  currencyAllowed: CurrencyAllowed[];
  debitNoteRule: string;
  description: string;
  discountsAllowed?: {
    code: string;
    description: string;
    id?: number;
  }[];
  groupBusiness: boolean;
  id?: number;
  insuranceType: string;
  issueDateBasis: string;
  issueDateFactor: number;
  policyCodeBasis: string;
  policyNumberPrefix: string;
  policyScreen: string;
  premiumStatementScreen: string;
  productClass: string;
  quotationResultScreen: string;
  quotationScreen: string;
  quoteValidityBasis: string;
  quoteValidityPeriod: string;
  uploadFileBasis: string;
}

export interface Cover {
  ageAssuredLimit: string;
  availablePostIssue: boolean;
  base: boolean;
  blankSumAssured: boolean;
  company: string;
  coolOffPeriod: number;
  coverCode: string;
  description: string;
  fundingOption: string;
  id?: number;
  mandatory: boolean;
  maxNo: string;
  productCode?: string;
  sumAssuredEqualBaseCoverSumAssured: boolean;
}

export interface IProductPermanentSubgroup {
  id?: number;
  productCode?: string;
  sgAgeAssuredLimit?: any;
  sgAvailablePostIssue?: any;
  sgBase?: any;
  sgBlankSumAssured?: any;
  sgCompany?: any;
  sgCoolOffPeriod?: any;
  sgCoverCode?: any;
  sgDescription?: any;
  sgFundingOption?: any;
  sgMandatory?: any;
  sgMaxNo?: any;
  sgSumAssuredEqualBaseCoverSumAssured?: any;
  subgroupName: string;
  subgroupNo?: string;
}

export interface IProductDependentCovers {
  cover: Cover[];
  permanentSubgroups: IProductPermanentSubgroup[];
}

export interface IProductDocumentation {
  id?: number;
  productCode?: string;
  eventType: string;
  event: string;
  language: string;
  action: string;
  documentType: string;
  documentName: string;
  networkPath: string;
  condition: string;
}

export interface IProductQuoteInfo {
  agent: boolean;
  applicationDate: boolean;
  assured: boolean;
  beneficiary: boolean;
  branch: boolean;
  commencementDate: boolean;
  deductible: boolean;
  excess: boolean;
  field?: string;
  lifeAssuredDateOfBirth: boolean;
  lifeAssuredName: boolean;
  loanInterestRate: boolean;
  nextOfKin: boolean;
  ownerDateOfBirth: boolean;
  ownerEmail: boolean;
  ownerNationalInsuranceNo: boolean;
  ownerPhoneNo: boolean;
  pencomNo: boolean;
  policyTerm: boolean;
  premiumPaymentFreq: boolean;
  premiumPaymentMethod: boolean;
  premiumPaymentTerm: boolean;
  productCode?: string;
  sumAssured: boolean;
}

export interface IProductPolicyInfo {
  agent: boolean;
  agentNo: boolean;
  applicationDate: boolean;
  assured: boolean;
  beneficiary: boolean;
  branch: boolean;
  commencementDate: boolean;
  deductible: boolean;
  excess: boolean;
  field?: string;
  lifeAssuredDateOfBirth: boolean;
  lifeAssuredName: boolean;
  loanInterestRate: boolean;
  nextOfKin: boolean;
  ownerDateOfBirth: boolean;
  ownerEmail: boolean;
  ownerName: boolean;
  ownerNationalInsuranceNo: boolean;
  ownerPhoneNo: boolean;
  payeeBankAccount: boolean;
  pencomNo: boolean;
  policyTerm: boolean;
  premiumPaymentFreq: boolean;
  premiumPaymentMethod: boolean;
  premiumPaymentTerm: boolean;
  productCode?: string;
  sumAssured: boolean;
}

export interface IProductDefaults {
  id?: number;
  productCode?: string;
  premiumFrequency: string;
  policyTerm: number;
  defaultBranch: string;
  ageCalculationBasis: number;
  writingAgentNo: string;
  referralAgentNo: string;
  autoSetPhoneNoAsExternalRef: boolean;
  coolOffPeriod: number;
  maturityBasis: string;
  coolOffFee: number;
  benefitPaymentMethodAllowed: string[];
  providerCategory: string;
  providerCode: string;
}

export interface IProductCode {
  basic: IProductBasic;
  dependentCovers: IProductDependentCovers;
  documentations: IProductDocumentation[];
  quoteInfo: IProductQuoteInfo;
  policyInfo: IProductPolicyInfo;
  defaults: IProductDefaults;
}
