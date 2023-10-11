import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyService } from 'src/app/Services/life/currency.service';
import { StorageService } from 'src/app/Services/storage.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { UwrtTableIndexService } from './uwrt-table.service';

@Component({
  selector: 'app-underwriting-table-index',
  templateUrl: './underwriting-table-index.component.html',
  styleUrls: ['./underwriting-table-index.component.scss']
})
export class UnderwritingTableIndexComponent implements OnInit {

  constructor(private currencyService: CurrencyService, private route: ActivatedRoute, private uwrtIndexService: UwrtTableIndexService, private router: Router, private util: UtilityService, private localStorage: StorageService) { }
  public tableGroupsArray: any[]

  public tableGroupValue: string

  public tableGroupArray: any[] = []
  public tableArray: any[]

  public tableValue: string


  public currencyArray: any[]

  public currencyValue: string

  ngOnInit(): void {
    this.uwrtIndexService.getUwrtTableGroups().subscribe(
      (res: []) => {
        this.tableGroupsArray = res
      }
    )

    this.uwrtIndexService.findAllTableGroups()
      .subscribe(
        ((res: []) => {
          this.tableGroupArray = res
        })
      )

    this.currencyService.getCurrency().subscribe(
      (res: []) => {
        this.currencyArray = res
      }
    )
  }


  onChangeTable() {
    this.uwrtIndexService.getUwrtTable(this.tableGroupValue).subscribe(
      (res: []) => {
        this.tableArray = res
      }
    )

  }

  show() {
    if (!this.currencyValue) return
    this.localStore("show")

  }

  clone() {
    if (!this.currencyValue) return
    this.localStore("clone")

  }

  localStore(action: string) {

    if (!this.currencyValue || !this.tableGroupValue || !this.tableValue) {
      this.router.navigate(["life/process-design/underwriting/Table-index"])
      this.util.notify("Error, Please Fill all the required fields!", 0, 5000, "fail")
      return
    }


    this.uwrtIndexService.getuwrtByCurrencyGroupAndTable(this.currencyValue, this.tableGroupValue, this.tableValue)
      .subscribe((data: any) => {
        if (data != null) {
          this.router.navigate(
            ["../Table-create"],
            {
              queryParams: {
                action: action,
                currency: this.currencyValue,
                group: this.tableGroupValue,
                table: this.tableValue
              },
              relativeTo: this.route
            }
          )

          return
        }

        this.util.notify("Under writing table not found!.", 0)
      },
        () => {
          this.util.notify("Error, Please try again later!", 0, 5000, "fail")
        }
      )




  }



}
