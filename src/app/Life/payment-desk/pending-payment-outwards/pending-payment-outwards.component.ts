import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentDeskService } from '../service/payment-desk.service';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pending-payment-outwards',
  templateUrl: './pending-payment-outwards.component.html',
  styleUrls: ['./pending-payment-outwards.component.scss']
})
export class PendingPaymentOutwardsComponent implements OnInit {

  companies: any[] = [];
  currencies: any[] = [];
  paymentStatus: any[] = [];

  pendingPayments: any[] = [];
  pendingPaymentsData: any[] = [];

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

  data = {
    retrieved: false,
  }

  constructor(
    private router:Router,
    private paymentDeskService: PaymentDeskService,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.getPendingPayments();
    this.getCompnayCode();
    this.getCurrencies();
    this.getPaymentStatus();
    this.getItemsPerPage();
  }

  getItemsPerPage() {
    this.itemsPerPageParmeters = [
      {number: '10'},
      {number: '20'},
      {number: '50'},
      {number: '100'}
    ];
  }

  getPendingPayments() {
    this.connection.creating = true;
    const userCode = environment.user?.code;

    this.paymentDeskService.getPendingPayments(userCode).subscribe((data) => {
      this.data.retrieved = true;
      this.connection.creating = false;
      this.pendingPayments = data[0].pendingPayment;
      this.pendingPaymentsData = data[0].pendingPayment;
      console.log('pending payment', data)
    })
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

  call_workflowserach_list(){
    this.router.navigate(['life/payment-desk/pending-payment-outwards']);
  }

  checkUncheckAll() {
    for (var i = 0; i < this.pendingPayments.length; i++) {
      this.pendingPayments[i].selected = this.isMasterSel;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.isMasterSel = this.pendingPayments.every(function(item:any) {
        return item.selected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.pendingPayments.length; i++) {
      if(this.pendingPayments[i].selected)
        this.checkedList.push({
        "ClaimNo": this.pendingPayments[i].ClaimNo,
        "PaymentId": this.pendingPayments[i].PaymentId, 
        "selected": this.pendingPayments[i].selected
      });
    }
    this.checkedList = JSON.stringify(this.checkedList);
    this.checkedList2 = JSON.parse(this.checkedList);
    console.log('authorizeList', this.checkedList2);
  }

    // Filter
    filter() {
      this.pendingPayments = this.pendingPaymentsData

  
      if(this.filterCurrency) {
        this.pendingPayments = this.pendingPayments.filter((res) => {
          return res.currency.toLowerCase().includes(this.filterCurrency.toLowerCase());
        });
      }
  
      if(this.filterCompanyCode) {
        this.pendingPayments = this.pendingPayments.filter((res) => {
          return res.companyCode?.toLowerCase().includes(this.filterCompanyCode.toLowerCase());
        });
      }

      if(this.filterPaymentStatus) {
        this.pendingPayments = this.pendingPayments.filter((res) => {
          return res.status?.toLowerCase().includes(this.filterPaymentStatus.toLowerCase());
        });
      }

    }

    // Reset 
    reset() {
      this.filterCurrency = '';
      this.filterCompanyCode = '';
      this.filterPaymentStatus = '';
      this.getPendingPayments();
    }
}
