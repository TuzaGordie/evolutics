import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faSave } from '@fortawesome/free-solid-svg-icons';
export interface ITable{
  SLA: string,
  paymentID:number,
  claimNo: string,
  policyNo:string,
  initialEstimate:number,
  adjustments:number,
  finalAmount:number,
  currency:string,
  created:string,
  createdUser:string,
  lastModifiedUser:string,
  paymentStatus:string,
  authorize:boolean,
  decline:boolean

}
@Component({
  selector: 'app-authorize-payment-outward',
  templateUrl: './authorize-payment-outward.component.html',
  styleUrls: ['./authorize-payment-outward.component.scss']
})
export class AuthorisePaymentOutwardComponent implements OnInit {
  
  faSave = faSave
thead = ['SLA Level',"Payment ID","Claim No","Policy No","Initial Estimate","Adjustments","Final Amount","Currency","Created","Created User","Updated By","Payment Status","Authorize","Decline"]
tdata: ITable[] = [
  {
    SLA: 'red',
    paymentID: 1234,
    claimNo: '5678',
    policyNo:'LSE210001',
    initialEstimate:250000,
    adjustments:20000,
    finalAmount:270000,
    currency:'NGN',
    created:'1',
    createdUser:'JOHN',
    lastModifiedUser:'KENEDY',
    paymentStatus:'SUR',
    authorize:false,
    decline:false
  },
  {
    SLA: 'red',
    paymentID: 1234,
    claimNo: '5678',
    policyNo:'LPR210001',
    initialEstimate:250000,
    adjustments:20000,
    finalAmount:270000,
    currency:'NGN',
    created:'1',
    createdUser:'JOHN',
    lastModifiedUser:'KENEDY',
    paymentStatus:'SUR',
    authorize:false,
    decline:false
  },
]
form = this.fb.group({
  showAll:[''],
  paymentStatus:[''],
  slaLevel:[''],
  company:[''],
  currency:[''],
  authAll:[''],
  decAll:[''],

})
  constructor(private fb:FormBuilder, private route:Router) { }

  ngOnInit(): void {
  }
check(e:string):void{
  this.route.navigate(['/life/policy-desk/view-policy',e])

}
}
