import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssetService } from '../asset-desk-extras/asset.service';

@Component({
  selector: 'app-prop-assets',
  templateUrl: './prop-assets.component.html',
  styleUrls: ['./prop-assets.component.scss']
})
export class PropAssetsComponent implements OnInit {
  assetNo: any;
asset:any
  constructor(private route: ActivatedRoute, private assS: AssetService) {}

  ngOnInit(): void {
    this.assetNo = this.route.snapshot.queryParams.assetNo;
  }

}
