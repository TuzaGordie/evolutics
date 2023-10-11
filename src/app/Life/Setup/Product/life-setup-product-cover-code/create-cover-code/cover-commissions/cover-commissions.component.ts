import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindProductService } from '../../../service/find-product.service';
import { Commission, CreateCoverCode } from '../../cover-code';
import { CoversCommissionRates, CoversCommissionVersions } from '../../cover-code-child';
import { CoverService } from '../../cover-service.service';

@Component({
  selector: 'app-cover-commissions',
  templateUrl: './cover-commissions.component.html',
  styleUrls: ['./cover-commissions.component.scss']
})
export class CoverCommissionsComponent implements OnInit {

  @Input() createCoverCode: CreateCoverCode;
  @Input() action: string;  @ViewChildren('inp') inputs:QueryList<any>;
  @Input() coverCode: string

  commissionCodesList: any = []
  commissionEarningList: any = []
  agentTypeList: any = []
  referralPaymentBasisList: any = []
  telemarketerRemBasisList: any = []
  clawbackBasisList: any = []
  clawbackSpreadBasisList: any = []
  referralPaymentTableList: any = []
  tmRemTableList: any = []
  clawbackTableList: any = []

  versionNo = 0

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
    this.setCommissionEarning();
    this.setCommissionCode();
    this.setAgentType();
    this.setReferralPayment();
    this.setTelemarketingRem();
    this.setAgentClawback();
    this.setCLawbackSpreadBasis();
    this.setReferralPaymentTable();
    this.setRemTable();
    this.setClawbackTable();

    if (!this.coverService.isCreate) {
      this.findProductService.getCommission(this.coverCode)
        .subscribe((data: Commission) => {
          console.log('COMMISSION:::::', data)
          if (data == null) {
            this.createCoverCode.commission = new Commission()
            return
          }
          if (this.action == "clone") delete this.createCoverCode.commission.id

          this.createCoverCode.commission = data

          data.coversCommissionVersions.map(version => {
            version.rowId = this.createCoverCode.commission.coversCommissionVersions.length + 1
            this.createCoverCode.commission.coversCommissionVersions.push(version)
          })
          data.coversCommissionRates.map(rate => {
            rate.rowId = this.createCoverCode.commission.coversCommissionRates.length + 1
            this.createCoverCode.commission.coversCommissionRates.push(rate)
          })      ; 
          this.coverService.disableInputs(this.inputs);
        })
    }

    if (this.createCoverCode.commission.id != null) this.showMode = true
  }

  @Input() loading = false
  @Input() loadingText = ""

  showMode = false

  getCommisionRateByVersionNoAndCode(version) {
    this.findProductService.getCommissionRateByVersionNOAndCode(parseInt(version), this.createCoverCode.basic.basic.code)
      .subscribe((res) => {
        this.createCoverCode.commission = res
      });
  }

  savecommission() {
    this.loading = true
    this.loadingText = "Saving Cover Commission..."

    this.createCoverCode.commission.code = this.createCoverCode.basic.basic.code

    this.createCoverCode.commission.coversCommissionRates.length > 0 && this.createCoverCode.commission.coversCommissionRates.map(rates => {
      rates.versionNo = this.createCoverCode.commission.coversCommissionVersions.length
      return rates;
    })

    this.coverService.saveCommission(this.createCoverCode.commission)
      .subscribe((data: Commission) => {
        this.loading = false
        this.util.notify("Cover Commission saved successfully!.")
        this.createCoverCode.commission = data
        if (this.createCoverCode.commission.id != null) this.showMode = true
      }, () => {
        this.loading = false
        this.util.notify("Unable to save Cover Commission!.", 0)
      })
  }

  addNewcommissionRow() {
    var rates = new CoversCommissionRates()
    rates.rowId = this.createCoverCode.commission.coversCommissionRates.length + 1
    this.createCoverCode.commission.coversCommissionRates.push(rates)
  }

  async deleteNewcommissionRow(i: number) {
    if (this.createCoverCode.commission.coversCommissionRates[i].id != null) {
      if (await this.util.confirm("Do you want to delete this Commission Rate?")) {
        this.findProductService.deleteCommissionRate(this.createCoverCode.commission.coversCommissionRates[i].id)
          .subscribe(
            () => {
              this.util.notify("Commission Rate deleted successfully", 1)
              this.createCoverCode.commission.coversCommissionRates.splice(i, 1)
            },
            () => this.util.notify("Unable to delete Commission Rate!.", 0)
          )
      }
    } else
      this.createCoverCode.commission.coversCommissionRates.splice(i, 1)
  }

  addNewVersionArrayRow(index:number) {
    this.showMode = false

    var version = new CoversCommissionVersions()
    version.rowId = this.createCoverCode.commission.coversCommissionVersions.length + 1
    version.versionNo = this.createCoverCode.commission.coversCommissionVersions.length + 1
    this.createCoverCode.commission.coversCommissionVersions.splice(index,0,version)
    let no=1;
    // this.createCoverCode.commission.coversCommissionVersions.forEach(x=>x.versionNo=no++)
  }

  async deleteNewVersionArrayRow(i: number) {
    if (this.createCoverCode.commission.coversCommissionVersions[i].id != null) {
      if (await this.util.confirm("Do you want to delete this Commission Version?")) {
        this.findProductService.deleteCommissionVersion(this.createCoverCode.commission.coversCommissionVersions[i].id)
          .subscribe(
            () => {
              this.util.notify("Commission Version deleted successfully", 1)
              this.createCoverCode.commission.coversCommissionVersions.splice(i, 1)
            },
            () => this.util.notify("Unable to delete Commission Version!.", 0)
          )
      }
    } else
      this.createCoverCode.commission.coversCommissionVersions.splice(i, 1)
  }

  setClawbackTable() {
    this.findProductService.getClawbackTable().subscribe((res) => {
      this.clawbackTableList = res;
      //console.log('Clawback table list', res);
    });
  }

  setRemTable() {
    this.findProductService.getRemTable().subscribe((res) => {
      this.tmRemTableList = res;
      //console.log('TM Rem table list', res);
    });
  }

  setReferralPaymentTable() {
    this.findProductService.getReferralPaymentTable().subscribe((res) => {
      this.referralPaymentTableList = res;
      //console.log('RF table list', res);
    });
  }

  setCLawbackSpreadBasis() {
    this.findProductService.getCLawbackSpreadBasis().subscribe((res) => {
      this.clawbackSpreadBasisList = res;
      //console.log('Clawback spread basis list', res);
    });
  }

  setAgentClawback() {
    this.findProductService.getAgentClawback().subscribe((res) => {
      this.clawbackBasisList = res;
      //console.log('Clawback basis list', res);
    });
  }

  setTelemarketingRem() {
    this.findProductService.getTelemarketingRem().subscribe((res) => {
      this.telemarketerRemBasisList = res;
      //console.log('Telemarketer Rem list', res);
    });
  }

  setReferralPayment() {
    this.findProductService.getReferralPayment().subscribe((res) => {
      this.referralPaymentBasisList = res;
      //console.log('Referral Type list', res);
    });
  }

  setAgentType() {
    this.findProductService.getAgentType().subscribe((res) => {
      this.agentTypeList = res;
      //console.log('---Agent type list', res);
    });
  }

  setCommissionEarning() {
    this.findProductService.getCommissionEarning().subscribe((res) => {
      this.commissionEarningList = res;
      //console.log('Commission earning list', res);
    });
  }

  setCommissionCode() {
    this.findProductService.getCommTypeCodeAndDesc().subscribe((res) => {
      this.commissionCodesList = res;
      //console.log('Commission earning list', res);
    });
  }

}
