import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FindQuotationService } from '../service/find-quotation.service';

@Component({
  selector: 'app-view-quotation',
  templateUrl: './view-quotation.component.html',
  styleUrls: ['./view-quotation.component.scss']
})
export class ViewQuotationComponent implements OnInit {

  viewQuotationForm: any = FormGroup;
  readonlyValue: any;
  quotationInfoList:any = []

  constructor(public findQuotationService: FindQuotationService) { }

  ngOnInit(): void {
    console.log("Quotation Info", this.findQuotationService.quotationInfo)
    this.viewQuotationForm = new FormGroup({
      fullName: new FormControl(null),
      expiryDate: new FormControl(null),
      policyTerm: new FormControl(null),
      quoteStatus: new FormControl(null),
      quoteValidity: new FormControl(null),
      createdBy: new FormControl(null),
      currencyType: new FormControl(null),
      annualisedPayment: new FormControl(null),
      jointOwnerName: new FormControl(null),
      premTermPayment: new FormControl(null),
      livesCovered: new FormControl(null), 
      sumAtRisk: new FormControl(null), 
      branch: new FormControl(null), 
      uncoveredExposure: new FormControl(null), 
      jointOwnerNo: new FormControl(null), 
      ownerClientNo: new FormControl(null), 
      referrerName: new FormControl(null),
      coverCommence: new FormControl(null)
    })

    this.setFormData(this.findQuotationService.quotationInfo)
    console.log("formdata", this.viewQuotationForm.value)
    /*  this.ownerForm.patchValue(this.corporateService.corporateQuotationInfo) */
  }

  onSubmit() {
    console.log("formdata", this.viewQuotationForm.value)
    /*    this.findQuotationService.ownerInfo(this.viewQuotationForm.value); */
    this.setEditFormData(this.viewQuotationForm.value)
  }
  onNext() {
    console.log("formdata", this.viewQuotationForm.value)
    /*  this.findQuotationService.ownerInfo(this.viewQuotationForm.value); */
  }


  onEdit(value: any) {
    this.readonlyValue = value
    console.log("formdata", this.viewQuotationForm.value)
  }
  checkReadonly(value: any) {
    if (value == this.readonlyValue) {
      return false;
    }
    else {
      return true;
    }
  }
  checkHighlight(value: any) {
    if (value == this.readonlyValue) {
      return true;
    }
    else {
      return false;
    }
  }
  setFormData(data: any) {
    this.viewQuotationForm.patchValue({
      fullName: data?.OWNER_NAME,
      expiryDate: data?.CREATED_DATE_TO,
      coverCommence: data?.CREATED_DATE_FROM,
      quoteStatus: data?.STATUS,
      quoteValidity: data?.INIT_QUOTE_VALIDITY,
      createdBy: data?.CREATED_BY,
      currencyType: data?.CURRENCY,
      annualisedPayment: data?.ANNUALISED_PAYMENTS,
      jointOwnerName: data?.JOINT_OWNER_NAME,
      premTermPayment: data?.PREM_PAYMENT_TERM,
      policyTerm: data?.POLICY_TERM,
      livesCovered: data?.NO_OF_LIVES_COVERED,
      sumAtRisk: data?.TOTAL_SUM_AT_RISK,
      branch: data?.BRANCH,
      uncoveredExposure: data?.UNCOVERED_EXPOSURE,
      jointOwnerNo: data?.JOINT_OWNER_NO,
      ownerClientNo: data?.OWNER_CLIENT_NO,
      referrerName: data?.REFERRER_NAME





    })
  }

  setEditFormData(data: any) {
    this.viewQuotationForm.patchValue({
      fullName: data?.OWNER_NAME,
      expiryDate: data?.CREATED_DATE_TO,
      coverCommence: data?.CREATED_DATE_FROM,
      quoteStatus: data?.STATUS,
      quoteValidity: data?.INIT_QUOTE_VALIDITY,
      createdBy: data?.CREATED_BY,
      currencyType: data?.CURRENCY,
      annualisedPayment: data?.ANNUALISED_PAYMENTS,
      jointOwnerName: data?.JOINT_OWNER_NAME,
      premTermPayment: data?.PREM_PAYMENT_TERM,
      policyTerm: data?.POLICY_TERM,
      livesCovered: data?.NO_OF_LIVES_COVERED,
      sumAtRisk: data?.TOTAL_SUM_AT_RISK,
      branch: data?.BRANCH,
      uncoveredExposure: data?.UNCOVERED_EXPOSURE,
      jointOwnerNo: data?.JOINT_OWNER_NO,
      ownerClientNo: data?.OWNER_CLIENT_NO,
      referrerName: data?.REFERRER_NAME






    })
  }

  setQuotationInfo(){
    this.findQuotationService.getQuotationList2().subscribe( res => {
      this.quotationInfoList = res;
      console.log("quotation Info",res)
    })
  }
}

