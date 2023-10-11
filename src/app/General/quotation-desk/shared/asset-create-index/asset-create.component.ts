import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EAssetType } from 'src/app/General/asset-desk/asset-desk-extras/asset.interface';
import { AssetService } from 'src/app/General/asset-desk/asset-desk-extras/asset.service';
import { QuotationService } from 'src/app/General/services/quotation-service.service';
import { SortType } from 'src/app/Shared/models/index.model';

@Component({
  selector: 'app-asset-create',
  templateUrl: './asset-create.component.html',
  styleUrls: ['./asset-create.component.scss'],
})
export class AssetCreateComponent implements OnInit {
  assetType;
  coupons: any[] = [];
  loading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<AssetCreateComponent>,
    public quotationService: QuotationService,
    private assS: AssetService
  ) {}

  ngOnInit(): void {}

  findCoupon() {
    this.loading = true;
  }

  onSelectCoupon() {
    this.dialogRef.close(this.assetType);
  }
}
