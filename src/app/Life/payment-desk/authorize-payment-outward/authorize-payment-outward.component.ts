import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentDeskService } from '../service/payment-desk.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthorizePaymentModalComponent } from '../../../Reusables/reusable-comps/authorize-payment-modal/authorize-payment-modal.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-authorize-payment-outward',
  templateUrl: './authorize-payment-outward.component.html',
  styleUrls: ['./authorize-payment-outward.component.scss']
})
export class AuthorizePaymentOutwardComponent implements OnInit {

  companies: any[] = [];
  currencies: any[] = [];
  paymentStatus: any[] = [];

  filterCurrency = ''
  filterCompanyCode = ''
  filterPaymentStatus = ''

  itemsPerPageParmeters: any[];

  authorizePayments: any[] = [];
  authorizePaymentsData: any[] = [];

  isMasterSel = false;

  isChecked = false;

  checkedList: any;
  checkedList2: any[] = [];

  connection = {
    creating: false,
    error: false
  };

  response = {
    successMessage: '',
    errorMessage: '',
  }

  constructor(private router:Router,
    private paymentDeskService: PaymentDeskService,
    private toaster: UtilityService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getItemsPerPage();
    this.getCompanyCode();
    this.getCurrencies();
    this.getAuthorizePaymentsOutwards();
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

  getAuthorizePaymentsOutwards() {
    this.connection.creating = true;
    const userCode = environment.user?.code;
    const tierCategory = 'PO'
    this.paymentDeskService.getAuthorizePaymentsOutwards(userCode, tierCategory).subscribe((data: any) => {
      this.authorizePayments = data;
      this.authorizePaymentsData = data;
      console.log('getPendingPaymentsOutwards', data)
    });
  }

  getCompanyCode() {
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
      console.log('payment status', data);
      this.connection.creating = false;
    })
  }

  call_workflowserach_list(){
    this.router.navigate(['life/payment-desk/authorize-payment-outward']);
  }

  checkUncheckAll() {
    for (var i = 0; i < this.authorizePayments.length; i++) {
      this.authorizePayments[i].selected = this.isMasterSel;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.isMasterSel = this.authorizePayments.every(function(item:any) {
        return item.selected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.authorizePayments.length; i++) {
      if(this.authorizePayments[i].selected)
        this.checkedList.push(this.authorizePayments[i].id);
    }
    this.checkedList = JSON.stringify(this.checkedList);
    this.checkedList2 = JSON.parse(this.checkedList);
    console.log('authorizeList', this.checkedList2);
  }

  // Filter 
  filter() {
    this.authorizePayments = this.authorizePaymentsData;

      if(this.filterCurrency) {
        this.authorizePayments = this.authorizePayments.filter((res) => {
          return res.currency.toLowerCase().includes(this.filterCurrency.toLowerCase());
        });
      }

      if(this.filterCompanyCode) {
        this.authorizePayments = this.authorizePayments.filter((res) => {
          return res.companyCode?.toLowerCase().includes(this.filterCompanyCode.toLowerCase());
        });
      }

      if(this.filterPaymentStatus) {
        this.authorizePayments = this.authorizePayments.filter((res) => {
          return res.paymentStatus?.toLowerCase().includes(this.filterPaymentStatus.toLowerCase());
        });
      }
    }

    openAuthorizeDialog() {
      this.dialog.open(AuthorizePaymentModalComponent, 
        {data:
          {
            title: 'Authorize Payment',
            content: 'Are you sure you want to authorize this payment?',
            array: this.checkedList2,
            type: 'authorize'

          }
        }
      ).afterClosed().subscribe(
        () => this.getAuthorizePaymentsOutwards() // refresh
      )
    }

    openDeclineDialog() {
      this.dialog.open(AuthorizePaymentModalComponent, 
        {data:
          {
            title: 'Decline Payment',
            content: 'Are you sure you want to decline this payment?',
            array: this.checkedList2,
            type: 'decline'
          }
        }
      )
    }
    

  // Reset 
  reset() {
    this.filterCurrency = ''
    this.filterCompanyCode = ''
    this.filterPaymentStatus = ''
    this.getAuthorizePaymentsOutwards();
  }
}
