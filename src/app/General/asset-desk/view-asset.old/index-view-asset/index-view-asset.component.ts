import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AssetService } from '../../asset-desk-extras/asset.service';

type EditType =
  | 'Asset Type'
  | 'Asset Class'
  | 'Vehicle Type'
  | 'Brand'
  | 'Manufacturing Year'
  | 'Brand/Make/Model'
  | 'Category'
  | 'Usage'
  | 'Fuel Type'
  | 'Tonnage'
  | string;

@Component({
  selector: 'app-index-view-asset',
  templateUrl: './index-view-asset.component.html',
  styleUrls: ['./index-view-asset.component.scss'],
})
export class IndexViewAssetComponent implements OnInit {
  assetNo: string;
  editMode: boolean = false;
  editType: EditType;
  asset: any;

  openEdit(val: EditType) {
    this.editType = val;
    this.editMode = true;
  }
  onDoneEditing() {
    this.editType = undefined;
    this.editMode = false;
  }

  constructor(private route: ActivatedRoute, private assS: AssetService) {}

  ngOnInit(): void {
    this.assetNo = this.route.snapshot.queryParams.assetNo;

    this.assS.getAssetSummaryByNo(this.assetNo).subscribe(
      (res) => {
        if (res) {
          //console.log(res)
          this.asset = res;
          console.log('asset', this.asset);
        } else {
          this.assS.getAssetByRegNo(this.assetNo).subscribe((res) => {
            this.asset = res[0];
          console.log('asset', this.asset);
            //console.log(this.asset)
          });
        }
      },
      (err) => {
        console.log('HTTP Error', err);
      }
    );
  }
}
