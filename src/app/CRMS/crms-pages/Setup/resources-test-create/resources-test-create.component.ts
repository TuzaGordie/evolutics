import {Component, OnInit} from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-resources-test-create',
  templateUrl: './resources-test-create.component.html',
  styleUrls: ['./resources-test-create.component.scss']
})
export class ResourcesTestCreateComponent implements OnInit {
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


  valueChanged(value) {

    if (value === 'ABC') {

    } else if (value === 'OBJ') {
      $("#OBJModal").toggle()
    }
  }

}
