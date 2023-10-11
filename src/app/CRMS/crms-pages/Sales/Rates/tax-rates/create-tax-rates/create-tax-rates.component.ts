import { Component, OnInit } from '@angular/core';
import { FindRatesService} from '../service/find-rates.service'

@Component({
  selector: 'app-create-tax-rates',
  templateUrl: './create-tax-rates.component.html',
  styleUrls: ['./create-tax-rates.component.scss']
})
export class CreateTaxRateComponent implements OnInit {
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
  constructor(public findRatesService : FindRatesService) { }

  ngOnInit(): void {
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

  }
  setInsuranceTypeList(){
    this.findRatesService.getCodeList('INTEREST_CALC_BASIS').subscribe( res => {
      this.insuranceTypeList = res;
      console.log("Insurance Info",res)
    })
  }
  setCurrenciesList(){
    this.findRatesService.getCurrenciesList().subscribe( res => {
      this.currenciesList = res;
      console.log("Currency Info",res)
    })
  }
  setCompanyList(){
    this.findRatesService.getCompanyList().subscribe( res => {
      this.companiesList = res;
      console.log("Company Info",res)
    })
  }
  setInterestCalBasisList(){
    this.findRatesService.getCodeList('INTEREST_CALC_BASIS').subscribe( res => {
      this.interestCalBasisList = res;
      console.log("Interest Cal Basis Info",res)
    })
  }
  setQuoteValidityBasisList(){
    this.findRatesService.getCodeList('QUOTE_VALIDITY_BASIS').subscribe( res => {
      this.quoteValidityBasisList = res;
      console.log("Quote validity Basis Info",res)
    })
  }
  setInterestTableList(){
    this.findRatesService.getInterestTableList().subscribe( res => {
      this.interestTableList = res;
      console.log("Interest table list",res)
    })
  }
  setProviderCategoryList(){
    this.findRatesService.getCodeList('PROVIDER_CAT').subscribe( res => {
      this.providerCategoryList = res;
      console.log("Provider category info",res)
    })
  }
  setPaymentMethodsList(){
    this.findRatesService.getPaymentMethodsList().subscribe( res => {
      this.paymentMethodsList = res;
      console.log("Payment methods list",res)
    })
  }
  setCoversList(){
    this.findRatesService.getCoversList().subscribe( res => {
      this.coversList = res;
      console.log("Covers list",res)
    })
  }
  setFundingOptionsList(){
    this.findRatesService.getCodeList('FUNDING_OPT').subscribe( res => {
      this.fundingOptionsList = res;
      console.log("Funding Options list",res)
    })
  }
  setPaymentTriggersList(){
    this.findRatesService.getCodeList('BEN_PAY_BASIS').subscribe( res => {
      this.paymentTriggerList = res;
      console.log("Payment trigger list",res)
    })
  }
  setPaymentTablesList(){
    this.findRatesService.getCodeList('NO_PAY_BASIS').subscribe( res => {
      this.paymentTableList = res;
      console.log("Payment table list",res)
    })
  }
  setFrequencyPaymentList(){
    this.findRatesService.getCodeList('FREQUENCY').subscribe( res => {
      this.frequencyTableList = res;
      console.log("Frequency Payment list",res)
    })
  }
  setSumAssuredCalcBasisList(){
    this.findRatesService.getCodeList('SA_BASIS').subscribe( res => {
      this.sumAssuredCalcBasisList = res;
      console.log("Calc Basis list",res)
    })
  }
  setStatusCodeList(){
    this.findRatesService.getStatusCodeList().subscribe( res => {
      this.statusCodeList = res;
      console.log("Status Code list",res)
    })
  }
  setPaymentInMethodsList(){
    this.findRatesService.getPaymentInMethodsList().subscribe( res => {
      this.paymentInMethodsList = res;
      console.log("Payment in methods list",res)
    })
  }
  setPremiumCalcBasisList(){
    this.findRatesService.getCodeList('PREM_CALC_BASIS').subscribe( res => {
      this.premiumCalcBasisList = res;
      console.log("Premium Calc Basis list",res)
    })
  }
  setRateCalcBasisList(){
    this.findRatesService.getCodeList('RATE_CALC_BASIS').subscribe( res => {
      this.rateCalcBasisList = res;
      console.log("Rate Calc Basis list",res)
    })
  }
  setFixedRateCalcBasisList(){
    this.findRatesService.getCodeList('FIXED_RATE_BASIS').subscribe( res => {
      this.fixedRateCalcBasisList = res;
      console.log("Fixed Rate Calc Basis list",res)
    })
  }
  setPolicyFeeBasisList(){
    this.findRatesService.getCodeList('POLICY_FEE_BASIS').subscribe( res => {
      this.policyFeeBasisList = res;
      console.log("Policy Fee Basis list",res)
    })
  }
  setPremiumRoundingBasisList(){
    this.findRatesService.getCodeList('PREM_ROUNDING_BASIS').subscribe( res => {
      this.premiumRoundingBasisList = res;
      console.log("Premium rounding basis list",res)
    })
  }
  setCommissionCodesList(){
    this.findRatesService.getCommissionCodesList('C').subscribe( res => {
      this.commissionCodesList = res;
      console.log("Commission codes list",res)
    })
  }
  setCommissionEarningList(){
    this.findRatesService.getCodeList('COMM_BASIS').subscribe( res => {
      this.commissionEarningList = res;
      console.log("Commission earning list",res)
    })
  }
  setAgentTypeList(){
    this.findRatesService.getAgentTypeList().subscribe( res => {
      this.agentTypeList = res;
      console.log("Agent Type list",res)
    })
  }
  setReferralPaymentBasisList(){
    this.findRatesService.getCodeList('REFERRAL_FEE_BASIS').subscribe( res => {
      this.referralPaymentBasisList = res;
      console.log("Referral Type list",res)
    })
  }
  setTelemarketerRemBasisList(){
    this.findRatesService.getCodeList('TM_FEE_BASIS').subscribe( res => {
      this.telemarketerRemBasisList = res;
      console.log("Telemarketer Rem list",res)
    })
  }
  setClawbackBasisList(){
    this.findRatesService.getCodeList('CLAWBACK_BASIS').subscribe( res => {
      this.clawbackBasisList = res;
      console.log("Clawback basis list",res)
    })
  }
  setClawbackSpreadBasisList(){
    this.findRatesService.getCodeList('CLAWBACK_SPREAD_BASIS').subscribe( res => {
      this.clawbackSpreadBasisList = res;
      console.log("Clawback spread basis list",res)
    })
  } 
  setReferralPaymentTableList(){
    this.findRatesService.getCommissionCodesList('RF').subscribe( res => {
      this.referralPaymentTableList = res;
      console.log("RF table list",res)
    })
  }
  setTmRemTableList(){
    this.findRatesService.getCommissionCodesList('TM').subscribe( res => {
      this.tmRemTableList = res;
      console.log("TM Rem table list",res)
    })
  }
  setClawbackTableList(){
    this.findRatesService.getCommissionCodesList('C').subscribe( res => {
      this.clawbackTableList = res;
      console.log("Clawback table list",res)
    })
  }
  setClaimTypesList(){
    this.findRatesService.getCodeList('CLAIM_TYPE').subscribe( res => {
      this.claimTypesList = res;
      console.log("Claim types list",res)
    })
  }
  setPerilList(){
    this.findRatesService.getCodeList('PERIL').subscribe( res => {
      this.perilList = res;
      console.log("Peril list",res)
    })
  }
  setProximateCausesList(){
    this.findRatesService.getCodeList('PROXIMATE_CAUSE').subscribe( res => {
      this.proximateCausesList = res;
      console.log("Proximate Causes list",res)
    })
  }
  setMaturityBasisList(){
    this.findRatesService.getCodeList('MAT_BASIS').subscribe( res => {
      this.maturityBasisList = res;
      console.log("Maturity Basis list",res)
    })
  }
  setAgeCalcBasisList(){
    this.findRatesService.getCodeList('AGE_CALC_BASIS').subscribe( res => {
      this.ageCalcBasisList = res;
      console.log("Age Cal Basis list",res)
    })
  }
  setEndorsementCalcBasisList(){
    this.findRatesService.getCodeList('ENDORSE_CALC_BASIS').subscribe( res => {
      this.endorsementCalcBasisList = res;
      console.log("Endorsement Cal Basis list",res)
    })
  }
  setEndorsementCalcTableList(){
    this.findRatesService.getCommissionCodesList('UW').subscribe( res => {
      this.endorsementCalcTableList = res;
      console.log("Endorsement Cal table list",res)
    })
  }
  setFCLCalcBasisList(){
    this.findRatesService.getCodeList('FCL_CALC_BASIS').subscribe( res => {
      this.fclCalcBasisList = res;
      console.log("FCL Cal Basis list",res)
    })
  }
  setMonthsToPartialSurrenderTableList(){
    this.findRatesService.getCommissionCodesList('SURR').subscribe( res => {
      this.monthsToPartialSurrenderTableList = res;
      console.log("Months to partial surrender table list",res)
    })
  }
  setMaxPartialSurrenderBasisList(){
    this.findRatesService.getCodeList('MAX_PARTIAL_SURR_BASIS').subscribe( res => {
      this.maxPartialSurrenderBasisList = res;
      console.log("Max Partial Surrender Basis list",res)
    })
  }
  setSurrenderPayBasisList(){
    this.findRatesService.getCodeList('SURR_PAY_BASIS').subscribe( res => {
      this.surrenderPayBasisList = res;
      console.log("Surrender Pay Basis list",res)
    })
  }
  setPremiumLoanBasisList(){
    this.findRatesService.getCodeList('PREMIUM_LOAN_BASIS').subscribe( res => {
      this.premiumLoanBasisList = res;
      console.log("Premium Loan Basis list",res)
    })
  }
  
  setMaxLoanCalcBasisList(){
    this.findRatesService.getCodeList('MAX_LOAN_AMOUNT_BASIS').subscribe( res => {
      this.maxLoanCalcBasisList = res;
      console.log("Max Loan Calc list",res)
    })
  }
  setLapseValueBasisList(){
    this.findRatesService.getCodeList('LAPSE_VALUE_BASIS').subscribe( res => {
      this.lapseValueBasisList = res;
      console.log("Lapse value basis list",res)
    })
  }
  setLapseValueTableList(){
    this.findRatesService.getCommissionCodesList('LA').subscribe( res => {
      this.lapseValueTableList = res;
      console.log("Lapse Value Table List",res)
    })
  }
  setReinstatementChargeAmountTableList(){
    this.findRatesService.getCommissionCodesList('RI').subscribe( res => {
      this.reinstatementChargeAmountTableList = res;
      console.log("Reinstatement Charge Amount Table List",res)
    })
  }
  
  setBenefitRecalcBasisList(){
    this.findRatesService.getCodeList('PAID_UP_CALC_BASIS').subscribe( res => {
      this.benefitRecalcBasisList = res;
      console.log("Benefit calc basis list",res)
    })
  }
  setReinstCalcBasisList(){
    this.findRatesService.getCodeList('REINST_CALC_BASIS').subscribe( res => {
      this.reinstCalcBasisList = res;
      console.log("Reinst calc basis list",res)
    })
  }  
  setBenefitRecalcTableList(){
    this.findRatesService.getCommissionCodesList('PU').subscribe( res => {
      this.benefitRecalcTableList = res;
      console.log("Benefit Recalc Table List",res)
    })
  }
  setBonusBasisList(){
    this.findRatesService.getCodeList('BONUS_BASIS').subscribe( res => {
      this.bonusBasisList = res;
      console.log("Bonus basis list",res)
    })
  }
  setBonusRateBasisList(){
    this.findRatesService.getCodeList('RATE_BASIS').subscribe( res => {
      this.bonusRateBasisList = res;
      console.log("Bonus rate basis list",res)
    })
  }
  setReinsuranceTreatyList(){
    this.findRatesService.getReinsuranceTreatyList().subscribe( res => {
      this.reinsuranceTreatyList = res;
      console.log("Reinsurance Treaty list",res)
    })
  }

  setPremiumTaxesBasisList(){
    this.findRatesService.getCodeList('PREM_TAX_BASIS').subscribe( res => {
      this.premiumTaxesBasisList = res;
      console.log("Premium tax basis list",res)
    })
  }
  setSurrenderTaxesBasisList(){
    this.findRatesService.getCodeList('SURRENDER_TAX_BASIS').subscribe( res => {
      this.surrenderTaxesBasisList = res;
      console.log("Surrender tax basis list",res)
    })
  }
  setMaturityTaxesBenefitBasisList(){
    this.findRatesService.getCodeList('MATURITY_TAX_BENEFIT_BASIS').subscribe( res => {
      this.maturityTaxesBenefitBasisList = res;
      console.log("Maturity tax benefit basis list",res)
    })
  }
  setDeathTaxesBenefitBasisList(){
    this.findRatesService.getCodeList('DEATH_TAX_BENEFIT_BASIS').subscribe( res => {
      this.deathTaxesBenefitBasisList = res;
      console.log("Tax Benefit basis list",res)
    })
  }
  setStampDutyBasisList(){
    this.findRatesService.getCodeList('STAMP_DUTY').subscribe( res => {
      this.stampDutyBasisList = res;
      console.log("Stamp duty list",res)
    })
  }
  setInterestTaxesBasisList(){
    this.findRatesService.getCodeList('INTEREST_TAX_BASIS').subscribe( res => {
      this.interestTaxesBasisList = res;
      console.log("Interest Tax basis list",res)
    })
  }

  setLanguagesList(){
    this.findRatesService.getCodeList('LANGUAGE').subscribe( res => {
      this.languagesList = res;
      console.log("Languages list",res)
    })
  }
  setActionsList(){
    this.findRatesService.getCodeList('DOCUMENT_ACTION').subscribe( res => {
      this.actionsList = res;
      console.log("Actions list",res)
    })
  }
  setDocumentationCategoryList(){
    this.findRatesService.getCodeList('DOCUMENT_CATEGORY').subscribe( res => {
      this.documentationCategoryList = res;
      console.log("Documentation category list",res)
    })
  }
  setConditionsList(){
    this.findRatesService.getCodeList('CONDITION').subscribe( res => {
      this.conditionsList = res;
      console.log("Conditions list",res)
    })
  }
  setDocCategoryList(){
    this.findRatesService.getDocCategoryList().subscribe( res => {
      this.docCategoryList = res;
      console.log("Doc category list",res)
    })
  }
  setExcessCalcList(){
    this.findRatesService.getCodeList('EXCESS').subscribe( res => {
      this.excessCalcList = res;
      console.log("Excess Calc Basis list",res)
    })
  }
  setDeductibleCalcList(){
    this.findRatesService.getCodeList('DEDUCTIBLE').subscribe( res => {
      this.deductibleCalcList = res;
      console.log("Deductible Calc Basis list",res)
    })
  }
  setExcessTableList(){
    this.findRatesService.getCommissionCodesList('EX').subscribe( res => {
      this.excessTableList = res;
      console.log("Excess Table List",res)
    })
  }

}
