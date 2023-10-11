import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-actuarial-contract-grouping',
  templateUrl: './actuarial-contract-grouping.component.html',
  styleUrls: ['./actuarial-contract-grouping.component.scss']
})
export class ActuarialContractGroupingComponent implements OnInit {
  private nbofSort: number = 1;

  constructor() {
  }

  ngOnInit(): void {
  }


  sortCounter() {
    return new Array(this.nbofSort);
  }

  sortInc() {
    this.nbofSort = this.nbofSort + 1
  }

  sortDec() {
    this.nbofSort = this.nbofSort - 1
  }
}
