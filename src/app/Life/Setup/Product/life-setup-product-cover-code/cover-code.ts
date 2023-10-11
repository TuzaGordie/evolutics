import {
  AnnuityGuaranteePeriod,
  AnnuityReversionaryRateOption,
  AnnuityDeferredPeriod,
  AnuityEscalationRateOption,
  CompaniesAllowed,
  CoversCommissionRates,
  CoversCommissionVersions,
  CurrencyAllowed,
  PaymentOutMethodAllowed,
  PremiumFrequency,
  QuotationFormsToBeAttached,
} from './cover-code-child';

export class CreateCoverCode {
  constructor(
    public accReins: CreateAcct,
    public annuities: Annuities,
    public basic: CreateBasic,
    public benefit: CreateCoversBenefit,
    public bonuses: Bonuses[],
    public commission: Commission,
    public dependents: Dependents[],
    public documentations: Documentations[], ////new array
    public endorsements: Endorsements,
    public excessDeductible: CreateExcessDeductible,
    public lapse: Lapse,
    public loan: Loan,
    public paidUp: PaidUp,
    public perils: CreatePeril,
    public premium: CreateCoverPremium,
    public surrenders: Surrenders,
    public taxesLevies: TaxesLevies,
    public terms: CreateTerms,
    public underwriting: Underwriting
  ) {}
}

export class CreateCoversBenefit {
  constructor(
    public coversBenefit: Benefit,
    public coverBenefitFreqs: CoverBenefitFreq[],
    public coversSumAssured: CoversSumAssured,
    public coversSumAssuredFactorOptions: CoversSumAssuredFactorOptions,
    public coversBenefitClaims: CoverBenefitClaim[],
    public coversAutoSettleCover: CoversAutoSettleCover[],
    public coversAutoTerminateCover: CoversAutoTerminateCover[],
    public coversLoanIntRates: CoversLoanIntRate[],
    public coversCoversWaived: CoversCoversWaived[],
    public coversSumAssuredOpts: CoversSumAssuredOpt[],
    public coversBenefitEscals: CoversBenefitEscal[],
    public coversBenefitSchedules: CoversBenefitSchedule[]
  ) {}
}

export class CreateCoverPremium {
  constructor(
    public coversPremium: Premium,
    public coversPremiumFP: CoversPremiumFP,
    public coversPremiumFPVersion: CoversPremiumFPVersion[],
    public coversDiscounts: CoversDiscount[]
  ) {}
}

export class CoversDiscount {
  id: number;
  rowId: number;
  code: string;
  discCode: string;
}

export class CoverBenefitFreq {
  id: number;
  rowId: number;
  code: string;
  benPayFreq: string;
  active: boolean = false;
}

export class CoverBenefitClaim {
  id: number;
  rowId: number;
  noPayTable: string;
  noBenPay: number;
  waitPeriod: number;
  maxNoClaimYr: number;
  macNoClaimLife: number;
  benPayFreq: string;
  statusOnClaim: string;
  noPremWaived: string;
  noPremWaivedTable: string;
  benPayBasis: string;
  type: string;
  claimReportLimit: number;
}

export class CoversPremiumFP {
  id: number;
  code: string;
  versionNo: number;
  grossYieldFixedRate: number;
  grossYieldRateTable: string;
  grossYieldMarginalRate: number;
  grossYieldMarginalRateTable: string;
  mortalityTable: string;
  profitMarginRate: number;
  profitMarginTable: string;
  renewalExpAmt: number;
  renewalExpTable: string;
  initialExpAmt: number;
  uwExpenseFixedAmt: number;
  uwExpenseTable: string;
  inflationRate: number;
  inflationRateTable: string;
  otherMarginRate: number;
  otherMarginRateTable: string;
  refSACashFlowPricing: number;
  refMonthlyAnnuityAmt: number;
  vnbTargetRate: number;
  vnbTargetTable: string;
  commExpRate: number;
  commExpRateTable: string;
  hierarchyCommExpRate: number;
  hierarchyCommExpTable: string;
  regLvl1Basis: string;
  regLvl1Rate: number;
  regLvl2Basis: string;
  regLvl2Rate: number;
  rewardExpAmt: number;
  regLvl2Table: number;
  rewardExpenseFixedAmt: number;
  lapseFixedRate: number;
}

export class CoversPremiumFPVersion {
  id: number;
  rowId: number;
  code: string;
  versionNo: number = 1;
  versionDate: string;
}

export class CoversLoanIntRate {
  rowId: number;
  id: number;
  loanIntRate: number;
}

export class CoversCoversWaived {
  rowId: number;
  id: number;
  codeWaived: string;
}

export class CoversSumAssuredOpt {
  rowId: number;
  id: number;
  saAllowed: number;
}

export class CoversBenefitEscal {
  rowId: number;
  id: number;
  rate: number;
}

export class CoversBenefitSchedule {
  id: number;
  rowId: number;
  benSchedBasis: string;
  schedTerm: number;
  schedDuration: number;
  schedFactor: number;
  amount: number;
}

export class CoversAutoSettleCover {
  autoSettleCover: string;
  id: number;
  rowId: number;
}

export class CoversAutoTerminateCover {
  autoTerminateCover: string;
  id: number;
  rowId: number;
}

export class CoversSumAssured {
  id: number;
  saAllowed: number;
  rate: number;
  decreaseSaWhenAboveMax: boolean;
  code: string;
  minSumAssured: number;
  maxSumAssured: number;
  saCalcBasis: string;
  saNotExceedBase: boolean;
  dependCover: string;
  active: boolean;
}
export class CoversSumAssuredFactorOptions {
  id: number;
  factorAllowed: number;
}

export class CreateAcct {
  constructor(public acct: AccReins, public treaties: Treaty[]) {}
}

export class Treaty {
  rowId: number;
  id: number;
  treatyCode: string;
  coverBasicId: number;
  description: string;
}

export class AccReins {
  code: string;
  id: number;
  accuralAccounting: boolean = false;
  reinsuranceQuotes: boolean = false;
}

export class Annuities {
  id: number;
  code: string;
  annuityEscalationRateOption: AnuityEscalationRateOption[];
  annuityDeferredPeriod: AnnuityDeferredPeriod[];
  annuityGuaranteePeriod: AnnuityGuaranteePeriod[];
  annuityReversionaryRateOption: AnnuityReversionaryRateOption[];
}

export class CreateBasic {
  constructor(
    public basic: Basic,
    public coversCompanies: CompaniesAllowed[],
    public coversPayoutMethod: CoversPayoutMethod[]
  ) {}
}

export class Basic {
  id: number;
  code: string;
  active: boolean = false;
  benefitPaidOut: boolean = false;
  busLine: string;
  closedToNewBusiness: boolean = false;
  coverScreen: string;
  currencyAllowed: CurrencyAllowed[] = [new CurrencyAllowed()];
  definedBenefit: boolean = false;
  depositAdministration: boolean = false;
  description: string;
  groupProcessing: boolean = false;
  includeInSar: boolean = false;
  insuranceType: string;
  interestBasis: string;
  interestRateTable: string;
  issueDateBasis: string;
  issueDateFactor: number;
  minGroupMembers: number;
  productCode: string;
  providerCategory: string;
  providerCode: string;
  quoteValidityBasis: string;
  quoteValidityPeriod: number;
}

export class CoversPayoutMethod {
  payoutMethod: string;
  id: number;
  rowId: number;
}

export class Benefit {
  id: number;
  code: string;
  autoDecreaseSumAssuredWhenAboveMax: boolean = false;
  autoProcessMaturityBenefit: boolean = false;
  benefitPaymentBasis: string;
  claimReportLimit: number;
  coverSumAssuredDepends: string;
  coversWaived: any[] = [];
  deductOutstandingPremiumFromBenefit: boolean = false;
  details: boolean = false;
  enterScheduleOfPayment: boolean = false;
  loanInterestRate: any[] = [];
  matureAnnEnd: boolean = false;
  maxAssured: number;
  maxNoOfClaimsInOneYear: number;
  maxNoOfClaimsInPolicyLife: number;
  minAssured: number;
  noOfPaymentBasis: number;
  noOfPaymentTable: string;
  noOfPayments: number;
  onClaimAlsoSettle: string;
  onClaimAlsoTerminate: string;
  partialBenefitBeforeMaturity: boolean = false;
  paymentFrequency: string;
  paymentSchedule: boolean = false;
  paymentStatusCode: string;
  paymentTriggerBasis: string;
  statusOnClaim: string;
  sumAssuredCalcBasis: string;
  sumAssuredEscalation: any[] = [];
  sumAssuredFactor: string;
  sumAssuredOption: any[] = [];
  type: string;
  waitingPeriod: number;
}

export class Bonuses {
  rowId: number;
  id: number;
  code: string;
  annualBonusBasis: string;
  annualBonusRate: number;
  annualBonusTable: string;
  dateFrom: string;
  dateTo: string;
  promoBonusBasis: string;
  promoBonusRate: number;
  promoBonusTable: string;
}

export class Commission {
  id: number;
  code: string;
  agentClawBackBasis: string;
  clawBackSpreadBasis: string;
  clawBackSpreadPeriod: number;
  clawbackOnLapse: boolean = false;
  clawbackTable: string;
  commissionCode: string;
  commissionEarningBasis: string;
  commissionEarningPeriod: number;
  coversCommissionRates: CoversCommissionRates[] = [
    new CoversCommissionRates(),
  ];
  coversCommissionVersions: CoversCommissionVersions[] = [
    new CoversCommissionVersions(),
  ];
  fixedCommissionAmount: number;
  referralPaymentBasis: number;
  referralPaymentRate: number;
  referralPaymentTable: string;
  telemarketerRemBasis: string;
  tmRemRate: number;
  tmRemTable: string;
}

export class Dependents {
  rowId: number;
  id: number;
  code: string;
  ageAssuredLimit: number;
  availablePostIssue: boolean = false;
  blankSumAssured: boolean = false;
  company: string;
  description: string;
  fundingOption: string;
  mandatory: boolean = false;
  maxNo: number;
  riderCoverCode: string;
  sumAssuredEqualBaseCoverSumAssured: boolean = false;
}

export class Documentations {
  rowId: number;
  id: number;
  code: string;
  action: string;
  condition: string;
  documentCategory: string;
  documentCode: string;
  event: string;
  eventType: string;
  language: string;
}

export class Endorsements {
  id: number;
  code: string;
  addRider: boolean = false;
  bankDetails: boolean = false;
  beneficiary: boolean = false;
  benefitEscalationRate: boolean = false;
  benefitPaymentTerm: boolean = false;
  coverTerm: boolean = false;
  endorsementCalculationBasis: number;
  endorsementCalculationTable: string;
  lifeAssured: boolean = false;
  owner: boolean = false;
  paymentMethod: boolean = false;
  premiumPaymentTerm: boolean = false;
  screen: number;
  sumAssured: boolean = false;
}

export class CreateExcessDeductible {
  constructor(
    public excess: Excess,
    public deductible: Deductible,
    public coversDeductibleOpt: CoversDeductibleOpt[],
    public excessOpts: CoversExcessOpt[]
  ) {}
}

export class Deductible {
  deductibleBuybackAllowed: boolean;
  deductibleBuybackPremiumRate: number;
  deductibleCalcBasis: string;
  deductibleTable: string;
  defaultDeductibleAmount: number;
  defaultDeductibleRate: number;
  fixedDeductibleOptionAmount: number;
  fixedDeductibleOptionRate: number;
  maxDeductible: number;
  minDeductible: number;
  code: string;
  id: number;
}

export class Excess {
  id: number;
  code: string;
  deductibleBuybackAllowed: boolean = false;
  deductibleBuybackPremiumRate: number;
  deductibleCalcBasis: string;
  deductibleTable: string;
  defaultDeductibleAmount: number;
  defaultDeductibleRate: number;
  defaultExcessAmount: number;
  defaultExcessRate: number;
  excessBuyBackAllowed: boolean = false;
  excessBuyBackPremiumRate: number;
  excessCalcBasis: string;
  excessTable: string;
  excessOptRate: number;
  fixedDeductibleOptionAmount: number;
  fixedDeductibleOptionRate: number;
  fixedExcessOptionAmount: number;
  fixedExcessOptionRate: number;
  maxDeductible: number;
  maxExcess: number;
  minDeductible: number;
  minExcess: number;
  totalLossExcessAmount: number;
  totalLossExcessRate: number;
}

export class CoversExcessOpt {
  id: number;
  rowId: number;
  fixedExcessOptionAmount: number;
  excessOptRate: number;
  coversExcessId: number;
  code: string;
}

export class CoversDeductibleOpt {
  id: number;
  rowId: number;
  deductOptamount: number;
  deductOptRate: number;
  coversDeductibleId: number;
  coverCode: string;
}

export class Lapse {
  autoReinstate: boolean = false;
  claimAllowed: boolean = false;
  code: string;
  convertToPaidUpLapsing: boolean = false;
  daysOfGrace: number;
  daysOfGraceTable: number;
  daysReinstChargeFree: number;
  id: number;
  lapseAllowed: boolean = false;
  lapseValueBasis: string;
  lapseValueTable: string;
  maxLapseAllowed: number;
  minPolicyDurLapse: number;
  noOfLapseAllowed: number;
  reinstatementAllowed: boolean = false;
  reinstatementChargeAmountTable: string;
  reinstatementFixedChargeAmount: number;
  reinstatementInterestRateTable: number;
}

export class Loan {
  id: number;
  code: string;
  daysBeforeAutoPreLoan: number;
  loanPolicyValueAllowed: boolean = false;
  maxLoanCalculationBasis: string;
  maxLoanCalculationFactor: number;
  minimumPolicyLoanAmount: number;
  noOfMonthsBeforeLoanPolicyAllowed: number;
  policyLoanInterestTable: string;
  premiumLoanAllowed: boolean = false;
  premiumLoanBasis: string;
  premiumLoanFee: number;
  premiumLoanInterestTable: string;
}

export class PaidUp {
  allowReinstatementPaidup: boolean = false;
  benefitRecalcBasis: string;
  benefitRecalcTable: string;
  code: string;
  daysReinstChargeFree: number;
  id: number;
  minPolicyBeforePaidUpAllowed: number;
  monthBeforePaidUpAllowed: number;
  paidUpAllowed: boolean = false;
  paidupChargeTable: string;
  paidUpTable: boolean = false;
  reinstatementCalcBasis: string;
}

export class CreatePeril {
  constructor(
    public peril: Perils,
    public coversPerilDetails: PerilDetails[]
  ) {}
}

export class Perils {
  id: number;
  code: string;
  perilCode: string;
  type: string;
}

export class PerilDetails {
  rowId: number;
  id: number;
  type: string;
  code: string;
  benCalcBasis: string;
  perilBenefitSumAssured: number;
  perilBenefitOnDeath: boolean = false;
  perilCode: string;
  perilMinPeriod: number;
  proximateCauseAllowed: string;
  perilSeverityLevel: string;
  perilWaitingPeriod: number;
}

export class Premium {
  id: number;
  code: string;
  discountCodeAllowed: any[] = [];
  fixedFemaleAgeAdjustment: number;
  fixedPremiumAmount: number;
  fixedRate: number;
  fixedRateBasis: string;
  fixedSmokerAgeAdjustment: number;
  policyFeeAmountTable: string;
  policyFeeBasis: string;
  policyFeeFixedAmount: number;
  premRateTable: string;
  premiumCalculationBasis: string;
  premiumFrequency: PremiumFrequency[] = [new PremiumFrequency()];
  premiumRoundingBasis: string;
  premiumRoundingFactor: number;
  primaryPremiumRateTable: string;
  rateCalculationBasis: string;
  secondaryPremiumRateTable: string;
  shortTermRateTable: string;
}

export class Surrenders {
  cancelValueTable: string;
  clawbackCancel: boolean = false;
  code: string;
  coverPremium: number;
  fullSurrenderAllowed: boolean = false;
  fullSurrenderPenaltyRate: number;
  fullSurrenderPenaltyTable: string;
  fullSurrenderValPenaltyRate: number;
  fullSurrenderValueTable: string;
  id: number;
  issueDate: string;
  maxPartialSurrenderCalcBasis: string;
  maxPartialSurrenderCalcFactor: number;
  minFullSurrenderContributionRate: number;
  minFullSurrenderValueTable: string;
  minimumPartialSurrenderAmount: number;
  minPartialSurrAmt: number;
  minPartialSurrenderContributionRate: number;
  monthsToFullSurrender: number;
  monthsToFullSurrenderTable: string;
  monthsToPartialSurrender: number;
  monthsToPartialSurrenderTable: number;
  partialSurrenderAllowed: boolean = false;
  partialSurrenderPenalty: number;
  partialSurrenderPenaltyTable: string;
  premiumFrequency: string;
  surrenderCalculationBasis: number;
  surrenderValueTable: string;
  zeroSurrenderFeePuStatus: boolean = false;
  zeroSurrenderPenPuStatus: boolean;
}

export class TaxesLevies {
  id: number;
  code: string;
  active: boolean;
  auth: boolean;
  authBy: string;
  authOn: string;
  coversBasicId: number;
  deathBenTaxRate: number;
  deathBenTaxTable: string;
  deathBenefitTaxBasis: string;
  intEarnedTaxRate: number;
  intEarnedTaxTable: string;
  interestEarnedTaxBasis: string;
  matBanTaxTable: string;
  matBenTaxRate: number;
  maturityBenefitTaxBasis: string;
  premiumTaxBasis: string;
  premiumTaxRate: number;
  premiumTaxTable: string;
  stampDuty: string;
  stampDutyRate: number;
  stampDutyTable: string;
  surrBenTaxRate: number;
  surrBenTaxTable: string;
  surrenderBenefitTaxBasis: string;
}

export class CreateTerms {
  constructor(
    public coversTerms: Terms,
    public coversTermsOpts: TermsOpts[],
    public coversPremTermOpt: CoversPremTermOpt[],
    public coversBenTermOpt: CoversBenTermOpt[]
  ) {}
}

export class CoversPremTermOpt {
  id: number;
  rowId: number;
  code: string;
  premPayTermMonth: number;
  years: number;
  months: number;
}

export class CoversBenTermOpt {
  id: number;
  rowId: number;
  code: string;
  benPayTermMonth: number;
  years: number;
  months: number;
}

export class TermsOpts {
  id: number;
  rowId: number;
  policyTermMonth: number;
  years: number;
  months: number;
}

export class Terms {
  id: number;
  code: string;
  active: boolean = false;
  ageCalculationBasis: string;
  coolingOffPeriod: number;
  doNotMatureUntilBenefitIsPaidOut: boolean = false;
  fixedPolicyTermMonths: number;
  fixedPolicyTermYears: number;
  fixedPremiumPaymentTermMonths: number;
  fixedPremiumPaymentTermYears: number;
  maturityBasis: string;
  maximumAgePolicyMaturityYears: number;
  maximumEntryAge: number;
  maximumPolicyTermMonths: number;
  maximumPolicyTermYears: number;
  maximumPremiumPayTermMonths: number;
  maximumPremiumPayTermYears: number;
  minimumEntryAge: number;
  minimumPolicyTermMonths: number;
  minimumPolicyTermYears: number;
  minimumPremiumPayTermMonths: number;
  minimumPremiumPayTermYears: number;
}

export class Underwriting {
  id: number;
  code: string;
  companyCode: string;
  base: boolean = false;
  evobot: boolean = false;
  fclCalcBasis: string;
  fclCalcFactor: number;
  financialUnderwritingTable: string;
  loadOnlyAboveFcl: boolean = false;
  medicalUnderwritingResultTable: string;
  medicalUnderwritingTestTable: string;
  nonMedicalLimit: number;
  quotationFormsToBeAttached: QuotationFormsToBeAttached[] = [
    new QuotationFormsToBeAttached(),
  ];
  riskSurveyQuestionSet: string;
  underwritingQuestionSet: string;
  uwQuestMandCreatePolicy: boolean = false;
}
