import { EClientType } from "src/app/Life/client-desk/client-extras/client.interface";

export interface IClientDetails {
  address: string;
  alternativeEmail: string;
  alternativePhoneNumber: string;
  band: string;
  bankNo: string;
  category: string;
  clientNo: string;
  clientType: string;
  clv: string;
  communication?: any;
  crmId: string;
  dateCreated: Date;
  dateOfBirth: Date;
  email: string;
  employer?: any;
  enroleeNo: string;
  financialSizeCategory?: string;
  firstName: string;
  fullName: string;
  gender: string;
  idNumber?: any;
  kyc?: any;
  language: string;
  maritalStatus: string;
  middleName: string;
  noOfEmployee?: any;
  noOfGroups?: any;
  occupationGroup?: any;
  phoneNumber: string;
  providerCategory: string;
  providerCode?: any;
  providerNo: string;
  providerSubCategory: string;
  redgNo?: any;
  salutation?: any;
  sector: string;
  socialMedia?: any;
  state?: any;
  surname: string;
  title: string;
  type: EClientType;
  website?: any;
}

export interface ICurrency {
  description: string;
  validCurrency: string;
}
export interface IDiscountCode {
  description: string;
  code: string;
}
export interface IPremiumFrequency {
    id:          number;
    premFreq:    string;
    description: string;
    noPayYear:   number;
    createdBy:   string;
    frequency:   string;
}
export interface IPremiumPaymentMethod {
  description: string;
  code: string;
}

export interface IAssetDetails {
  assetNo: number;
  registrationNo: string;
}

export interface IAccessoryType {
  codeSubgroup: string;
  code: string;
  codeGroup: string;
  title: string;
  codeCat?: any;
  active: boolean;
  recType: string;
  id: number;
  deleted?: any;
}

export interface IBenefitPaymentFreq {
  paymentFrequency: string;
}

export interface ITargetContributionFreq {
  frequency: string;
}
export interface IProduct {
  description: string;
  code: string;
}

export interface IContentCat {
  codeSubgroup: string;
  code: string;
  codeGroup: string;
  title: string;
  codeCat: string;
  active: boolean;
  recType: string;
  id: number;
  deleted: string;
}

export interface IInsuranceType {
  title: string;
  code: string;
}

export interface IAssuredRelToOwner {
  relationship: string;
}

export interface ICoverInfo {
    id:                                 number;
    productCode:                        string;
    subgroupNo:                         string;
    availablePostIssue:                 boolean;
    sumAssuredEqualBaseCoverSumAssured: boolean;
    blankSumAssured:                    boolean;
    mandatory:                          boolean;
    company:                            string;
    ageAssuredLimit:                    string;
    coverCode:                          string;
    coolOffPeriod:                      number;
    fundingOption:                      string;
    maxNo:                              string;
    description:                        string;
    base:                               string;
    code:                               string;
    coverSumAssured:                    string;
    riderCoverCode:                     string;
}
export enum CoverScreenNames {
    BL = "BUILDING",
    DR = "DEFENSE_RECOURSE",
    LIL = "LIFE_INSURANCE_LIFE",
    AL = "ACCESSORIES_RISK", // /
    TP = "THIRDPARTY",
    PC = "PROPERTY_CONTENT",
    SAV = "SAVINGS",
    MH = "MARINE_HULL",
    MC = "MARINE_CARGO",
    LA = "LIFE_ANNUITY",
    AC = "ANNUITIES_CERTAIN",
    ILR = "INDIVIDUAL_LIFE_RISK",
    ICL = "INDIVIDUAL_CREDIT_LIFE",
    IS = "INDIVIDUAL_SAVINGS",// /
    END = "ENDOWMENT",
    GLR = "GROUP_CREDIT_LIFE",// /
    BO = "BOND"
}

export type CoverCode = 'AC' | 'LA' | 'ILR' | 'ICR'| 'IS' | 'END' | 'GLR' | 'GS' | 'TP' | 'DR' | 'AL' | 'LIL' | 'BL' | 'PC' | 'SAV' | 'MH' | 'MC' | 'ICL' | 'BO'

export interface ICoverScreen {
  description: string;
  coverScreen: CoverCode;
}

export interface ICodes {
  codeSubgroup: string,
  code: string,
  codeGroup: string,
  title: string,
  codeCat: string,
  active: boolean,
  recType: string,
  id: number,
  deleted: any
}

export interface ICoversDetails {
  info: ICoverInfo;
  screen: {
    code: CoverCode;
    name: CoverScreenNames;
    desc: string;
  };
}

export interface IProviderSearchCriteria{
  id : number,
  clientNo : number,
  no : number,
  busLine : string,
  type : string,
  providerCategory : string,
  providerSubCategory : string,
  network : string,
  disciplines : string,
  branches : string,
  status : string,
  tariffCode : string,
  facilityDescription : string,
  fullName : string
}

export interface AgentInfo {
  agentNo: string;
  agentSplit: number;
  alpha: string;
  coverCode: string;
  holdCommission: boolean;
  id: number;
  policyCode: string;
  policyId: number;
  policyNo: string;
  primaryAgent: boolean;
  quoteNo: string;
  referrerNo: string;
  seqNo: number;
  serviceAgent: string;
  serviceFrom: Date;
}

export interface AssetValue {
  adjValue: number;
  ccy: string;
  monthlyRent: number;
  mvAdj: number;
  mvClient: number;
  purValue: number;
}

export interface ClientBankInfo {
  accountName: string;
  accountNo: string;
  accountType: string;
  authBy: string;
  bankAdd: string;
  bankBranch: string;
  bankCity: string;
  bankName: string;
  bankSwiftCd: string;
  bankTown: string;
  blocked: boolean;
  blockedDate: Date;
  clientNo: string;
  country: string;
  currency: string;
  no: string;
  payeeNo: string;
  sortCode: string;
}

export interface Covers {
  aggSumAssured: number;
  alpha: string;
  applYear: number;
  assetId: string;
  assetRedgNo: string;
  assured: string;
  assuredName: string;
  assuredRelToOwner: string;
  base: boolean;
  benEscalRate: number;
  benPayBasis: string;
  benPayFreq: string;
  benPayTermDays: number;
  benPayTermMo: number;
  benSchedule: boolean;
  benScheduleBasis: string;
  branchCode: string;
  busLine: string;
  code: string;
  commEarnBasis: string;
  commEarnPeriod: number;
  commRate: number;
  commType: string;
  companyCode: string;
  coverDescription: string;
  coverEndDate: Date;
  coverNo: number;
  coverPremFreq: string;
  coverPremPayMeth: string;
  coverPremium: number;
  coverRenewalDueOn: Date;
  coverRenewedOn: Date;
  coverStartDate: Date;
  coverTermDays: number;
  coverTermMo: number;
  currency: string;
  deductible: number;
  definedBen: number;
  depAdmin: boolean;
  deposit: number;
  description: string;
  discCode: string;
  emv: number;
  enroleeNo: string;
  enroleeNoSuffix: number;
  escalContinuePost: boolean;
  excess: number;
  fcl: number;
  funded: boolean;
  gmv: number;
  groupNo: string;
  guarYield: number;
  id: number;
  inComplete: boolean;
  initialBaseCoverSa: number;
  initialSumAssured: number;
  insType: string;
  issueAge: number;
  issueAssetAge: number;
  issueDate: Date;
  issueOn: Date;
  loanIntRate: number;
  loanRepayFreq: string;
  memberNo: string;
  monthlyIncome: number;
  noPremPayInYr: number;
  nonMedicalLimit: number;
  paidFromDate: Date;
  paidToDate: Date;
  payG: boolean;
  policyCode: string;
  policyId: number;
  policyNo: string;
  policyNoSuffix: number;
  policyTermDays: number;
  premFactor: number;
  premPayFreq: string;
  premPayMeth: string;
  premPayTermDays: number;
  premPayTermMo: number;
  premiumDue: number;
  premiumPaid: number;
  premiumTarget: number;
  premiumToBen: boolean;
  productClass: string;
  productCode: string;
  quoteNo: string;
  quoteValidBasis: string;
  quoteValidDays: number;
  relLifeAssured: string;
  renewalAge: number;
  renewalAssetAge: number;
  saBasis: string;
  saEscalRate: number;
  sar: number;
  seqNo: number;
  stFactor: number;
  subgroupName: string;
  subgroupNo: string;
  suffix: number;
  sumAssured: number;
  uncoveredSar: number;
}

export interface NextOfKin {
  category: string;
  clientStatus: string;
  codeTitle: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  policyCode: string;
  policyNo: string;
  relClientNo: string;
  relationship: string;
}

export interface Policy {
  agentNo: string;
  alpha: string;
  annualisedPremium: number;
  annuityOnClaimEscalRate: number;
  annuityOnClaimFreq: string;
  annuityOnClaimTermFreq: string;
  annuityOnClaimTermMonths: number;
  applDate: string;
  authBy: string;
  authOn: Date;
  automaticPremiumLoan: boolean;
  benefitAssignedTo: string;
  branchCode: string;
  busLine: string;
  clientCategory: string;
  code: string;
  commenceDate: Date;
  companyCode: string;
  conversionProb: number;
  convertBasis: string;
  convertReason: string;
  convertToPolicy: boolean;
  convertToProd: boolean;
  convertedBy: string;
  convertedOn: Date;
  coverCode: string;
  createdBy: string;
  createdOn: Date;
  currency: string;
  daysToExpiry: number;
  daysToQuoteExpiry: number;
  discCode: boolean;
  examination: boolean;
  externalRef: string;
  fcl: string;
  groupNo: string;
  grouped: boolean;
  id: number;
  inComplete: boolean;
  inSuspense: number;
  insType: string;
  issueAge: number;
  issueDate: Date;
  issueOwnerAge: number;
  iterations: number;
  jointOwner: string;
  jointOwnerName: string;
  loanIntRate: number;
  modifiedOn: Date;
  modifiedUser: string;
  noOfAssets: number;
  noOfCovers: number;
  noOfLives: number;
  nonMedicalLimit: number;
  outSuspense: number;
  ownerClientNo: string;
  ownerCrmClientNo: string;
  ownerName: string;
  ownerPortion: number;
  paidToDate: Date;
  payeeAccount: string;
  payerAccount: string;
  payinFreq: string;
  payinMethod: string;
  policyCode: string;
  policyGroupId: number;
  policyNo: string;
  policyNoSuffix: string;
  policyStatus: string;
  policyTermDays: number;
  policyTermMo: number;
  premEscalationRate: number;
  premFreq: string;
  premIndexTable: string;
  premPayTermMo: number;
  premiumDue: number;
  premiumLoanPeriod: number;
  premiumPaid: number;
  premiumTarget: number;
  productClass: string;
  productCode: string;
  quoteAuth: boolean;
  quoteAuthBy: string;
  quoteAuthOn: Date;
  quoteNo: string;
  quoteStatus: string;
  quoteValidDays: string;
  quotedByAgent: boolean;
  quotedByClient: boolean;
  quotedByStaff: boolean;
  quotedOn: Date;
  referrerNo: string;
  renewalDate: Date;
  renewalDueOn: Date;
  renewedOn: Date;
  rm: string;
  saIndexTable: string;
  seqNo: number;
  sumAtRisk: number;
  tmId: string;
  totalPeriodicPremium: number;
  totalSar: number;
  uwPending: boolean;
}

export interface PolicyBankInformation {
  alpha: string;
  clientName: string;
  clientNo: string;
  clientRelOwner: string;
  ddBankNo: string;
  ddMandateVerified: boolean;
  id: number;
  mandateRef: string;
  payFreq: string;
  payorName: string;
  payorNo: string;
  payoutBankNo: string;
  payoutMethod: string;
  policyBenScheduleId: number;
  policyCode: string;
  policyCoversAnnuityId: number;
  policyId: number;
  policyNo: string;
  policyNoSuffix: number;
  prefPayDay: number;
}

export interface PolicyRelatedClientsInfo {
  codeTitle: string;
  enroleeNo: number;
  enroleeNoSuffix: number;
  groupNo: number;
  id: number;
  policyCode: string;
  policyGroupId: number;
  policyId: number;
  policyNo: string;
  policyNoSuffix: number;
  quoteNo: string;
  relClient: string;
  relDate: Date;
  type: string;
}

export interface ICreateQuotePOST {
  agentInfo: AgentInfo;
  assetValue: AssetValue;
  clientBankInfo: ClientBankInfo;
  covers: Covers;
  nextOfKin: NextOfKin[];
  policy: Policy;
  policyBankInformation: PolicyBankInformation;
  policyRelatedClientsInfo: PolicyRelatedClientsInfo;
}
