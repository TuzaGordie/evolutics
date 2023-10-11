
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-start-create-asset',
  templateUrl: './start-create-asset.component.html',
  styleUrls: ['./start-create-asset.component.scss'],
})
export class StartCreateAssetComponent implements OnInit {
  constructor( 
    private route: ActivatedRoute
  ) {}

  assetClass: 'property' | 'motor' | '';

  ngOnInit() {
    this.assetClass = this.route.snapshot.queryParams.assetClass;
    console.log(this.assetClass)
  }

  submit(val:any){

  }
}
