import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-authorize-coupon-create',
  templateUrl: './authorize-coupon-create.component.html',
  styleUrls: ['./authorize-coupon-create.component.scss']
})
export class AuthorizeCouponCreate implements OnInit {

  amountReceived: 0;
  auth: true;
  authBy: string;
  authComment: string;
  authOn = new Date();
  coinsuranceFeeDeductedAtSource: 0;
  coinsuranceUnderWritingDeductedAtSource: 0;
  commissionDeductedAtSource: 0;
  companyCode: string;
  convertToReceipt: true;
  currency: string;
  debitNote: string;
  effectiveDate: string;
  narration: string;
  netAmount: 0;
  policyCode: string;
  policyNo: string;
  receiptNo: string;
  status: string;
  vatDeductedAtSource: 0;
  whtDeductedAtSource: 0;
  

  policyNumbers: any[] = []
  currencies: any[] = []

  authorizeCoupons: any;
  coupons: any;

  successMessage = false;
  warningMessage = false;
  errorMessage = false;

  connection = {
    creating: false,
    error: false
  };


  constructor(private router:Router) { }

  ngOnInit(): void {
    this.getCoupon();
  }

  getCoupon() {
    this.coupons = localStorage.getItem('updateCoupon');
    this.authorizeCoupons = JSON.parse(this.coupons)
    console.log('update coupon', this.authorizeCoupons);
  }
  
}
