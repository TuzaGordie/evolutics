import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PaymentDeskService } from '../service/payment-desk.service';

@Component({
  selector: 'app-authorize-policy-account',
  templateUrl: './authorize-policy-account.component.html',
  styleUrls: ['./authorize-policy-account.component.scss']
})
export class AuthorizePolicyAccountComponent implements OnInit {

  companies: any[] = [];
  currencies: any[] = [];
  paymentStatus: any[] = [];

  filterCurrency = ''
  filterCompanyCode = ''
  filterPaymentStatus = ''

  authorizePolicies: any[] = [];

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
    this.getAuthorizePolicies();
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

  getAuthorizePolicies() {
    const userCode = environment.user?.code;
    this.paymentDeskService.getPolicyAccounts(userCode).subscribe(
      data => this.authorizePolicies = data
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

  call_workflowserach_list(){
    this.router.navigate(['life/payment-desk/authorize-policy-account']);
  }

  checkUncheckAll() {
    for (var i = 0; i < this.authorizePolicies.length; i++) {
      this.authorizePolicies[i].selected = this.isMasterSel;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.isMasterSel = this.authorizePolicies.every(function(item:any) {
        return item.selected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.authorizePolicies.length; i++) {
      if(this.authorizePolicies[i].selected)
        this.checkedList.push({
        "TransNo": this.authorizePolicies[i].TransNo,
        "PolicyNo": this.authorizePolicies[i].PolicyNo, 
        "selected": this.authorizePolicies[i].selected
      });
    }
    this.checkedList = JSON.stringify(this.checkedList);
    this.checkedList2 = JSON.parse(this.checkedList);
    console.log('authorizeList', this.checkedList2);
  }

  // Filter 
  filter() {
    this.getAuthorizePolicies();
  
      if(this.filterCurrency) {
        this.authorizePolicies = this.authorizePolicies.filter((res) => {
          return res.Currency.toLowerCase().includes(this.filterCurrency.toLowerCase());
        });
      }
  
      if(this.filterCompanyCode) {
        this.authorizePolicies = this.authorizePolicies.filter((res) => {
          return res.CompanyCode?.toLowerCase().includes(this.filterCompanyCode.toLowerCase());
        });
      }

      if(this.filterPaymentStatus) {
        this.authorizePolicies = this.authorizePolicies.filter((res) => {
          return res.PaymentStatus?.toLowerCase().includes(this.filterPaymentStatus.toLowerCase());
        });
      }
    }

    // Reset 
    reset() {
      this.filterCurrency = ''
      this.filterCompanyCode = ''
      this.filterPaymentStatus = ''
      this.getAuthorizePolicies();
    }

}
