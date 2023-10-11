import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/Services/storage.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { UwrtTableIndexService } from '../underwriting-table-index/uwrt-table.service';
import { UnderwritingTableService } from './underwriting-table.service';
import { UwrtTable } from './uwrt-table.interface';

@Component({
  selector: 'app-underwriting-table-create',
  templateUrl: './underwriting-table-create.component.html',
  styleUrls: ['./underwriting-table-create.component.scss']
})
export class UnderwritingTableCreateComponent implements OnInit {

  @ViewChild('tableForm') form: NgForm

  constructor(private uwrtIndexService: UwrtTableIndexService, private route: ActivatedRoute, private uwtService: UnderwritingTableService, private util: UtilityService, private localStorage: StorageService) { }
  public tableGroupArray: any[] = []
  public underWrittenSABArray: any[] = []
  public tableArray: any[] = []
  public currencyArray: any[] = []


  public group: string
  public uwrSaBasis: string
  public uwrTable: string
  public currency: string


  public code: string
  public description: string

  loading = false
  loadingText = ""

  id = null

  editMode = true;
  showEditButton = false;

  ngOnInit(): void {
    this.uwtService.findAllTableGroups()
      .subscribe(
        ((res: []) => {
          this.tableGroupArray = res
        })
      )

    this.uwtService.getCurrencyCodeAndDescription()
      .subscribe(
        ((res: []) => {
          this.currencyArray = res
        })
      )

    this.uwtService.getGeneralRateCodeAndDescriptionByCategory("U")
      .subscribe(
        ((res: []) => {
          this.tableArray = res
        })
      )

    this.uwtService.getUnderwrittenSumAssuredBasisList()
      .subscribe(
        ((res: []) => {
          this.underWrittenSABArray = res
        })
      )

    this.route.queryParams
      .subscribe(
        params => {
          const { action, table, group, currency } = params
          if (action != null && table != null && group != null && currency != null) {
            this.editMode = false; // if show or clone disable all fields until edit button is clicked
            this.showEditButton = true;
            this.fetchTable(action, table, group, currency)
          }
        }
      )

  }

  fetchTable(action: string, uwrTable: string, group: string, currency: string) {
    this.uwrtIndexService.getuwrtByCurrencyGroupAndTable(currency, group, uwrTable)
      .subscribe((data: any) => {
        console.log("DATA:::", data)
        this.id = action == "clone" ? null : data.id
        this.currency = data.currency
        this.description = data.description
        this.code = action == "clone" ? null : data.code
        this.group = data.group
        this.uwrSaBasis = data.uwrSaBasis
        this.uwrTable = data.uwrTable
      },
        () => {
          this.util.notify("Error fetching underwriting table!.", 0)
        })
  }

  submitTable() {
    if (this.form.invalid) {
      this.util.notify("Error, This form is invalid!", 0, 3000, "close")
      return
    }

    let uwrtTable: UwrtTable = this.form.value
    uwrtTable = { ...uwrtTable, id: this.id }

    this.loading = true
    this.loadingText = "Saving Underwriting Table...."
    this.uwtService.createUwrTable(uwrtTable)
      .subscribe((data: UwrtTable) => {
        this.id = data.id
        this.currency = data.currency
        this.description = data.description
        this.code = data.code
        this.group = data.group
        this.uwrSaBasis = data.uwrSaBasis
        this.uwrTable = data.uwrTable
        this.util.info("Created successfully!", 1, data.code)
      }, () => {
        this.util.info("Error, Please try again later!", 0)
      }).add(() => this.loading = false)
  }

}
