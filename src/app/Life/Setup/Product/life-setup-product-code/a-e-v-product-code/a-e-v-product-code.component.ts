import { Component, OnInit, ViewChild } from '@angular/core';
import { FindProductService } from '../../service/find-product.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { configForms } from 'src/app/Shared/models/form.class';
import { AppService } from 'src/app/Services/app.service';
import { PageService } from 'src/app/Services/page.service';
import {
  IProductBasic,
  IProductCode,
  IProductDefaults,
  IProductDependentCovers,
  IProductDocumentation,
  IProductPolicyInfo,
  IProductQuoteInfo,
} from '../product-code-extras/product-code.interface';
import { UtilityService } from 'src/app/Services/utility.service';
import { EPageType } from 'src/app/Shared/models/index.model';
import { BasicFormComponent } from './basic-form/basic-form.component';
import { DependentCoversFormComponent } from './dependent-covers-form/dependent-covers-form.component';
import { DefaultsFormComponent } from './defaults-form/defaults-form.component';
import { PolicyInfoFormComponent } from './policy-info-form/policy-info-form.component';
import { QuoteInfoFormComponent } from './quote-info-form/quote-info-form.component';
import { DocumentationFormComponent } from './documentation-form/documentation-form.component';
import { environment } from 'src/environments/environment';
import { ProductService } from '../product-code-extras/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-a-e-v-product-code',
  templateUrl: './a-e-v-product-code.component.html',
  styleUrls: ['./a-e-v-product-code.component.scss'],
})
export class AEVProductCodeComponent implements OnInit {
  form = new FormGroup({
    basic: new FormGroup({
      allowCreditNote: configForms.boolean(false,false),
      autoConvertQuote: configForms.boolean(false,false),
      autoReconcileSuspense: configForms.boolean(false,false),
      busLine: configForms.required(this.appS.getCurrentSystemMetadata.busline),
      closedToNewBusiness: configForms.boolean(false,false),
      code: configForms.default(),
      companiesAllowed: new FormArray([],this.ValidateCompanies.bind(this)),
      currencyAllowed: new FormArray([],this.ValidateCurrencies.bind(this)),
      debitNoteRule: configForms.default(),
      description: configForms.required(),
      discountsAllowed: new FormArray([]),
      groupBusiness: configForms.boolean(false,false),
      id: configForms.default(),
      insuranceType: configForms.required(),
      issueDateBasis: configForms.required(),
      issueDateFactor: configForms.number(),
      policyCodeBasis: configForms.default(),
      policyNumberPrefix: configForms.required(),
      policyScreen: configForms.default(),
      premiumStatementScreen: configForms.default(),
      productClass: configForms.required(),
      quotationResultScreen: configForms.required(),
      quotationScreen: configForms.default(),
      quoteValidityBasis: configForms.required(),
      quoteValidityPeriod: configForms.required(),
      renewalBasis: configForms.required(),
      uploadFileBasis: configForms.default(),
    }),
    dependentCovers: new FormGroup({
      cover: new FormArray([]),
      permanentSubgroups: new FormArray([]),
    }),
    documentations: new FormArray([]),
    quoteInfo: new FormGroup({
      agent: configForms.boolean(),
      agentNo: configForms.boolean(),
      applicationDate: configForms.boolean(),
      assured: configForms.boolean(),
      beneficiary: configForms.boolean(),
      branch: configForms.boolean(),
      commencementDate: configForms.boolean(),
      deductible: configForms.boolean(),
      excess: configForms.boolean(),
      lifeAssuredDateOfBirth: configForms.boolean(),
      lifeAssuredName: configForms.boolean(),
      loanInterestRate: configForms.boolean(),
      nextOfKin: configForms.boolean(),
      ownerDateOfBirth: configForms.boolean(),
      ownerEmail: configForms.boolean(),
      ownerName: configForms.boolean(),
      ownerNationalInsuranceNo: configForms.boolean(),
      ownerPhoneNo: configForms.boolean(),
      payeeBankAccount: configForms.boolean(),
      pencomNo: configForms.boolean(),
      policyTerm: configForms.boolean(),
      premiumPaymentFreq: configForms.boolean(),
      premiumPaymentMethod: configForms.boolean(),
      premiumPaymentTerm: configForms.boolean(),
      sumAssured: configForms.boolean(),
    }),
    policyInfo: new FormGroup({
      agent: configForms.boolean(),
      agentNo: configForms.boolean(),
      applicationDate: configForms.boolean(),
      assured: configForms.boolean(),
      beneficiary: configForms.boolean(),
      branch: configForms.boolean(),
      commencementDate: configForms.boolean(),
      deductible: configForms.boolean(),
      excess: configForms.boolean(),
      lifeAssuredDateOfBirth: configForms.boolean(),
      lifeAssuredName: configForms.boolean(),
      loanInterestRate: configForms.boolean(),
      nextOfKin: configForms.boolean(),
      ownerDateOfBirth: configForms.boolean(),
      ownerEmail: configForms.boolean(),
      ownerName: configForms.boolean(),
      ownerNationalInsuranceNo: configForms.boolean(),
      ownerPhoneNo: configForms.boolean(),
      payeeBankAccount: configForms.boolean(),
      pencomNo: configForms.boolean(),
      policyTerm: configForms.boolean(),
      premiumPaymentFreq: configForms.boolean(),
      premiumPaymentMethod: configForms.boolean(),
      premiumPaymentTerm: configForms.boolean(),
      sumAssured: configForms.boolean(),
    }),
    defaults: new FormGroup({
      ageCalculationBasis: configForms.number(),
      autoSetPhoneNoAsExternalRef: configForms.boolean(),
      benefitPaymentMethodAllowed: new FormArray([]),
      coolOffFee: configForms.number(),
      coolOffPeriod: configForms.number(),
      defaultBranch: configForms.default(),
      loanArmotizationBasis: configForms.default(),
      maturityBasis: configForms.default(),
      policyTerm: configForms.number(),
      premiumFrequency: configForms.default(),
      providerCategory: configForms.default(),
      providerCode: configForms.default(),
      referralAgentNo: configForms.default(),
      writingAgentNo: configForms.default(),
    }),
  });
  tabs: {
    id: string;
    target: string;
    label: string;
    form: string;
    postFunction: (
      data: any,
      productCode?: string
    ) => Observable<{
      data: any;
      productCode: string;
    }>;
    putFunction: (
      data: any,
      productCode: string
    ) => Observable<{
      data: any;
      productCode: string;
    }>;
    data: any;
  }[] = [
    {
      id: 'pills-basic-tab',
      target: 'pills-basic',
      label: 'Basic',
      form: 'basic',
      postFunction: this.fpS.postBasic,
      putFunction: this.fpS.putBasic,
      data: null,
    },
    {
      id: 'pills-covers-tab',
      target: 'pills-covers',
      label: 'Dependent Covers',
      form: 'dependentCovers',
      postFunction: this.fpS.postDependent,
      putFunction: this.fpS.putDependent,
      data: null,
    },
    {
      id: 'pills-documentation-tab',
      target: 'pills-documentation',
      label: 'Documentation',
      form: 'documentations',
      postFunction: this.fpS.postDocumentation,
      putFunction: this.fpS.putDocumentation,
      data: null,
    },
    {
      id: 'pills-quote-tab',
      target: 'pills-quote',
      label: 'Quote Info',
      form: 'quoteInfo',
      postFunction: this.fpS.postQuote,
      putFunction: this.fpS.putQuote,
      data: null,
    },
    {
      id: 'pills-policy-tab',
      target: 'pills-policy',
      label: 'Policy Info',
      form: 'policyInfo',
      postFunction: this.fpS.postPolicy,
      putFunction: this.fpS.putPolicy,
      data: null,
    },
    {
      id: 'pills-defaults-tab',
      target: 'pills-defaults',
      label: 'Defaults',
      form: 'defaults',
      postFunction: this.fpS.postDefaults,
      putFunction: this.fpS.putDefaults,
      data: null,
    },
  ];
  type: EPageType;
  currentTabIndex: number;

  loading: boolean;
  product: IProductCode;
  @ViewChild('basic') basicRef: BasicFormComponent;
  @ViewChild('dependents') dependentsRef: DependentCoversFormComponent;
  @ViewChild('documentation') documentationRef: DocumentationFormComponent;
  @ViewChild('quote') quoteRef: QuoteInfoFormComponent;
  @ViewChild('policy') policyRef: PolicyInfoFormComponent;
  @ViewChild('defaults') defaultsRef: DefaultsFormComponent;
  constructor(
    public fpS: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    public appS: AppService,
    public pageS: PageService,
    public uS: UtilityService
  ) {
    this.loading = true;
  }
  get basicForm() {
    return this.form.get('basic') as FormGroup;
  }
  get defaultsForm() {
    return this.form.get('defaults') as FormGroup;
  }
  get dependentCoversForm() {
    return this.form.get('dependentCovers') as FormGroup;
  }
  get documentationsForm() {
    return this.form.get('documentations') as FormGroup;
  }
  get policyInfoForm() {
    return this.form.get('policyInfo') as FormGroup;
  }
  get quoteInfoForm() {
    return this.form.get('quoteInfo') as FormGroup;
  }
  async ngOnInit(): Promise<void> {}
  async ngAfterViewInit(): Promise<void> {
    try {
      this.product = this.route.snapshot.queryParams.prodCode;
      this.currentTabIndex = this.route.snapshot.queryParams.tab;
      this.selectTab(+this.currentTabIndex || 0);
      this.type = this.route.snapshot.data.type;
      let deleteProduct = false;
      if (this.product) {
        await this.getProductByCode(this.product);
      } else {
        if (!environment.production) {
          // this.product = testData as any;
          deleteProduct = true;
        }
      }
      this.basicRef?.initializeArrays(this.product);
      this.dependentsRef?.initializeArrays(this.product);
      this.documentationRef?.initializeArrays(this.product);
      this.defaultsRef?.initializeArrays(this.product);
      if (this.pageS.isClone(this.route)) {
        delete this.product?.basic?.code;
      }
      this.form?.patchValue(this.product);
      if (this.pageS.isClone(this.route)) {
        delete this.product;
      }

      if (deleteProduct) {
        setTimeout(() => {
          delete this.product;
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      this.uS.back();
    }
    this.loading = false;
  }

  ValidateCompanies(formArr: FormArray) {  
    if (formArr.value?.filter((x) => x.companyCode)?.length) return null;
    else return { required: true };
  }
  ValidateCurrencies(formArr: FormArray) {  
    if (formArr.value?.filter((x) => x.validCurrency)?.length) return null;
    else return { required: true };
  }
  selectTab(index: number) {
    // debugger;
    if (!this.product && index > 0) this.selectTab(0);
    else {
      this.currentTabIndex = index || 0;
      if (this.route.snapshot.queryParams.tab) {
        this.router.navigate([], {
          queryParams: { tab: index },
          queryParamsHandling: 'merge',
          relativeTo: this.route,
          replaceUrl: true,
        });
      }
      document.getElementById(this.tabs[this.currentTabIndex].id).click();
    }
  }
  get isShow() {
    return this.pageS.isShow(this.route);
  }
  get isEdit() {
    return this.pageS.isEdit(this.route);
  }
  get isClone() {
    return this.pageS.isClone(this.route);
  }
  get isCreate() {
    return this.pageS.isCreate(this.route);
  }
  getProductByCode(prodCode) {
    return this.fpS
      .getProductByCode(prodCode)
      .toPromise()
      .then((prod) => {
        console.log('got pro', prod);
        this.product = prod;
        this.tabs.forEach((x) => {
          x.data = prod[x.form];
        });
        return prod;
      })
      .catch((err) => {
        console.log('failed to get product by code ', err);
        return null;
      });
  }
  showForm() {
    console.log(this.form);
  }
  async submit() {
    this.loading = true;
    try {
      const tab = this.tabs[this.currentTabIndex];
      let data = this.formatRequest(this.form.value)[tab.form];
      const isUpdate = this.product && !!this.product[tab.form];
      const dataRes = await (isUpdate
        ? tab.putFunction(data, this.product?.basic?.code).toPromise()
        : tab.postFunction(data, this.product?.basic?.code).toPromise());
      tab.data = dataRes.data;
      this.product = await this.fpS
        .getProductByCode(dataRes.productCode)
        .toPromise();
      this.uS
        .info(
          `${tab.label} data for product code ${this.product?.basic?.code} ${
            this.isEdit ? 'updated' : 'created'
          } successfully`,
          1
        )
        .then((r) => {
          if (this.currentTabIndex == 0 && !isUpdate)
            this.router.navigate(['../edit'], {
              relativeTo: this.route,
              queryParams: { prodCode: this.product?.basic?.code, tab: 1 },
            });
          else if (this.currentTabIndex == this.tabs.length - 1)
            this.router.navigate(['../show'], {
              relativeTo: this.route,
              queryParams: { prodCode: this.product?.basic?.code },
            });
          else this.selectTab(this.currentTabIndex + 1);
        });
    } catch (error) {
      console.log(error);
      this.uS.info(error, 0);
    }
    this.loading = false;
  }
  async submitOld() {
    this.loading = true;
    try {
      let data: IProductCode = this.form.value;
      this.formatRequest(data);
      data.basic.busLine = this.appS.getCurrentSystemMetadata.busline;
      this.uS.copyPayload(data);
      this.product = await (this.product
        ? this.fpS
            .updateProductRequest(this.product.basic?.code, data)
            .toPromise()
        : this.fpS.createProductRequest(data).toPromise());
      this.uS
        .info(
          `Product Code ${this.product?.basic?.code} ${
            this.isEdit ? 'updated' : 'created'
          } successfully`,
          1
        )
        .then((r) =>
          this.router.navigate(['../show'], {
            relativeTo: this.route,
            queryParams: { prodCode: this.product?.basic?.code },
          })
        );
    } catch (error) {
      console.log(error);
      this.uS.info(error, 0);
    }
    this.loading = false;
  }
  formatRequest(data: IProductCode) {
    if (data?.basic?.companiesAllowed)
      data.basic.companiesAllowed = data.basic.companiesAllowed.filter(
        (x) => x.companyCode
      );
    if (data?.basic?.currencyAllowed)
      data.basic.currencyAllowed = data.basic.currencyAllowed.filter(
        (x) => x.validCurrency
      );
    if (data?.basic?.discountsAllowed)
      data.basic.discountsAllowed = data.basic.discountsAllowed.filter(
        (x) => x.code
      );
    if (data?.dependentCovers?.cover)
      data.dependentCovers.cover = data.dependentCovers.cover.filter(
        (x) => x.company
      );
    if (data?.dependentCovers?.permanentSubgroups)
      data.dependentCovers.permanentSubgroups =
        data.dependentCovers.permanentSubgroups.filter((x) => x.sgCompany);
    if (data?.documentations)
      data.documentations = data.documentations.filter((x) => x.event);
    if (data?.defaults?.benefitPaymentMethodAllowed)
      data.defaults.benefitPaymentMethodAllowed =
        data.defaults.benefitPaymentMethodAllowed
          .filter((x: any) => x.code)
          .map((x: any) => x.code);
    return data;
  }
}
const testData: IProductCode = {
  basic: {
    allowCreditNote: false,
    autoConvertQuote: true,
    autoReconcileSuspense: false,
    busLine: 'L',
    closedToNewBusiness: false,
    code: null,
    companiesAllowed: [
      // {
      //   companyCode: 'C10',
      // },
    ],
    currencyAllowed: [
      {
        validCurrency: '00000',
      },
    ],
    discountsAllowed: [
      {
        code: 'M10',
        description: 'test test',
      },
    ],
    debitNoteRule: 'DNR',
    description: 'desc',
    groupBusiness: true,
    insuranceType: 'LB',
    issueDateBasis: 'FID',
    issueDateFactor: 3,
    policyCodeBasis: null,
    policyNumberPrefix: '232',
    policyScreen: null,
    premiumStatementScreen: 'PS',
    productClass: 'DL',
    quotationScreen: null,
    quotationResultScreen: 'ANQ',
    quoteValidityBasis: 'ND',
    quoteValidityPeriod: '67',
    uploadFileBasis: '1',
  },
  defaults: {
    ageCalculationBasis: 1,
    autoSetPhoneNoAsExternalRef: true,
    benefitPaymentMethodAllowed: ['D'],
    coolOffFee: 44,
    coolOffPeriod: 3,
    defaultBranch: 'AJ001',
    maturityBasis: 'A',
    policyTerm: 2,
    premiumFrequency: '2',
    providerCategory: 'NMP',
    providerCode: null,
    referralAgentNo: '23d',
    writingAgentNo: '2',
  },
  dependentCovers: {
    cover: [
      {
        ageAssuredLimit: '23',
        availablePostIssue: false,
        base: false,
        blankSumAssured: false,
        company: 'C1',
        coolOffPeriod: null,
        coverCode: 'AG2',
        description: 'Protection against farm related issues',
        fundingOption: 'M',
        mandatory: false,
        maxNo: '2',
        sumAssuredEqualBaseCoverSumAssured: false,
      },
      {
        ageAssuredLimit: 'wdw',
        availablePostIssue: false,
        base: true,
        blankSumAssured: false,
        company: 'COO1',
        coolOffPeriod: null,
        coverCode: 'CL2',
        description: 'Solution Credit',
        fundingOption: 'F',
        mandatory: false,
        maxNo: '4',
        sumAssuredEqualBaseCoverSumAssured: false,
      },
    ],
    permanentSubgroups: [
      {
        sgAgeAssuredLimit: '33',
        sgAvailablePostIssue: false,
        sgBase: true,
        sgBlankSumAssured: false,
        sgCompany: 'COO1',
        sgCoolOffPeriod: null,
        sgCoverCode: 'PR2',
        sgDescription: 'Third Party',
        sgFundingOption: 'M',
        sgMandatory: false,
        sgMaxNo: '1',
        sgSumAssuredEqualBaseCoverSumAssured: false,
        subgroupName: 'qdeqe',
      },
    ],
  },
  documentations: [
    {
      eventType: 'NB',
      event: 'PAE',
      language: 'EN',
      action: 'TC',
      documentType: '1',
      documentName: 'DOC377',
      networkPath: 'wew',
      condition: 'I',
    },
    {
      eventType: 'NB',
      event: 'TW',
      language: 'EN',
      action: 'TC',
      documentType: '2',
      documentName: null,
      networkPath: '23',
      condition: 'I',
    },
  ],
  policyInfo: {
    agent: true,
    agentNo: true,
    applicationDate: true,
    assured: true,
    beneficiary: false,
    branch: true,
    commencementDate: true,
    deductible: true,
    excess: false,
    lifeAssuredDateOfBirth: true,
    lifeAssuredName: false,
    loanInterestRate: true,
    nextOfKin: true,
    ownerDateOfBirth: false,
    ownerEmail: false,
    ownerName: true,
    ownerNationalInsuranceNo: false,
    ownerPhoneNo: false,
    payeeBankAccount: true,
    pencomNo: false,
    policyTerm: false,
    premiumPaymentFreq: true,
    premiumPaymentMethod: false,
    premiumPaymentTerm: false,
    sumAssured: false,
  },
  quoteInfo: {
    agent: true,
    applicationDate: true,
    assured: false,
    beneficiary: false,
    branch: false,
    commencementDate: false,
    deductible: true,
    excess: true,
    lifeAssuredDateOfBirth: false,
    lifeAssuredName: true,
    loanInterestRate: false,
    nextOfKin: false,
    ownerDateOfBirth: true,
    ownerEmail: true,
    ownerNationalInsuranceNo: true,
    ownerPhoneNo: false,
    pencomNo: true,
    policyTerm: false,
    premiumPaymentFreq: true,
    premiumPaymentMethod: true,
    premiumPaymentTerm: false,
    sumAssured: false,
  },
};
