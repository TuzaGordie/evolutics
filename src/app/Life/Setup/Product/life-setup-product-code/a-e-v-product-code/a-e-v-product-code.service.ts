import { Injectable } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { configForms } from 'src/app/Shared/models/form.class';
import { EPageType } from 'src/app/Shared/models/index.model';
import { IProductCode } from '../product-code-extras/product-code.interface';
import { ProductService } from '../product-code-extras/product.service';

@Injectable({
  providedIn: 'root'
})
export class AEVProductCodeService {
  loading: boolean;
  form = new FormGroup({
    basic: new FormGroup({
      allowCreditNote: configForms.boolean(),
      autoConvertQuote: configForms.boolean(),
      autoReconcileSuspense: configForms.boolean(),
      // busLine: configForms.default(this.appS.getCurrentSystemMetadata.busline),
      closedToNewBusiness: configForms.boolean(),
      code: configForms.default(),
      companiesAllowed: new FormArray([]),
      currencyAllowed: new FormArray([]),
      debitNoteRule: configForms.default(),
      description: configForms.default(),
      groupBusiness: configForms.boolean(),
      insuranceType: configForms.default(),
      issueDateBasis: configForms.default(),
      issueDateFactor: configForms.number(),
      policyCodeBasis: configForms.default(),
      policyNumberPrefix: configForms.default(),
      policyScreen: configForms.default(),
      premiumStatementScreen: configForms.default(),
      productClass: configForms.default(),
      quotationScreen: configForms.default(),
      quotationResultScreen: configForms.default(),
      quoteResultScreen: configForms.default(),
      quoteValidityBasis: configForms.default(),
      quoteValidityPeriod: configForms.default(),
      uploadFileBasis: configForms.default(),
    }),
    defaults: new FormGroup({
      ageCalculationBasis: configForms.number(),
      autoSetPhoneNoAsExternalRef: configForms.boolean(),
      benefitPaymentMethodAllowed: new FormArray([]),
      coolOffFee: configForms.number(),
      coolOffPeriod: configForms.number(),
      defaultBranch: configForms.default(),
      maturityBasis: configForms.default(),
      policyTerm: configForms.number(),
      premiumFrequency: configForms.default(),
      providerCategory: configForms.default(),
      providerCode: configForms.default(),
      referralAgentNo: configForms.default(),
      writingAgentNo: configForms.default(),
    }),
    dependentCovers: new FormGroup({
      cover: new FormArray([]),
      permanentSubgroups: new FormArray([]),
    }),
    documentations: new FormArray([]),
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
    quoteInfo: new FormGroup({
      agent: configForms.boolean(),
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
      ownerNationalInsuranceNo: configForms.boolean(),
      ownerPhoneNo: configForms.boolean(),
      pencomNo: configForms.boolean(),
      policyTerm: configForms.boolean(),
      premiumPaymentFreq: configForms.boolean(),
      premiumPaymentMethod: configForms.boolean(),
      premiumPaymentTerm: configForms.boolean(),
      sumAssured: configForms.boolean(),
    }),
  });
  product: IProductCode;
  type: EPageType;
  prodCode: string; 

  constructor(
    public pS: ProductService,) { }
 
  formatRequest(data: IProductCode) {
    if (data?.basic?.companiesAllowed)
      data.basic.companiesAllowed = data.basic.companiesAllowed.filter(
        (x) => x.companyCode
      );
    if (data?.basic?.currencyAllowed)
      data.basic.currencyAllowed = data.basic.currencyAllowed.filter(
        (x) => x.validCurrency
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
  }
  refresh(){
    this.form.reset();

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
  patchForm(value){
    this.form?.patchValue(this.product);
  } 
  getProductByCode(prodCode) {
    return this.pS
      .getProductByCode(prodCode)
      .toPromise()
      .then((prod) => { 
        return prod;
      })
      .catch((err) => {
        console.log('failed to get product by code ', err);
        return null;
      });
  }
}
