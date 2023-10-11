import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FindMainAgentService } from '../service/find-main-agent.service';

@Component({
  selector: 'app-view-agent',
  templateUrl: './view-agent.component.html',
  styleUrls: ['./view-agent.component.scss']
})
export class CRMSViewAgentComponent implements OnInit {

  viewAgentForm:any = FormGroup;
  readonlyValue:any;
  policyLength:any;
  policyList:any
  relationshipLength:any;
  quoteList:any;
  pendingPaymentsList:any;
  paymentLength:any

  constructor(public findAgentService: FindMainAgentService) { }

  ngOnInit(): void {
    console.log("Agent Info", this.findAgentService.agentInfo)
    this.viewAgentForm = new FormGroup({
      agenttype: new FormControl(null),
      activedate: new FormControl(null),
      pcp: new FormControl(null),
      agentsalary: new FormControl(null),
      phoneNo: new FormControl(null),
      phoneNo2: new FormControl(null),
      email: new FormControl(null),
      email2: new FormControl(null),
      address: new FormControl(null),
      Branch: new FormControl(null),
      paymentmethod: new FormControl(null),
      hmanager: new FormControl(null),
      license: new FormControl(null),
      contactperson: new FormControl(null),
      crm: new FormControl(null),
      minpayable: new FormControl(null),
      language: new FormControl(null),
      currency: new FormControl(null),
      band: new FormControl(null),
      crt: new FormControl(null)
    })

   this.setFormData(this.findAgentService.agentInfo)
 console.log("formdata",this.viewAgentForm.value)
 /* this.findAgentService.submitPostData(this.viewAgentForm.value).subscribe(res => {
  console.log(res)
}) */
   this.setPolicies()
   this.setPendingQuotes()
   this.setPendingPayments()
  }
  setPolicies(){
    this.findAgentService.getPolicies().subscribe( res => {
      this.policyList = res;
      this.policyLength = this.policyList.length
      console.log("policy Info",this.policyLength)
      console.log("policy Info",res)
    })
  }
  setPendingQuotes(){
    this.findAgentService.getPendingQuotes().subscribe( res => {
      this.quoteList = res;
      this.quoteList = this.quoteList.length
      console.log("quotes Info",res)
    })
  }
  setPendingPayments(){
    this.findAgentService.getPendingPayments().subscribe( res => {
      this.pendingPaymentsList = res;
      this.paymentLength = this.pendingPaymentsList.length
      console.log("payment Info",res)
    })
  }

  onSubmit(){
    console.log("formdata",this.viewAgentForm.value)
 /*    this.findClientService.ownerInfo(this.viewClientForm.value); */
    this.setEditFormData(this.viewAgentForm.value)
  }
  onNext(){
    console.log("formdata",this.viewAgentForm.value)
   /*  this.findClientService.ownerInfo(this.viewClientForm.value); */
  }


    onEdit(value:any){
      this.readonlyValue = value
      console.log("formdata",this.viewAgentForm.value)
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
      this.viewAgentForm.patchValue({
        agenttype: data?.Agenttype,
      activedate: data?.ActiveDate,
      pcp: data?.ProductClassPermissions,
      agentsalary: data?.Agentsalarystatus,
      phoneNo: data?.Phonenumber1,
      phoneNo2: data?.Phonenumber2,
      email: data?.Email,
      email2: data?.Email2,
      Branch: data?.Branch,
      paymentmethod: data?.PaymentMethod,
      hmanager: data?.HierachyManager,
      license: data?.licencecertificate,
      contactperson: data?.Contactperson,
      crm: data?.CRM_CLIENT_NO,
      minpayable: data?.MinCommPayable,
      language: data?.Language,
      currency: data?.Currency,
      band: data?.Band,
      crt: data?.CommisionRatetax
      })
    }

    setEditFormData(data:any){
      this.viewAgentForm.patchValue({
        agenttype: data?.agenttype,
      activedate: data?.activedate,
      pcp: data?.pcp,
      agentsalary: data?.agentsalary,
      phoneNo: data?.phoneNo,
      phoneNo2: data?.phoneNo2,
      email: data?.email,
      email2: data?.email2,
      Branch: data?.Branch,
      paymentmethod: data?.paymentmethod,
      hmanager: data?.hmanager,
      license: data?.license,
      contactperson: data?.contactperson,
      crm: data?.crm,
      minpayable: data?.minpayable,
      language: data?.language,
      currency: data?.currency,
      band: data?.band,
      crt: data?.crt

      })
    }
}


