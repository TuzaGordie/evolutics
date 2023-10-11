import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-life-show-product',
  templateUrl: './life-show-product.component.html',
  styleUrls: ['./life-show-product.component.scss']
})
export class LifeShowProductComponent implements OnInit {
prod:string = 'Savings Prod1'
thList:string[] = ['Policy','Balance b/f', 'Contributions within period','Funded premium deductions','Policy Fee Charge','Maturity Payment','Withdrawals','Surrender','Adjustment to Balance','Interest Credited','Bonus','Liability (Bal c/f)','Status']
tdVal = [
  {
    policy:'A2010002',
    balance:'--',
    contribution:'--',
    premiumDeduction:'--',
    policyCharges:'--',
    maturityPayment:'--',
    withdrawals:'--',
    surrender:'--',
    adjustment:'--',
    interestCredit:'--',
    bonus:'--',
    liability:'--',
    status:'--',
  },
  {
    policy:'A2110002',
    balance:'--',
    contribution:'--',
    premiumDeduction:'--',
    policyCharges:'--',
    maturityPayment:'--',
    withdrawals:'--',
    surrender:'--',
    adjustment:'--',
    interestCredit:'--',
    bonus:'--',
    liability:'--',
    status:'--',
  }
]
  constructor(private activatedRoute:ActivatedRoute) {
    this.prod = this.activatedRoute.snapshot.params.body
  }

  ngOnInit(): void {
  }
check(e){
  console.log(e);

}
}
