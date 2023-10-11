import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-life-policy-show',
  templateUrl: './life-policy-show.component.html',
  styleUrls: ['./life-policy-show.component.scss']
})
export class LifePolicyShowComponent implements OnInit {
  policyNo = 'XXXXX';
  openingDate = 'XXXXX';
  closingDate = 'XXXXX';
tableData = [
  {transNo:123, transDate:'12-02-1992',status:5, amount:'5000'},
  {transNo:123, transDate:'12-02-1992',status:5, amount:'5000'},
  {transNo:123, transDate:'12-02-1992',status:5, amount:'5000'},
  {transNo:123, transDate:'12-02-1992',status:5, amount:'5000'},
  {transNo:123, transDate:'12-02-1992',status:5, amount:'5000'},
  {transNo:123, transDate:'12-02-1992',status:5, amount:'5000'},
]
  constructor() { }

  ngOnInit(): void {
  }

}
