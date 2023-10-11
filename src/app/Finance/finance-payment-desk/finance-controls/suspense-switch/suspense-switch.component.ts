import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { faSave,faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-suspense-switch',
  templateUrl: './suspense-switch.component.html',
  styleUrls: ['./suspense-switch.component.scss']
})
export class SuspenseSwitchComponent implements OnInit {
  faSave = faSave
  faArrowLeft = faArrowLeft
  styleCheck = 30
  // margin = 'auto'
  // data:any
  thead = ['Trans No',"Suspense","From Policy No","To Policy No","Client From","Client To ","Currency","Created","Created User","Updated By","Authorize","Decline"]
  // ths = ['Account Code','Ledger Code', 'Cover No', 'Amount']

  tdata = [
    { 
      transNo: 1234,
      suspense: 5678,
      fromPolicyNo:'LSE210001',
      toPolicyNo:'LSE220001',
      clientFrom:'James Milner',
      clientTo:"Steve Miller",
      currency:'NGN',
      created:'1',
      createdUser:'JOHN',
      lastModifiedUser:'KENEDY',
      authorize:false,
      decline:false
    },
    {
      transNo: 1234,
      suspense: 5678,
      fromPolicyNo:'LPR210001',
      toPolicyNo:'LPR220001',
      clientFrom:'James Milner',
      clientTo:"Steve Miller",
      currency:'NGN',
      created:'1',
      createdUser:'JOHN',
      lastModifiedUser:'KENEDY',
      authorize:false,
      decline:false
    },
  ]
  form = this.fb.group({
    showAll:[''],
    company:[''],
    currency:[''],
    authAll:[''],
    decAll:[''],
  })  

  constructor(private fb:FormBuilder, private route:Router) { }

  ngOnInit(): void {
  }
  check(i){

  }
  goto(e){
    this.route.navigate(['/life/policy-desk/view-policy',e])
  }
}

