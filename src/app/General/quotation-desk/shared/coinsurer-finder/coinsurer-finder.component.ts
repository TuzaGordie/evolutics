import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { QuotationService } from 'src/app/General/services/quotation-service.service';

@Component({
  selector: 'app-coinsurer-finder',
  templateUrl: './coinsurer-finder.component.html',
  styleUrls: ['./coinsurer-finder.component.scss'],
})
export class CoinsurerFinderComponent implements OnInit {
  couponName;
  coupons: any[] = [];
  loading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CoinsurerFinderComponent>,
    public quotationService: QuotationService
  ) {}

  ngOnInit(): void {}

  findCoupon() {
    if (!this.couponName) return;

    this.loading = true;
    this.quotationService
      .searchProvider(this.couponName)
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
