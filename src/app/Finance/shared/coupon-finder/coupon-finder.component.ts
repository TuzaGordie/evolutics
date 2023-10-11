import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { QuotationService } from 'src/app/General/services/quotation-service.service';

@Component({
  selector: 'app-coupon-finder',
  templateUrl: './coupon-finder.component.html',
  styleUrls: ['./coupon-finder.component.scss']
})
export class CouponFinderComponent implements OnInit {
  couponName;
  coupons: any[] = []
  loading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CouponFinderComponent>,
    public quotationService: QuotationService,
    ) { }

  ngOnInit(): void {
  }

  findCoupon(){
    if (!this.couponName) return

    this.loading = true
    this.quotationService.findCouponByName(this.couponName).subscribe(
      res => {
        console.log("response from findCoupon service: ", res)
        this.coupons = res
      },
      (err) => console.log("error from find coupon service: ", err)
    ).add(() => this.loading = false)
  }

  onSelectCoupon(coupon){
    this.dialogRef.close(coupon)
  }

}
