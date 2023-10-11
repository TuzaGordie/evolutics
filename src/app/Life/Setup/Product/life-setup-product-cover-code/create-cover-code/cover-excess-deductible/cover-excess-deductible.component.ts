import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindProductService } from '../../../service/find-product.service';
import { CoversDeductibleOpt, CoversExcessOpt, CreateCoverCode, CreateExcessDeductible, Deductible, Excess } from '../../cover-code';
import { CoverService } from '../../cover-service.service';

@Component({
  selector: 'app-cover-excess-deductible',
  templateUrl: './cover-excess-deductible.component.html',
  styleUrls: ['./cover-excess-deductible.component.scss']
})
export class CoverExcessDeductibleComponent implements OnInit {

  @Input() createCoverCode: CreateCoverCode;
  @Input() action: string;  @ViewChildren('inp') inputs:QueryList<any>;
  @Input() coverCode: string

  excess = new Excess()
  deductible = new Deductible()
  excessOpts = new CoversExcessOpt()
  deductibleOpts = new CoversDeductibleOpt()

  excessCalcList: any = []
  excessTableList: any = []
  deductibleCalcList: any = []
  deductibleList: any[] = []

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
    this.setExcessCalcBasis();
    this.setExcessTable();
    this.setDeductibleTable();

    if (!this.coverService.isCreate) {
      this.findProductService.getExcessDeductible(this.coverCode)
        .subscribe((data: CreateExcessDeductible) => {
          if(data == null || data.excess == null) {
            this.createCoverCode.excessDeductible = new CreateExcessDeductible(
              this.excess,
              this.deductible,
              [this.deductibleOpts],
              [this.excessOpts]
            )
            return
          }
          this.createCoverCode.excessDeductible.excess = data.excess
          this.createCoverCode.excessDeductible.deductible = data.deductible

          this.createCoverCode.excessDeductible.excessOpts = []
          this.createCoverCode.excessDeductible.coversDeductibleOpt = []

          data.excessOpts && data.excessOpts.map(opt => {
            if (this.action == "clone") delete opt.id
            opt.rowId = this.createCoverCode.excessDeductible.excessOpts.length + 1
            this.createCoverCode.excessDeductible.excessOpts.push(opt)
          })

          data.coversDeductibleOpt && data.coversDeductibleOpt.map(opt => {
            if (this.action == "clone") delete opt.id
            opt.rowId = this.createCoverCode.excessDeductible.coversDeductibleOpt.length + 1
            this.createCoverCode.excessDeductible.coversDeductibleOpt.push(opt)
          })

          if (this.createCoverCode.excessDeductible.excessOpts.length < 1) this.createCoverCode.excessDeductible.excessOpts.push(new CoversExcessOpt())
          if (
            this.createCoverCode.excessDeductible.coversDeductibleOpt.length < 1
          )
            this.createCoverCode.excessDeductible.coversDeductibleOpt.push(
              new CoversDeductibleOpt()
            );
          this.coverService.disableInputs(this.inputs);      
        })
    }

    if (this.createCoverCode.excessDeductible.excessOpts == null || this.createCoverCode.excessDeductible.excessOpts.length < 1) this.createCoverCode.excessDeductible.excessOpts.push(new CoversExcessOpt())
    if (this.createCoverCode.excessDeductible.coversDeductibleOpt == null || this.createCoverCode.excessDeductible.coversDeductibleOpt.length < 1) this.createCoverCode.excessDeductible.coversDeductibleOpt.push(new CoversDeductibleOpt())

  }

  @Input() loading = false
  @Input() loadingText = ""

  saveExceDeductable() {
    this.loading = true
    this.loadingText = "Saving Cover Deductible...."

    this.createCoverCode.excessDeductible.excess.code = this.createCoverCode.basic.basic.code
    this.createCoverCode.excessDeductible.deductible.code = this.createCoverCode.basic.basic.code
    this.createCoverCode.excessDeductible.excessOpts.map(opt => opt.code = this.createCoverCode.basic.basic.code)
    this.createCoverCode.excessDeductible.coversDeductibleOpt.map(opt => opt.coverCode = this.createCoverCode.basic.basic.code)

    this.coverService.saveExcessDeductible(this.createCoverCode.excessDeductible)
      .subscribe((data: CreateExcessDeductible) => {
        this.loading = false
        this.util.notify("Cover Excess and Deductable saved successfully!.")
        this.createCoverCode.excessDeductible.excess = data.excess
        this.createCoverCode.excessDeductible.deductible = data.deductible

        this.createCoverCode.excessDeductible.excessOpts = []
        this.createCoverCode.excessDeductible.coversDeductibleOpt = []

        data.excessOpts.map(opt => {
          opt.rowId = this.createCoverCode.excessDeductible.excessOpts.length + 1
          this.createCoverCode.excessDeductible.excessOpts.push(opt)
        })
        data.coversDeductibleOpt.map(opt => {
          opt.rowId = this.createCoverCode.excessDeductible.coversDeductibleOpt.length + 1
          this.createCoverCode.excessDeductible.coversDeductibleOpt.push(opt)
        })
      }, () => {
        this.util.notify("Unable to save cover excess and Deductible!.", 0)
        this.loading = false
      })
  }

  setExcessCalcBasis() {
    this.codeService.getCodesByCodeSubGroup("EXCESS").subscribe((res) => {
      this.excessCalcList = res;
    });
  }

  setDeductibleTable() {
    this.codeService.getCodesByCodeSubGroup("DEDUCTIBLE").subscribe((res) => {
      this.deductibleCalcList = res;
    });
  }

  setExcessTable() {
    this.findProductService.getExcessTable().subscribe((res) => {
      this.excessTableList = res;
    });
  }

  getDeductibleTableByCatD() {
    this.findProductService.getDeductibleTableByCatD().subscribe((res) => {
      this.deductibleList = res;
    });
  }

  addExcessOpts() {
    var opt = new CoversExcessOpt()
    opt.rowId = this.createCoverCode.excessDeductible.excessOpts.length + 1
    this.createCoverCode.excessDeductible.excessOpts.push(opt)
  }

  async removeExcessOpts(i: number) {
    if (this.createCoverCode.excessDeductible.excessOpts[i].id != null) {
      if (await this.util.confirm("Do you want to delete this Excess opt?")) {
        this.findProductService.removeExcessOpts(this.createCoverCode.excessDeductible.excessOpts[i].id)
          .subscribe(
            () => {
              this.util.notify("Excess opt deleted successfully", 1)
              this.createCoverCode.excessDeductible.excessOpts.splice(i, 1)
            },
            () => this.util.notify("Unable to delete Excess opt!.", 0)
          )
      }
    } else
      this.createCoverCode.excessDeductible.excessOpts.splice(i, 1)
  }

  addDeductibleOpt() {
    var opt = new CoversDeductibleOpt()
    opt.rowId = this.createCoverCode.excessDeductible.coversDeductibleOpt.length + 1
    this.createCoverCode.excessDeductible.coversDeductibleOpt.push(opt)
  }

  async removeDeductibleOpt(i: number) {
    if (this.createCoverCode.excessDeductible.excessOpts[i].id != null) {
      if (await this.util.confirm("Do you want to delete this Excess opt?")) {
        this.findProductService.removeDeductibleOpt(this.createCoverCode.excessDeductible.excessOpts[i].id)
          .subscribe(
            () => {
              this.util.notify("Excess opt deleted successfully", 1)
              this.createCoverCode.excessDeductible.excessOpts.splice(i, 1)
            },
            () => this.util.notify("Unable to delete Excess opt!.", 0)
          )
      }
    } else
      this.createCoverCode.excessDeductible.coversDeductibleOpt.splice(i, 1)
  }

}
