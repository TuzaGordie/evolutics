import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FindPolicyService } from '../service/find-policy.service';

@Component({
  selector: 'app-view-policy',
  templateUrl: './view-policy.component.html',
  styleUrls: ['./view-policy.component.scss']
})
export class ViewPolicyComponent implements OnInit {

  viewPolicyForm: any = FormGroup;
  readonlyValue: any;
  policyInfoList:any = []

  constructor(public findPolicyService: FindPolicyService) { }

  ngOnInit(): void {
    console.log("Policy Info", this.findPolicyService.policyInfo)
    this.viewPolicyForm = new FormGroup({
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

    this.setFormData(this.findPolicyService.policyInfo)
    console.log("formdata", this.viewPolicyForm.value)
    /*  this.ownerForm.patchValue(this.corporateService.corporatePolicyInfo) */
  }

  onSubmit() {
    console.log("formdata", this.viewPolicyForm.value)
    /*    this.findPolicyService.ownerInfo(this.viewPolicyForm.value); */
    this.setEditFormData(this.viewPolicyForm.value)
  }
  onNext() {
    console.log("formdata", this.viewPolicyForm.value)
    /*  this.findPolicyService.ownerInfo(this.viewPolicyForm.value); */
  }


  onEdit(value: any) {
    this.readonlyValue = value
    console.log("formdata", this.viewPolicyForm.value)
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
    this.viewPolicyForm.patchValue({
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
    this.viewPolicyForm.patchValue({
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

  setPolicyInfo(){
    this.findPolicyService.getPolicyList2().subscribe( res => {
      this.policyInfoList = res;
      console.log("policy Info",res)
    })
  }
}

