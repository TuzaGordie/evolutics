import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FindClientService } from '../service/find-client.service';

@Component({
  selector: 'app-view-crm-client',
  templateUrl: './view-crm-client.component.html',
  styleUrls: ['./view-crm-client.component.scss']
})
export class CRMViewClientComponent implements OnInit {

  viewClientForm:any = FormGroup;
  readonlyValue:any;
  policyLength:any;
  relationshipLength:any;
  quoteList:any;
  pendingPaymentsList:any;
  paymentLength:any

  constructor(public findClientService: FindClientService) { }

  ngOnInit(): void {
    console.log("Client Info", this.findClientService.clientInfo)
    this.viewClientForm = new FormGroup({
      fullName: new FormControl(null),
      firstName: new FormControl(null),
      middleName: new FormControl(null),
      surname: new FormControl(null),
      gender: new FormControl(null),
      phoneNo: new FormControl(null),
      phoneNo2: new FormControl(null),
      email: new FormControl(null),
      email2: new FormControl(null),
      address: new FormControl(null),
      dob: new FormControl(null),
      category: new FormControl(null),
      kyc: new FormControl(null),
      idNo: new FormControl(null),
      language: new FormControl(null),
      employer: new FormControl(null),
      crm: new FormControl(null),
      bankNo: new FormControl(null),
      dateCreated: new FormControl(null),
      communication: new FormControl(null),
      maritalStatus: new FormControl(null),
      band: new FormControl(null),
      groupNo: new FormControl(null),
      clv: new FormControl(null),
      socialmedia: new FormControl(null),
      providerCode: new FormControl(null),
      enroleeNo: new FormControl(null),
      suffix: new FormControl(null)
    })

   this.setFormData(this.findClientService.clientInfo)
 console.log("formdata",this.viewClientForm.value)
/*  this.findClientService.submitPostData(this.viewClientForm.value).subscribe(res => {
   console.log(res)
 }) */
this.setPolicies()
  this.setRelationship()
  this.setPendingQuotes()
  this.setPendingPayments()
  }
  setPolicies(){
    this.findClientService.getPolicies().subscribe( res => {
      const policyList:any = res;
      this.policyLength = policyList.length
      console.log("policy Info",this.policyLength)
    })
  }
  setRelationship(){
    this.findClientService.getRelationship().subscribe( res => {
      const relationList:any = res;
      this.relationshipLength = relationList.length
      console.log("relationship Info",this.relationshipLength)
    })
  }
  setPendingQuotes(){
    this.findClientService.getPendingQuotes().subscribe( res => {
      this.quoteList = res;
      this.quoteList = this.quoteList.length
      console.log("quotes Info",res)
    })
  }
  setPendingPayments(){
    this.findClientService.getPendingPayments().subscribe( res => {
      this.pendingPaymentsList = res;
      this.paymentLength = this.pendingPaymentsList.length
      console.log("payment Info",res)
    })
  }
  onSubmit(){
    console.log("formdata",this.viewClientForm.value)
 /*    this.findClientService.ownerInfo(this.viewClientForm.value); */
    this.setEditFormData(this.viewClientForm.value)
  }
  onNext(){
    console.log("formdata",this.viewClientForm.value)
   /*  this.findClientService.ownerInfo(this.viewClientForm.value); */
  }
  

    onEdit(value:any){
      this.readonlyValue = value
      console.log("formdata",this.viewClientForm.value)
    }
    checkReadonly(value:any){
   if(value == this.readonlyValue){
     return false;
   }
   else{
     return true;
   }
    }
    checkHighlight(value:any){
      if(value == this.readonlyValue){
        return true;
      }
      else{
        return false;
      }
    }
    setFormData(data:any){
      this.viewClientForm.patchValue({
        fullName: data?.FULL_NAME,
      firstName: data?.FIRST_NAME,
      middleName: data?.MIDDLE_NAME,
      surname: data?.SURNAME,
      gender: data?.GENDER,
      phoneNo: data?.PHONE_NO_1,
      phoneNo2: data?.PHONE_NO_1,
      email: data?.EMAIL_ADD_1,
      email2: data?.EMAIL_ADD_1,
      address: data?.address,
      dob: data?.Dateofbirth,
      category: data?.Category,
      kyc: data?.KYC,
      idNo: data?.IDnumber,
      language: data?.Language,
      employer: data?.Employer,
      crm: data?.CRM_CLIENT_NO,
      bankNo: data?.BankNo,
      dateCreated: data?.DateCreated,
      communication: data?.EMAIL_ADD_1,
      maritalStatus: data?.Maritalstatus,
      band: data?.Band,
      groupNo: data?.GroupNo,
      clv: data?.Clv,
      socialmedia: data?.SocialMedia,
      providerCode: data?.PROVIDER_NO,
      enroleeNo: data?.REL_ENROLEE_NO,
      suffix: data?.suffix
      })
    }

    setEditFormData(data:any){
      this.viewClientForm.patchValue({
        fullName: data?.fullName,
      firstName: data?.firstName,
      middleName: data?.middleName,
      surname: data?.surname,
      gender: data?.gender,
      phoneNo: data?.phoneNo,
      phoneNo2: data?.phoneNo2,
      email: data?.email,
      email2: data?.email2,
      address: data?.address,
      dob: data?.dob,
      category: data?.category,
      /* kyc: data?.kyc, */
      idNo: data?.idNo,
      language: data?.language,
      employer: data?.employer,
      crm: data?.crm,
      /* bankNo: data?.bankNo, */
      dateCreated: data?.dateCreated,
      communication: data?.communication,
      maritalStatus: data?.maritalStatus,
      band: data?.band,
      groupNo: data?.groupNo,
      clv: data?.clv,
      socialmedia: data?.socialmedia,
      providerCode: data?.providerCode,
      enroleeNo: data?.enroleeNo,
      suffix: data?.suffix
        
      })
    }

   
}

