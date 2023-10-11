import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-setup-file-format-create-new',
  templateUrl: './setup-file-format-create-new.component.html',
  styleUrls: ['./setup-file-format-create-new.component.scss']
})
export class SetupFileFormatCreateNewComponent implements OnInit {
  private nbofTable: number = 1;

  constructor() {
  }

  ngOnInit(): void {
  }

  tableCounter() {
    return new Array(this.nbofTable);
  }

  tableInc() {
    this.nbofTable = this.nbofTable + 1
  }

  tableDec() {
    if (this.nbofTable <= 1) {

    } else {
      this.nbofTable = this.nbofTable - 1
    }

  }
}
