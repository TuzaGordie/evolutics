import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindProductService } from '../../../service/find-product.service';
import { CreateCoverCode, PaidUp } from '../../cover-code';
import { CoverService } from '../../cover-service.service';

@Component({
  selector: 'app-cover-paid-up',
  templateUrl: './cover-paid-up.component.html',
  styleUrls: ['./cover-paid-up.component.scss']
})
export class CoverPaidUpComponent implements OnInit {

  @Input() createCoverCode: CreateCoverCode;
  @Input() action: string;  @ViewChildren('inp') inputs:QueryList<any>;
  @Input() coverCode: string

  benefitRecalcBasisList: any = []
  benefitRecalcTableList: any = []
  reinstCalcBasisList: any = []

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
    this.SetBenifitrecalcBasis();
    this.SetBenifitrecalcTable();
    this.SetReinstatementCalcBasis();

    if (!this.coverService.isCreate) {
      this.findProductService.getPaidUp(this.coverCode)
        .subscribe((data: PaidUp) => {
          if (data == null) {
            this.createCoverCode.paidUp = new PaidUp()
            return
          }
          this.createCoverCode.paidUp = data;
          this.coverService.disableInputs(this.inputs);
        })
    }
  }


  @Input() loading = false
  @Input() loadingText = ""

  savePaidUp() {
    this.loading = true
    this.loadingText = "Saving Cover Paid Up...."

    this.createCoverCode.paidUp.code = this.createCoverCode.basic.basic.code

    this.coverService.savePaidUp(this.createCoverCode.paidUp)
      .subscribe((data: PaidUp) => {
        this.loading = false
        this.util.notify("Cover Paid Up saved successfully!.")
        this.createCoverCode.paidUp = data
      }, () => {
        this.util.notify("Unable to save cover paid up!.")
        this.loading = false
      })
  }

  SetBenifitrecalcBasis() {
    this.findProductService.getBenifitrecalcBasis().subscribe((res) => {
      this.benefitRecalcBasisList = res;
    });
  }
  SetBenifitrecalcTable() {
    this.findProductService.getBenifitrecalcTable().subscribe((res) => {
      this.benefitRecalcTableList = res;
    });
  }
  SetReinstatementCalcBasis() {
    this.findProductService.getReinstatementCalcBasis().subscribe((res) => {
      this.reinstCalcBasisList = res;
    });
  }


}
