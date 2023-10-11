import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindProductService } from '../../../service/find-product.service';
import { CreateCoverCode, Loan } from '../../cover-code';
import { CoverService } from '../../cover-service.service';

@Component({
  selector: 'app-cover-loan',
  templateUrl: './cover-loan.component.html',
  styleUrls: ['./cover-loan.component.scss']
})
export class CoverLoanComponent implements OnInit {

  @Input() createCoverCode: CreateCoverCode;
  @Input() action: string;  @ViewChildren('inp') inputs:QueryList<any>;
  @Input() coverCode: string

  premiumLoanBasisList: any = []
  PolicyloanInterestTableList: any = []
  maxLoanCalcBasisList: any = []

  constructor(
    public findProductService: FindProductService,
    private activatedRoute: ActivatedRoute,
    private codeService: CodeService,
    private router: Router,
    private util: UtilityService,
    private companyService: CompanyService,
    public coverService: CoverService
  ) { }
  ngAfterViewInit(): void {
    this.coverService.disableInputs(this.inputs);
  }
  ngOnInit(): void {
    this.setPremiumloanbasis();
    this.setMaxloancalculationbasis();
    this.setPolicyloanInterestTable();

    if (!this.coverService.isCreate) {
      this.findProductService.getLoan(this.coverCode)
        .subscribe((data: Loan) => {
          if (data == null) {
            this.createCoverCode.loan = new Loan()
            return
          }
          this.createCoverCode.loan = data;
          this.coverService.disableInputs(this.inputs);
        })
    }
  }

  @Input() loading = false
  @Input() loadingText = ""

  saveLoan() {
    this.loading = true
    this.loadingText = "Saving Cover Loan...."

    this.createCoverCode.loan.code = this.createCoverCode.basic.basic.code

    this.coverService.saveLoan(this.createCoverCode.loan)
      .subscribe((data: Loan) => {
        this.loading = false
        this.util.notify("Cover Loan saved successfully!.", 1)
        this.createCoverCode.loan = data
      }, () => {
        this.util.notify("Unable to save cover loan!.", 0)
        this.loading = false
      })
  }

  setPremiumloanbasis() {
    this.findProductService.getPremiumloanbasis().subscribe((res) => {
      this.premiumLoanBasisList = res;
    });
  }

  setMaxloancalculationbasis() {
    this.findProductService.getMaxloancalculationbasis().subscribe((res) => {
      this.maxLoanCalcBasisList = res;
    });
  }
  setPolicyloanInterestTable() {
    this.findProductService.getPolicyloanInterestTable().subscribe((res) => {
      this.PolicyloanInterestTableList = res;
    });
  }

}
