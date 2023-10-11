import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actuarial-discount',
  templateUrl: './actuarial-discount.component.html',
  styleUrls: ['./actuarial-discount.component.scss']
})
export class ActuarialDiscountComponent implements OnInit {
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
