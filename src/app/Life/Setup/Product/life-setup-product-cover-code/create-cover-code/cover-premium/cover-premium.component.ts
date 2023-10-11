import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindProductService } from '../../../service/find-product.service';
import { CoversDiscount, CoversPremiumFP, CoversPremiumFPVersion, CreateCoverCode, CreateCoverPremium, Premium } from '../../cover-code';
import { PremiumFrequency } from '../../cover-code-child';
import { CoverService } from '../../cover-service.service';

@Component({
  selector: 'app-cover-premium',
  templateUrl: './cover-premium.component.html',
  styleUrls: ['./cover-premium.component.scss']
})
export class CoverPremiumComponent implements OnInit {

  @Input() createCoverCode: CreateCoverCode;
  @Input() action: string;  @ViewChildren('inp') inputs:QueryList<any>;
  @Input() coverCode: string

  @Input() isCreate:boolean

  validators = Validators;
  premium: CreateCoverPremium

  showMode = false

  frequencyTableList: any = []
  paymentInMethodsList: any = []
  premiumCalcBasisList: any = []
  rateCalculationBasisList: any = []
  fixedRateCalcBasisList: any = []
  primaryPremiumRateList: any = []
  secondaryPremiumRateTableList: any = []
  shortTermRateTableList: any = []
  policyFeeBasisList: any = []
  policyFeeAmountTableList: any = []
  premiumRoundingBasisList: any = []
  discountCodeAllowedList: any = []
  amountTables: any[] = []
  policyFeeBasisValue: any;
  genRates: any[] = []

  coversPremium = new Premium()
  coversPremiumFP = new CoversPremiumFP()
  coversPremiumFPVersion = new CoversPremiumFPVersion()
  coverDiscounts = new CoversDiscount()

  @Input() loading = false
  @Input() loadingText = ""

  defaultVersionNo: number

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
    this.setRateCalculationBasis();
    this.setDiscountCodesAllowed();
    this.setFrequency();
    this.setPrimaryPremium();
    /*  this.setPremiumRoundingBasis() */
    this.setPrimaryPremiumRate();
    this.setShortTermRateTableList();
    this.setSecondaryPremiumRateTable();
    this.setMethodsList();
    this.setAmountTables();
    /* this.setPaymentInMethodsList(); */
    this.setPremiumCalcBasisList();
    this.setGenratesCodeAndDesc()
    this.setFixedRateCalcBasisList();
    this.setPolicyFeeBasisList();

    if (!this.coverService.isCreate) {
      this.findProductService.getPremium(this.coverCode)
        .subscribe((data: CreateCoverPremium) => {
          if (data == null) {
            this.createCoverCode.premium = new CreateCoverPremium(
              this.coversPremium,
              this.coversPremiumFP,
              [this.coversPremiumFPVersion],
              [this.coverDiscounts]
            );

            return;
          }

          this.createCoverCode.premium.coversPremium = data.coversPremium;

          this.createCoverCode.premium.coversDiscounts = [];
          this.createCoverCode.premium.coversPremiumFPVersion = [];

          data.coversPremiumFPVersion &&
            data.coversPremiumFPVersion.map((fpVersion) => {
              if (this.action == 'clone') delete fpVersion.id;
              fpVersion.rowId =
                this.createCoverCode.premium.coversPremiumFPVersion.length + 1;
              this.createCoverCode.premium.coversPremiumFPVersion.push(
                fpVersion
              );
            });

          data.coversDiscounts.map((disc) => {
            if (this.action == 'clone') delete disc.id;
            disc.rowId =
              this.createCoverCode.premium.coversDiscounts.length + 1;
            this.createCoverCode.premium.coversDiscounts.push(disc);
          });

          if (this.createCoverCode.premium.coversPremiumFPVersion.length < 1) {
            this.createCoverCode.premium.coversPremiumFPVersion = [
              new CoversPremiumFPVersion(),
            ];
            this.createCoverCode.premium.coversPremiumFP.versionNo =
              this.createCoverCode.premium.coversPremiumFPVersion.length + 1;
          }

          if (this.createCoverCode.premium.coversDiscounts.length < 1) {
            this.createCoverCode.premium.coversDiscounts = [
              new CoversDiscount(),
            ];
          }

          this.coverService.disableInputs(this.inputs);
        })
    }

    if (this.createCoverCode.premium.coversPremiumFPVersion.length < 1) {
      this.createCoverCode.premium.coversPremiumFPVersion = [new CoversPremiumFPVersion()]
    }

    if (this.createCoverCode.premium.coversDiscounts.length < 1) {
      this.createCoverCode.premium.coversDiscounts = [new CoversDiscount()]
    }

    if (this.createCoverCode.premium.coversPremiumFPVersion.length > 0) {
      this.showMode = true
      this.fetchByVersionNo(this.createCoverCode.premium.coversPremiumFPVersion[0].versionNo)
    }

    if (Object.keys(this.createCoverCode.premium.coversPremiumFP).length == 0 || this.createCoverCode.premium.coversPremiumFP == null) {
      this.createCoverCode.premium.coversPremiumFP = new CoversPremiumFP()
    }
  }

  fetchByVersionNo(version) {
    this.defaultVersionNo = version
    this.findProductService.getPremiumFPByVersionNoAndCode(parseInt(version), this.createCoverCode.basic.basic.code)
      .subscribe((res) => {
        if (res != null)
          this.createCoverCode.premium.coversPremiumFP = res;
          else this.createCoverCode.premium.coversPremiumFP = new CoversPremiumFP()
      });
  }

  setAmountTables() {
    this.findProductService.getPolicyFeeAmountTable().subscribe((res) => {
      this.amountTables = res;
      //console.log('primium rounding list', res);
    });
  }

  savePremium() {
    this.loading = true
    this.loadingText = "Saving Cover Premium...."
    this.createCoverCode.premium.coversPremium.code = this.createCoverCode.basic.basic.code
    this.createCoverCode.premium.coversPremiumFP.versionNo = this.defaultVersionNo

    this.coverService.savePremium(this.createCoverCode.premium)
      .subscribe((data: CreateCoverPremium) => {
        this.loading = false
        this.createCoverCode.premium.coversPremium = data.coversPremium
        this.createCoverCode.premium.coversPremiumFP = data.coversPremiumFP
        this.util.notify("Saved Cover Premium successfully!.", 1)

        this.createCoverCode.premium.coversDiscounts = []
        this.createCoverCode.premium.coversPremiumFPVersion = []

        data.coversDiscounts.map(disc => {
          disc.rowId = this.createCoverCode.premium.coversDiscounts.length + 1
          this.createCoverCode.premium.coversDiscounts.push(disc)
        })
        data.coversPremiumFPVersion.map(vers => {
          vers.rowId = this.createCoverCode.premium.coversPremiumFPVersion.length + 1
          this.createCoverCode.premium.coversPremiumFPVersion.push(vers)
        })

        if (this.createCoverCode.premium.coversPremiumFP.id != null) this.showMode = true
        if (this.createCoverCode.premium.coversDiscounts.length < 1) this.createCoverCode.premium.coversDiscounts.push(new CoversDiscount())
        if (this.createCoverCode.premium.coversPremiumFPVersion.length < 1) this.createCoverCode.premium.coversPremiumFPVersion.push(new CoversPremiumFPVersion())
      }, () => {
        this.loading = false
        this.util.notify("Unable to save Cover Premium!.", 0)
      })
  }

  cancelPremiumVersion() {
    this.createCoverCode.premium = this.premium
  }

  newPremiumVersion() {
    this.showMode = false
    // this.premium = this.createCoverCode.premium
    // this.createCoverCode.premium.coversPremiumFPVersion = []
    // this.createCoverCode.premium.coversPremiumFP = new CoversPremiumFP()
    var coversPremiumFPVersion = new CoversPremiumFPVersion()
    coversPremiumFPVersion.versionNo = this.createCoverCode.premium.coversPremiumFPVersion.length + 1
    coversPremiumFPVersion.rowId = this.createCoverCode.premium.coversPremiumFPVersion.length + 1
    this.createCoverCode.premium.coversPremiumFPVersion.push(coversPremiumFPVersion)

    this.createCoverCode.premium.coversPremiumFP = new CoversPremiumFP()
    this.createCoverCode.premium.coversPremiumFP.versionNo = this.createCoverCode.premium.coversPremiumFPVersion.length + 1
  }

  addPremiumVersion() {
    var premium = new CoversPremiumFPVersion()
    premium.rowId = this.createCoverCode.premium.coversPremiumFPVersion.length + 1
    this.createCoverCode.premium.coversPremiumFPVersion.push(premium)
  }

  async deletePremiumVersion(i: number) {
    if (this.createCoverCode.premium.coversPremiumFPVersion[i].id != null) {
      if (await this.util.confirm("Do you want to delete this Premium FP Version?")) {
        this.findProductService.deletePremiumVersion(this.createCoverCode.premium.coversPremiumFPVersion[i].id)
          .subscribe(
            () => {
              this.util.notify("Premium FP Version deleted successfully", 1)
              this.createCoverCode.premium.coversPremiumFPVersion.splice(i, 1)
            },
            () => this.util.notify("Unable to delete Premium FP Version!.", 0)
          )
      }
    } else
      this.createCoverCode.premium.coversPremiumFPVersion.splice(i, 1)
  }

  addNewFactorRow(index:number) {
    var premium = new PremiumFrequency()
    premium.rowId = this.createCoverCode.premium.coversPremium.premiumFrequency.length + 1
    this.createCoverCode.premium.coversPremium.premiumFrequency.splice(index,0,premium)
  }

  async deleteNewFactorRow(i: number) {
    if (this.createCoverCode.premium.coversPremium.premiumFrequency[i].id != null) {
      if (await this.util.confirm("Do you want to delete this Premium Frequency?")) {
        this.findProductService.deletePremiumVersion(this.createCoverCode.premium.coversPremium.premiumFrequency[i].id)
          .subscribe(
            () => {
              this.util.notify("Premium Frequency deleted successfully", 1)
              this.createCoverCode.premium.coversPremium.premiumFrequency.splice(i, 1)
            },
            () => this.util.notify("Unable to delete Premium Frequency!.", 0)
          )
      }
    } else
      this.createCoverCode.premium.coversPremium.premiumFrequency.splice(i, 1)
  }

  addNewdiscountCodeAllowedRow(i: number) {
    this.createCoverCode.premium.coversPremium.discountCodeAllowed.splice(i,0,"")
  }

  async deleteNewdiscountCodeAllowedRow(i: number) {
    if (this.createCoverCode.premium.coversPremium.discountCodeAllowed[i].id != null) {
      if (await this.util.confirm("Do you want to delete this Discount?")) {
        this.findProductService.deletePremiumVersion(this.createCoverCode.premium.coversPremium.discountCodeAllowed[i].id)
          .subscribe(
            () => {
              this.util.notify("Discount deleted successfully", 1)
              this.createCoverCode.premium.coversPremium.discountCodeAllowed.splice(i, 1)
            },
            () => this.util.notify("Unable to delete Discount!.", 0)
          )
      }
    } else
      this.createCoverCode.premium.coversPremium.discountCodeAllowed.splice(i, 1)
  }

  setGenratesCodeAndDesc() {
    this.findProductService.getPremiumFPS()
      .subscribe((data: any) => {
        this.genRates = data
      })
  }

  onSelectPolicyFeeBasis() {
    this.findProductService.getPremiumFPS()
      .subscribe((data: any) => {

      })
  }

  setDiscountCodesAllowed() {
    this.findProductService.getDiscountCodesAllowed().subscribe((res) => {
      this.discountCodeAllowedList = res;
      //console.log(' Discount codes Allowed', res);
    });
  }

  setPrimaryPremium() {
    this.findProductService.getPrimaryPremium().subscribe((res) => {
      this.premiumRoundingBasisList = res;
      //console.log('primium rounding list', res);
    });
  }

  setShortTermRateTableList() {
    this.findProductService.getShortTermRateTableList().subscribe((res) => {
      this.shortTermRateTableList = res;
      //console.log('---setShortTermRateTableList list', res);
    });
  }

  setPolicyFeeAmountTable() {
    this.findProductService.getPolicyFeeAmountTable().subscribe((res) => {
      this.policyFeeAmountTableList = res;
      //console.log('Policy Fee Basis list', res);
    });
  }

  setPolicyFeeBasisList() {
    this.findProductService.getPolicyFeeBasis().subscribe((res) => {
      this.policyFeeBasisList = res;
      //console.log('Policy Fee Basis list', res);
    });
  }

  setPremiumCalcBasisList() {
    this.findProductService.getPremiumCalcBasis().subscribe((res) => {
      this.premiumCalcBasisList = res;
      //console.log('Premium Calc Basis list', res);
    });
  }

  setSecondaryPremiumRateTable() {
    this.findProductService.getSecondaryPremiumRateTable().subscribe((res) => {
      this.secondaryPremiumRateTableList = res;
      //console.log('setShortTermRateTableList list', res);
    });
  }

  setPrimaryPremiumRate() {
    this.findProductService.getPrimaryPremiumRate().subscribe((res) => {
      this.primaryPremiumRateList = res;
      //console.log('Primary Premium Rate', res);
    });
  }

  setFixedRateCalcBasisList() {
    this.findProductService.getFixedRateCalcBasis().subscribe((res) => {
      this.fixedRateCalcBasisList = res;
      //console.log('Fixed Rate Calc Basis list', res);
    });
  }

  setRateCalculationBasis() {
    this.findProductService.getRateCalculationBasis().subscribe((res) => {
      this.rateCalculationBasisList = res;
      //console.log('getRateCalculationBasis list', res);
    });
  }

  setFrequency() {
    this.findProductService.getFrequency().subscribe((res) => {
      this.frequencyTableList = res;
      //console.log('Frequency Payment list', res);
    });
  }

  setMethodsList() {
    this.findProductService.getMethodsList().subscribe((res) => {
      this.paymentInMethodsList = res;
      //console.log('Payment in methods list', res);
    });
  }

}
