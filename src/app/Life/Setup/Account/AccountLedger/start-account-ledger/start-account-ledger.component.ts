import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {faSearch } from '@fortawesome/free-solid-svg-icons';
import { AccountExtrasService } from '../../accounts-extras/account-extras.service';
import { AccountsService } from '../../accounts-extras/accounts.service';
import {ChartType} from "chart.js";
import { UtilityService } from 'src/app/Services/utility.service';
import { AccountLedgerSearchResultsChartComponent } from '../modals/account-ledger-search-results-chart/account-ledger-search-results-chart.component';
import { AgentFinderComponent } from 'src/app/General/quotation-desk/new-group-quotation-gb/modals/agent-finder/agent-finder.component';
import { QuoteFinderComponent } from 'src/app/Finance/shared/quote-finder/quote-finder.component';
import { PolicyFinderComponent } from 'src/app/Finance/shared/policy-finder/policy-finder.component';
import { ClientFinderComponent } from 'src/app/General/quotation-desk/new-group-quotation-gb/modals/client-finder/client-finder.component';

@Component({
  selector: 'app-start-account-ledger',
  templateUrl: './start-account-ledger.component.html',
  styleUrls: ['./start-account-ledger.component.scss']
})
export class StartAccountLedgerComponent implements OnInit {

  form = new FormGroup({
    company: new FormControl(null),
    branch: new FormControl(null),
    accLine: new FormControl(null),
    treatyGroup: new FormControl(null), // accountGroup
    accCode: new FormControl(null),
    ledgerCode: new FormControl(null),
    agentNo: new FormControl(null),
    providerNo: new FormControl(null),
    currency: new FormControl(null),
    prodClass: new FormControl(null),
    productCode: new FormControl(null),
    expCode: new FormControl(null), //expenseCode
    transNo: new FormControl(null),
    loanNo: new FormControl(null),
    policyNo: new FormControl(null),
    policyCode: new FormControl(null),
    policyNoSuffix: new FormControl(null),
    quoteNo: new FormControl(null),
    createdFrom: new FormControl(null, Validators.required),
    createdTo: new FormControl(null, Validators.required),
    narration: new FormControl(null),
    dnNo: new FormControl(null),
    clientNo: new FormControl(null),
    scheduled: new FormControl(null, Validators.required),
    // coverCode: new FormControl(null),
    // reinsProcessed: new FormControl(null),
  });

  isSearching: boolean = false;

  faSearch = faSearch;
  policyHolderCountSummaryChart:any;

  PolicyNo: any;

  companies: any[] = [];
  branches: any[] = [];
  accountGroups: any[] = [];
  accountCodes: any[] = [];
  ledgerCodes: any[] = [];
  currencies: any[] = [];
  productClasses: any[] = [];
  products: any[] = [];
  policyDetails: any;
  policyCodes: any[] = [];
  policySuffixNumbers: any[] = [];
  splices: string[];

  constructor(
    public accS: AccountExtrasService,
    public vS: AccountsService,
    private router: Router,
    public route:ActivatedRoute,
    public utilityService: UtilityService,
  ) {}
  ngOnInit(): void {
    this.policyComponent();
    this.getCompany();
    this.getAccountGroups();
    this.getLedgerCodes();
    this.getCurrency();
    this.getProductClass();
    this.getSplices();
  }

  show(accountCode) {
    console.log("SHOW ACCOUNT CODE "+ JSON.stringify(accountCode));
    this.router.navigate(['../create-account'], {
      queryParams: { redirect: 'show',accountCode: accountCode},relativeTo:this.route
    });
  }

  clone(accountCode) {
    console.log("CLONE ACCOUNT "+ JSON.stringify(accountCode));
    this.router.navigate(['../create-account'], {
      queryParams: { redirect: 'clone',accountCode: accountCode},relativeTo:this.route
    });
  }
  
  policyComponent(){
    const that = this;
    this.policyHolderCountSummaryChart = {
      type: 'bar' as ChartType,
      data: {
        labels: ['Corporate', 'Individual'],
        datasets: [{
          data: [800, 6000],
          backgroundColor: [
            '#BF40BF',
            '#00ee11',
          ],
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              padding: 10,
            },
            scaleLabel: {
              display: true,
              labelString: 'No of Clients',
              fontStyle: 'bold'
            },
          }],
          xAxes: [{
            gridLines: {
              color: "rgba(0,0,0,0)",
            },
            scaleLabel: {
              display: true,
              labelString: 'Client Type',
              fontStyle: 'bold'
            },
            ticks: {
              fontSize: 10
            }
          }]
        },
        legend: {
          display: false,
        },
        onClick: function (e) {

        },
      }
    }
  }

  getCompany() {  
    this.vS.getCompanyCodeAndDesc().subscribe((data) => {
      this.companies = data;
    })
  }

  getBranch(companyCode) {
    console.log(companyCode);
    this.vS.getBranchCodeAndDesc(companyCode).subscribe((data) => {
      this.branches = data;
    })
  }

  getAccountGroups() {
    this.vS.getAccountGroups('ACC_GROUP').subscribe((data) => {
      this.accountGroups = data;
    })
  }

  getAccountCodes() {
    this.vS.getAccountCodes().subscribe((data) => {
      this.accountCodes = data;
    })
  }

  getLedgerCodes() {
    this.vS.getLedgerCodes().subscribe((data) => {
      this.ledgerCodes = data.accCodes;
    })
  }
  
  getCurrency() {
    this.vS.getCurrency().subscribe((data) => {
      this.currencies = data;
    })
  }

  getProductClass() {
    this.vS.getAccountGroups('PRODUCT_CLASS').subscribe((data) => {
      this.productClasses = data;
    })
  }

  getProduct(productClass) {
    this.vS.getProduct(productClass).subscribe((data) => {
      this.products = data;
    })
  }

  getPolicyDetails(policyNo) {
    this.vS.getPolicyDetails(policyNo).subscribe((data) => {
      this.policyDetails = data;
      this.policyCodes = data.map((x) => x.policyCode);
      this.policySuffixNumbers =  data.map((x) => x.policyNoSuffix);
    })
  }
  
  getSplices(){
    this.vS.getFrequencySplices().subscribe(
      splices => this.splices = splices
    )
  }

  formatDate(date: string){
    // transform to the format the API is expecting
    return date + ' 00:00:00'
  }
  onSearch(){
    if (this.form.invalid){
      this.form.markAllAsTouched();
      return
    }

    this.isSearching = true;

    const payload = {...this.form.value}

    payload.createdFrom = payload.createdFrom ? this.formatDate(payload.createdFrom) : ""
    payload.createdTo = payload.createdTo ? this.formatDate(payload.createdTo) : ""

    this.vS.getAccountTransAmount(payload).subscribe(
      (res) => {
        this.utilityService.dialogOpener(
          AccountLedgerSearchResultsChartComponent,
          {
            minWidth: '50vw',
            data: {
              data: res,
              query: payload
            },
          },
          (r)=>{}
        )
      },
      (err) => {
        this.utilityService.info("Error: couldn't fetch account trans amount", 0)
      }
    ).add(() => this.isSearching = false)
  }

  findAgent(){
    this.utilityService.dialogOpener(
      AgentFinderComponent,
      { width: '60vw' },
      ({ agentNo }) => {
        this.form.patchValue({
          agentNo
        })
      }
    )
  }

  findQuote(){
    this.utilityService.dialogOpener(
      QuoteFinderComponent,
      { width: '60vw' },
      ({ quoteNo }) => {
        this.form.patchValue({
          quoteNo
        })
      }
    )
  }

  findPolicy(){
    this.utilityService.dialogOpener(
      PolicyFinderComponent,
      { width: '60vw' },
      ({ policyNo }) => {
        this.form.patchValue({
          policyNo
        });
        this.getPolicyDetails(policyNo);
      }
    )
  }

  findClient(){
    this.utilityService.dialogOpener(
      ClientFinderComponent,
      { width: '60vw' },
      ({ clientNo }) => {
        this.form.patchValue({
          clientNo
        });
      }
    )
  }

  findProvider(){}
}
