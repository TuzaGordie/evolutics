import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { ControlPayout, ControlPayoutPayout, ControlPayoutProduct, CreateProcessControl } from '../control';
import { ControlPayoutService } from '../control.service';

@Component({
  selector: 'app-index-control',
  templateUrl: './index-control.component.html',
  styleUrls: ['./index-control.component.scss']
})
export class IndexProcessDesignControlComponent implements OnInit {
  private payoutBasis: number = 1;

  constructor(private controlService: ControlPayoutService, public router: Router, private companyService: CompanyService, private util: UtilityService, private codeService: CodeService) { }

  companies: any[] = []
  productClasses: any[] = []
  payoutReasons: any[] = []
  fileDownloads: any[] = []
  payoutBasisFiled: any[] = []

  controlPayout = new ControlPayout()
  controlPayoutPayout = new ControlPayoutPayout()
  controlPayoutProduct = new ControlPayoutProduct()
  createControlPayout = new CreateProcessControl(
    this.controlPayout,
    [this.controlPayoutPayout],
    [this.controlPayoutProduct]
  )
 

  loading = false
  loadingText = ""

  ngOnInit(): void {
    this.companyService.getCompanyCodeAndDesc().subscribe((data: any) => { this.companies = data })
    this.codeService.getCodesByCodeSubGroup("PRODUCT_CLASS").subscribe((data: any) => { this.productClasses = data })
    this.codeService.getCodesByCodeSubGroup("PAYOUT_REASON").subscribe((data: any) => { this.payoutReasons = data })
    this.codeService.getCodesByCodeSubGroup("PAYOUT_BASIS").subscribe((data: any) => { this.payoutBasisFiled = data })

    this.controlService.getFileDownloadCodeAndDesc().subscribe((data: any) => { this.fileDownloads = data })

  }

  getControlByCompanyCode() {
    this.controlService.getProcessControlByCompanyCode(this.createControlPayout.controlPayout.companyCode)
      .subscribe((data: CreateProcessControl) => {
        if (data == null) {
          this.util.notify("No data found for this company, create one!.", 2)
          return
        }

        this.createControlPayout.controlPayout = data.controlPayout

        this.createControlPayout.controlPayoutPayout = []
        this.createControlPayout.controlPayoutProduct = []

        data.controlPayoutPayout.map(payout => {
          payout.rowId = this.createControlPayout.controlPayoutPayout.length + 1
          this.createControlPayout.controlPayoutPayout.push(payout)
        })

        data.controlPayoutProduct.map(product => {
          product.rowId = this.createControlPayout.controlPayoutProduct.length + 1
          this.createControlPayout.controlPayoutProduct.push(product)
        })

        if (this.createControlPayout.controlPayoutProduct.length < 1) this.addPayoutProduct()
        if (this.createControlPayout.controlPayoutPayout.length < 1) this.addPayoutPayout()

      }, () => {
        this.util.notify("Error fetching control data!.", 0)
      })
  }

  saveControlPayout() {
    this.loading = true
    this.loadingText = "Saving process payout control...."

    // this.createControlPayout.controlPayoutProduct.map(product => product.prodClass = this.prodClass) no longer required

    console.log("this.createControlPayout", this.createControlPayout)

    this.controlService.createControlPayout(this.createControlPayout)
      .subscribe((data: any) => {
        this.loading = false
        this.createControlPayout = data
        this.util.notify("Process payout control has been saved successfully!.", 1)
      }, () => {
        this.loading = false
        this.util.notify("Unable to save control payout!.", 0)
      })
  }

  addPayoutPayout() {
    var controlPayoutPayout = new ControlPayoutPayout()
    controlPayoutPayout.rowId = this.createControlPayout.controlPayoutPayout.length + 1
    this.createControlPayout.controlPayoutPayout.push(controlPayoutPayout)
  }

  removePayoutPayout(i: number) {
    if (this.createControlPayout.controlPayoutPayout[i].id != null) {
      if (this.util.confirm("Do you want to delete this payout payout permanently?")) {
        this.controlService.deletePayoutPayout(this.createControlPayout.controlPayoutPayout[i].id)
          .subscribe(() => {
            this.util.notify("Payout Payout deleted successfully!.", 1)
            this.createControlPayout.controlPayoutPayout.splice(i, 1)
          }, () => this.util.notify("Internal server error!.", 0))
      }
    }
    else
      this.createControlPayout.controlPayoutPayout.splice(i, 1)
  }

  addPayoutProduct(i:number=this.createControlPayout?.controlPayoutProduct?.length||0) {
    var controlPayoutProduct = new ControlPayoutProduct()
    controlPayoutProduct.rowId = this.createControlPayout.controlPayoutProduct.length + 1
    this.createControlPayout.controlPayoutProduct.splice(i,0,controlPayoutProduct)
  }

  removePayoutProduct(i: number) {
    if (this.createControlPayout.controlPayoutProduct[i].id != null) {
      if (this.util.confirm("Do you want to delete this payout product permanently?")) {
        this.controlService.deletePayoutProduct(this.createControlPayout.controlPayoutProduct[i].id)
          .subscribe(() => {
            this.util.notify("Payout Product deleted successfully!.", 1)
            this.createControlPayout.controlPayoutProduct.splice(i, 1)
          }, () => this.util.notify("Internal server error!.", 0))
      }
    }
    else
      this.createControlPayout.controlPayoutProduct.splice(i, 1)
  }

  criteriaCounter() {
    return new Array(this.payoutBasis);
  }

  criteriaInc() {
    this.payoutBasis = this.payoutBasis + 1
  }

}
