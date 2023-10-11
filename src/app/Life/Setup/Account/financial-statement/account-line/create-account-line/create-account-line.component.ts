import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-create-account-line',
  templateUrl: './create-account-line.component.html',
  styleUrls: ['./create-account-line.component.scss']
})
export class CreateAccountLineComponent implements OnInit {

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
