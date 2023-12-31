export interface ICover {
  aggSumAssured: number;
  alpha: string;
  applYear: number;
  assetId: string;
  assetRedgNo?: any;
  assured?: any;
  assuredName?: any;
  assuredRelToOwner?: any;
  base: boolean;
  benEscalRate?: any;
  benPayBasis?: any;
  benPayFreq?: any;
  benPayTermDays?: any;
  benPayTermMo?: any;
  benSchedule?: any;
  benScheduleBasis?: any;
  branchCode: string;
  busLine?: any;
  code: string;
  commEarnBasis?: any;
  commEarnPeriod?: any;
  commRate?: any;
  commType?: any;
  companyCode: string;
  coverDescription: string;
  coverEndDate?: any;
  coverEndOn?: Date;
  coverNo: number;
  coverPremFreq: string;
  coverPremium: number | string;
  coverPremPayMeth?: any;
  coverRenewalDueOn?: any;
  coverRenewedOn?: any;
  coverStartDate: string;
  coverTermDays: number;
  coverTermMo?: any;
  currency?: any;
  deductible?: any;
  definedBen: number;
  depAdmin: boolean;
  deposit?: any;
  description?: any;
  discCode?: any;
  emv?: any;
  enroleeNo: string;
  enroleeNoSuffix?: any;
  escalContinuePost?: any;
  excess?: any;
  fcl?: any;
  funded: boolean;
  gmv?: any;
  groupNo?: any;
  guarYield: number;
  id: number;
  inComplete: boolean;
  initialBaseCoverSa?: any;
  initialSumAssured?: any;
  insType?: any;
  issueAge?: any;
  issueAssetAge?: any;
  issueDate?: any;
  issueOn: Date;
  loanIntRate?: any;
  loanRepayFreq?: any;
  memberNo?: any;
  monthlyIncome?: any;
  nonMedicalLimit: number;
  noPremPayInYr?: any;
  paidFromDate?: any;
  paidToDate: string;
  payG?: any;
  policyCode: string;
  policyId: number;
  policyNo: string;
  policyNoSuffix: number;
  policyTermDays?: any;
  premFactor?: any;
  premiumDue?: any;
  premiumPaid?: any;
  premiumTarget?: any;
  premiumToBen?: any;
  premPayFreq?: any;
  premPayMeth?: any;
  premPayTermDays?: any;
  premPayTermMo?: any;
  productClass?: any;
  productCode: string;
  quoteNo: string;
  quoteValidBasis?: any;
  quoteValidDays?: any;
  relLifeAssured?: any;
  renewalAge?: any;
  renewalAssetAge?: any;
  saBasis: string;
  saEscalRate?: any;
  sar: number;
  seqNo: number;
  stFactor?: any;
  subgroupName?: any;
  subgroupNo?: any;
  suffix?: any;
  sumAssured: number;
  uncoveredSar?: any;
}
