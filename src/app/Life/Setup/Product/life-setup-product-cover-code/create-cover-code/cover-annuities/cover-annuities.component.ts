import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindProductService } from '../../../service/find-product.service';
import { Annuities, CreateCoverCode } from '../../cover-code';
import { AnnuityGuaranteePeriod, AnnuityReversionaryRateOption, AnnuityDeferredPeriod, AnuityEscalationRateOption } from '../../cover-code-child';
import { CoverService } from '../../cover-service.service';

@Component({
  selector: 'app-cover-annuities',
  templateUrl: './cover-annuities.component.html',
  styleUrls: ['./cover-annuities.component.scss']
})
export class CoverAnnuitiesComponent implements OnInit {

  @Input() createCoverCode: CreateCoverCode;
  @Input() action: string;  @ViewChildren('inp') inputs:QueryList<any>;
  @Input() coverCode: string

  constructor(
    private findProductService: FindProductService,
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
    if (!this.coverService.isCreate) {
      this.findProductService.getAnnuities(this.coverCode)
        .subscribe((data: Annuities) => {
          if (data.annuityGuaranteePeriod.length > 0) {
            this.createCoverCode.annuities.annuityGuaranteePeriod = data.annuityGuaranteePeriod
          } else {
            this.createCoverCode.annuities.annuityGuaranteePeriod = [new AnnuityGuaranteePeriod()]
          }

          if (data.annuityEscalationRateOption.length > 0) {
            this.createCoverCode.annuities.annuityEscalationRateOption = data.annuityEscalationRateOption
          } else {            
            this.createCoverCode.annuities.annuityEscalationRateOption = [new AnuityEscalationRateOption()]
          }

          if (data.annuityReversionaryRateOption.length > 0) {
            this.createCoverCode.annuities.annuityReversionaryRateOption = data.annuityReversionaryRateOption
          } else {
            this.createCoverCode.annuities.annuityReversionaryRateOption = [new AnnuityReversionaryRateOption()]
          }

          if (data.annuityDeferredPeriod.length > 0) {
            this.createCoverCode.annuities.annuityDeferredPeriod =
              data.annuityDeferredPeriod;
          } else {
            this.createCoverCode.annuities.annuityDeferredPeriod = [
              new AnnuityDeferredPeriod(),
            ];
          }
           this.coverService.disableInputs(this.inputs);
        })
    }
    if (this.createCoverCode.annuities.annuityGuaranteePeriod == null) this.createCoverCode.annuities.annuityGuaranteePeriod = [new AnnuityGuaranteePeriod()]
    if (this.createCoverCode.annuities.annuityEscalationRateOption == null) this.createCoverCode.annuities.annuityEscalationRateOption = [new AnuityEscalationRateOption()]
    if (this.createCoverCode.annuities.annuityReversionaryRateOption == null) this.createCoverCode.annuities.annuityReversionaryRateOption = [new AnnuityReversionaryRateOption()]
    if (this.createCoverCode.annuities.annuityDeferredPeriod == null)
      this.createCoverCode.annuities.annuityDeferredPeriod = [
        new AnnuityDeferredPeriod(),
      ];
  }


  @Input() loading = false
  @Input() loadingText = ""

  saveAnnuities() {
    this.loading = true
    this.loadingText = "Saving Cover Annuities...."

    this.createCoverCode.annuities.code = this.createCoverCode.basic.basic.code
    this.createCoverCode.annuities.annuityReversionaryRateOption.map(annuities => annuities.code = this.createCoverCode.basic.basic.code)
    this.createCoverCode.annuities.annuityEscalationRateOption.map(escal => escal.code = this.createCoverCode.basic.basic.code)
    this.createCoverCode.annuities.annuityGuaranteePeriod.map(period => period.code = this.createCoverCode.basic.basic.code)

    this.coverService.saveAnnuities(this.createCoverCode.annuities)
      .subscribe((data: Annuities) => {
        this.loading = false
        this.util.notify("Cover Annuities saved successfully!.")

        this.createCoverCode.annuities.annuityReversionaryRateOption = []
        this.createCoverCode.annuities.annuityEscalationRateOption = []
        this.createCoverCode.annuities.annuityGuaranteePeriod = []
        this.createCoverCode.annuities.annuityDeferredPeriod = [];

        data.annuityReversionaryRateOption.map(item => {
          item.rowId = this.createCoverCode.annuities.annuityReversionaryRateOption.length + 1
          this.createCoverCode.annuities.annuityReversionaryRateOption.push(item)
        })
        data.annuityEscalationRateOption.map(item => {
          item.rowId = this.createCoverCode.annuities.annuityEscalationRateOption.length + 1
          this.createCoverCode.annuities.annuityEscalationRateOption.push(item)
        })
        data.annuityGuaranteePeriod.map(item => {
          item.rowId = this.createCoverCode.annuities.annuityGuaranteePeriod.length + 1
          this.createCoverCode.annuities.annuityGuaranteePeriod.push(item)
        })
        data.annuityDeferredPeriod.map(item => { 
          this.createCoverCode.annuities.annuityDeferredPeriod.push(item)
        })

        if (this.createCoverCode?.annuities?.annuityEscalationRateOption?.length < 1) this.createCoverCode.annuities.annuityEscalationRateOption = [new AnuityEscalationRateOption()]
        if (this.createCoverCode?.annuities?.annuityGuaranteePeriod?.length < 1) this.createCoverCode.annuities.annuityGuaranteePeriod = [new AnnuityGuaranteePeriod()]
        if (this.createCoverCode?.annuities?.annuityReversionaryRateOption?.length < 1) this.createCoverCode.annuities.annuityReversionaryRateOption = [new AnnuityReversionaryRateOption()]
        if (this.createCoverCode?.annuities?.annuityDeferredPeriod?.length < 1) this.createCoverCode.annuities.annuityDeferredPeriod = [
          new AnnuityDeferredPeriod(),
        ];

      }, () => {
        this.util.notify("Unable to save cover annuities!.", 0)
        this.loading = false
      })
  }

  addNewannuityReversionaryRow(i) {
    var annuityReversionaryRateOption = new AnnuityReversionaryRateOption()
    annuityReversionaryRateOption.rowId = this.createCoverCode.annuities.annuityReversionaryRateOption.length + 1
    this.createCoverCode.annuities.annuityReversionaryRateOption.splice(
      i,
      0,
      annuityReversionaryRateOption
    );
  }

  async removeNewannuityReversionaryRow(i: number) {
    if (this.createCoverCode.annuities.annuityReversionaryRateOption[i].id != null) {
      if (await this.util.confirm("Do you want to delete this Annuity Reversionary?")) {
        this.findProductService.removeNewannuityReversionaryRow(this.createCoverCode.annuities.annuityReversionaryRateOption[i].id)
          .subscribe(
            () => {
              this.util.notify("Annuity Reversionary deleted successfully", 1)
              this.createCoverCode.annuities.annuityReversionaryRateOption.splice(i, 1)
            },
            () => this.util.notify("Unable to delete Annuity Reversionary!.", 0)
          )
      }
    } else
      this.createCoverCode.annuities.annuityReversionaryRateOption.splice(i, 1)
  }

  addNewannuityEscalationRow(i) {
    var annuityEscalationRateOption = new AnuityEscalationRateOption()
    annuityEscalationRateOption.rowId = this.createCoverCode.annuities.annuityEscalationRateOption.length + 1
    this.createCoverCode.annuities.annuityEscalationRateOption.splice(i,0,annuityEscalationRateOption)
  }

  async removeNewannuityEscalationRow(i: number) {
    if (this.createCoverCode.annuities.annuityEscalationRateOption[i].id != null) {
      if (await this.util.confirm("Do you want to delete this Annuity Escalation Rate?")) {
        this.findProductService.removeNewannuityEscalationRow(this.createCoverCode.annuities.annuityEscalationRateOption[i].id)
          .subscribe(
            () => {
              this.util.notify("Annuity Escalation Rate deleted successfully", 1)
              this.createCoverCode.annuities.annuityEscalationRateOption.splice(i, 1)
            },
            () => this.util.notify("Unable to delete Annuity Escalation Rate!.", 0)
          )
      }
    } else
      this.createCoverCode.annuities.annuityEscalationRateOption.splice(i, 1)
  }

  addNewAnnuityGuaranteeRow(i) {
    var annuityGuaranteePeriod = new AnnuityGuaranteePeriod()
    annuityGuaranteePeriod.rowId = this.createCoverCode.annuities.annuityGuaranteePeriod.length + 1
    this.createCoverCode.annuities.annuityGuaranteePeriod.splice(
      i,
      0,
      annuityGuaranteePeriod
    );
  }

  async removeNewAnnuityGuaranteeRow(i: number) {
    if (this.createCoverCode.annuities.annuityGuaranteePeriod[i].id != null) {
      if (await this.util.confirm("Do you want to delete this Guarantee Period?")) {
        this.findProductService.removeNewAnnuityGuaranteeRow(this.createCoverCode.annuities.annuityGuaranteePeriod[i].id)
          .subscribe(
            () => {
              this.util.notify("Guarantee Period deleted successfully", 1)
              this.createCoverCode.annuities.annuityGuaranteePeriod.splice(i, 1)
            },
            () => this.util.notify("Unable to delete Guarantee Period!.", 0)
          )
      }
    } else
      this.createCoverCode.annuities.annuityGuaranteePeriod.splice(i, 1)
  }
  async removeAnuityDeferredPeriodRow(i: number) {
    if (this.createCoverCode.annuities.annuityDeferredPeriod[i].id != null) {
      if (
        await this.util.confirm('Do you want to delete this Deferred Period?')
      ) {
        this.findProductService
          .removeNewAnnuityGuaranteeRow(
            this.createCoverCode.annuities.annuityDeferredPeriod[i].id
          )
          .subscribe(
            () => {
              this.util.notify('Deferred Period deleted successfully', 1);
              this.createCoverCode.annuities.annuityDeferredPeriod.splice(i, 1);
            },
            () => this.util.notify('Unable to delete Deferred Period!.', 0)
          );
      }
    } else this.createCoverCode.annuities.annuityDeferredPeriod.splice(i, 1);
  }

  addAnuityDeferredPeriodRow(i) {
    var item = new AnnuityDeferredPeriod(); 
    this.createCoverCode.annuities.annuityDeferredPeriod.splice(
      i,
      0,
      item
    );
  }


}
