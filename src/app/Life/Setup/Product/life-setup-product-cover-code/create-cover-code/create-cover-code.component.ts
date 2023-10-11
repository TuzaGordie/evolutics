import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FindProductService } from '../../service/find-product.service';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { getLocaleTimeFormat } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import {
  AccReins,
  Annuities,
  Basic,
  Benefit,
  Bonuses,
  Commission,
  CoverBenefitClaim,
  CoversAutoSettleCover,
  CoversAutoTerminateCover,
  CoversBenefitEscal,
  CoversBenefitSchedule,
  CoversBenTermOpt,
  CoversCoversWaived,
  CoversLoanIntRate,
  CoversPayoutMethod,
  CoversPremiumFP,
  CreateBasic,
  CoversPremiumFPVersion,
  CoversPremTermOpt,
  CoversSumAssured,
  CoversSumAssuredOpt,
  CreateAcct,
  CreateCoverCode,
  CreateCoverPremium,
  CreateCoversBenefit,
  CreatePeril,
  CreateTerms,
  Dependents,
  Documentations,
  Endorsements,
  Lapse,
  Loan,
  PaidUp,
  PerilDetails,
  Perils,
  Premium,
  Surrenders,
  TaxesLevies,
  Terms,
  TermsOpts,
  Treaty,
  Underwriting,
  Excess,
  Deductible,
  CoversExcessOpt,
  CoversDeductibleOpt,
  CreateExcessDeductible,
  CoverBenefitFreq,
  CoversDiscount,
  CoversSumAssuredFactorOptions,
} from '../cover-code';
import { UtilityService } from 'src/app/Services/utility.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import {
  AnnuityGuaranteePeriod,
  AnnuityReversionaryRateOption,
  AnuityEscalationRateOption,
  CompaniesAllowed,
  CoversCommissionRates,
  CoversCommissionVersions,
  CurrencyAllowed,
  PaymentOutMethodAllowed,
  PremiumFrequency,
  QuotationFormsToBeAttached,
} from '../cover-code-child';
import { PageTemplateComponent } from 'src/app/Shared/components/page-template/page-template.component'; 
import { CoverService } from '../cover-service.service';
import { EPageType } from 'src/app/Shared/models/index.model';

declare var $: any;
@Component({
  selector: 'app-create-cover-code',
  templateUrl: './create-cover-code.component.html',
  styleUrls: ['./create-cover-code.component.scss'],
})
export class CreateCoverCodeComponent
  extends PageTemplateComponent
  implements OnInit
{
  accRein = new AccReins();
  treaty = new Treaty();
  accReins = new CreateAcct(this.accRein, [this.treaty]);
  annuities = new Annuities();
  basic = new Basic();
  benefitFreq = new CoverBenefitFreq();
  coverBenefit = new Benefit();
  coverBenefitClaim = new CoverBenefitClaim();
  coverDiscounts = new CoversDiscount();
  coversAutoSettleCover = new CoversAutoSettleCover();
  coversAutoTerminateCover = new CoversAutoTerminateCover();
  coversBenefitEscals = new CoversBenefitEscal();
  coversBenefitSchedules = new CoversBenefitSchedule();
  coversCoversWaived = new CoversCoversWaived();
  coversLoanIntRates = new CoversLoanIntRate();
  coversPremium = new Premium();
  coversPremiumFP = new CoversPremiumFP();
  coversPremiumFPVersion = new CoversPremiumFPVersion();
  coversSumAssured = new CoversSumAssured();
  coversSumAssuredFactorOptions = new CoversSumAssuredFactorOptions();
  coversSumAssuredOpts = new CoversSumAssuredOpt();

  benefit = new CreateCoversBenefit(
    this.coverBenefit,
    [this.benefitFreq],
    this.coversSumAssured,
    this.coversSumAssuredFactorOptions,
    [this.coverBenefitClaim],
    [this.coversAutoSettleCover],
    [this.coversAutoTerminateCover],
    [this.coversLoanIntRates],
    [this.coversCoversWaived],
    [this.coversSumAssuredOpts],
    [this.coversBenefitEscals],
    [this.coversBenefitSchedules]
  );
  bonuses = new Bonuses();
  commission = new Commission();
  dependents = new Dependents();
  documentations = new Documentations();
  endorsements = new Endorsements();
  excess = new Excess();
  deductible = new Deductible();
  excessOpts = new CoversExcessOpt();
  deductibleOpts = new CoversDeductibleOpt();
  excessDeductible = new CreateExcessDeductible(
    this.excess,
    this.deductible,
    [this.deductibleOpts],
    [this.excessOpts]
  );
  lapse = new Lapse();
  loan = new Loan();
  paidUp = new PaidUp();
  peril = new Perils();
  perilDetails = new PerilDetails();
  perils = new CreatePeril(this.peril, [this.perilDetails]);
  premium = new CreateCoverPremium(
    this.coversPremium,
    this.coversPremiumFP,
    [this.coversPremiumFPVersion],
    [this.coverDiscounts]
  );
  surrenders = new Surrenders();
  taxesLevies = new TaxesLevies();
  coverTerms = new Terms();
  coverTermsOpt = new TermsOpts();
  coversPremTermOpt = new CoversPremTermOpt();
  coversBenTermOpt = new CoversBenTermOpt();
  terms = new CreateTerms(
    this.coverTerms,
    [this.coverTermsOpt],
    [this.coversPremTermOpt],
    [this.coversBenTermOpt]
  );
  underwriting = new Underwriting();

  @Output() providerCodes: any[];

  companiesAllowed = new CompaniesAllowed();
  payoutMethod = new PaymentOutMethodAllowed();

  createBasic = new CreateBasic(
    this.basic,
    [this.companiesAllowed],
    [this.payoutMethod]
  );

  @Output() createCoverCode = new CreateCoverCode(
    this.accReins,
    this.annuities,
    this.createBasic,
    this.benefit,
    [this.bonuses],
    this.commission,
    [this.dependents],
    [this.documentations],
    this.endorsements,
    this.excessDeductible,
    this.lapse,
    this.loan,
    this.paidUp,
    this.perils,
    this.premium,
    this.surrenders,
    this.taxesLevies,
    this.terms,
    this.underwriting
  );

  @Input() isModal: boolean;
  @Output() companiesList: any[] = [];
  @Output() coverCode: string;
  @Output() loading = false;
  @Output() loadingText = '';
  @Output() paymentMethodsList: any[] = [];
  @Output() riskSurveyQuestionList: any[] = [];
  @Output() underwritingQuestionSet: any[] = [];
  /* deductibleArray: any = []; */
  actionsList: any = [];
  ageCalcBasisList: any = [];
  agentTypeList: any = [];
  annuityEscalationRateOption: any = [];
  annuityGuaranteePeriod: any = [];
  annuityReversionaryRateOption: any = [];
  benefitRecalcBasisList: any = [];
  benefitRecalcTableList: any = [];
  benefitScheduleBasis: any[] = [];
  benifitPaymentList: any = [];
  bonusBasisList: any = [];
  bonusesList: any = [];
  bonusRateBasisList: any = [];
  claimTypeArray: any = [];
  claimTypeList: any = [];
  claimTypesList: any = [];
  clawbackBasisList: any = [];
  clawbackSpreadBasisList: any = [];
  clawbackTableList: any = [];
  commissionCodeList: any = [];
  commissionCodesList: any = [];
  commissionEarningList: any = [];
  companyAllowed: any[] = [''];
  conditionsList: any = [];
  coversAccount: any = FormGroup;
  coversAnnuities: any = FormGroup;
  coversCommissionRates: any = [];
  coversCommissionVersions: any = [];
  coverScreenList: any = [];
  coversList: any = [];
  coverStatusOnClaim: any = [];
  coversWaived: any = [];
  coversWaivedList: any = [];
  currencyAllowed: any[] = [''];
  deathTaxesBenefitBasisList: any = [];
  deductibleCalcList: any = [];
  dependentList: any = [];
  discountCodeAllowed: any = [];
  discountCodeAllowedList: any = [];
  docCodeList: any = [];
  document_Code: any = {};
  document_event_options: any = {};
  documentationCategoryList: any = [];
  documentationsList: any = [];
  endorsementCalcBasisList: any = [];
  endorsementCalcTableList: any = [];
  endorsementScreenList: any = [];
  eventList: any = [];
  eventTypeList: any = [];
  excessArray: any = [];
  excessCalcList: any = [];
  excessTableList: any = [];
  fclCalcBasisList: any = [];
  financialUnderwritingQuestion: any = [];
  fixedRateCalcBasisList: any = [];
  frequencyTableList: any = [];
  insuranceTypeList: any = [];
  insuranceTypesList: any = [];
  interestCalBasisList: any = [];
  interestTaxesBasisList: any = [];
  isbenfScedCheck: boolean = false;
  isDetailCheck: boolean = false;
  languagesList: any = [];
  lapseValueBasisList: any = [];
  lapseValueTableList: any = [];
  lowInterestRate: any = [];
  maturityBasisList: any = [];
  maturityTaxesBenefitBasisList: any = [];
  maxLoanCalcBasisList: any = [];
  maxPartialSurrenderBasisList: any = [];
  medicalUnderwritingList: any = [];
  medicalUnderwritingTestTableList: any = [];
  modalOnComplete: any;
  monthsToPartialSurrenderTableList: any = [];
  nbofben: number = 1;
  paymentInMethodsList: any = [];
  paymentOutMethodAllowed: any = [''];
  paymentTableList: any = [];
  paymentTriggerList: any = [];
  perilList: any = [];
  perilsList: any = [];
  policyFeeAmountTableList: any = [];
  policyFeeBasisList: any = [];
  policyLoanInterestTableList: any = [];
  PolicyloanInterestTableList: any = [];
  premiumCalcBasisList: any = [];
  premiumFrequency: any = [];
  premiumLoanBasisList: any = [];
  premiumRoundingBasisList: any = [];
  premiumTaxesBasisList: any = [];
  primaryPremiumRateList: any = [];
  private nbofcats: number = 1;
  private nbofpoam: number = 1;
  prodCode: any;
  providerArray: any = [];
  providerLIst: any = [];
  proximateCausesList: any = [];
  quotationFormsToBeAttached: any = [];
  quoteValidityBasisList: any = [];
  rateCalcBasisList: any = [];
  rateCalculationBasisList: any = [];
  referralPaymentBasisList: any = [];
  referralPaymentTableList: any = [];
  reinstatementChargeAmountTableList: any = [];
  reinstatementIntrestTableList: any = [];
  reinstCalcBasisList: any = [];
  reinsuranceTreaty: any = [];
  reinsuranceTreatyList: any = [];
  secondaryPremiumRateTableList: any = [];
  shortTermRateTableList: any = [];
  stampDutyBasisList: any = [];
  statusCodeList: any = [];
  sumAssuredEscalation: any = [];
  sumAssuredOption: any = [];
  surrenderPayBasisList: any = [];
  surrenderTaxesBasisList: any = [];
  telemarketerRemBasisList: any = [];
  tmRemTableList: any = [];
  underwritingFormAttached: any = [];
  action;
  pageType: EPageType;
  constructor(
    private findProductService: FindProductService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private codeService: CodeService,
    private router: Router,
    private util: UtilityService,
    private companyService: CompanyService,
    public coverService: CoverService
  ) {
    super(activatedRoute, util);
  }

  ngOnInit(): void {
    this.prodCode = this.activatedRoute.snapshot.queryParams.prodCode;
    this.coverService.route = this.activatedRoute;
    this.coverService.pageType = this.pageType;

    /* this.setFundingOptionsList(); */
    this.setPaymentTriggersList();
    this.setPaymentTablesList();
    /*  this.setFrequencyPaymentList(); */
    /*  this.setSumAssuredCalcBasisList(); */
    this.setStatusCodeList();
    this.setRateCalcBasisList();

    this.setInsuranceTypesList();

    this.setCoversWaived();

    this.changeDateFormat();
    this.setProviderList();

    this.activatedRoute.queryParams.subscribe((params) => {
      this.coverCode = params.code;
      // if (code != null && action != null) {
      //   // this.loading = true
      //   // this.loadingText = "Fetching Covers record....."
      //   this.action = action
      //   this.coverCode = code
      //   // this.fetchCoverCode(action, code)
      // }
    });
  }
  get isCreate() {
    return !this.activatedRoute.snapshot.queryParams.action;
  }
  fetchCoverCode(action: string, cover: string) {
    this.findProductService.getSetUpShowData(cover).subscribe(
      (data: CreateCoverCode) => {
        this.loading = false;
        // this.action = action;
        this.populateForm(cover, data);
      },
      () => {
        this.loading = false;
        this.util.notify('Unable to fetch covers!.', 0);
      }
    );
  }

  addDependent() {
    var dependent = new Dependents();
    dependent.rowId = this.createCoverCode.dependents.length + 1;
    this.createCoverCode.dependents.push(dependent);
  }

  removeDependent(i: number) {
    if (this.createCoverCode.dependents[i].id != null) {
      if (this.util.confirm('Do you want to delete this dependant?')) {
        this.createCoverCode.dependents.splice(i, 1);
      }
    } else this.createCoverCode.dependents.splice(i, 1);
  }

  addDocumentation() {
    var document = new Documentations();
    document.rowId = this.createCoverCode.documentations.length + 1;
    this.createCoverCode.documentations.push(document);
  }

  removeDocumentation(i: number) {
    if (this.createCoverCode.documentations[i].id) {
      if (this.util.confirm('Do you want to delete this documentation?')) {
        this.createCoverCode.documentations.splice(i, 1);
      }
    } else this.createCoverCode.documentations.splice(i, 1);
  }

  addBonuses() {
    var bonus = new Bonuses();
    bonus.rowId = this.createCoverCode.bonuses.length + 1;
    this.createCoverCode.bonuses.push(bonus);
  }

  removeBonuses(i: number) {
    if (this.createCoverCode.bonuses[i].id == null) {
      if (this.util.confirm('Do you want to delete the peril?')) {
        this.createCoverCode.bonuses.splice(i, 1);
      }
    } else this.createCoverCode.bonuses.splice(i, 1);
  }

  addPerils() {
    var peril = new PerilDetails();
    peril.rowId = this.createCoverCode.perils.coversPerilDetails.length + 1;
    this.createCoverCode.perils.coversPerilDetails.push(peril);
  }

  removePerils(i: number) {
    if (this.createCoverCode.perils[i].id != null) {
      if (this.util.confirm('Do you want to delete this peril?')) {
        this.createCoverCode.perils.coversPerilDetails.splice(i, 1);
      }
    } else this.createCoverCode.perils.coversPerilDetails.splice(i, 1);
  }

  setProviderList() {
    this.findProductService.getProviders().subscribe((res) => {
      this.providerLIst = res;
    });
  }

  setCoversWaived() {
    this.findProductService.getCoversWaived().subscribe((res) => {
      this.coversWaivedList = res;
    });
  }

  setPaymentTriggersList() {
    this.findProductService.getCodeList('BEN_PAY_BASIS').subscribe((res) => {
      this.paymentTriggerList = res;
    });
  }

  setPaymentTablesList() {
    this.findProductService.getCodeList('NO_PAY_BASIS').subscribe((res) => {
      this.paymentTableList = res;
    });
  }

  setStatusCodeList() {
    this.findProductService.getStatusCodeList().subscribe((res) => {
      this.statusCodeList = res;
    });
  }

  setRateCalcBasisList() {
    this.findProductService.getCodeList('RATE_CALC_BASIS').subscribe((res) => {
      this.rateCalcBasisList = res;
    });
  }

  setInsuranceTypesList() {
    this.findProductService.getCodeList('INS_TYPE').subscribe((res) => {
      this.insuranceTypesList = res;
    });
  }

  populateForm(code: string, data: CreateCoverCode) {
    // this.createCoverCode.accReins.acct = data.accReins.acct || new AccReins()
    this.createCoverCode.basic.coversCompanies = [];
    this.createCoverCode.basic.coversPayoutMethod = [];

    // if (data.annuities.annuityGuaranteePeriod != null) {
    //   this.createCoverCode.annuities.annuityGuaranteePeriod = data.annuities.annuityGuaranteePeriod
    // } else {
    //   this.createCoverCode.annuities.annuityGuaranteePeriod = [new AnnuityGuaranteePeriod()]
    // }

    // if (data.annuities.annuityEscalationRateOption.length > 0) {
    //   this.createCoverCode.annuities.annuityEscalationRateOption = data.annuities.annuityEscalationRateOption
    // } else {9
    //   this.createCoverCode.annuities.annuityEscalationRateOption = [new AnuityEscalationRateOption()]
    // }

    // if (data.annuities.annuityReversionaryRateOption.length > 0) {
    //   this.createCoverCode.annuities.annuityReversionaryRateOption = data.annuities.annuityReversionaryRateOption
    // } else {
    //   this.createCoverCode.annuities.annuityReversionaryRateOption = [new AnnuityReversionaryRateOption()]
    // }

    // if (data.premium != null) {
    //   this.createCoverCode.premium = data.premium

    //   if (data.premium.coversPremiumFP != null) {
    //     this.createCoverCode.premium.coversPremiumFP = data.premium.coversPremiumFP
    //   } else {
    //     this.createCoverCode.premium.coversPremiumFP = new CoversPremiumFP()
    //   }
    // } else {
    //   this.createCoverCode.premium = this.premium
    //   this.createCoverCode.premium.coversPremiumFP = new CoversPremiumFP()
    // }

    // this.createCoverCode.basic.basic = data.basic.basic || new Basic()

    // if (data.premium == null) {
    //   this.createCoverCode.premium = new CreateCoverPremium(
    //     this.coversPremium,
    //     this.coversPremiumFP,
    //     [this.coversPremiumFPVersion],
    //     [this.coverDiscounts]
    //   )
    // } else {

    // }

    // this.findProductService.getProviderClientByCat(this.createCoverCode.basic.basic.providerCategory)
    //   .subscribe((res) => {
    //     this.providerCodes = res;
    //   });

    if (this.coverService.isClone) {
      delete this.createCoverCode.basic.basic.id;
      delete this.createCoverCode.basic.basic.code;

      // delete this.createCoverCode.accReins.acct.id
      // delete this.createCoverCode.annuities.id
      // delete this.createCoverCode.commission.id
      // delete this.createCoverCode.endorsements.id
      // delete this.createCoverCode.excessDeductible.excess.id
      // delete this.createCoverCode.excessDeductible.deductible.id
      // delete this.createCoverCode.lapse.id
      // delete this.createCoverCode.loan.id
      // delete this.createCoverCode.paidUp.id
      // delete this.createCoverCode.premium.coversPremium.id
      // delete this.createCoverCode.premium.coversPremiumFP.id
      // delete this.createCoverCode.surrenders.id
      // delete this.createCoverCode.taxesLevies.id
      // delete this.createCoverCode.terms.coversTerms.id
      // delete this.createCoverCode.underwriting.id
    }

    // this.createCoverCode.bonuses = []
    // this.createCoverCode.dependents = []
    // this.createCoverCode.documentations = []
    // this.createCoverCode.perils.coversPerilDetails = []
    // this.createCoverCode.terms.coversTermsOpts = []
    // this.createCoverCode.terms.coversBenTermOpt = []
    // this.createCoverCode.terms.coversPremTermOpt = []
    // this.createCoverCode.accReins.treaties = []
    // this.createCoverCode.basic.coversCompanies = []
    // this.createCoverCode.basic.coversPayoutMethod = []
    // this.createCoverCode.benefit.coversBenefitClaims = []
    // this.createCoverCode.benefit.coverBenefitFreqs = []
    // this.createCoverCode.benefit.coversAutoTerminateCover = []
    // this.createCoverCode.benefit.coversAutoSettleCover = []
    // this.createCoverCode.benefit.coversLoanIntRates = []
    // this.createCoverCode.benefit.coversCoversWaived = []
    // this.createCoverCode.benefit.coversSumAssuredOpts = []
    // this.createCoverCode.benefit.coversBenefitEscals = []
    // this.createCoverCode.benefit.coversBenefitSchedules = []

    // data.accReins && data.accReins.treaties && data.accReins.treaties.length > 0 && data.accReins.treaties.map(treaty => {
    //   if (action == "clone") delete treaty.id
    //   treaty.rowId = this.createCoverCode.accReins.treaties.length + 1
    //   this.createCoverCode.accReins.treaties.push(treaty)
    // })

    // data.basic && data.basic.coversCompanies && data.basic.coversCompanies.map((company, i) => {
    //   if (action == "clone") delete company.id
    //   company.rowId = i
    //   this.createCoverCode.basic.coversCompanies.push(company)
    // })

    // data.basic && data.basic.coversPayoutMethod && data.basic.coversPayoutMethod.map((paymentOutMethodAllowed, i) => {
    //   if (action == "clone") delete paymentOutMethodAllowed.id
    //   paymentOutMethodAllowed.rowId = i
    //   this.createCoverCode.basic.coversPayoutMethod.push(paymentOutMethodAllowed)
    // })

    // if (this.createCoverCode.premium == null) {
    //   this.createCoverCode.premium = new CreateCoverPremium(
    //     this.coversPremium,
    //     this.coversPremiumFP,
    //     [this.coversPremiumFPVersion],
    //     [this.coverDiscounts]
    //   )
    // } else {
    //   if (!this.createCoverCode.premium.coversDiscounts || this.createCoverCode.premium.coversDiscounts.length < 1) this.createCoverCode.premium.coversDiscounts.push(new CoversDiscount())
    //   if (!this.createCoverCode.premium.coversPremiumFPVersion || this.createCoverCode.premium.coversPremiumFPVersion.length < 1) this.createCoverCode.premium.coversPremiumFPVersion.push(new CoversPremiumFPVersion())
    // }

    // if (this.createCoverCode.basic.basic.currencyAllowed && this.createCoverCode.basic.basic.currencyAllowed.length < 1) this.createCoverCode.basic.basic.currencyAllowed.push(new CurrencyAllowed())
    // if (this.createCoverCode.basic.coversCompanies && this.createCoverCode.basic.coversCompanies.length < 1) this.createCoverCode.basic.coversCompanies.push(new CompaniesAllowed())
    // if (this.createCoverCode.basic.coversPayoutMethod && this.createCoverCode.basic.coversPayoutMethod.length < 1) this.createCoverCode.basic.coversPayoutMethod.push(new CoversPayoutMethod())

    // if (this.createCoverCode.dependents && this.createCoverCode.dependents.length < 1) this.createCoverCode.dependents.push(new Dependents())
    // if (this.createCoverCode.documentations && this.createCoverCode.documentations.length < 1) this.createCoverCode.documentations.push(new Documentations())
    // if (this.createCoverCode.perils.coversPerilDetails.length < 1) this.createCoverCode.perils.coversPerilDetails.push(new PerilDetails())

    // if (this.createCoverCode.annuities.annuityEscalationRateOption.length < 1) this.createCoverCode.annuities.annuityEscalationRateOption = [new AnuityEscalationRateOption()]
    // if (this.createCoverCode.annuities.annuityGuaranteePeriod.length < 1) this.createCoverCode.annuities.annuityGuaranteePeriod = [new AnnuityGuaranteePeriod()]
    // if (this.createCoverCode.annuities.annuityReversionaryRateOption.length < 1) this.createCoverCode.annuities.annuityReversionaryRateOption = [new AnnuityReversionaryRateOption()]

    // this.setPaymentMethods()
    // this.setRiskSurveyQuestion()
    // this.setUnderwritingQuestionSet()
  }

  setUnderwritingQuestionSet() {
    this.findProductService
      .getunderWritingQuestionSet(this.packageCompanies())
      .subscribe((res) => {
        this.underwritingQuestionSet = res;
      });
  }

  setRiskSurveyQuestion() {
    this.findProductService
      .getRiskSurveyQuestion(this.packageCompanies())
      .subscribe((res) => {
        this.riskSurveyQuestionList = res;
      });
  }

  setPaymentMethods() {
    this.findProductService
      .getPaymentMethodsByCompany(this.packageCompanies())
      .subscribe((res) => {
        this.paymentMethodsList = res;
      });
  }

  packageCompanies() {
    var companies = '';
    var companyLength: number =
      this.createCoverCode.basic.coversCompanies.length;

    this.createCoverCode.basic.coversCompanies.map((company, i) => {
      if (i != companyLength - 1) companies += company.companyAllowed + ',';
      else companies += company.companyAllowed;
    });

    return companies;
  }

  changeDateFormat() {
    /* let data = this.coversCommission.get('coversCommissionVersions').get("versionDate")?.value */
    let data = new Date();
    //console.log(data);
    let date = data + 'T' + data.getTime() + 'Z';
    //console.log(date);
  }
  addNewBasicCurrencyRow() {
    // this.currencyAllowed = this.coversBasic
    //   .get('currencyAllowed')
    //   .get('currencyAllowed') as FormArray;
    // const lessonForm = this.fb.control(null);
    // this.currencyAllowed.push(lessonForm);
  }
  addNewBasicpaymentRow() {
    // this.paymentOutMethodAllowed = this.coversBasic
    //   .get('paymentOutMethodAllowed')
    //   .get('paymentOutMethodAllowed') as FormArray;
    // const lessonForm = this.fb.control(null);
    // this.paymentOutMethodAllowed.push(lessonForm);
  }
  addNewBasiccompanyRow() {
    // this.companyAllowed = this.coversBasic
    //   .get('companiesAllowed')
    //   .get('companyAllowed') as FormArray;
    // const lessonForm = this.fb.control(null);
    // this.companyAllowed.push(lessonForm);
  }

  addNewProviderRow() {
    /*   this.providerArray = this.coversBasic.get('providerArray') as FormArray;
      const lessonForm = this.fb.group({
        providerCategory: [''],
        providerCode: ['']
      })
      this.providerArray.push(lessonForm); */
  }

  addNewclaimTypeRow() {
    /*  this.claimTypeArray = this.coversPeril.get("claimTypeArray") as FormArray;
     const lessonForm = this.fb.group({
       claimType: [''],
     })
     this.claimTypeArray.push(lessonForm); */
  }

  catCounter() {
    return new Array(this.nbofcats);
  }

  catInc() {
    this.nbofcats = this.nbofcats + 1;
  }

  benUncheck() {
    this.isbenfScedCheck = false;
  }
  benCheck() {
    this.isbenfScedCheck = true;
  }

  benInc() {
    this.nbofben = this.nbofben + 1;
  }

  detailsUncheck() {
    this.isDetailCheck = false;
  }
  detailsCheck() {
    this.isDetailCheck = true;
  }

  poamCounter() {
    return new Array(this.nbofpoam);
  }

  poamInc() {
    this.nbofpoam = this.nbofpoam + 1;
  }
  ngOnDestroy(): void {
    this.coverService.route = null;
  }
}
