import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-life-client-desk-web-user-create',
  templateUrl: './life-client-desk-web-user-create.component.html',
  styleUrls: ['./life-client-desk-web-user-create.component.scss']
})
export class LifeClientDeskWebUserCreateComponent implements OnInit {
  private nbofDoc: number = 1;

  constructor() {
  }

  ngOnInit(): void {
  }

  docCounter() {
    return new Array(this.nbofDoc);
  }

  docInc() {
    this.nbofDoc = this.nbofDoc + 1
  }


}
