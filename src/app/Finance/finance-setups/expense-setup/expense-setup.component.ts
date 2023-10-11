import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-expense-setup',
  templateUrl: './expense-setup.component.html',
  styleUrls: ['./expense-setup.component.scss']
})
export class ExpenseSetupComponent implements OnInit {
  private nbofSort: number = 1;

  constructor() { }

  ngOnInit(): void {
  }


  sortCounter() {
    return new Array(this.nbofSort);
  }

  sortInc(){
    this.nbofSort = this.nbofSort + 1
  }
  sortDec(){
    this.nbofSort = this.nbofSort - 1
  }
}
