import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppService } from 'src/app/Services/app.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { FKVP } from 'src/app/Shared/models/index.model';
import {
  EAssetType,
  IAssetDetail,
} from '../../asset-desk-extras/asset.interface';

@Component({
  selector: 'app-view-property',
  templateUrl: './view-property.component.html',
  styleUrls: ['./view-property.component.scss'],
})
export class ViewPropertyComponent implements OnInit {
  @Input('asset') set _asset(v: IAssetDetail) {
    this.setupForm(v);
  }
  asset: IAssetDetail;
  @Input() assetNo: string;
  @Input() form: FormGroup;
  @Input() lbls: FKVP[];
  constructor(public appS: AppService, public uS: UtilityService) {
    this.lbls = [{ key: 'id', label: 'Asset ID' }];
  }

  ngOnInit(): void {
    this.appS.pageName = 'View Property Asset';
  }
  setupForm(v: IAssetDetail) {
    this.form = new FormGroup(this.uS.objToFormControls(v));
  }
}
