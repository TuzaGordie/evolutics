import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PaymentDeskService } from '../service/payment-desk.service';

@Component({
  selector: 'app-authorize-cummission-adjustments',
  templateUrl: './authorize-cummission-adjustments.component.html',
  styleUrls: ['./authorize-cummission-adjustments.component.scss']
})
export class AuthorizeCummissionAdjustmentsComponent implements OnInit {

  companies: any[] = [];
  currencies: any[] = [];
  paymentStatus: any[] = [];

  filterCurrency = ''
  filterCompanyCode = ''
  filterPaymentStatus = ''

  authorizeCommissions: any[] = [];

  isMasterSel = false;

  isChecked = false;

  checkedList: any;
  checkedList2: any[] = [];

  itemsPerPageParmeters: any[];

  connection = {
    creating: false,
    error: false
  };

  constructor(private router:Router, private paymentDeskService: PaymentDeskService) { }

  ngOnInit(): void {
    this.getItemsPerPage();
    this.getCompnayCode();
    this.getCurrencies();
    this.getAuthorizeCommissions();
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

  getAuthorizeCommissions() {
    const userCode = environment.user?.code;
    this.paymentDeskService.getAuthorizeCommissionAdjustments(userCode).subscribe(
      res => this.authorizeCommissions = res
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
    for (var i = 0; i < this.authorizeCommissions.length; i++) {
      this.authorizeCommissions[i].selected = this.isMasterSel;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.isMasterSel = this.authorizeCommissions.every(function(item:any) {
        return item.selected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.authorizeCommissions.length; i++) {
      if(this.authorizeCommissions[i].selected)
        this.checkedList.push({
        "TransNo": this.authorizeCommissions[i].TransNo,
        "PolicyNo": this.authorizeCommissions[i].PolicyNo, 
        "selected": this.authorizeCommissions[i].selected
      });
    }
    this.checkedList = JSON.stringify(this.checkedList);
    this.checkedList2 = JSON.parse(this.checkedList);
    console.log('authorizeList', this.checkedList2);
  }

  call_workflowserach_list(){
    this.router.navigate(['life/payment-desk/authorize-cummission-adjustments']);
  }

  // Filter 
  filter() {
    this.getAuthorizeCommissions();
  
      if(this.filterCurrency) {
        this.authorizeCommissions = this.authorizeCommissions.filter((res) => {
          return res.Currency.toLowerCase().includes(this.filterCurrency.toLowerCase());
        });
      }
  
      if(this.filterCompanyCode) {
        this.authorizeCommissions = this.authorizeCommissions.filter((res) => {
          return res.CompanyCode?.toLowerCase().includes(this.filterCompanyCode.toLowerCase());
        });
      }

      if(this.filterPaymentStatus) {
        this.authorizeCommissions = this.authorizeCommissions.filter((res) => {
          return res.PaymentStatus?.toLowerCase().includes(this.filterPaymentStatus.toLowerCase());
        });
      }
    }

    // Reset 
    reset() {
      this.filterCurrency = ''
      this.filterCompanyCode = ''
      this.filterPaymentStatus = ''
      this.getAuthorizeCommissions();
    }
}
