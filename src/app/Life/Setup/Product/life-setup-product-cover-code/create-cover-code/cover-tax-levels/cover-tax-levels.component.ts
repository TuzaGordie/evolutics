import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindProductService } from '../../../service/find-product.service';
import { CreateCoverCode, TaxesLevies } from '../../cover-code';
import { CoverService } from '../../cover-service.service';

@Component({
  selector: 'app-cover-tax-levels',
  templateUrl: './cover-tax-levels.component.html',
  styleUrls: ['./cover-tax-levels.component.scss']
})
export class CoverTaxLevelsComponent implements OnInit {

  @Input() createCoverCode: CreateCoverCode;
  @Input() action: string;  @ViewChildren('inp') inputs:QueryList<any>;
  @Input() coverCode: string

  premiumTaxesBasisList: any = []
  surrenderTaxesBasisList: any = []
  maturityTaxesBenefitBasisList: any = []
  deathTaxesBenefitBasisList: any = []
  stampDutyBasisList: any = []
  interestTaxesBasisList: any = []

  tablesCodeAndDesc: any[] = []

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
    this.setPremiumTaxBasis();
    this.setSurrenderBenefitTaxBasis();
    this.setMaturityBenefitTaxBasis();
    this.setDeathBenefitTaxBasis();
    this.setStampDuty();
    this.setInterestEarnedTaxBasis();
    this.setTratesDescAndDesc()

    if (!this.coverService.isCreate) {
      this.findProductService.getTaxLevies(this.coverCode)
        .subscribe((data: TaxesLevies) => {
          if (data == null) {
            this.createCoverCode.taxesLevies = new TaxesLevies()
            return
          }
          this.createCoverCode.taxesLevies = data;
          this.coverService.disableInputs(this.inputs);
        })
    }
  }


  @Input() loading = false
  @Input() loadingText = ""

  saveTax() {
    this.loading = true
    this.loadingText = "Saving Cover Tax And Levies...."
    this.createCoverCode.taxesLevies.code = this.createCoverCode.basic.basic.code
    this.coverService.saveTaxesLevies(this.createCoverCode.taxesLevies)
      .subscribe((data: TaxesLevies) => {
        this.loading = false
        this.util.notify("Cover Tax And Levies saved successfully!.")
        this.createCoverCode.taxesLevies = data
      }, () => {
        this.util.notify("Unable to save cover Tax and Levies!.", 0)
        this.loading = false
      })
  }

  setTratesDescAndDesc() {
    this.findProductService.getTratesCodeAndDesc().subscribe((res) => {
      this.tablesCodeAndDesc = res;
    });
  }

  setPremiumTaxBasis() {
    this.findProductService.getPremiumTaxBasis().subscribe((res) => {
      this.premiumTaxesBasisList = res;
      //console.log('Premium tax basis list', res);
    });
  }

  setSurrenderBenefitTaxBasis() {
    this.findProductService.getSurrenderBenefitTaxBasis().subscribe((res) => {
      this.surrenderTaxesBasisList = res;
      //console.log('Surrender tax basis list', res);
    });
  }

  setMaturityBenefitTaxBasis() {
    this.findProductService.getMaturityBenefitTaxBasis().subscribe((res) => {
      this.maturityTaxesBenefitBasisList = res;
      //console.log('Maturity tax benefit basis list', res);
    });
  }

  setDeathBenefitTaxBasis() {
    this.codeService.getCodesByCodeSubGroup("DEATH_TAX_BENEFIT_BASIS").subscribe((res) => {
      this.deathTaxesBenefitBasisList = res;
      //console.log('Tax Benefit basis list', res);
    });
  }

  setStampDuty() {
    this.codeService.getCodesByCodeSubGroup("STAMP_DUTY_BASIS").subscribe((res) => {
      this.stampDutyBasisList = res;
      //console.log('Stamp duty list', res);
    });
  }

  setInterestEarnedTaxBasis() {
    this.findProductService.getInterestEarnedTaxBasis().subscribe((res) => {
      this.interestTaxesBasisList = res;
      //console.log('Interest Tax basis list', res);
    });
  }


}
