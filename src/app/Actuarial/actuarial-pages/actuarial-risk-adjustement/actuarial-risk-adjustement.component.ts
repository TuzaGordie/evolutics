import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-actuarial-risk-adjustement',
  templateUrl: './actuarial-risk-adjustement.component.html',
  styleUrls: ['./actuarial-risk-adjustement.component.scss']
})
export class ActuarialRiskAdjustementComponent implements OnInit {
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
