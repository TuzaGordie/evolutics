import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { Bonus } from 'src/app/Shared/models/life/setup/rates/bonus';
import { FindProductService } from '../../../service/find-product.service';
import { Bonuses, CreateCoverCode } from '../../cover-code';
import { CoverService } from '../../cover-service.service';

@Component({
  selector: 'app-cover-bonuses',
  templateUrl: './cover-bonuses.component.html',
  styleUrls: ['./cover-bonuses.component.scss']
})
export class CoverBonusesComponent implements OnInit {

  @Input() createCoverCode: CreateCoverCode;
  @Input() action: string;  @ViewChildren('inp') inputs:QueryList<any>;
  @Input() coverCode: string

  bonusBasisList: any = []
  bonusRateBasisList: any = []

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
    this.setPromoBonusBasis();
    this.setPromoBonusRateTable();

    if (!this.coverService.isCreate) {
      this.findProductService.getBonus(this.coverCode)
        .subscribe((data: Bonuses[]) => {
          this.createCoverCode.bonuses = []

          if(data.length < 1) {
            this.createCoverCode.bonuses.push(new Bonuses())
            return
          }

          data.map(bonus => {
            if (this.action == "clone") delete bonus.id
            bonus.rowId = this.createCoverCode.bonuses.length + 1
            this.createCoverCode.bonuses.push(bonus)
          })
       this.coverService.disableInputs(this.inputs);
        })
    }
  }

  @Input() loading = false
  @Input() loadingText = ""

  saveBonuses() {
    this.loading = true
    this.loadingText = "Saving Cover Bonuses...."
    this.createCoverCode.bonuses.map(bonus => {
      bonus.code = this.createCoverCode.basic.basic.code
    })
    this.coverService.saveBonuses(this.createCoverCode.bonuses)
      .subscribe((data: Bonuses[]) => {
        this.loading = false
        this.util.notify("Cover bonuses saved successfully!.", 1)
        this.createCoverCode.bonuses = data
      }, () => {
        this.util.notify("Unable to save cover bonuses!.", 0)
        this.loading = false
      })
  }

  addNewBonusRow() {
    var bonus = new Bonuses()
    bonus.rowId = this.createCoverCode.bonuses.length + 1
    this.createCoverCode.bonuses.push(bonus)
  }

  async removeBonus(i: number) {
    if (this.createCoverCode.bonuses[i].id != null) {
      if (await this.util.confirm("Do you want to delete this Bonus?")) {
        this.findProductService.removePeril(this.createCoverCode.bonuses[i].id)
          .subscribe(
            () => {
              this.util.notify("Bonus deleted successfully", 1)
              this.createCoverCode.bonuses.splice(i, 1)
            },
            () => this.util.notify("Unable to delete Bonus!.", 0)
          )
      }
    } else
      this.createCoverCode.bonuses.splice(i, 1)
  }

  setPromoBonusBasis() {
    this.findProductService.getPromoBonusBasis().subscribe((res) => {
      this.bonusBasisList = res;
      //console.log('Bonus basis list', res);
    });
  }

  setPromoBonusRateTable() {
    this.findProductService.getPromoBonusRateTable().subscribe((res) => {
      this.bonusRateBasisList = res;
      //console.log('Bonus rate basis list', res);
    });
  }

}
