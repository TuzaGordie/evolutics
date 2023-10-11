import {Component, OnInit} from '@angular/core';
import {
  AuthorizePaymentModalComponent
} from "../../../Reusables/reusable-comps/authorize-payment-modal/authorize-payment-modal.component";
import {Router} from "@angular/router";
import {PaymentDeskService} from "../service/payment-desk.service";
import {UtilityService} from "../../../Services/utility.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-quote-authorization',
  templateUrl: './quote-authorization.component.html',
  styleUrls: ['./quote-authorization.component.scss']
})
export class QuoteAuthorizationComponent implements OnInit {

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

  constructor(private router: Router,
              private paymentDeskService: PaymentDeskService,
              private toaster: UtilityService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  checkUncheckAll() {
    for (var i = 0; i < this.authorizePayments.length; i++) {
      this.authorizePayments[i].selected = this.isMasterSel;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.isMasterSel = this.authorizePayments.every(function (item: any) {
      return item.selected == true;
    })
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.authorizePayments.length; i++) {
      if (this.authorizePayments[i].selected)
        this.checkedList.push(this.authorizePayments[i].id);
    }
    this.checkedList = JSON.stringify(this.checkedList);
    this.checkedList2 = JSON.parse(this.checkedList);
    console.log('authorizeList', this.checkedList2);
  }

  // Reset
  reset() {
    this.filterCurrency = ''
    this.filterCompanyCode = ''
    this.filterPaymentStatus = ''

  }

  openAuthorizeDialog() {
    this.dialog.open(AuthorizePaymentModalComponent,
      {
        data:
          {
            title: 'Authorize Payment',
            content: 'Are you sure you want to authorize this payment?',
            array: this.checkedList2,
            type: 'authorize'

          }
      }
    ).afterClosed().subscribe(
      //() => //this.getAuthorizePaymentsOutwards() // refresh
    )
  }

  openDeclineDialog() {
    this.dialog.open(AuthorizePaymentModalComponent,
      {
        data:
          {
            title: 'Decline Payment',
            content: 'Are you sure you want to decline this payment?',
            array: this.checkedList2,
            type: 'decline'
          }
      }
    )
  }

}
