import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FindProductService } from '../../service/find-product.service';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-cover-code',
  templateUrl: './create-cover-code.component.html',
  styleUrls: ['./create-cover-code.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateCoverCodeComponent implements OnInit {
  productCoverForm:any = FormGroup
  insuranceTypeList:any=[];
  currenciesList:any=[];
  companiesList:any=[];
  interestCalBasisList:any=[];
  quoteValidityBasisList:any=[];
  interestTableList:any=[];
  providerCategoryList:any=[];
  paymentMethodsList:any=[];
  coversList:any=[];
  fundingOptionsList:any=[];
  paymentTriggerList:any=[];
  paymentTableList:any=[];
  frequencyTableList:any=[];
  sumAssuredCalcBasisList:any=[];
  statusCodeList:any=[];
  paymentInMethodsList:any=[];
  premiumCalcBasisList:any=[];
  rateCalcBasisList:any=[];
  fixedRateCalcBasisList:any=[];
  policyFeeBasisList:any=[];
  premiumRoundingBasisList:any=[];
  commissionCodesList:any=[];
  commissionEarningList:any=[];
  agentTypeList:any=[];
  telemarketerRemBasisList:any=[];
  referralPaymentBasisList:any=[];
  clawbackBasisList:any=[];
  clawbackSpreadBasisList:any=[];
  referralPaymentTableList:any=[];
  tmRemTableList:any=[];
  clawbackTableList:any=[];
  claimTypesList:any=[];
  perilList:any=[];
  proximateCausesList:any=[];
  maturityBasisList:any=[];
  ageCalcBasisList:any=[];
  endorsementCalcBasisList:any=[];
  endorsementCalcTableList:any=[];
  fclCalcBasisList:any=[];
  monthsToPartialSurrenderTableList:any=[];
  maxPartialSurrenderBasisList:any=[];
  surrenderPayBasisList:any=[];
  premiumLoanBasisList:any=[];
  policyLoanInterestTableList:any=[];
  maxLoanCalcBasisList:any=[];
  lapseValueBasisList:any=[];
  lapseValueTableList:any=[];
  reinstatementChargeAmountTableList:any=[];
  benefitRecalcBasisList:any=[];
  reinstCalcBasisList:any=[];
  benefitRecalcTableList:any=[];
  bonusBasisList:any=[];
  bonusRateBasisList:any=[];
  reinsuranceTreatyList:any=[];
  premiumTaxesBasisList:any=[];
  surrenderTaxesBasisList:any=[];
  maturityTaxesBenefitBasisList:any=[];
  deathTaxesBenefitBasisList:any=[];
  stampDutyBasisList:any=[];
  interestTaxesBasisList:any=[];
  languagesList:any=[];
  actionsList:any=[];
  documentationCategoryList:any=[];
  conditionsList:any=[];
  docCategoryList:any=[];
  excessCalcList:any=[];
  deductibleCalcList:any=[];
  excessTableList:any=[];
  insuranceTypesList:any=[];
  constructor(public findProductService : FindProductService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.addNewBasicCurrencyRow();        
  this.addNewAnnuityGuaranteeRow();
  this.addNewannuityReversionaryRow();
  this.addNewannuityEscalationRow();
  this.addNewDependentRow();
  this.addNewProviderRow();
  this.addNewbenefitAssuredRow();
  this.addNewbenefitInterestRow();
  this.addNewCoversWaivedArrayRow();
  this.addNewsumAssuredEscalationRow();
  this.addNewFactorRow();
  this.addNewdiscountCodeAllowedRow();
  this.addNewVersionArrayRow();
  this.addNewcommissionRow();
  this.addNewclaimTypeRow();
  this.addNewPerilRow();
  this.addNewBonusRow();
  this.addNewAccountRow();
  this.addNewDocumentationRow();
  this.addNewExcessRow();
  this.addNewDeductibleRow();
    this.setInsuranceTypeList();
    this.setCurrenciesList();
    this.setCompanyList();
    this.setQuoteValidityBasisList();
    this.setInterestCalBasisList();
    this.setInterestTableList();
    this.setProviderCategoryList();
    this.setPaymentMethodsList();
    this.setCoversList();
    this.setFundingOptionsList();
    this.setPaymentTriggersList();
    this.setPaymentTablesList();
    this.setFrequencyPaymentList();
    this.setSumAssuredCalcBasisList();
    this.setStatusCodeList();
    this.setPaymentInMethodsList();
    this.setPremiumCalcBasisList();
    this.setRateCalcBasisList();
    this.setFixedRateCalcBasisList();
    this.setPolicyFeeBasisList();
    this.setPremiumRoundingBasisList();
    this.setCommissionCodesList();
    this.setCommissionEarningList();
    this.setAgentTypeList();
    this.setTelemarketerRemBasisList();
    this.setReferralPaymentBasisList();
    this.setClawbackBasisList();
    this.setClawbackSpreadBasisList();
    this.setReferralPaymentTableList();
    this.setTmRemTableList();
    this.setClawbackTableList();
    this.setClaimTypesList();
    this.setPerilList();
    this.setProximateCausesList();
    this.setMaturityBasisList();
    this.setAgeCalcBasisList();
    this.setEndorsementCalcBasisList();
    this.setEndorsementCalcTableList();
    this.setFCLCalcBasisList();
    this.setMonthsToPartialSurrenderTableList();
    this.setMaxPartialSurrenderBasisList();
    this.setSurrenderPayBasisList();
    this.setPremiumLoanBasisList();
    this.setMaxLoanCalcBasisList();
    this.setLapseValueBasisList();
    this.setLapseValueTableList();
    this.setReinstatementChargeAmountTableList();
    this.setBenefitRecalcBasisList();
    this.setReinstCalcBasisList();
    this.setBenefitRecalcTableList();
    this.setBonusBasisList();
    this.setBonusRateBasisList();
    this.setReinsuranceTreatyList();

    this.setPremiumTaxesBasisList();
    this.setSurrenderTaxesBasisList();
    this.setMaturityTaxesBenefitBasisList();
    this.setDeathTaxesBenefitBasisList();
    this.setStampDutyBasisList();
    this.setInterestTaxesBasisList();

    this.setLanguagesList();
    this.setActionsList();
    this.setDocumentationCategoryList();
    this.setConditionsList();
    this.setDocCategoryList();

    this.setExcessCalcList();
    this.setDeductibleCalcList();
    this.setExcessTableList();
    this.setInsuranceTypesList();

  }
  setInsuranceTypeList(){
    this.findProductService.getCodeList('INTEREST_CALC_BASIS').subscribe( res => {
      this.insuranceTypeList = res;
      console.log("Insurance Info",res)
    })
  }
  setCurrenciesList(){
    this.findProductService.getCurrenciesList().subscribe( res => {
      this.currenciesList = res;
      console.log("Currency Info",res)
    })
  }
  setCompanyList(){
    this.findProductService.getCompanyList().subscribe( res => {
      this.companiesList = res;
      console.log("Company Info",res)
    })
  }
  setInterestCalBasisList(){
    this.findProductService.getCodeList('INTEREST_CALC_BASIS').subscribe( res => {
      this.interestCalBasisList = res;
      console.log("Interest Cal Basis Info",res)
    })
  }
  setQuoteValidityBasisList(){
    this.findProductService.getCodeList('QUOTE_VALIDITY_BASIS').subscribe( res => {
      this.quoteValidityBasisList = res;
      console.log("Quote validity Basis Info",res)
    })
  }
  setInterestTableList(){
    this.findProductService.getInterestTableList().subscribe( res => {
      this.interestTableList = res;
      console.log("Interest table list",res)
    })
  }
  setProviderCategoryList(){
    this.findProductService.getCodeList('PROVIDER_CAT').subscribe( res => {
      this.providerCategoryList = res;
      console.log("Provider category info",res)
    })
  }
  setPaymentMethodsList(){
    this.findProductService.getPaymentMethodsList().subscribe( res => {
      this.paymentMethodsList = res;
      console.log("Payment methods list",res)
    })
  }
  setCoversList(){
    this.findProductService.getCoversList().subscribe( res => {
      this.coversList = res;
      console.log("Covers list",res)
    })
  }
  setFundingOptionsList(){
    this.findProductService.getCodeList('FUNDING_OPT').subscribe( res => {
      this.fundingOptionsList = res;
      console.log("Funding Options list",res)
    })
  }
  setPaymentTriggersList(){
    this.findProductService.getCodeList('BEN_PAY_BASIS').subscribe( res => {
      this.paymentTriggerList = res;
      console.log("Payment trigger list",res)
    })
  }
  setPaymentTablesList(){
    this.findProductService.getCodeList('NO_PAY_BASIS').subscribe( res => {
      this.paymentTableList = res;
      console.log("Payment table list",res)
    })
  }
  setFrequencyPaymentList(){
    this.findProductService.getCodeList('FREQUENCY').subscribe( res => {
      this.frequencyTableList = res;
      console.log("Frequency Payment list",res)
    })
  }
  setSumAssuredCalcBasisList(){
    this.findProductService.getCodeList('SA_BASIS').subscribe( res => {
      this.sumAssuredCalcBasisList = res;
      console.log("Calc Basis list",res)
    })
  }
  setStatusCodeList(){
    this.findProductService.getStatusCodeList().subscribe( res => {
      this.statusCodeList = res;
      console.log("Status Code list",res)
    })
  }
  setPaymentInMethodsList(){
    this.findProductService.getPaymentInMethodsList().subscribe( res => {
      this.paymentInMethodsList = res;
      console.log("Payment in methods list",res)
    })
  }
  setPremiumCalcBasisList(){
    this.findProductService.getCodeList('PREM_CALC_BASIS').subscribe( res => {
      this.premiumCalcBasisList = res;
      console.log("Premium Calc Basis list",res)
    })
  }
  setRateCalcBasisList(){
    this.findProductService.getCodeList('RATE_CALC_BASIS').subscribe( res => {
      this.rateCalcBasisList = res;
      console.log("Rate Calc Basis list",res)
    })
  }
  setFixedRateCalcBasisList(){
    this.findProductService.getCodeList('FIXED_RATE_BASIS').subscribe( res => {
      this.fixedRateCalcBasisList = res;
      console.log("Fixed Rate Calc Basis list",res)
    })
  }
  setPolicyFeeBasisList(){
    this.findProductService.getCodeList('POLICY_FEE_BASIS').subscribe( res => {
      this.policyFeeBasisList = res;
      console.log("Policy Fee Basis list",res)
    })
  }
  setPremiumRoundingBasisList(){
    this.findProductService.getCodeList('PREM_ROUNDING_BASIS').subscribe( res => {
      this.premiumRoundingBasisList = res;
      console.log("Premium rounding basis list",res)
    })
  }
  setCommissionCodesList(){
    this.findProductService.getCommissionCodesList('C').subscribe( res => {
      this.commissionCodesList = res;
      console.log("Commission codes list",res)
    })
  }
  setCommissionEarningList(){
    this.findProductService.getCodeList('COMM_BASIS').subscribe( res => {
      this.commissionEarningList = res;
      console.log("Commission earning list",res)
    })
  }
  setAgentTypeList(){
    this.findProductService.getAgentTypeList().subscribe( res => {
      this.agentTypeList = res;
      console.log("Agent Type list",res)
    })
  }
  setReferralPaymentBasisList(){
    this.findProductService.getCodeList('REFERRAL_FEE_BASIS').subscribe( res => {
      this.referralPaymentBasisList = res;
      console.log("Referral Type list",res)
    })
  }
  setTelemarketerRemBasisList(){
    this.findProductService.getCodeList('TM_FEE_BASIS').subscribe( res => {
      this.telemarketerRemBasisList = res;
      console.log("Telemarketer Rem list",res)
    })
  }
  setClawbackBasisList(){
    this.findProductService.getCodeList('CLAWBACK_BASIS').subscribe( res => {
      this.clawbackBasisList = res;
      console.log("Clawback basis list",res)
    })
  }
  setClawbackSpreadBasisList(){
    this.findProductService.getCodeList('CLAWBACK_SPREAD_BASIS').subscribe( res => {
      this.clawbackSpreadBasisList = res;
      console.log("Clawback spread basis list",res)
    })
  } 
  setReferralPaymentTableList(){
    this.findProductService.getCommissionCodesList('RF').subscribe( res => {
      this.referralPaymentTableList = res;
      console.log("RF table list",res)
    })
  }
  setTmRemTableList(){
    this.findProductService.getCommissionCodesList('TM').subscribe( res => {
      this.tmRemTableList = res;
      console.log("TM Rem table list",res)
    })
  }
  setClawbackTableList(){
    this.findProductService.getCommissionCodesList('C').subscribe( res => {
      this.clawbackTableList = res;
      console.log("Clawback table list",res)
    })
  }
  setClaimTypesList(){
    this.findProductService.getCodeList('CLAIM_TYPE').subscribe( res => {
      this.claimTypesList = res;
      console.log("Claim types list",res)
    })
  }
  setPerilList(){
    this.findProductService.getCodeList('PERIL').subscribe( res => {
      this.perilList = res;
      console.log("Peril list",res)
    })
  }
  setProximateCausesList(){
    this.findProductService.getCodeList('PROXIMATE_CAUSE').subscribe( res => {
      this.proximateCausesList = res;
      console.log("Proximate Causes list",res)
    })
  }
  setMaturityBasisList(){
    this.findProductService.getCodeList('MAT_BASIS').subscribe( res => {
      this.maturityBasisList = res;
      console.log("Maturity Basis list",res)
    })
  }
  setAgeCalcBasisList(){
    this.findProductService.getCodeList('AGE_CALC_BASIS').subscribe( res => {
      this.ageCalcBasisList = res;
      console.log("Age Cal Basis list",res)
    })
  }
  setEndorsementCalcBasisList(){
    this.findProductService.getCodeList('ENDORSE_CALC_BASIS').subscribe( res => {
      this.endorsementCalcBasisList = res;
      console.log("Endorsement Cal Basis list",res)
    })
  }
  setEndorsementCalcTableList(){
    this.findProductService.getCommissionCodesList('UW').subscribe( res => {
      this.endorsementCalcTableList = res;
      console.log("Endorsement Cal table list",res)
    })
  }
  setFCLCalcBasisList(){
    this.findProductService.getCodeList('FCL_CALC_BASIS').subscribe( res => {
      this.fclCalcBasisList = res;
      console.log("FCL Cal Basis list",res)
    })
  }
  setMonthsToPartialSurrenderTableList(){
    this.findProductService.getCommissionCodesList('SURR').subscribe( res => {
      this.monthsToPartialSurrenderTableList = res;
      console.log("Months to partial surrender table list",res)
    })
  }
  setMaxPartialSurrenderBasisList(){
    this.findProductService.getCodeList('MAX_PARTIAL_SURR_BASIS').subscribe( res => {
      this.maxPartialSurrenderBasisList = res;
      console.log("Max Partial Surrender Basis list",res)
    })
  }
  setSurrenderPayBasisList(){
    this.findProductService.getCodeList('SURR_PAY_BASIS').subscribe( res => {
      this.surrenderPayBasisList = res;
      console.log("Surrender Pay Basis list",res)
    })
  }
  setPremiumLoanBasisList(){
    this.findProductService.getCodeList('PREMIUM_LOAN_BASIS').subscribe( res => {
      this.premiumLoanBasisList = res;
      console.log("Premium Loan Basis list",res)
    })
  }
  
  setMaxLoanCalcBasisList(){
    this.findProductService.getCodeList('MAX_LOAN_AMOUNT_BASIS').subscribe( res => {
      this.maxLoanCalcBasisList = res;
      console.log("Max Loan Calc list",res)
    })
  }
  setLapseValueBasisList(){
    this.findProductService.getCodeList('LAPSE_VALUE_BASIS').subscribe( res => {
      this.lapseValueBasisList = res;
      console.log("Lapse value basis list",res)
    })
  }
  setLapseValueTableList(){
    this.findProductService.getCommissionCodesList('LA').subscribe( res => {
      this.lapseValueTableList = res;
      console.log("Lapse Value Table List",res)
    })
  }
  setReinstatementChargeAmountTableList(){
    this.findProductService.getCommissionCodesList('RI').subscribe( res => {
      this.reinstatementChargeAmountTableList = res;
      console.log("Reinstatement Charge Amount Table List",res)
    })
  }
  
  setBenefitRecalcBasisList(){
    this.findProductService.getCodeList('PAID_UP_CALC_BASIS').subscribe( res => {
      this.benefitRecalcBasisList = res;
      console.log("Benefit calc basis list",res)
    })
  }
  setReinstCalcBasisList(){
    this.findProductService.getCodeList('REINST_CALC_BASIS').subscribe( res => {
      this.reinstCalcBasisList = res;
      console.log("Reinst calc basis list",res)
    })
  }  
  setBenefitRecalcTableList(){
    this.findProductService.getCommissionCodesList('PU').subscribe( res => {
      this.benefitRecalcTableList = res;
      console.log("Benefit Recalc Table List",res)
    })
  }
  setBonusBasisList(){
    this.findProductService.getCodeList('BONUS_BASIS').subscribe( res => {
      this.bonusBasisList = res;
      console.log("Bonus basis list",res)
    })
  }
  setBonusRateBasisList(){
    this.findProductService.getCodeList('RATE_BASIS').subscribe( res => {
      this.bonusRateBasisList = res;
      console.log("Bonus rate basis list",res)
    })
  }
  setReinsuranceTreatyList(){
    this.findProductService.getReinsuranceTreatyList().subscribe( res => {
      this.reinsuranceTreatyList = res;
      console.log("Reinsurance Treaty list",res)
    })
  }

  setPremiumTaxesBasisList(){
    this.findProductService.getCodeList('PREM_TAX_BASIS').subscribe( res => {
      this.premiumTaxesBasisList = res;
      console.log("Premium tax basis list",res)
    })
  }
  setSurrenderTaxesBasisList(){
    this.findProductService.getCodeList('SURRENDER_TAX_BASIS').subscribe( res => {
      this.surrenderTaxesBasisList = res;
      console.log("Surrender tax basis list",res)
    })
  }
  setMaturityTaxesBenefitBasisList(){
    this.findProductService.getCodeList('MATURITY_TAX_BENEFIT_BASIS').subscribe( res => {
      this.maturityTaxesBenefitBasisList = res;
      console.log("Maturity tax benefit basis list",res)
    })
  }
  setDeathTaxesBenefitBasisList(){
    this.findProductService.getCodeList('DEATH_TAX_BENEFIT_BASIS').subscribe( res => {
      this.deathTaxesBenefitBasisList = res;
      console.log("Tax Benefit basis list",res)
    })
  }
  setStampDutyBasisList(){
    this.findProductService.getCodeList('STAMP_DUTY').subscribe( res => {
      this.stampDutyBasisList = res;
      console.log("Stamp duty list",res)
    })
  }
  setInterestTaxesBasisList(){
    this.findProductService.getCodeList('INTEREST_TAX_BASIS').subscribe( res => {
      this.interestTaxesBasisList = res;
      console.log("Interest Tax basis list",res)
    })
  }

  setLanguagesList(){
    this.findProductService.getCodeList('LANGUAGE').subscribe( res => {
      this.languagesList = res;
      console.log("Languages list",res)
    })
  }
  setActionsList(){
    this.findProductService.getCodeList('DOCUMENT_ACTION').subscribe( res => {
      this.actionsList = res;
      console.log("Actions list",res)
    })
  }
  setDocumentationCategoryList(){
    this.findProductService.getCodeList('DOCUMENT_CATEGORY').subscribe( res => {
      this.documentationCategoryList = res;
      console.log("Documentation category list",res)
    })
  }
  setConditionsList(){
    this.findProductService.getCodeList('CONDITION').subscribe( res => {
      this.conditionsList = res;
      console.log("Conditions list",res)
    })
  }
  setDocCategoryList(){
    this.findProductService.getDocCategoryList().subscribe( res => {
      this.docCategoryList = res;
      console.log("Doc category list",res)
    })
  }
  setExcessCalcList(){
    this.findProductService.getCodeList('EXCESS').subscribe( res => {
      this.excessCalcList = res;
      console.log("Excess Calc Basis list",res)
    })
  }
  setDeductibleCalcList(){
    this.findProductService.getCodeList('DEDUCTIBLE').subscribe( res => {
      this.deductibleCalcList = res;
      console.log("Deductible Calc Basis list",res)
    })
  }
  setExcessTableList(){
    this.findProductService.getCommissionCodesList('EX').subscribe( res => {
      this.excessTableList = res;
      console.log("Excess Table List",res)
    })
  }
  setInsuranceTypesList(){
    this.findProductService.getCodeList('INS_TYPE').subscribe( res => {
      this.insuranceTypesList = res;
      console.log("Insurance Types list",res)
    })
  }

  createForm(){
    this.productCoverForm = this.fb.group({
      coverCode: [''],
      coverDescripton: [''],
      insuranceType: [''],
      closedNewBusiness: [''],
      groupProcessing: [''],
      includeInSar: [''],
      companyAllowed: [''],
      currencyAllowedArray: this.fb.array([]),
      depositAdministration: [''],
      benefitPaidOut: [''],
      definedBenefit: [''],
      interestBasis: [''],
      qualityValidityBasis: [''],
      interestTableRate: [''],
      qualityValidityPeriod: [''],
      issueDateBasis: [''],
      payOutMethodAllowed: [''],
      issueDateFactor: [''],
      minNoOfMember: [''],
      providerArray: this.fb.array([]),
      dependentArray: this.fb.array([]),
      
      //Benefits
      paymentTriggerBasis: [''],
      noOfPaymentTable: [''],
      minAssured: [''],
      paymentSchedule: [''],
      maxAssured: [''],
      paymentFrequency: [''],
      benefitAssuredArray: this.fb.array([]),
      waitingPeriod: [''],
      sumAssuredCalcBasis: [''],
      decreaseSumAssured: [''],
      deductOutstandingPremium: [''],      
      benefitInterestArray:  this.fb.array([]),
      paymentStatusCode: [''],
      benefitPaymentBasis: [''],
      maxNoOfClaims: [''],
      coversWaivedArray:  this.fb.array([]),
      maxNoOfClaimsInPolicyLife: [''],
      coverSumAssuredDepends: [''],
      sumAssuredFactor: [''],
      sumAssuredEscalationArray:  this.fb.array([]),

      //Premium
      frequency: [''],
      method: [''],
      factorArray: this.fb.array([]),
      premiumCalculationBasis: [''],
      fixedPremiumAmount: [''],
      rateCalculationBasis: [''],
      fixedRateBasis: [''],
      fixedRate: [''],
      primaryPremiumRateTable: [''],
      secondaryPremiumRateTable: [''],
      shortTermRateTable: [''],
      policyFeeBasis: [''],
      policyFeeFixedAmount: [''],
      policyFeeAmountTable: [''],
      premiumRoundBasis: [''],
      premiumRoundFactor: [''],
      discountCodeAllowedArray:  this.fb.array([]),
      fixedSmokerAgeAdjustment: [''],
      fixedFemaleAgeAdjustment: [''],

      //Commissions
      
      versionArray:  this.fb.array([]),
      fixedCommissionAmount: [''],
      commissionCode: [''],
      commissionEarningBasis: [''],
      commissionEarningPeriod: [''],
      commissionArray:  this.fb.array([]),
      referralPaymentBasis: [''],
      telemarketerRemBasis: [''],
      agentClawbackBasis: [''],
      clawbackSpreadBasis: [''],
      referralPaymentTable: [''],
      tmRemTable: [''],
      clawbackTable: [''],
      clawbackSpreadPeriod: [''],
      referralPaymentRate: [''],
      tmRemRate: [''],
      clawbackOnLapse: [''],

      //Terms      
      maturityBasis:  [''],
      ageCalculationBasis: [''],
      fixedPremiumPaymentTermYears: [''],
      fixedPremiumPaymentTermMonths: [''],
      minEntryAge: [''],
      minPremiumPayTermYears: [''],
      minPremiumPayTermMonths: [''],
      maxEntryAge: [''],
      maxPremiumPayTermYears: [''],
      maxPremiumPayTermMonths: [''],
      maxAgePolicyMaturityYears: [''],
      fixedPolicyTermYears: [''],
      fixedPolicyTermMonths: [''],
      coolingOffPeriod: [''],
      minPolicyTermYears: [''],
      minPolicyTermMonths: [''],
      doNotMaturePaidOut: [''],
      maxPolicyTermYears: [''],
      maxPolicyTermMonths: [''],

      //Endorsement
      beneficiary: [''],
      bankDetails: [''],
      coverTerm: [''],
      owner: [''],
      lifeAssured: [''],
      premiumPayTerm: [''],
      benefitPayTerm: [''],
      benefitEscalationRate: [''],
      addRider: [''],
      sumAssured: [''],
      paymentMethod: [''],
      screen: [''],
      endorsementCalcBasis: [''],
      endorsementCalcTable: [''],

      //Underwriting
      medicalUnderwritingTable: [''],
      financialUnderwritingTable: [''],
      evobot: [''],
      fclCalcBasis: [''],
      fclCalcFactor: [''],
      loadOnlyAboveFcl: [''],

      //Surrenders
      partialSurrenderAllowed: [''],
      monthsToPartialSurrender: [''],
      monthsToPartialSurrenderTable: [''],
      maxPartialSurrenderCalcBasis: [''],
      maxPartialSurrenderCalcFactor: [''],
      partialSurrenderPenalty: [''],
      partialSurrenderPenaltyTable: [''],
      fullSurrenderAllowed: [''],
      monthsToFullSurrender: [''],
      monthsToFullSurrenderTable: [''],
      fullSurrenderValPenaltyRate: [''],
      surrenderValueTable: [''],
      zeroSurrenderFeePuStatus: [''],
      fullSurrenderValuePenaltyTable: [''],

      //Loan
      premiumLoanAllowed: [''],
      localPolicyValueAllowed: [''],
      premiumLoanBasis: [''],
      noOfMonthsBeforeLoanPolicyAllowed: [''],
      premiumLoanFee: [''],
      policyLoanInterestTable: [''],
      daysBeforeAutoPreLoan: [''],
      maxLoanCalcBasis: [''],
      premiumLoanInterestTable: [''],
      maxLoanCalcFactor: [''],
      minPolicyLoanAmount: [''],

      //Annuities
      annuityGuaranteeArray:  this.fb.array([]),
      annuityReversionaryArray:  this.fb.array([]),
      annuityEscalationArray:  this.fb.array([]),

      //Lapse
      lapseAllowed: [''],
      lapseValueTable: [''],
      daysOfGrace: [''],
      reinstatementAllowed: [''],
      noOfLapseAllowed: [''],
      reinstatementChargeAmountTable: [''],
      paidUpLapsing: [''],
      reinstatementFixedChargeAmount: [''],
      lapseValueBasis: [''],
      reinstatementInterestRateTable: [''],

      //Perils
      claimTypeArray:  this.fb.array([]),
      perilsArray:  this.fb.array([]),
      //Paid Up
      paidUpAllowed: [''],
      monthBeforePaidUpAllowed: [''],
      benefitRecalcBasis: [''],
      minPolicyBeforePaidUpAllowed: [''],
      benefitRecalcTable: [''],
      allowReinstatementPaidup: [''],
      paidupChargeTable: [''],
      paidupTable: [''],
      reinstatementCalcBasis: [''],

      //Bonuses
      bonusArray:  this.fb.array([]),
      promoBonusBasis: [''],
      promoBonusRate: [''],
      promoBonusRateTable: [''],
      annualBonusBasis: [''],
      annualBonusRate: [''],
      annualBonusTable: [''],

      //Account/Reinsurance
      accountArray:  this.fb.array([]),
      accrualAccounting: [''],
      reinsuranceQuotes: [''],

      //Taxes/Levies
      premiumTaxBasis: [''],
      surrenderBenefitTaxBasis: [''],
      maturityBenefitTaxBasis: [''],
      deathBenefitTaxBasis: [''],
      stampDuty: [''],
      interestEarnedTaxBasis: [''],     

      //Documentation
      documentationArray:  this.fb.array([]),
      //Excess/Deductible
      minExcess: [''],
      maxExcess: [''],
      excessArray: this.fb.array([]),
      defaultExcessSumAssured: [''],
      defaultExcessAmount: [''],
      excessCalcBasis: [''],
      excessTable: [''],
      excessBuyBackAllowed: [''],
      excessBuyBackPremiumRate: [''],
      maxDeductible: [''],
      minDeductible: [''],
      deductibleArray: this.fb.array([]),
      defaultDeductibleSumAssured: [''],
      defaultDeductibleAmount: [''],
      deductibleCalcBasis: [''],
      deductibleTable: [''],
      deductibleBuybackAllowed: [''],
      deductibleBuybackPremiumRate: [''],  

    })
  }

  onSubmit(){
    console.log(this.productCoverForm.value);
  }
  currencyAllowedArray:any=[];
  addNewBasicCurrencyRow(){
    this.currencyAllowedArray = this.productCoverForm.get('currencyAllowedArray') as FormArray;
    const lessonForm = this.fb.group({
      currencyAllowed: ['']
    })
    this.currencyAllowedArray.push(lessonForm);
	}
  annuityGuaranteeArray:any=[];
  addNewAnnuityGuaranteeRow(){
    this.annuityGuaranteeArray = this.productCoverForm.get('annuityGuaranteeArray') as FormArray;
    const lessonForm = this.fb.group({
      annuityGuaranteePeriod: ['']
    })
    this.annuityGuaranteeArray.push(lessonForm);
	}
 
  annuityReversionaryArray:any=[];
  addNewannuityReversionaryRow(){
    this.annuityReversionaryArray = this.productCoverForm.get('annuityReversionaryArray') as FormArray;
    const lessonForm = this.fb.group({
      annuityReversionaryRateOption: ['']
    })
    this.annuityReversionaryArray.push(lessonForm);
	}
  annuityEscalationArray:any=[];
  addNewannuityEscalationRow(){
    this.annuityEscalationArray = this.productCoverForm.get('annuityEscalationArray') as FormArray;
    const lessonForm = this.fb.group({
      annuityEscalationRateOption:[''],
    })
    this.annuityEscalationArray.push(lessonForm);
	}

  dependentArray:any=[];
  addNewDependentRow(){
    this.dependentArray = this.productCoverForm.get('dependentArray') as FormArray;
    const lessonForm = this.fb.group({
      businessLine:[''],
      coverId:[''],
      mandatory:[''],
      availablePostIssue:[''],
      maxNo:[''],
      ageAssuredLimit:[''],
      fundingOption:[''],
      coverSumAssured:[''],
      blankSumAssured:[''],
    })
    this.dependentArray.push(lessonForm);
	}

  providerArray:any=[];
  addNewProviderRow(){
    this.providerArray = this.productCoverForm.get('providerArray') as FormArray;
    const lessonForm = this.fb.group({
      providerCategory: [''],
      providerCode: ['']
    })
    this.providerArray.push(lessonForm);
	}
  


  benefitAssuredArray:any=[];
  addNewbenefitAssuredRow(){
    this.benefitAssuredArray = this.productCoverForm.get("benefitAssuredArray") as FormArray;
    const lessonForm = this.fb.group({
      sumAssuredOption:[''],
    })
    this.benefitAssuredArray.push(lessonForm);
	}

  benefitInterestArray:any=[];
  addNewbenefitInterestRow(){
    this.benefitInterestArray = this.productCoverForm.get("benefitInterestArray") as FormArray;
    const lessonForm = this.fb.group({
      lowInterestRate:[''],
    })
    this.benefitInterestArray.push(lessonForm);
	}
  coversWaivedArray:any=[];
  addNewCoversWaivedArrayRow(){
    this.coversWaivedArray = this.productCoverForm.get("coversWaivedArray") as FormArray;
    const lessonForm = this.fb.group({
      coverWaived:[''],
    })
    this.coversWaivedArray.push(lessonForm);
	}

  sumAssuredEscalationArray:any=[];
  addNewsumAssuredEscalationRow(){
    this.sumAssuredEscalationArray = this.productCoverForm.get("sumAssuredEscalationArray") as FormArray;
    const lessonForm = this.fb.group({
      sumAssuredEscalation:[''],
    })
    this.sumAssuredEscalationArray.push(lessonForm);
	}

  factorArray:any=[];
  addNewFactorRow(){
    this.factorArray = this.productCoverForm.get("factorArray") as FormArray;
    const lessonForm = this.fb.group({
      factor:[''],
    })
    this.factorArray.push(lessonForm);
	}

  discountCodeAllowedArray:any=[];
  addNewdiscountCodeAllowedRow(){
    this.discountCodeAllowedArray = this.productCoverForm.get("discountCodeAllowedArray") as FormArray;
    const lessonForm = this.fb.group({
      discountCodeAllowed:[''],
    })
    this.discountCodeAllowedArray.push(lessonForm);
	}

  versionArray:any=[];
  addNewVersionArrayRow(){
    this.versionArray = this.productCoverForm.get("versionArray") as FormArray;
    const lessonForm = this.fb.group({
      versionNo:[''],
      versionDate:[''],
    })
    this.versionArray.push(lessonForm);
	}

  commissionArray:any=[];
  addNewcommissionRow(){
    this.commissionArray = this.productCoverForm.get("commissionArray") as FormArray;
    const lessonForm = this.fb.group({
      agentType:[''],
      writtingCommission:[''],
      hierarchyCommission:[''],
    })
    this.commissionArray.push(lessonForm);
	}

  claimTypeArray:any=[];
  addNewclaimTypeRow(){
    this.claimTypeArray = this.productCoverForm.get("claimTypeArray") as FormArray;
    const lessonForm = this.fb.group({
      claimType:[''],
    })
    this.claimTypeArray.push(lessonForm);
	}

  perilsArray:any=[];
  addNewPerilRow(){
    this.perilsArray = this.productCoverForm.get("perilsArray") as FormArray;
    const lessonForm = this.fb.group({
      perilId:[''],
      perilWaitingPeriod:[''],
      perilBenefitSumAssured:[''],
      perilBenefitOnDeath:[''],
      perilSeverityLevel:[''],
      proximateCauseAllowed:[''],
      perilMinPeriod:[''],
    })
    this.perilsArray.push(lessonForm);
	}

  bonusArray:any=[];
  addNewBonusRow(){
    this.bonusArray = this.productCoverForm.get("bonusArray") as FormArray;
    const lessonForm = this.fb.group({
      bonusVersionNo:[''],
      bonusVersionDate:[''],
    })
    this.bonusArray.push(lessonForm);
	}

  accountArray:any=[];
  addNewAccountRow(){
    this.accountArray = this.productCoverForm.get("accountArray") as FormArray
    const lessonForm = this.fb.group({
      reinsuranceTreaty:[''],
    })
    this.accountArray.push(lessonForm);
	}


  documentationArray:any=[];
  addNewDocumentationRow(){
    this.documentationArray = this.productCoverForm.get("documentationArray") as FormArray;
    const lessonForm = this.fb.group({
      eventType:[''],
      event:[''],
      language:[''],
      action:[''],
      documentCategory:[''],
      documentCode:[''],
      condition:[''],
    })
    this.documentationArray.push(lessonForm);
	}


  excessArray:any=[];
  addNewExcessRow(){
    this.excessArray = this.productCoverForm.get("excessArray") as FormArray;
    const lessonForm = this.fb.group({
      fixedExcessOptionAmount:[''],
      fixedExcessOptionRate:[''],
    })
    this.excessArray.push(lessonForm);
	}

  deductibleArray:any=[];
  addNewDeductibleRow(){
    this.deductibleArray = this.productCoverForm.get("deductibleArray") as FormArray;
    const lessonForm = this.fb.group({
      fixedDeductibleOptionAmount:[''],
      fixedDeductibleOptionRate:[''],
    })
    this.deductibleArray.push(lessonForm);
	}

}
