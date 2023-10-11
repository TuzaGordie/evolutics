import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CurrencyService } from 'src/app/Services/life/currency.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { CreateTariff, Tariff, TariffValues, TariffVersion } from '../index-tariffs/tariff';
import { TariffService } from '../index-tariffs/tariff.service';

@Component({
  selector: 'app-create-tariffs',
  templateUrl: './create-tariffs.component.html',
  styleUrls: ['./create-tariffs.component.scss'],
})
export class CreateSetupsTariffsComponent implements OnInit {
  @ViewChild('f') form: any

  constructor(private currencyService: CurrencyService, public router: Router, public route: ActivatedRoute, private codeService: CodeService, private tariffService: TariffService, private util: UtilityService) { }

  loading = false
  loadingText = ""
  versionNo = 1

  tariffGroups: any[] = []
  genRates: any[] = []
  currencies: any[] = []
  tariffItemCategories: any[] = []
  tariffItems: any[] = []
  tariffVersionNos: any[] = []

  tariff = new Tariff()
  tariffValues = new TariffValues()
  tariffVersions = new TariffVersion()
  createTariff = new CreateTariff(
    this.tariff,
    [this.tariffValues],
    [this.tariffVersions]
  )

  editMode = true;
  showEditButton = false;
  newTariff = true
  editVersion = false
  tariffCode = ""
  showValues = false

  ngOnInit(): void {
    this.codeService.getCodesByCodeSubGroup("TARIFF_GROUP")
      .subscribe((data: any) => {
        this.tariffGroups = data
      })

    this.codeService.getCodesByCodeSubGroup("TARIFF_ITEM_CAT")
      .subscribe((data: any) => {
        this.tariffItemCategories = data
      })

    this.tariffService.getGenrateByCategory("TR")
      .subscribe((data: any) => {
        this.genRates = data
      })

    this.currencyService.getCurrency()
      .subscribe((data: any) => {
        this.currencies = data
      })

    this.route.queryParams
      .subscribe(
        params => {
          const code = params.code
          const action = params.action
          if (code != null && action != null) {
            this.editMode = false; // if show or clone disable all fields until edit button is clicked
            this.showEditButton = true;
            this.fetchTariff(action, code)
          }
        }
      )
  }

  fetchTariff(action: string, code: string) {
    this.loading = true
    this.loadingText = "Fetching Tariff...."
    this.tariffService.getTariffByCode(code)
      .subscribe((data: CreateTariff) => {
        this.newTariff = false
        this.tariffCode = code

        this.createTariff.tariff = data.tariff
        this.createTariff.tariffValues = []
        this.createTariff.tariffVersions = []

        if (action == "clone") {
          delete this.createTariff.tariff.id
          delete this.createTariff.tariff.code
        }

        this.tariffService.getTariffVersionByVersionNoAndCode(1, code)
          .subscribe((data: any[]) => {
            if (data.length > 0) this.showValues = true

            this.createTariff.tariffValues = []

            data.map((tariffValues, i) => {
              if (action == "clone") delete tariffValues.id

              this.codeService.getCodesByCodeSubGroupAndCat("SERVICE_ITEM", tariffValues.serviceCategory)
                .subscribe((data: any) => {
                  this.tariffItems[i] = data
                })
              tariffValues.rowId = this.createTariff.tariffValues.length + 1
              this.createTariff.tariffValues.push(tariffValues);
            })
          })

        data.tariffVersions.map(tariffVersions => {
          if (action == "clone") delete tariffVersions.id

          tariffVersions.versionNo = this.createTariff.tariffVersions.length + 1
          tariffVersions.rowId = this.createTariff.tariffVersions.length + 1
          this.createTariff.tariffVersions.push(tariffVersions)
        })

        if (this.createTariff.tariffValues.length < 1) this.addTariffValues()
        if (this.createTariff.tariffVersions.length < 1) this.addTariffVersions()

        this.getAllVersionNos(code)
      }).add(() => this.loading = false)
  }

  getAllValuesByVersionNoAndCode() {
    this.tariffService.getTariffVersionByVersionNoAndCode(this.versionNo, this.tariffCode)
      .subscribe((data: any) => {
        this.createTariff.tariffValues = []
        data.map((tariffValues, i) => {
          this.codeService
            .getCodesByCodeSubGroupAndCat("SERVICE_ITEM", tariffValues.serviceCategory)
            .subscribe((data: any) => {
              this.tariffItems[i] = data
            })
          tariffValues.rowId = this.createTariff.tariffValues.length + 1
          this.createTariff.tariffValues.push(tariffValues);
        })

        if (this.createTariff.tariffValues.length < 1) this.addTariffValues()
        this.showValues = true
      })
  }

  getAllVersionNos(code: string) {
    this.tariffService.getTariffVersionByCode(code)
      .subscribe((data: any) => {
        this.tariffVersionNos = data
      })
  }

  addTariffValues() {
    var tariffValues = new TariffValues()
    tariffValues.rowId = this.createTariff.tariffValues.length + 1
    this.createTariff.tariffValues.push(tariffValues);
  }

  addNewTariffVersionNo() {
    var tariffVersions = new TariffVersion()
    tariffVersions.rowId = this.createTariff.tariffVersions.length + 1
    tariffVersions.versionNo = this.createTariff.tariffVersions.length + 1
    this.versionNo = this.createTariff.tariffVersions.length + 1
    this.createTariff.tariffVersions.push(tariffVersions)
    this.editVersion = true
    this.createTariff.tariffValues = []
    this.addTariffValues()
    this.getAllVersionNos(this.tariffCode)
  }

  async removeTariffValues(i: number) {
    if (this.createTariff.tariffValues[i].id != null) {
      if (await this.util.confirm("Do you want to delete this tariff values?")) {
        this.tariffService.deleteTariffValues(this.createTariff.tariffValues[i].id)
          .subscribe(() => {
            this.createTariff.tariffValues.splice(i, 1)
            this.util.notify("Tariff value deleted successfully!.", 1)
          }, () => this.util.notify("Internal server error!.", 0))
      }
    } else {
      this.createTariff.tariffValues.splice(i, 1)
    }

  }

  addTariffVersions() {
    var tariffVersions = new TariffVersion()
    tariffVersions.rowId = this.createTariff.tariffVersions.length + 1
    tariffVersions.versionNo = this.createTariff.tariffVersions.length + 1
    this.versionNo = this.createTariff.tariffVersions.length + 1
    this.createTariff.tariffVersions.push(tariffVersions)
  }

  removeTariffVersions(i: number) {
    this.createTariff.tariffVersions.splice(i, 1)
  }

  saveTariff() {
    this.createTariff.tariffValues.map(val => val.versionNo = this.versionNo)

    if (this.form.valid) {
      this.loading = true
      this.loadingText = "Saving Tariff....."
      this.tariffService.saveTariff(this.createTariff)
        .subscribe((data: CreateTariff) => {
          this.loading = false
          this.editVersion = false

          this.createTariff.tariff = data.tariff
          this.createTariff.tariffValues = []
          this.createTariff.tariffVersions = []

          data.tariffValues.map((tariffValues, i) => {
            this.codeService
              .getCodesByCodeSubGroupAndCat("SERVICE_ITEM", tariffValues.serviceCategory)
              .subscribe((data: any) => {
                this.tariffItems[i] = data
              })
            tariffValues.rowId = this.createTariff.tariffValues.length + 1
            this.createTariff.tariffValues.push(tariffValues);
          })

          data.tariffVersions.map((tariffVersions) => {
            tariffVersions.versionNo = this.createTariff.tariffVersions.length + 1
            tariffVersions.rowId = this.createTariff.tariffVersions.length + 1
            this.createTariff.tariffVersions.push(tariffVersions)
          })

          if (this.createTariff.tariffValues.length < 1) this.addTariffValues()
          if (this.createTariff.tariffVersions.length < 1) this.addTariffVersions()

          this.getAllVersionNos(this.tariffCode)

          this.util.info(`Tariff code ${data.tariff.code} has been saved successfully!.`, 1)
        }, () => {
          this.loading = false
          this.util.info("Unable to save Tariff!.", 0)
        })
    } else {
      this.util.notify("Fill all fields!.", 0)
      return
    }
  }

  onTariffItemCategoryChange(i: number) {
    this.codeService.getCodesByCodeSubGroupAndCat("SERVICE_ITEM", this.createTariff.tariffValues[i].serviceCategory)
      .subscribe((data: any) => {
        this.tariffItems[i] = data
      })
  }
}
