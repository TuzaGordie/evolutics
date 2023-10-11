import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-resources-training-create',
  templateUrl: './resources-training-create.component.html',
  styleUrls: ['./resources-training-create.component.scss']
})
export class ResourcesTrainingCreateComponent implements OnInit {

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
