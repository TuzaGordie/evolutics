import { Component, OnInit } from '@angular/core';
import { FindProductService } from '../../service/find-product.service';
import { FormArray, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-create-product-code',
  templateUrl: './create-product-code.component.html',
  styleUrls: ['./create-product-code.component.scss']
})
export class CRMSCreateProductCodeComponent implements OnInit {
  productForm:any=FormGroup;
  policyCodeBasisList:any=[];
  insuranceTypesList:any=[];
  issueDateBasisList:any=[];
  debitNoteRulesList:any=[];
  currenciesList:any=[];
  companiesList:any=[];
  quoteValidityBasisList:any=[];
  coversList:any=[];
  fundingOptionsList:any=[];
  frequencyTableList:any=[];
  maturityBasisList:any=[];
  premiumStatementList:any=[];
  branchList: any=[];
  ageCalcList:any=[];
  productClassList: any;
  productFormList: any;
  constructor(public findProductService : FindProductService, private fb:FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.addNewBasicCurrencyRow();
    this.addNewProviderRow();
    this.addNewPaymentMethodRow();
    this.addNewProductLevelRow();
    this.addNewSubgroupCoverRow();
    this.addNewCoverRow();
    this.addNewBasicCompanyRow();
    this.setPolicyCodeBasisList();
    this.setInsuranceTypesList();
    this.setIssueDateBasisList();
    this.setDebitNoteRulesList();
    this.setCurrenciesList();
    this.setCompanyList();
    this.setQuoteValidityBasisList();
    this.setCoversList();
    this.setFundingOptionsList();
    this.setFrequencyPaymentList();
    this.setMaturityBasisList();
    this.setPremiumStatementList();
   
  }

  setProductClassList(){
    this.findProductService.getCodeList('PRODUCT_CLASS').subscribe( res => {
      this.productClassList = res;
      console.log("Product Class Info",res)
    })
  }



  setPolicyCodeBasisList(){
    this.findProductService.getPolicyBasis('POLICY_CODE_BASIS').subscribe( res => {
      this.policyCodeBasisList = res;
      console.log("Policy Code Basis list",res)
    })
  }
  setInsuranceTypesList(){
    this.findProductService.getInsuranceType('INS_TYPE').subscribe( res => {
      this.insuranceTypesList = res;
      console.log("Insurance Types list",res)
    })
  }
  setIssueDateBasisList(){
    this.findProductService.getCodeList('ISSUE_DATE_BASIS').subscribe( res => {
      this.issueDateBasisList = res;
      console.log("Issue Date Basis list",res)
    })
  }
  setDebitNoteRulesList(){
    this.findProductService.getCodeList('DEBIT_NOTE_RULE').subscribe( res => {
      this.debitNoteRulesList = res;
      console.log("Debit note rules list",res)
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
  setQuoteValidityBasisList(){
    this.findProductService.getCodeList('QUOTE_VALIDITY_BASIS').subscribe( res => {
      this.quoteValidityBasisList = res;
      console.log("Quote validity Basis Info",res)
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
  setFrequencyPaymentList(){
    this.findProductService.getCodeList('FREQUENCY').subscribe( res => {
      this.frequencyTableList = res;
      console.log("Frequency Payment list",res)
    })
  }
  setMaturityBasisList(){
    this.findProductService.getCodeList('MAT_BASIS').subscribe( res => {
      this.maturityBasisList = res;
      console.log("Maturity Basis list",res)
    })
  }
  setPremiumStatementList(){
    this.findProductService.getPremiumStatementList().subscribe( res => {
      this.premiumStatementList = res;
      console.log("Premium statement list",res)
    })
  }

  createForm(){
    this.productForm = this.fb.group({
      productCode: [''],
      productDescription: [''],
      productClass: [''],
      issueDateBasis: [''],
      insuranceType: [''],
      issueDateFactor: [''],     
      currencyAllowedArray: this.fb.array([]),
      companyAllowedArray: this.fb.array([]),
      debitNoteRule: [''],
      quoteValidityBasis: [''],
      policyNumberPrefix: [''],
      quoteValidityPeriod: [''],
      daysBeforeCancelPolicy: [''],
      premiumStatementScreen: [''],
      quotationScreen: [''],
      policyScreen: [''],
      uploadFileBasis: [''],
      groupBusiness: [''],
      closeToNewBusiness: [''],

      coverArray: this.fb.array([]),
      subgroupCoverArray:this.fb.array([]),
      subGroupNo: [''],
      subGroupName: [''],

      productLevelArray: this.fb.array([]),

      quotationValidityBasis: [''],
      quotationValidityPeriod: [''],
      ownerDateOfBirth: [''],
      lifeAssuredDateOfBirth: [''],
      loanInterestRate: [''],
      ownerEmail: [''],
      lifeAssuredName: [''],
      policyTerm: [''],
      ownerPhoneNumber: [''],
      ownerNationalInsuranceNo: [''],

      policyOwnerName: [''],
      policyOwnerDateOfBirth: [''],
      policyLifeAssuredName: [''],
      policyLifeAssuredDateOfBirth: [''],
      policyLoanInterestRate: [''],
      policyOwnerEmail: [''],
      policyOwnerNationalInsuranceNo: [''],
      policyPayeeBankAccount: [''],
      policyAgentNo: [''],
      policyPolicyTerm: [''],
      policyOwnerPhoneNo: [''],

      defaultAllSalesToBranch: [''],
      ageCalculationBasis: [''],
      writingAgentNo: [''],
      autoSetPhoneNo: [''],
      referralAgentNo: [''],
      coolingOffPeriod: [''],
      maturityBasis: [''],
      coolingOffExerciseFee: [''],
      defaultPaymentMethodArray: this.fb.array([]),
      defaultProviderArray: this.fb.array([]),
      uploadMemberFileFormat: [''],
      defaultPolicyTerm: [''],
      premiumFrequency: [''],

    })
  }

  companyAllowedArray:any=[];
  addNewBasicCompanyRow(){
    this.companyAllowedArray = this.productForm.get('companyAllowedArray') as FormArray;
    const lessonForm = this.fb.group({
      companyAllowed: ['']
    })
    this.companyAllowedArray.push(lessonForm);
	}

  currencyAllowedArray:any=[];
  addNewBasicCurrencyRow(){
    this.currencyAllowedArray = this.productForm.get('currencyAllowedArray') as FormArray;
    const lessonForm = this.fb.group({
      currencyAllowed: ['']
    })
    this.currencyAllowedArray.push(lessonForm);
	}

  coverArray:any=[];
  addNewCoverRow(){
    this.coverArray = this.productForm.get('coverArray') as FormArray;
    const lessonForm = this.fb.group({
      businessLine:[''],coverCode:[''],mandatory:[''],
      availablePostIssue:[''],maxNo:[''],ageAssuredLimit:[''],
      fundingOption:[''],sumAssuredBaseCover:[''],blankSumAssured:[''],
    })
    this.coverArray.push(lessonForm);
	}

  subgroupCoverArray:any=[];
  addNewSubgroupCoverRow(){
    this.subgroupCoverArray = this.productForm.get('subgroupCoverArray') as FormArray;
    const lessonForm = this.fb.group({
      businessLine:[''],coverCode:[''],mandatory:[''],
      availablePostIssue:[''],maxNo:[''],ageAssuredLimit:[''],
      fundingOption:[''],sumAssuredBaseCover:[''],blankSumAssured:[''],
    })
    this.subgroupCoverArray.push(lessonForm);
	}

  productLevelArray:any=[];
  addNewProductLevelRow(){
    this.productLevelArray = this.productForm.get('productLevelArray') as FormArray;
    const lessonForm = this.fb.group({
      eventType:[''],event:[''],language:[''],
      action:[''],documentType:[''],documentName:[''],
      networkPath:[''],condition:['']
    })
    this.productLevelArray.push(lessonForm);
	}

  defaultPaymentMethodArray:any=[];
  addNewPaymentMethodRow(){
    this.defaultPaymentMethodArray = this.productForm.get('defaultPaymentMethodArray') as FormArray;
    const lessonForm = this.fb.group({
      benefitPaymentMethodAllowed:['']
    })
    this.defaultPaymentMethodArray.push(lessonForm);
	}
  defaultProviderArray:any=[];
  addNewProviderRow(){
    this.defaultProviderArray = this.productForm.get('defaultProviderArray') as FormArray;
    const lessonForm = this.fb.group({
      providerCategory:[''],providerCode:['']
    })
    this.defaultProviderArray.push(lessonForm);
	}

  onSubmit(){    
    this.findProductService.submitProductCode(this.productForm.value).subscribe( res => {
      this.productFormList = res;
      console.log("post", res)
  })}

  

  setBranchList(){
    this.findProductService.getBranch("").subscribe( res => {
      this.branchList = res;
      console.log("branch title", res)
    })
  }
}
