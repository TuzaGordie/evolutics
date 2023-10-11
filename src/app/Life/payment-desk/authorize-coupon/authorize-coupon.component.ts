import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentDeskService } from '../service/payment-desk.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-authorize-coupon',
  templateUrl: './authorize-coupon.component.html',
  styleUrls: ['./authorize-coupon.component.scss']
})
export class AuthorizeCouponComponent implements OnInit {

  userCode: string;

  authorizeCoupons: any[] = []
  authorizeCouponsData: any[] = []
  filteredAuthorizeCoupons: any[] = []
  companies: any[] = [];
  currencies: any[] = [];

  filterCurrency = ''
  filterCompanyCode = ''

  isMasterSel = false;

  isChecked = false;

  checkedList: any;
  checkedList2: any[] = [];

  itemsPerPageParmeters: any[];

  connection = {
    creating: false,
    error: false
  };

  response = {
    successMessage: '',
    errorMessage: '',
  }

  constructor(private router: Router,
    private paymentDeskService: PaymentDeskService,
    private toaster: UtilityService
  ) { }

  ngOnInit(): void {
    this.getAuthorizeCoupon();
    this.getItemsPerPage();
    this.getCompnayCode();
    this.getCurrencies();
  }

  getItemsPerPage() {
    this.itemsPerPageParmeters = [
      {number: '10'},
      {number: '20'},
      {number: '50'},
      {number: '100'}
    ];
  }

  getCompnayCode() {
    this.connection.creating = true;

    this.paymentDeskService.getCompnay().subscribe((data: any) => {
      this.companies = data;
      console.log('company', data);
      this.connection.creating = false;
    })
  }

  getCurrencies() {
    this.connection.creating = true;

    this.paymentDeskService.getCurrencies().subscribe((data: any) => {
      this.currencies = data;
      console.log('currenries', data);
      this.connection.creating = false;
    })
  }

  getAuthorizeCoupon() {
    this.connection.creating = true;
    const userCode =  environment.user?.code;
    console.log("environment.user", environment.user)
    this.paymentDeskService.getAuthorizeCoupon(userCode).subscribe((data: any) => {
      this.authorizeCoupons = data[0]?.pendingCoupon;
      this.authorizeCouponsData = data[0]?.pendingCoupon;
      localStorage.setItem('authorizeCoupons', JSON.stringify(this.authorizeCoupons));
      console.log('coupon',data[0].pendingCoupon);
      this.connection.creating = false;
    })
  }

  updateCoupon(coupon: any) {
    localStorage.setItem('updateCoupon', JSON.stringify(coupon));
    this.router.navigate(['life/payment-desk/authorize-coupon-create']);
  }


  // Check Coupon
  checkUncheckAll() {
    for (var i = 0; i < this.authorizeCoupons.length; i++) {
      this.authorizeCoupons[i].selected = this.isMasterSel;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.isMasterSel = this.authorizeCoupons.every(function(item:any) {
        return item.selected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.authorizeCoupons.length; i++) {
      if(this.authorizeCoupons[i].selected)
        this.checkedList.push(this.authorizeCoupons[i].no);
    }
    this.checkedList = JSON.stringify(this.checkedList);
    this.checkedList2 = JSON.parse(this.checkedList);
    console.log('authorizeList', this.checkedList2);
  }

  authorizeCoupon() {
    let coupon = {
      couponNo: this.checkedList2,
      userCode: environment.user?.code
    }
    console.log(coupon);
    this.paymentDeskService.authorizeCoupon(coupon).subscribe((data: any)=> {
      console.log(data);
      this.response.successMessage = data[0].message;
      this.toaster.info(`${this.response.successMessage}`, 1)
      .then(() => this.getAuthorizeCoupon()) // refresh
    },
    error => {
      console.log('coupon error', error);
      // this.toaster.notify('Something went wrong', 0, 5000, 'Error');
    });
  }

  declineCoupon() {
    let coupon = {
      couponNo: this.checkedList2,
      userCode:  environment.user?.code
    }
    console.log(coupon);
    this.paymentDeskService.declineCoupon(coupon).subscribe((data: any)=> {
      console.log(data);
      this.response.successMessage = data[0].message;
      this.toaster.info(`${this.response.successMessage}`, 1)
      .then(() => this.getAuthorizeCoupon()) //refresh
    },
    error => {
      console.log('coupon error', error);
      // this.toaster.notify('Something went wrong', 0, 5000, 'Error');
    });
  }

  // Filter 
  filter() {
    this.authorizeCoupons = this.authorizeCouponsData;

    if(this.filterCurrency) {
      this.authorizeCoupons = this.authorizeCoupons.filter((res) => {
        return res.currency.toLowerCase().includes(this.filterCurrency.toLowerCase());
      });
    }

    if(this.filterCompanyCode) {
      this.authorizeCoupons = this.authorizeCoupons.filter((res) => {
        return res.companyCode?.toLowerCase().includes(this.filterCompanyCode.toLowerCase());
      });
    }
  }


}
