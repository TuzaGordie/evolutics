import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { environment } from 'src/environments/environment';
import { PaymentDeskService } from '../service/payment-desk.service';

@Component({
  selector: 'app-authorize-claim-adjustments',
  templateUrl: './authorize-claim-adjustments.component.html',
  styleUrls: ['./authorize-claim-adjustments.component.scss']
})
export class AuthorizeClaimAdjustments implements OnInit {

  companies: any[] = [];
  currencies: any[] = [];
  paymentStatus: any[] = [];

  authorizeClaims: any[] = [];

  filterCurrency = ''
  filterCompanyCode = ''
  filterPaymentStatus = ''

  isMasterSel = false;

  isChecked = false;

  checkedList: any;
  checkedList2: any[] = [];

  itemsPerPageParmeters: any[];

  connection = {
    creating: false,
    error: false
  };

  response;

  constructor(
    private router:Router,
    private paymentDeskService: PaymentDeskService,
    private toaster: UtilityService,
  ) { }

  ngOnInit(): void {
    this.getItemsPerPage();
    this.getCompnayCode();
    this.getCurrencies();
    this.getAuthorizeClaims();
    this.getPaymentStatus();
  }

  getItemsPerPage() {
    this.itemsPerPageParmeters = [
      {number: '10'},
      {number: '20'},
      {number: '50'},
      {number: '100'}
    ];
  }

  getAuthorizeClaims() {
    const userCode = environment.user?.code;
    this.paymentDeskService.getClaimAdjustments(userCode).subscribe(
      data => this.authorizeClaims = data
    )
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

  getPaymentStatus() {
    this.connection.creating = true;

    this.paymentDeskService.getPaymentStatus().subscribe((data: any) => {
      this.paymentStatus = data;
      console.log('currenries', data);
      this.connection.creating = false;
    })
  }

  checkUncheckAll() {
    for (var i = 0; i < this.authorizeClaims.length; i++) {
      this.authorizeClaims[i].selected = this.isMasterSel;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.isMasterSel = this.authorizeClaims.every(function(item:any) {
        return item.selected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.authorizeClaims.length; i++) {
      if(this.authorizeClaims[i].selected)
        this.checkedList.push({
        "id": this.authorizeClaims[i].id,
        "claimNo": this.authorizeClaims[i].claimNo,
        "policyNo": this.authorizeClaims[i].policyNo, 
        "selected": this.authorizeClaims[i].selected
      });
    }
    this.checkedList = JSON.stringify(this.checkedList);
    this.checkedList2 = JSON.parse(this.checkedList);
    console.log('authorizeList', this.checkedList2);
  }

  // Filter 
  filter() {
    this.getAuthorizeClaims();

      if(this.filterCurrency) {
        this.authorizeClaims = this.authorizeClaims.filter((res) => {
          return res.Currency.toLowerCase().includes(this.filterCurrency.toLowerCase());
        });
      }

      if(this.filterCompanyCode) {
        this.authorizeClaims = this.authorizeClaims.filter((res) => {
          return res.CompanyCode?.toLowerCase().includes(this.filterCompanyCode.toLowerCase());
        });
      }

      if(this.filterPaymentStatus) {
        this.authorizeClaims = this.authorizeClaims.filter((res) => {
          return res.PaymentStatus?.toLowerCase().includes(this.filterPaymentStatus.toLowerCase());
        });
      }
    }

    // Reset 
    reset() {
      this.filterCurrency = ''
      this.filterCompanyCode = ''
      this.filterPaymentStatus = ''
      this.getAuthorizeClaims();
    }
    
    authorizeClaimAdjustment(){
      // no endpoint to authorize in batches, for now just authorize the last record
      const {id} = this.checkedList2[this.checkedList2.length - 1];
      const userCode = environment.user?.code;
      this.paymentDeskService.authorizeClaimAdjustment(id, userCode).subscribe((data: any)=> {
        console.log(data);
        this.response.successMessage = data[0].message;
        this.toaster.info(`${this.response.successMessage}`, 1)
        .then(() => this.getAuthorizeClaims()) //refresh
      },
      error => {
        console.log('claim adjustment authorization error', error);
        this.toaster.info(error.error?.message, 0);
      });
    }

    declineClaimAdjustment(){
      // no endpoint to decline in batches, for now just decline the last record
      const {id} = this.checkedList2[this.checkedList2.length - 1];
      const userCode = environment.user?.code;
      this.paymentDeskService.declineClaimAdjustment(id, userCode).subscribe((data: any)=> {
        console.log(data);
        this.response.successMessage = data[0].message;
        this.toaster.info(`${this.response.successMessage}`, 1)
        .then(() => this.getAuthorizeClaims()) //refresh
      },
      error => {
        console.log('claim adjustment decline error', error);
        this.toaster.info(error.error?.message, 0);
      });
    }
}
