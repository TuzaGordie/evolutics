import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { faSave,faArrowLeft } from '@fortawesome/free-solid-svg-icons';
export interface ITable{
  transNo:number,
  absAmt: string,
  policyNo:string,
  transType:number,
  account:number,
  account2:number,
  currency:string,
  created:string,
  createdUser:string,
  lastModifiedUser:string,
  paymentStatus:string,
  authorize:boolean,
  decline:boolean

}

@Component({
  selector: 'app-policy-accounting',
  templateUrl: './policy-accounting.component.html',
  styleUrls: ['./policy-accounting.component.scss']
})
export class PolicyAccountingComponent implements OnInit {
  faSave = faSave
  faArrowLeft = faArrowLeft
  styleCheck = 30
  policyNo:string
  currency:string
  absAmt:string
  created:string
  createdAt:string
  transNo:number
  margin = 'auto'
  data:any
  thead = ['Trans No',"Absolute Amount","Policy No","Trans Type","Account","Account","Currency","Created","Created User","Updated By","Payment Status","Authorize","Decline"]
  ths = ['Account Code','Ledger Code', 'Cover No', 'Amount']

  tdata: ITable[] = [
    { 
      transNo: 1234,
      absAmt: '5678',
      policyNo:'LSE210001',
      transType:250000,
      account:20000,
      account2:270000,
      currency:'NGN',
      created:'1',
      createdUser:'JOHN',
      lastModifiedUser:'KENEDY',
      paymentStatus:'SUR',
      authorize:false,
      decline:false
    },
    {
      transNo: 1234,
      absAmt: '5678',
      policyNo:'LPR210001',
      transType:250000,
      account:20000,
      account2:270000,
      currency:'NGN',
      created:'1',
      createdUser:'JOHN',
      lastModifiedUser:'KENEDY',
      paymentStatus:'SUR',
      authorize:false,
      decline:false
    },
  ]
  newVal= [
    {
      accountCode:'--',
      ledgerCode:'--',
      coverNo:'--',
      amount:'--'
    },
    {
      accountCode:'--',
      ledgerCode:'--',
      coverNo:'--',
      amount:'--'
    },
  ]
  form = this.fb.group({
    showAll:[''],
    company:[''],
    currency:[''],
    authAll:[''],
    decAll:[''],
  })  
  formData = this.fb.group({
    narration:['']
  })
  constructor(private fb:FormBuilder, private route:Router) { }

  ngOnInit(): void {
  }
  check(i):void{
    this.data = this.tdata[i];
   this.policyNo = this.data.policyNo
   this.currency = this.data.currency
   this.absAmt = this.data.absAmt
   this.created = this.data.createdUser
   this.createdAt = this.data.created
   this.transNo = this.data.transNo
  }
  goto(e){
    this.route.navigate(['/life/policy-desk/view-policy',e])
  }
}
