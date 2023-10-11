import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-financial-statement',
  templateUrl: './create-financial-statement.component.html',
  styleUrls: ['./create-financial-statement.component.scss']
})
export class CreateFinancialStatementComponent implements OnInit {


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
