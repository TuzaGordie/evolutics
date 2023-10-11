import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PaymentDeskService} from "../service/payment-desk.service";
import {UtilityService} from "../../../Services/utility.service";
import {MatDialog} from "@angular/material/dialog";
import {
  AuthorizePaymentModalComponent
} from "../../../Reusables/reusable-comps/authorize-payment-modal/authorize-payment-modal.component";

@Component({
  selector: 'app-pending-resinsurance-decision',
  templateUrl: './pending-resinsurance-decision.component.html',
  styleUrls: ['./pending-resinsurance-decision.component.scss']
})
export class PendingResinsuranceDecisionComponent implements OnInit {

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
  isCede: boolean = false;
  isFacultative: boolean = false;
  isRejectRisk: boolean = false;
  private nbofId: number = 1;

  constructor(private router: Router,
              private paymentDeskService: PaymentDeskService,
              private toaster: UtilityService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }


  idCounter() {
    return new Array(this.nbofId);
  }

  idInc() {
    this.nbofId = this.nbofId + 1;
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

  toggleCedeTreaty() {
    this.isFacultative = false;
    this.isRejectRisk = false;
    this.isCede = !this.isCede
  }

  toggleFacultative() {
    this.isFacultative = !this.isFacultative
    this.isRejectRisk = false;
    this.isCede = false;
  }

  toggleRejectRisk() {
    this.isRejectRisk = !this.isRejectRisk
    this.isCede = false;
    this.isFacultative = false;
  }

}
