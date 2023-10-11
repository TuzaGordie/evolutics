import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { faSave} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-commission-adjustment',
  templateUrl: './commission-adjustment.component.html',
  styleUrls: ['./commission-adjustment.component.scss']
})
export class CommissionAdjustmentComponent implements OnInit {
  faSave = faSave
  // faArrowLeft = faArrowLeft
  styleCheck = 30
  thead = ['Trans No',"Absolute Amount","Policy No","Trans Type","Account","Account","Currency","Created","Created User","Updated By","Authorize","Decline"]
  tdata = [
      { 
        transNo: 1234,
        absAmt: '5678',
        policyNo:'LSE210001',
        transType:'Payment',
        account:20000,
        accountType:'Premium',
        currency:'NGN',
        created:'1',
        createdUser:'JOHN',
        lastModifiedUser:'KENEDY',
        authorize:false,
        decline:false
      },
      {
        transNo: 1234,
        absAmt: '5678',
        policyNo:'LPR210001',
        transType:'Payment',
        account:20000,
        accountType:'Premium',
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

  ngOnInit(): void {}
      check(i){}

  goto(e){
    this.route.navigate(['/life/policy-desk/view-policy',e])
  }
}

