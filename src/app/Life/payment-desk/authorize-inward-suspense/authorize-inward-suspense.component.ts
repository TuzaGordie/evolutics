import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentDeskService } from '../service/payment-desk.service';
import { StorageService } from '../../../Services/storage.service';
import { UtilityService } from '../../../Services/utility.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-authorize-inward-suspense',
  templateUrl: './authorize-inward-suspense.component.html',
  styleUrls: ['./authorize-inward-suspense.component.scss']
})
export class AuthorizeInwardSuspenseComponent implements OnInit {

  companies: any[] = [];
  currencies: any[] = [];
  paymentStatus: any[] = [];

  filterCurrency = ''
  filterCompanyCode = ''
  filterPaymentStatus = ''

  authorizePayment: any[] = [];

  isMasterSel = false;

  isChecked = false;

  checkedList: any;
  checkedList2: any[] = [];

  itemsPerPageParmeters: any[];

  connection = {
    creating: false,
    success: false,
    error: false
  };

  response;

  constructor(
    private router:Router,
    private paymentDeskService: PaymentDeskService,
    private toaster: UtilityService,
    private storage: StorageService
  ) {  }

  ngOnInit(): void {
    this.getItemsPerPage();
    this.getCompnayCode();
    this.getCurrencies();
    this.getAuthorizePayments();
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

  getAuthorizePayments() {
    const userCode = environment.user?.code;

    this.connection.creating = true;
    this.paymentDeskService.getAuthorizeInwardSuspenseSwitch(userCode).subscribe((data) => {
      this.authorizePayment = data;

      this.connection.creating = false;
    });
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
    this.router.navigate(['life/payment-desk/authorize-inward-suspense']);
  }

  checkUncheckAll() {
    for (var i = 0; i < this.authorizePayment.length; i++) {
      this.authorizePayment[i].selected = this.isMasterSel;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.isMasterSel = this.authorizePayment.every(function(item:any) {
        return item.selected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.authorizePayment.length; i++) {
      if(this.authorizePayment[i].selected)
        this.checkedList.push({
        "id": this.authorizePayment[i].id,
        "transNo": this.authorizePayment[i].transNo,
        "fromPolicyNo": this.authorizePayment[i].fromPolicyNo, 
        "selected": this.authorizePayment[i].selected
      });
    }
    this.checkedList = JSON.stringify(this.checkedList);
    this.checkedList2 = JSON.parse(this.checkedList);
    console.log('authorizeList', this.checkedList2);
  }

  // Filter 
  filter() {
    this.getAuthorizePayments();
  
      if(this.filterCurrency) {
        this.authorizePayment = this.authorizePayment.filter((res) => {
          return res.Currency.toLowerCase().includes(this.filterCurrency.toLowerCase());
        });
      }
  
      if(this.filterCompanyCode) {
        this.authorizePayment = this.authorizePayment.filter((res) => {
          return res.CompanyCode?.toLowerCase().includes(this.filterCompanyCode.toLowerCase());
        });
      }

      if(this.filterPaymentStatus) {
        this.authorizePayment = this.authorizePayment.filter((res) => {
          return res.PaymentStatus?.toLowerCase().includes(this.filterPaymentStatus.toLowerCase());
        });
      }
    }

    // Reset 
    reset() {
      this.filterCurrency = ''
      this.filterCompanyCode = ''
      this.filterPaymentStatus = ''
      this.getAuthorizePayments();
    }

    authorizeSuspension(){
      // no endpoint to authorize in batches, for now just authorize the last record
      const {id} = this.checkedList2[this.checkedList2.length - 1];
      const userCode = environment.user?.code;
      this.paymentDeskService.authorizeInwardSuspenseSwitch(id, userCode).subscribe((data: any)=> {
        console.log(data);
        this.response.successMessage = data[0].message;
        this.toaster.info(`${this.response.successMessage}`, 1)
        .then(() => this.getAuthorizePayments()) //refresh
      },
      error => {
        console.log('suspension error', error);
        this.toaster.info(error.error?.message, 0);
      });
    }

    declineSuspension(){
      // no endpoint to decline in batches, for now just declin the last record
      const {id} = this.checkedList2[this.checkedList2.length - 1];
      const userCode = environment.user?.code;
      this.paymentDeskService.declineInwardSuspenseSwitch(id, userCode).subscribe((data: any)=> {
        console.log(data);
        this.response.successMessage = data[0].message;
        this.toaster.info(`${this.response.successMessage}`, 1)
        .then(() => this.getAuthorizePayments()) //refresh
      },
      error => {
        console.log('suspension error', error);
        this.toaster.info(error.error?.message, 0);
      });
    }
}
