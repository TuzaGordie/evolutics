import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { EAssetType, IAssetDetail } from '../asset-desk-extras/asset.interface';
import { AssetService } from '../asset-desk-extras/asset.service';

@Component({
  selector: 'app-view-asset',
  templateUrl: './view-asset.component.html',
  styleUrls: ['./view-asset.component.scss'],
})
export class ViewAssetComponent implements OnInit {
  loading: boolean;
  assetNo: string;
  asset: IAssetDetail;
  eAssetType = EAssetType;
  regNo: string;

  constructor(
    public aS: AssetService,
    public uS: UtilityService,
    public route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.loading = true;
    try {
      this.assetNo = this.route.snapshot.queryParamMap.get('assetNo')?.trim();
      this.regNo = this.route.snapshot.queryParamMap.get('regNo')?.trim();
      if (!this.assetNo && !this.regNo)
        throw 'Asset or registration number is required';
      if (this.regNo) {
        this.asset = await this.aS.getAssetByRegNo(this.regNo).toPromise();
        if (!this.asset)
          throw `Asset with registration number ${this.regNo} doesn't exist`;
      } else if (this.assetNo) {
        this.asset = await this.aS.getAssetByNo(this.assetNo).toPromise();
        if (!this.asset)
          throw `Asset with number ${this.assetNo} doesn't exist`;
      }
    } catch (error) {
      await this.uS.info(error, 0);
      this.uS.router.navigate(['../find'], { relativeTo: this.route });
    }
    this.loading = false;
  }
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'assetTyper' })
export class AssetTyperPipe implements PipeTransform {
  transform(type: EAssetType) {
    return this.aS
      .getAssetType()
      .toPromise()
      .then((r) => r?.find((x) => x.code == type)?.title)
      .catch((e) => {
        console.log(e);
        return type;
      });
  }
  constructor(public aS: AssetService) {}
}
