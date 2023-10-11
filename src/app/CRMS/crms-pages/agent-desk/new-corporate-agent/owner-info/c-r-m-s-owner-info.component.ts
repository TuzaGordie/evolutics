import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FindClientService } from 'src/app/Life/client-desk/service/find-client.service';
import { CorporateAgentService } from '../service/corporate-agent.service';

@Component({
  selector: 'app-owner-info',
  templateUrl: './owner-info.component.html',
  styleUrls: ['./owner-info.component.scss']
})
export class CRMSOwnerInfoComponent implements OnInit {

  ownerForm: any = FormGroup;
  /*  checkReadonly:string = "" */
  readonlyValue: any;
  policyLength: any
  relationshipLength: any

  constructor(public corporateService: CorporateAgentService, public findClientService: FindClientService) {
  }

  ngOnInit(): void {
    //console.log("corporate agent", this.corporateService.corporateClientInfo)
    //console.log("corporate agent Client Number", this.corporateService.corporateClientInfo.CLIENT_NO)
    this.ownerForm = new FormGroup({
      fullName: new FormControl(null),
      redgNo: new FormControl(null),
      employeNo: new FormControl(null),
      financial: new FormControl(null),
      category: new FormControl(null),
      kyc: new FormControl(null),
      band: new FormControl(null),
      crm: new FormControl(null),
      dob: new FormControl(null),
      firstName: new FormControl(null),
      idNo: new FormControl(null),
      enroleeNo: new FormControl(null),
      middleName: new FormControl(null),
      email2: new FormControl(null),
      dateCreated: new FormControl(null),
      suffix: new FormControl(null),
      maritalStatus: new FormControl(null),
      gender: new FormControl(null),
      employer: new FormControl(null),
      surname: new FormControl(null),
      sector: new FormControl(null),
      phoneNo: new FormControl(null),
      phoneNo2: new FormControl(null),
      email: new FormControl(null),
      website: new FormControl(null),
      address: new FormControl(null),
      crmid: new FormControl(null),
      clientCategory: new FormControl(null),
      language: new FormControl(null),
      date: new FormControl(null),
      state: new FormControl(null),
      providerCategory: new FormControl(null),
      brand: new FormControl(null),
      bankNo: new FormControl(null),
      clv: new FormControl(null),
      communication: new FormControl(null),
      subCategory: new FormControl(null),
      groups: new FormControl(null),
      groupNo: new FormControl(null),
      socialmedia: new FormControl(null),
      providerCode: new FormControl(null)
    })
 
    console.log("formdata", this.ownerForm.value)
    this.setPolicies()
    this.setRelationship()
  }

  /* Find length */

  setPolicies() {
    this.findClientService.getPolicies().subscribe(res => {
      const policyList: any = res;
      this.policyLength = policyList.length
      console.log("policy Info", this.policyLength)
    })
  }

  setRelationship() {
    this.findClientService.getRelationship().subscribe(res => {
      const relationList: any = res;
      this.relationshipLength = relationList.length
      console.log("relationship Info", this.relationshipLength)
    })
  }

  onNext() {
    console.log("formdata", this.ownerForm.value)
    this.corporateService.ownerInfo(this.ownerForm.value);
  }

  onSubmit() {
    console.log("formdata", this.ownerForm.value)
    this.corporateService.ownerInfo(this.ownerForm.value);
    this.setEditFormData(this.ownerForm.value)
  }

  changeTab(tab: any) {
    console.log("tab")
    this.corporateService.tabChange(tab)
  }

  onEdit(value: any) {
    this.readonlyValue = value
    console.log("formdata", this.ownerForm.value)
  }

  checkReadonly(value: any) {
    if (value == this.readonlyValue) {
      return false;
    } else {
      return true;
    }
  }

  checkHighlight(value: any) {
    if (value == this.readonlyValue) {
      return true;
    } else {
      return false;
    }
  }

  setFormData(data: any) {
    this.ownerForm.patchValue({
      fullName: data?.FULL_NAME,
      redgNo: data?.COY_REDG_NO,
      employeNo: data?.Employer,
      financial: "",
      sector: "",
      phoneNo: data?.PHONE_NO_1,
      phoneNo2: data?.PHONE_NO_1,
      email: data?.EMAIL_ADD_1,
      website: "",
      address: data?.address,
      crmid: data?.CRM_CLIENT_NO,
      clientCategory: data?.Category,
      language: data?.LANGUAGE,
      date: data?.DateCreated,
      state: "",
      providerCategory: "",
      brand: "",
      bankNo: data?.BankNo,
      clv: data?.Clv,
      communication: data?.Communication,
      subCategory: "",
      groups: "",
      groupNo: data?.GroupNo,
      socialmedia: data?.SocialMedia,
      providerCode: data?.PROVIDER_NO
    })
  }

  setEditFormData(data: any) {
    this.ownerForm.patchValue({
      fullName: data?.fullName,
      redgNo: data?.redgNo,
      employeNo: data?.employeNo,
      financial: data?.financial,
      sector: data?.sector,
      phoneNo: data?.phoneNo,
      phoneNo2: data?.phoneNo2,
      email: data?.email,
      website: data?.website,
      address: data?.address,
      crmid: data?.crmid,
      clientCategory: data?.clientCategory,
      language: data?.language,
      date: data?.date,
      state: data?.state,
      providerCategory: data?.providerCategory,
      brand: data?.brand,
      bankNo: data?.bankNo,
      clv: data?.redclvgNo,
      communication: data?.communication,
      subCategory: data?.subCategory,
      groups: data?.groups,
      groupNo: data?.regroupNodgNo,
      socialmedia: data?.socialmedia,
      providerCode: data?.providerCode
    })
  }
}
