import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-task-setup',
  templateUrl: './create-task-setup.component.html',
  styleUrls: ['./create-task-setup.component.scss'],
})
export class CRMSCreateSetupsTaskSetupComponent implements OnInit {
  private nbofcats: number = 1;
  private nbofitems: number = 1;
  constructor() {}

  ngOnInit(): void {}

  catCounter() {
    return new Array(this.nbofcats);
  }

  catInc() {
    this.nbofcats = this.nbofcats + 1
  }

  itemsCounter() {
    return new Array(this.nbofitems);
  }

  itemsInc() {
    this.nbofitems = this.nbofitems + 1
  }
}
