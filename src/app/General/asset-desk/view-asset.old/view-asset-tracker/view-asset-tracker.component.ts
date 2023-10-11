import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-asset-tracker',
  templateUrl: './view-asset-tracker.component.html',
  styleUrls: ['./view-asset-tracker.component.scss']
})
export class ViewAssetTrackerComponent implements OnInit {
  private nbofdva: number = 1;

  constructor() { }

  ngOnInit(): void {
  }


  dvaCounter() {
    return new Array(this.nbofdva);
  }

  dvaInc() {
    this.nbofdva = this.nbofdva + 1
  }

}
