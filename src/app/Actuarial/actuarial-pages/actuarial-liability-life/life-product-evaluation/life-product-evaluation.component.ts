import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-life-product-evaluation',
  templateUrl: './life-product-evaluation.component.html',
  styleUrls: ['./life-product-evaluation.component.scss']
})
export class LifeProductEvaluationComponent implements OnInit {
  prod:string
  thList:string[] = ['Product','Balance b/f', 'Contributions within period','Funded premium deductions','Policy Fee Charge','Maturity Payment','Withdrawals','Surrender','Adjustment to Balance','Interest Credited','Bonus','Liability (Bal c/f)','Status']
  tdVal = [
    {
      product:'A2010002',
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
      product:'A2110002',
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
  constructor(private activatedRoute:ActivatedRoute,private route:Router) { }

  ngOnInit(): void {
    this.prod = this.activatedRoute.snapshot.params.body
  }
check(e){
this.route.navigate(['/actuarial/liability/life/result/show/product',e])
  }
}
