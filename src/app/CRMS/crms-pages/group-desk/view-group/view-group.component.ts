import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FindGroupService } from '../service/find-group.service';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss']
})
export class ViewGroupComponent implements OnInit {

  viewGroupForm: any = FormGroup;
  readonlyValue: any;
  groupInfoList:any = []

  constructor(public findGroupService: FindGroupService) { }

  ngOnInit(): void {
    console.log("Group Info", this.findGroupService.groupInfo)
    this.viewGroupForm = new FormGroup({
      fullName: new FormControl(null),
      expiryDate: new FormControl(null),
      groupTerm: new FormControl(null),
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

    this.setFormData(this.findGroupService.groupInfo)
    console.log("formdata", this.viewGroupForm.value)
    /*  this.ownerForm.patchValue(this.corporateService.corporateGroupInfo) */
  }

  onSubmit() {
    console.log("formdata", this.viewGroupForm.value)
    /*    this.findGroupService.ownerInfo(this.viewGroupForm.value); */
    this.setEditFormData(this.viewGroupForm.value)
  }
  onNext() {
    console.log("formdata", this.viewGroupForm.value)
    /*  this.findGroupService.ownerInfo(this.viewGroupForm.value); */
  }


  onEdit(value: any) {
    this.readonlyValue = value
    console.log("formdata", this.viewGroupForm.value)
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
    this.viewGroupForm.patchValue({
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
      groupTerm: data?.POLICY_TERM,
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
    this.viewGroupForm.patchValue({
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
      groupTerm: data?.POLICY_TERM,
      livesCovered: data?.NO_OF_LIVES_COVERED,
      sumAtRisk: data?.TOTAL_SUM_AT_RISK,
      branch: data?.BRANCH,
      uncoveredExposure: data?.UNCOVERED_EXPOSURE,
      jointOwnerNo: data?.JOINT_OWNER_NO,
      ownerClientNo: data?.OWNER_CLIENT_NO,
      referrerName: data?.REFERRER_NAME






    })
  }

  setGroupInfo(){
    this.findGroupService.getGroupList2().subscribe( res => {
      this.groupInfoList = res;
      console.log("group Info",res)
    })
  }
}

