import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentDeskService } from '../service/payment-desk.service';
import { ApiService } from 'src/app/Services/api.service';
import { IPendingClaim } from '../payment-extras/payment.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pending-claims',
  templateUrl: './pending-claims.component.html',
  styleUrls: ['./pending-claims.component.scss']
})
export class PendingClaimsComponent implements OnInit {

  companies: any[] = [];
  currencies: any[] = [];
  claimStatus: any[] = [];

  pendingClaims: IPendingClaim[] = [];
  pendingClaimsData: any[] = [];

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

  data = {
    retrieved: false
  }

  constructor(private router:Router,public route:ActivatedRoute,
    private paymentDeskService: PaymentDeskService,
    private apiService: ApiService) { 
  }

  ngOnInit(): void {
    this.getPendingClaims();
    this.getItemsPerPage();
    this.getCompnayCode();
    this.getCurrencies();
    this.getClaimStatus();
  }

  getItemsPerPage() {
    this.itemsPerPageParmeters = [
      {number: '10'},
      {number: '20'},
      {number: '50'},
      {number: '100'}
    ];
  }

  getPendingClaims() {
    this.connection.creating = true;

    const userCode = environment.user?.code;
    this.paymentDeskService.getPendingClaims(userCode).subscribe((data: any) => {
      this.connection.creating = false;
      this.data.retrieved = true;
      this.pendingClaims = data;
      this.pendingClaimsData = data;
      console.log('pending claims', data);
    });
  }


  getCompnayCode() {
    this.connection.creating = true;

    this.paymentDeskService.getCompnay().subscribe((data: any) => {
      this.companies = data;
      this.connection.creating = false;
    })
  }

  getCurrencies() {
    this.connection.creating = true;

    this.paymentDeskService.getCurrencies().subscribe((data: any) => {
      this.currencies = data;
      this.connection.creating = false;
    })
  }

  getClaimStatus() {
    this.connection.creating = true;

    this.paymentDeskService.getClaimStatus().subscribe((data: any) => {
      this.claimStatus = data;
      console.log('claimStatus', data);
      this.connection.creating = false;
    })
  }

   call_view(){
    this.router.navigate(['../pending-claims-view'],{relativeTo:this.route});
  }

  checkUncheckAll() {
    for (var i = 0; i < this.pendingClaims.length; i++) {
      this.pendingClaims[i].selected = this.isMasterSel;
    }
    this.getCheckedItemList();
  }

  isAllSelected() {
    this.isMasterSel = this.pendingClaims.every(function(item:any) {
        return item.selected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.pendingClaims.length; i++) {
      if(this.pendingClaims[i].selected)
        this.checkedList.push({
        "ClaimNo": this.pendingClaims[i].claimNo,
        "PaymentId": this.pendingClaims[i].paymentId, 
        "selected": this.pendingClaims[i].selected
      });
    }
    this.checkedList = JSON.stringify(this.checkedList);
    this.checkedList2 = JSON.parse(this.checkedList);
    console.log('authorizeList', this.checkedList2);
  }

    // Filter 
    filter() {
     this.pendingClaims = this.pendingClaimsData;
  
      if(this.filterCurrency) {
        this.pendingClaims = this.pendingClaims.filter((res) => {
          return res.currency.toLowerCase().includes(this.filterCurrency.toLowerCase());
        });
      }
  
      if(this.filterCompanyCode) {
        console.log(this.filterCompanyCode.toLowerCase());
        this.pendingClaims = this.pendingClaims.filter((res) => {
          console.log('res', res.companyCode.toLowerCase());
          return res.companyCode?.toLowerCase().includes(this.filterCompanyCode.toLowerCase());
        });
      }
    }

    // Reset 
    reset() {
      this.filterCurrency = ''
      this.filterCompanyCode = ''
      this.getPendingClaims();
    }
  
}
