import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-profit-sharing-create',
  templateUrl: './profit-sharing-create.component.html',
  styleUrls: ['./profit-sharing-create.component.scss']
})
export class ProfitSharingCreateComponent implements OnInit {
  private nbofTable: number = 1;

  constructor() {
  }

  ngOnInit(): void {
  }

  tableCounter() {
    return new Array(this.nbofTable);
  }

  tableInc() {
    this.nbofTable = this.nbofTable + 1;
  }

  tableDec() {
    this.nbofTable = this.nbofTable - 1;

    if (this.nbofTable <= 0) {
      this.nbofTable = 1
    }
  }

}
