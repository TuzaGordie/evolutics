import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindProductService } from '../../../service/find-product.service';
import { CoversBenTermOpt, CoversPremTermOpt, CreateCoverCode, CreateTerms, Terms, TermsOpts } from '../../cover-code';
import { CoverService } from '../../cover-service.service';

@Component({
  selector: 'app-cover-terms',
  templateUrl: './cover-terms.component.html',
  styleUrls: ['./cover-terms.component.scss']
})
export class CoverTermsComponent implements OnInit {

  @Input() createCoverCode: CreateCoverCode;
  @Input() action: string;  @ViewChildren('inp') inputs:QueryList<any>;
  @Input() coverCode: string

  maturityBasisList: any = []
  ageCalcBasisList: any = []

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
    this.setMaturityBase();
    this.setAgeCalcBasis();

    if (!this.coverService.isCreate) {
      this.findProductService.getTerms(this.coverCode)
        .subscribe((data: CreateTerms) => {
          if (data.coversTerms == null) {
            this.createCoverCode.terms.coversTerms = new Terms()
            this.createCoverCode.terms.coversTermsOpts = [new TermsOpts()]
            this.createCoverCode.terms.coversPremTermOpt = [new CoversPremTermOpt()]
            this.createCoverCode.terms.coversBenTermOpt = [new CoversBenTermOpt()]
            return
          }
          this.createCoverCode.terms.coversTerms = data.coversTerms

          this.createCoverCode.terms.coversTermsOpts = []
          this.createCoverCode.terms.coversPremTermOpt = []
          this.createCoverCode.terms.coversBenTermOpt = []

          data.coversTermsOpts && data.coversTermsOpts.map(opt => {
            if (this.action == "clone") delete opt.id
            opt.rowId = this.createCoverCode.terms.coversTermsOpts.length + 1
            var years = opt.policyTermMonth / 12
            opt.months = opt.policyTermMonth % 12
            opt.years = parseInt(years.toFixed(0))
            this.createCoverCode.terms.coversTermsOpts.push(opt)
          })

          data.coversPremTermOpt && data.coversPremTermOpt.map(opt => {
            if (this.action == "clone") delete opt.id
            opt.rowId = this.createCoverCode.terms.coversPremTermOpt.length + 1
            var years = opt.premPayTermMonth / 12
            opt.months = opt.premPayTermMonth % 12
            opt.years = parseInt(years.toFixed(0))
            this.createCoverCode.terms.coversPremTermOpt.push(opt)
          })

          data.coversBenTermOpt && data.coversBenTermOpt.map(opt => {
            if (this.action == "clone") delete opt.id
            opt.rowId = this.createCoverCode.terms.coversBenTermOpt.length + 1
            var years = opt.benPayTermMonth / 12
            opt.months = opt.benPayTermMonth % 12
            opt.years = parseInt(years.toFixed(0))
            this.createCoverCode.terms.coversBenTermOpt.push(opt)
          })

          if (this.createCoverCode.terms.coversTermsOpts.length < 1) this.createCoverCode.terms.coversTermsOpts = [new TermsOpts()]
          if (this.createCoverCode.terms.coversPremTermOpt.length < 1) this.createCoverCode.terms.coversPremTermOpt = [new CoversPremTermOpt()]
          if (this.createCoverCode.terms.coversBenTermOpt.length < 1)
            this.createCoverCode.terms.coversBenTermOpt = [
              new CoversBenTermOpt(),
            ];
          this.coverService.disableInputs(this.inputs);
        })

      if (this.createCoverCode.terms.coversTermsOpts.length < 1) this.createCoverCode.terms.coversTermsOpts = [new TermsOpts()]
      if (this.createCoverCode.terms.coversPremTermOpt.length < 1) this.createCoverCode.terms.coversPremTermOpt = [new CoversPremTermOpt()]
      if (this.createCoverCode.terms.coversBenTermOpt.length < 1) this.createCoverCode.terms.coversBenTermOpt = [new CoversBenTermOpt()]

    }

  }

  @Input() loading = false
  @Input() loadingText = ""

  saveTerms() {
    this.loading = true
    this.loadingText = "Saving Cover Terms...."

    this.createCoverCode.terms.coversTermsOpts.map(opt => {
      var months: number = (opt.years * 12) + opt.months
      opt.policyTermMonth = months
      return opt
    })

    this.createCoverCode.terms.coversBenTermOpt.map(opt => {
      var months: number = (opt.years * 12) + opt.months
      opt.benPayTermMonth = months
      return opt
    })

    this.createCoverCode.terms.coversPremTermOpt.map(opt => {
      var months: number = (opt.years * 12) + opt.months
      opt.premPayTermMonth = months
      return opt
    })

    this.createCoverCode.terms.coversTerms.code = this.createCoverCode.basic.basic.code

    this.coverService.saveTerms(this.createCoverCode.terms)
      .subscribe((data: CreateTerms) => {
        this.loading = false
        this.util.notify("Cover Terms saved successfully!.", 1)

        this.createCoverCode.terms.coversTerms = data.coversTerms
        this.createCoverCode.terms.coversTermsOpts = []
        this.createCoverCode.terms.coversPremTermOpt = []
        this.createCoverCode.terms.coversBenTermOpt = []

        data.coversTermsOpts.map(opt => {
          opt.rowId = this.createCoverCode.terms.coversTermsOpts.length + 1
          var years: number = opt.policyTermMonth / 12
          opt.months = opt.policyTermMonth % 12
          opt.years = parseInt(years.toFixed(0))
          this.createCoverCode.terms.coversTermsOpts.push(opt)
        })

        data.coversPremTermOpt.map(opt => {
          opt.rowId = this.createCoverCode.terms.coversPremTermOpt.length + 1
          var years: number = opt.premPayTermMonth / 12
          opt.months = opt.premPayTermMonth % 12
          opt.years = parseInt(years.toFixed(0))
          this.createCoverCode.terms.coversPremTermOpt.push(opt)
        })

        data.coversBenTermOpt.map(opt => {
          opt.rowId = this.createCoverCode.terms.coversBenTermOpt.length + 1
          var years: number = opt.benPayTermMonth / 12
          opt.months = opt.benPayTermMonth % 12
          opt.years = parseInt(years.toFixed(0))
          this.createCoverCode.terms.coversBenTermOpt.push(opt)
        })

        if (this.createCoverCode.terms.coversTermsOpts.length < 1) this.createCoverCode.terms.coversTermsOpts = [new TermsOpts()]
        if (this.createCoverCode.terms.coversPremTermOpt.length < 1) this.createCoverCode.terms.coversPremTermOpt = [new CoversPremTermOpt()]
        if (this.createCoverCode.terms.coversBenTermOpt.length < 1) this.createCoverCode.terms.coversBenTermOpt = [new CoversBenTermOpt()]

      }, () => {
        this.util.notify("Unable to save cover terms!.", 0)
        this.loading = false
      })
  }

  setMaturityBase() {
    this.findProductService.getMaturityBase().subscribe((res) => {
      this.maturityBasisList = res;
    });
  }

  setAgeCalcBasis() {
    this.findProductService.getAgeCalcBasis().subscribe((res) => {
      this.ageCalcBasisList = res;
    });
  }

  addTermOpt() {
    var termOpt = new TermsOpts()
    termOpt.rowId = this.createCoverCode.terms.coversTermsOpts.length + 1
    this.createCoverCode.terms.coversTermsOpts.push(termOpt)
  }

  async removeTermOpt(i: number) {
    if (this.createCoverCode.terms.coversTermsOpts[i].id != null) {
      if (await this.util.confirm("Do you want to delete this Term Opt?")) {
        this.findProductService.removeTermOpt(this.createCoverCode.terms.coversTermsOpts[i].id)
          .subscribe(
            () => {
              this.util.notify("Term Opt deleted successfully", 1)
              this.createCoverCode.terms.coversTermsOpts.splice(i, 1)
            },
            () => this.util.notify("Unable to delete Term Opt!.", 0)
          )
      }
    } else
      this.createCoverCode.terms.coversTermsOpts.splice(i, 1)
  }

  addBenTermOpt() {
    var termOpt = new CoversBenTermOpt()
    termOpt.rowId = this.createCoverCode.terms.coversTermsOpts.length + 1
    this.createCoverCode.terms.coversBenTermOpt.push(termOpt)
  }

  async removeBenTermOpt(i: number) {
    if (this.createCoverCode.terms.coversBenTermOpt[i].id != null) {
      if (await this.util.confirm("Do you want to delete this Benefit term Opt?")) {
        this.findProductService.removeBenTermOpt(this.createCoverCode.terms.coversBenTermOpt[i].id)
          .subscribe(
            () => {
              this.util.notify("Benefit term Opt deleted successfully", 1)
              this.createCoverCode.terms.coversBenTermOpt.splice(i, 1)
            },
            () => this.util.notify("Unable to delete Benefit term Opt!.", 0)
          )
      }
    } else
      this.createCoverCode.terms.coversBenTermOpt.splice(i, 1)
  }

  addPremTermOpt() {
    var termOpt = new CoversPremTermOpt()
    termOpt.rowId = this.createCoverCode.terms.coversTermsOpts.length + 1
    this.createCoverCode.terms.coversPremTermOpt.push(termOpt)
  }

  async removePremTermOpt(i: number) {
    if (this.createCoverCode.terms.coversPremTermOpt[i].id != null) {
      if (await this.util.confirm("Do you want to delete this Premium terms Rate?")) {
        this.findProductService.removePremTermOpt(this.createCoverCode.terms.coversPremTermOpt[i].id)
          .subscribe(
            () => {
              this.util.notify("Premium terms Rate deleted successfully", 1)
              this.createCoverCode.terms.coversPremTermOpt.splice(i, 1)
            },
            () => this.util.notify("Unable to delete Premium terms Rate!.", 0)
          )
      }
    } else
      this.createCoverCode.terms.coversPremTermOpt.splice(i, 1)
  }

}
