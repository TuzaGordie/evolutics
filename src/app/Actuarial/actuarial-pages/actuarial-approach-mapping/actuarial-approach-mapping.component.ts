import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-actuarial-approach-mapping',
  templateUrl: './actuarial-approach-mapping.component.html',
  styleUrls: ['./actuarial-approach-mapping.component.scss']
})
export class ActuarialApproachMappingComponent implements OnInit {

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
