import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EAssetType } from 'src/app/General/asset-desk/asset-desk-extras/asset.interface';
import { AssetService } from 'src/app/General/asset-desk/asset-desk-extras/asset.service';
import { QuotationService } from 'src/app/General/services/quotation-service.service';
import { SortType } from 'src/app/Shared/models/index.model';

@Component({
  selector: 'app-asset-finder',
  templateUrl: './asset-finder.component.html',
  styleUrls: ['./asset-finder.component.scss'],
})
export class AssetFinderComponent implements OnInit {
  policyNo;
  clientNo;
  ownerName;
  externalRef;
  groupNo;
  assetType;
  dateFrom;
  dateTo;
  vehicleModel;
  coupons: any[] = [];
  loading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<AssetFinderComponent>,
    public quotationService: QuotationService,
    private assS: AssetService
  ) {}

  ngOnInit(): void {}

  findCoupon() {
    this.loading = true;
    const object = {
      assetNo: '',
      assetType: this.assetType as EAssetType,
      chasisNo: '',
      createDateFrom: this.dateFrom,
      createDateTo: this.dateTo,
      engineNo: null,
      externalRef: this.externalRef,
      groupNo: this.groupNo,
      ownerClientNo: this.clientNo,
      ownerName: this.ownerName,
      pageNumber: null,
      policyNo: this.policyNo,
      registrationNo: '',
      vehicleBrand: '',
      vehicleMake: '',
      vehicleModel: this.vehicleModel,
      pageSize: null,
      sortBy: '',
      sortDirection: 'ASC' as SortType,
    };
    this.assS
      .searchAssets(object)
      .subscribe(
        (res) => {
          console.log('response from findCoupon service: ', res);
          this.coupons = res.page.content;
        },
        (err) => console.log('error from find coupon service: ', err)
      )
      .add(() => (this.loading = false));
  }

  onSelectCoupon(coupon) {
    this.dialogRef.close(coupon);
  }
}
