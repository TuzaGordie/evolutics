import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormGroupName } from '@angular/forms';
import { map } from 'rxjs/operators';
import { IPremiumFrequency } from 'src/app/General/services/quotation.interface';
import { ApiService } from 'src/app/Services/api.service';
import {
  ICodeDescription,
  ICodeTitle,
} from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { IProductCode } from '../life-setup-product-code/product-code-extras/product-code.interface';
import { Basic } from '../life-setup-product-cover-code/cover-code';

@Injectable({
  providedIn: 'root',
})
export class FindProductService {
  private baseUrl = environment.apiBaseUrl;

  insuranceTypeList: any;
  currenciesList: any;
  showDataList: any;
  covercode: any;

  constructor(public http: HttpClient, private apiService: ApiService) { }

  getInsuranceType = (data: any) => {
    return this.apiService.get(
      this.baseUrl + `/rest/codes/sub/category/${data}`
    );
  };

  deletePremiumVersion(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/premium/fp/version/' + id
    );
  }
  deleteNewFactorRow(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/premium/freq/' + id
    );
  }
  deleteNewdiscountCodeAllowedRow(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/premium/discount/' + id
    );
  }

  removeTermOpt(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/terms/opt/' + id
    );
  }
  removeQuotationFormAttached(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/underwriting/quote/attach/form/' + id
    );
  }
  removeBenTermOpt(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/ben/term/opt/' + id
    );
  }
  removePremTermOpt(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/prem/term/opt/' + id
    );
  }

  deleteCommissionRate(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/commission/rate/' + id
    );
  }

  deleteCommissionVersion(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/commission/version/' + id
    );
  }

  deleteCompany(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/companies/allowed/' + id
    );
  }
  deleteCoverSchedule(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/benefit/schedule/' + id
    );
  }
  deleteAutoSettle(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/auto/settle/' + id
    );
  }

  removeDocumentation(id:number){
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/documentation/' + id
    );
  }

  removeExcessOpts(id: number){
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/excess/opt/' + id
    );
  }

  removeDeductibleOpt(id: number){
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/deductible/opt/' + id
    );
  }

  removeNewannuityReversionaryRow(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/annuities/rev/perc/' + id
    );
  }
  removeNewannuityEscalationRow(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/annuities/escal/' + id
    );
  }
  removeNewAnnuityGuaranteeRow(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/annuities/guar/' + id
    );
  }

  removePeril(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/peril/detail/' + id
    );
  }

  removeAccount(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/acc/reins/treaty/' + id
    );
  }

  removeBonus(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/bonus/' + id
    );
  }

  deleteTerminate(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/auto/terminate/' + id
    );
  }
  deleteNewsumAssuredEscalationRow(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/benefit/escal/' + id
    );
  }
  deleteNewCoversWaivedArrayRow(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/covers/waived/' + id
    );
  }
  deleteNewbenefitInterestRow(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/loan/int/rate/' + id
    );
  }
  deleteNewbenefitAssuredRow(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/sum/assured/opt/' + id
    );
  }

  deleteCoverBenefitClaim(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/benefit/claim/' + id
    );
  }
  deleteDependent(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/dependent/' + id
    );
  }
  deletePayoutMethod(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/payment/out/method/' + id
    );
  }
  deleteCurrency(id: number) {
    return this.apiService.delete(
      this.baseUrl + '/rest/product/covers/valid/currency/' + id
    );
  }

  getPolicyBasis = (data: any) => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/code_title/POLICY_CODE_BASIS' + data
    );
  };

  getProductClassByInsType = (data: any) => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/category/INS_TYPE/' + data
    );
  };

  getProductByProdClass = (data: any) => {
    return this.apiService.get(
      this.baseUrl + '/rest/product/code/desc/class/' + data
    );
  };

  getCodeList = (data: any) => {
    return this.apiService.get(
      this.baseUrl + `/rest/codes/sub/category/PRODUCT_CLASS/${data}`
    );
  };

  getCodeLists = (data: any) => {
    return this.apiService.get(
      this.baseUrl + `/rest/codes/sub/category/${data}`
    );
  };

  getCurrenciesList = () => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseUrl + '/rest/currency/'
    );
  };
  getCompanyList = () => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseUrl + '/rest/company/code/desc'
    );
  };
  getrateanddescListBycat = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/product/rate/interest/code/desc'
    );
  };
  getCoversByCompanyCode = (code: string) => {
    return code
      ? this.apiService.get(
        this.baseUrl + '/rest/product/covers/basics/code/desc/' + code
      )
      : null;
  };
  /*  getPaymentMethodsList=()=>{
    return this.apiService.get(  "http://dev-api-evt.herokuapp.com/PAYOUT_METHODS")
  } */
  getCoversList = (companyCode: string) => {
    return this.apiService.get(this.baseUrl + '/rest/product/covers/basics/code/desc/' + companyCode);
  };
  getProductCodes(code) {
    return this.apiService.get(
      this.baseUrl + `/rest/product/covers/code/desc/${code}`
    );
  }
  getStatusCodeList = () => {
    return this.apiService.get('https://dev-api-evt.herokuapp.com/STATUS_CODE');
  };
  getPaymentInMethodsList = () => {
    return this.apiService.get('http://dev-api-evt.herokuapp.com/PAYINMETHODS');
  };
  getCommissionCodesList(val: any) {
    return this.apiService.get(
      'https://dev-api-evt.herokuapp.com/genratesN?RATE_CATEGORY=' + val
    );
  }
  getAgentTypeList = () => {
    return this.apiService.get('https://dev-api-evt.herokuapp.com/AGENTTYPE');
  };
  /*  getReinsuranceTreatyList=()=>{
    return this.apiService.get( "https://dev-api-evt.herokuapp.com/crm.treaty")
  } */
  getDocCategoryList = (eventName: string) => {
    return this.apiService
      .get(this.baseUrl + '/rest/document/event/' + eventName)
      .pipe(
        map((res) => {
          res.forEach((element) => {
            element.id = element.id + '';
          });
          return res;
        })
      );
  };
  getDocumentNamesByEventName = (eventName: string) => {
    return this.apiService.get(
      this.baseUrl + '/rest/document/code/name/title/' + eventName
    );
  };

  getPremiumStatementList = () => {
    return this.apiService.get(
      'https://dev-api-evt.herokuapp.com/crm.screen_list'
    );
  };

  getBranch = (data?: any) => {
    return this.apiService.get(this.baseUrl + '/rest/branch/code/desc');
  };

  getUploadFileBasis = () => {
    return this.apiService.getCodes(
      this.baseUrl + '/rest/codes/sub/group/UPLOAD_FILE_BASIS'
    );
  };

  submitProductCode = (data: any) => {
    return this.apiService.post(
      this.baseUrl + 'http://localhost:3000/STRate',
      data
    );
  };

  saveCoversBasic = (data: Basic) => {
    return this.apiService.post(
      this.baseUrl + '/rest/product/covers/basic',
      data
    );
  };

  /* SHOW DATA */
  getSetUpShowData(data?) {
    this.covercode = data;
    return this.apiService.get(
      this.baseUrl + '/rest/product/covers/code/' + data
    );
  }

  getBasic(code){
    return this.apiService.get(
      this.baseUrl + '/rest/product/covers/code/basic/' + code
    );
  }

  getDependent(code){
    return this.apiService.get(
      this.baseUrl + '/rest/product/covers/dependent/' + code
    );
  }

  getBenefit(code){
    return this.apiService.get(
      this.baseUrl + '/rest/product/covers/benefits/' + code
    );
  }

  getPremium(code){
    return this.apiService.get(
      this.baseUrl + '/rest/product/covers/premium/' + code
    );
  }

  getCommission(code){
    return this.apiService.get(
      this.baseUrl + '/rest/product/covers/commission/' + code
    );
  }

  getTerms(code){
    return this.apiService.get(
      this.baseUrl + '/rest/product/covers/terms/' + code
    );
  }

  getEndorsement(code){
    return this.apiService.get(
      this.baseUrl + '/rest/product/covers/endorsement/' + code
    );
  }

  getUnderWriting(code){
    return this.apiService.get(
      this.baseUrl + '/rest/product/covers/underwriting/' + code
    );
  }

  getSurrenders(code){
    return this.apiService.get(
      this.baseUrl + '/rest/product/covers/surrenders/' + code
    );
  }

  getLoan(code){
    return this.apiService.get(
      this.baseUrl + '/rest/product/covers/loan/' + code
    );
  }

  getAnnuities(code){
    return this.apiService.get(
      this.baseUrl + '/rest/product/covers/annuities/' + code
    );
  }

  getLapse(code){
    return this.apiService.get(
      this.baseUrl + '/rest/product/covers/lapse/' + code
    );
  }

  getPerils(code){
    return this.apiService.get(
      this.baseUrl + '/rest/product/covers/perils/' + code
    );
  } 

  getBonus(code){
    return this.apiService.get(
      this.baseUrl + '/rest/product/covers/bonuses/' + code
    );
  }

  getPaidUp(code){
    return this.apiService.get(
      this.baseUrl + '/rest/product/covers/paid-up/' + code
    );
  }

  getAccount(code){
    return this.apiService.get(
      this.baseUrl + '/rest/product/covers/acc-reins/' + code
    );
  } 
  
  getTaxLevies(code){
    return this.apiService.get(
      this.baseUrl + '/rest/product/covers/tax-levies/' + code
    );
  }

  getDocumentation(code){
    return this.apiService.get(
      this.baseUrl + '/rest/product/covers/documentation/' + code
    );
  }

  getExcessDeductible(code){
    return this.apiService.get(
      this.baseUrl + '/rest/product/covers/excess-deductible/' + code
    );
  }

  /* update DATA */
  getSetUpUpdateData(data?) {
    return this.apiService
      .put(this.baseUrl + '/rest/product/covers/' + this.covercode, data)
      .subscribe((res) => {
        console.log('update request', res);
      });
  }

  getInsurrance = () => {
    return this.apiService.get(this.baseUrl + '/rest/codes/sub/group/INS_TYPE');
  };
  getProductCoversByInsuranceType = (data: any) => {
    return this.apiService.get(
      this.baseUrl + `/rest/product/covers/code/description/${data}`
    );
  };
  getProductCovers = () => {
    return this.apiService.get(
      this.baseUrl + `/rest/product/covers`
    );
  };
  getProductClas = (data: any) => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/category/PRODUCT_CLASS/' + data
    );
  };
  getProductClass = (data: any) => {
    return this.apiService.get(
      this.baseUrl + '/rest/product/code/desc/class/' + data
    );
  };
  getCoverList = (data: any) => {
    return this.apiService.get(this.baseUrl + '/rest/product/covers/code');
  };
  getInterestBasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/INTEREST_CALC_BASIS'
    );
  };

  getProviders = () => {
    return this.apiService.get(this.baseUrl + '/rest/provider/');
  };
  getCompanyAllowed = () => {
    return this.apiService.get(this.baseUrl + '/rest/company/code/desc');
  };
  getPaymentMethodsList = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/payin/method/payment/code/description'
    );
  };
  getClaim = () => {
    return this.apiService.get(this.baseUrl + '/rest/product/covers/code/desc');
  };
  getPaymentMethodsByCompany = (company: string) => {
    return this.apiService.get(this.baseUrl + '/rest/company/payout/methods/code/' + company);
  }
  getCoverScreen = (cat: string) => {
    return this.apiService.get(this.baseUrl + '/rest/screen/code/desc/' + cat);
  };
  getIssueDate = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/ISSUE_DATE_BASIS'
    );
  };
  getProductCategory = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/PROVIDER_CAT'
    );
  };
  getQuoteValidityBase = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/QUOTE_VALIDITY_BASIS'
    );
  };
  getCurrencyAllowed = () => {
    return this.apiService.get(this.baseUrl + '/rest/currency/');
  };
  getCover = () => {
    return this.apiService.get(this.baseUrl + '/rest/product/covers/code/desc');
  };
  getCoversSumAssuredDepends = () => {
    return this.apiService.get(this.baseUrl + '/rest/product/covers/code');
  };
  getCoversWaived = () => {
    return this.apiService.get(this.baseUrl + '/rest/product/covers/code/desc');
  };
  getClaimTypes = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/CLAIM_TYPE'
    );
  };
  getBenifitPaymentBasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/BEN_PAY_BASIS'
    );
  };
  getSumassuredCalcBasis = () => {
    return this.apiService.get(this.baseUrl + '/rest/codes/sub/group/SA_BASIS');
  };
  getFundingOption = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/FUNDING_OPT'
    );
  };
  getFrequency = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/FREQUENCY'
    );
  };
  getMethodsList = () => {
    return this.apiService.get(this.baseUrl + '/rest/payin/method/code/desc');
  };
  getShortTermRateTableList = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/product/rate/short/term/code/desc'
    );
  };
  getSecondaryPremiumRateTable = () => {
    return this.apiService.get(this.baseUrl + '/rest/product/rate/cat/P');
  };
  getRateCalculationBasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/RATE_CALC_BASIS'
    );
  };
  getRateCodeAndDesc = () => {
    return this.apiService.get(
      this.baseUrl + 'rest/product/rate/general/code/desc'
    );
  };
  getPremiumCalcBasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/PREM_CALC_BASIS'
    );
  };
  getFixedRateCalcBasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/FIXED_RATE_BASIS'
    );
  };
  getPrimaryPremium = () => {
    /* return this.apiService.get(this.baseUrl + "/rest/product/rate/cat/P") */
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/PREM_ROUNDING_BASIS'
    );
  };
  getPolicyFeeBasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/POLICY_FEE_BASIS'
    );
  };
  getPolicyFeeAmountTable = () => {
    return this.apiService.get(this.baseUrl + '/rest/product/rate/cat/PF');
  };
  getPremiumFPByVersionNoAndCode = (version: number, code: string) => {
    return this.apiService.get(this.baseUrl + '/rest/product/covers/premium/fp/version/' + code + "/" + version);
  };
  getPremiumRoundingBasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/PREM_ROUNDING_BASIS'
    );
  };
  getPrimaryPremiumRate = () => {
    return this.apiService.get(this.baseUrl + '/rest/product/rate/cat/P');
  };
  getDiscountCodesAllowed = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/product/rate/discount/company/code/desc'
    );
  };
  getCommissionEarning = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/COMM_EARNING_BASIS'
    );
  };
  getCommissionCode = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/COMM_BASIS'
    );
  };
  getCommTypeCodeAndDesc(){    
    return this.apiService.get(
      this.baseUrl + '/rest/commtype/code/desc'
    );
  }
  getAgentType = () => {
    return this.apiService.get(this.baseUrl + '/rest/agent/setup/type/desc');
  };
  getReferralPayment = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/REFERRAL_FEE_BASIS'
    );
  };
  getTelemarketingRem = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/TM_FEE_BASIS'
    );
  };
  getAgentClawback = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/CLAWBACK_BASIS'
    );
  };
  getCLawbackSpreadBasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/CLAWBACK_SPREAD_BASIS'
    );
  };
  getReferralPaymentTable = () => {
    return this.apiService.get(this.baseUrl + '/rest/product/rate/cat/RF');
  };
  getRemTable = () => {
    return this.apiService.get(this.baseUrl + '/rest/product/rate/cat/TM');
  };
  getCommissionRateByVersionNOAndCode = (version: number, code: string) => {
    return this.apiService.get(this.baseUrl + '/rest/product/covers/commission/rate/version/' + code + "/" + version);
  };
  getClawbackTable = () => {
    return this.apiService.get(this.baseUrl + '/rest/product/rate/cat/C');
  };
  getClaimsTypeAllowed = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/CLAIM_TYPE'
    );
  };
  /*    Terms */
  getMaturityBase = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/MAT_BASIS'
    );
  };
  getAgeCalcBasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/AGE_CALC_BASIS'
    );
  };
  /*  Endorsements */
  getEndorsementCalcBasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/ENDORSE_CALC_BASIS'
    );
  };

  getEndorsementCalcTable = () => {
    return this.apiService.get(this.baseUrl + '/rest/product/rate/cat/EN');
  };
  getEndorsementScreen = () => {
    return this.apiService.get(this.baseUrl + '/rest/screen/code/desc/CO');
  };
  /*  UnDERWRITINGS */
  getMedicalUnderwriting = (data: any) => {
    return this.apiService.get(
      this.baseUrl + '/rest/underwriting/question/codes/RS/' + data)
  };
  getMedicalUnderwritingResultTable = (data: any) => {
    return this.apiService.get(
      this.baseUrl + '/rest/underwriting/question/codes/MR/' + data)
  };
  getMedicalUnderwritingTestTable = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/product/rate/general/code/desc/U'
    );
  };
  getUnderwritingFormAttached = () => {
    return this.apiService.get(this.baseUrl + '/rest/templates/code/desc/Q');
  };
  getFCLCalculationBasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/FCL_CALC_BASIS'
    );
  };
  getfinancialUnderwritingQuestion = (data) => {
    return this.apiService.get(
      this.baseUrl + '/rest/underwriting/question/codes/FQ/' + data
    );
  };
  getPremiumFPS = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/product/rate/general/code/desc/PF'
    );
  };
  getunderWritingQuestionSet = (data: any) => {
    return this.apiService.get(
      this.baseUrl + '/rest/underwriting/question/codes/UQ/' + data
    );
  };
  getRiskSurveyQuestion = (data: any) => {
    return this.apiService.get(
      this.baseUrl + '/rest/underwriting/question/codes/RS/' + data
    );
  };
  /* Surrenders */
  getMonthsPartialSurrenderTable = () => {
    return this.apiService.get(this.baseUrl + '/rest/product/rate/cat/SURR');
  };
  getMaxpartialCalcBasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/MAX_PARTIAL_SURR_BASIS'
    );
  };
  getPartialSurrenderPenaltyTable = () => {
    return this.apiService.get(this.baseUrl + '/rest/product/rate/cat/SURR');
  };
  getMonthsFullSurrenderTable = () => {
    return this.apiService.get(this.baseUrl + '/rest/product/rate/cat/SURR');
  };
  getSurrenderValueTable = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/SURR_PAY_BASIS'
    );
  };
  getFullSurrenderValuePenalty = () => {
    return this.apiService.get(this.baseUrl + '/rest/product/rate/cat/SURR');
  };

  /*  LOAN */
  getPremiumloanbasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/PREMIUM_LOAN_BASIS'
    );
  };
  getMaxloancalculationbasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/MAX_LOAN_AMOUNT_BASIS'
    );
  };
  getPolicyloanInterestTable = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/product/rate/interest/code/desc'
    );
  };
  getPremiumloanInterestTable = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/product/rate/interest/code/desc'
    );
  };
  /* Lapse */
  getLapseValueTable = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/product/rate/general/code/desc/LA'
    );
  };
  getReinstatementChargeAmountTable = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/product/rate/general/code/desc/RI'
    );
  };
  getLapseValueBasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/LAPSE_VALUE_BASIS'
    );
  };
  getReinstatementInterestRateTable = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/product/rate/interest/code/desc'
    );
  };
  /* PERIL */
  getClaimType = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/CLAIM_TYPE'
    );
  };
  getPeril = () => {
    return this.apiService.get(this.baseUrl + '/rest/codes/group/LA');
  };
  getPeril2(claimType: string) {
    return this.apiService.get(this.baseUrl + `/rest/codes/group/${claimType}`);
  }

  getCodesByCodeGroupAndCat(group: string, cat: string) {
    return this.apiService.get(this.baseUrl + `/rest/codes/code_title/group/${group}/${cat}`);
  }

  getProximateCause = (perilCode?:string) => {
    return this.getCodesByCodeGroupAndCat('PROXIMATE_CAUSE', perilCode); 
  };
  /* PAIDUP */
  getBenifitrecalcBasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/PAID_UP_CALC_BASIS'
    );
  };
  getBenifitrecalcTable = () => {
    return this.apiService.get(this.baseUrl + '/rest/product/rate/cat/PU');
  };
  getPaidupChargesTable = () => {
    return this.apiService.get(this.baseUrl + '/rest/product/rate/cat/PU');
  };
  getPaidupTable = () => {
    return this.apiService.get(this.baseUrl + '/rest/product/rate/cat/PU');
  };
  getReinstatementCalcBasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/REINST_CALC_BASIS'
    );
  };
  /* Bonuses */
  getPromoBonusBasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/BONUS_BASIS'
    );
  };
  getPromoBonusRateTable = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/product/rate/general/code/desc/BON'
    );
  };
  getAnnualBonusBasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/BONUS_BASIS'
    );
  };
  getAnnualBonusTable = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/RATE_BASIS'
    );
  };

  /*  ACCOUNT */
  getScreensList = (data: any) => {
    return this.apiService.get(this.baseUrl + '/rest/screen/code/desc/' + data);
  };

  getCodeGroup = (data: any) => {
    return this.apiService.get<ICodeTitle[]>(
      this.baseUrl + '/rest/codes/sub/group/' + data
    );
  };
  getAgeCalculationBases = () => {
    return this.apiService
      .get(this.baseUrl + '/rest/codes/sub/group/AGE_CALC_BASIS')
      .pipe(
        map((res) => {
          try {
            res.forEach((element) => {
              element.code = +element.code;
            });
          } catch (e) {
            console.error(e);
          }
          return res;
        })
      );
  };

  /* getEvent=(data:any)=>{
    return this.apiService.get(this.baseUrl + "/rest/product/event/list?EVENT_TYPE="+data)
  } */

  getPremiumFrequency = () => {
    return this.apiService
      .get<IPremiumFrequency[]>(this.baseUrl + '/rest/premium/frequency/')
      .pipe(
        map((res) => {
          res.forEach((element) => {
            element.id = element.id.toString() as any;
          });
          return res;
        })
      );
  };

  getDocumentName = () => {
    return this.apiService.get(this.baseUrl + '/rest/document/event/AAEW');
  };

  getBenefitPayment = () => {
    return this.apiService.getCodes(
      this.baseUrl + '/rest/codes/sub/group/PAYOUTWARD_METHOD'
    );
  };

  getDefaultProvider = (providerCat: string) => {
    return this.apiService.get(this.baseUrl + '/rest/client/policies/' + providerCat);
  };

  createProductRequest = (data: Partial<IProductCode>) => {
    return this.apiService.post(this.baseUrl + '/rest/product/', data);
  };

  updateProductRequest(prodCode, data: Partial<IProductCode>) {
    return this.apiService.put(
      this.baseUrl + '/rest/product/' + prodCode,
      data
    );
  }

  getProductByCode(prodCode) {
    return this.apiService.get<IProductCode>(
      this.baseUrl + '/rest/product/code/' + prodCode
    );
  }
  getReinsuranceTreatyList = () => {
    return this.apiService.get(this.baseUrl + '/rest/treaty/code/desc');
  };
  /* taxes */
  getPremiumTaxBasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/category/PREM_TAX_BASIS'
    );
  };
  getSurrenderBenefitTaxBasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/category/SURRENDER_TAX_BASIS'
    );
  };
  getMaturityBenefitTaxBasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/category/MATURITY_TAX_BENEFIT_BASIS'
    );
  };
  getDeathBenefitTaxBasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/category/DEATH_TAX_BENEFIT_BASIS'
    );
  };
  getStampDuty = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/category/STAMP_DUTY'
    );
  };
  getInterestEarnedTaxBasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/category/INTEREST_TAX_BASIS'
    );
  };
  getTratesCodeAndDesc = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/product/rate/tax/code/desc'
    );
  };
  /* DOCUMENTATION */
  getEventType = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/EVENT_GROUP'
    );
  };
  getEvent = (data: any) => {
    return this.apiService.get(
      this.baseUrl + '/rest/product/event/list/' + data
    );
  };

  getEventList = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/product/event/list/'
    );
  };

  getEventListByGroup = (group: string) => {
    return this.apiService.get(
      this.baseUrl + '/rest/product/event/list/' + group
    );
  };

  getLanguauge = () => {
    return this.apiService.get(this.baseUrl + '/rest/codes/sub/group/LANGUAGE');
  };
  getAction = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/DOCUMENT_ACTION'
    );
  };

  getProviderClientByCat = (cat: string) => {
    return this.apiService.get(
      this.baseUrl + '/rest/client/no/full-name/' + cat
    );
  };

  getDocumentCat = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/DOCUMENT_TYPE'
    );
  };
  getDocIds() {
    return this.apiService.get(this.baseUrl + '/rest/document/docId');
  }
  getDocCodesByCat(cat: string) {
    return this.apiService.get(this.baseUrl + '/rest/correspondence/document/desc/codes/category/' + cat)
  }
  getWorkFlowTaskByCat(cat: string) {
    return this.apiService.get(this.baseUrl + '/rest/workflows/task/group/' + cat)
  }
  getDocumentCode = (data: any) => {
    return this.apiService.get(this.baseUrl + '/rest/document/event/' + data);
  };
  getCondition = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/CONDITION'
    );
  };
  /* Excess Deductible */
  getExcessCalcBasis = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/DOCUMENT_TYPE'
    );
  };
  getExcessTable = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/product/rate/general/code/desc/EX'
    );
  };
  getDeductibleTable = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/DEDUCTIBLE_CALC_BASIS'
    );
  };

  updateProductData = (data: any, coverCode: string) => {
    return this.apiService.post(this.baseUrl + '/rest/product/covers/', data);
  };
  getFrequencyOfPayments = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/FREQUENCY'
    );
  };

  getBenefitPaymentFrequency = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/category/FREQUENCY'
    );
  };

  getCoverStatusOnClaim = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/status/code/description/C'
    );
  };
  getDeductibleTableByCatD = () => {
    return this.apiService.get(
      this.baseUrl + '/rest/product/rate/general/code/desc/D'
    );
  };
}
