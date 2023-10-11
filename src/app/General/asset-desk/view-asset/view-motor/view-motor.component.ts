import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/Services/app.service';
import { FKVP } from 'src/app/Shared/models/index.model';
import { IAssetDetail } from '../../asset-desk-extras/asset.interface';
 
@Component({
  selector: 'app-view-motor',
  templateUrl: './view-motor.component.html',
  styleUrls: ['./view-motor.component.scss'],
})
export class ViewMotorComponent implements OnInit {
  @Input() asset: IAssetDetail;
  @Input() assetNo: string;
  @Input() lbls: FKVP[];

  constructor(public appS: AppService) {}

  ngOnInit(): void {
    this.appS.pageName = 'View Motor Asset';
  }
}
