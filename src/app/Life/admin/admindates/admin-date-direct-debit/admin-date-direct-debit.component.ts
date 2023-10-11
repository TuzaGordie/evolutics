import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { CodeService } from 'src/app/Services/code.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { DateService } from '../dates.service';
import { CreateDdates, Ddates } from './ddates';

@Component({
  selector: 'app-admin-date-direct-debit',
  templateUrl: './admin-date-direct-debit.component.html',
  styleUrls: ['./admin-date-direct-debit.component.scss']
})
export class AdminDateDirectDebitComponent implements OnInit {

  @ViewChild('ddForm') form: NgForm
  loading = false
  loadingText = ""

  ddates = new Ddates()
  createDates = new CreateDdates(
    [this.ddates]
  )

  ddMethods: any[] = []

  constructor(private codeService: CodeService, private dateService: DateService, private utility: UtilityService) { }

  ngOnInit(): void {
    this.fetchDdates()
    this.codeService.getCodesByCodeSubGroup("DD_METHOD")
      .subscribe((data: any) => {
        this.ddMethods = data
      })
  }

  fetchDdates() {
    this.dateService.getDdates()
      .subscribe((data: any) => {
        this.createDates.ddates = data
      })
  }

  addDdates() {
    let dates = new Ddates()
    dates.rowId = this.createDates.ddates.length + 1
    this.createDates.ddates.push(dates)
  }

  deleteDdates(i: number) {
    if (this.createDates.ddates[i].id == null) {
      this.createDates.ddates.splice(i, 1)
    } else {
      if (confirm("Do you want to delete this Direct Debit?")) {
        this.dateService.deleteDdates(this.createDates.ddates[i].id)
          .subscribe(
            () => {
              this.utility.notify("Deleted successfully!.", 1)
              this.createDates.ddates.splice(i, 1)
            },
            () => {
              this.utility.notify("Unable to delete direct debit!.", 0)
            }
          )
      }
    }
  }

  saveDdates() {
    if (this.form.valid) {
      this.loading = true
      this.loadingText = "Saving Direct Debit......."
      this.dateService.createDDates(this.createDates.ddates)
        .subscribe((data: any) => {
          this.loading = false
          this.createDates.ddates = data
          this.utility.notify("Direct Debit created successfully!.", 1)
        }, () => {
          this.loading = false
          this.utility.notify("Unable to create Direct Debit!.", 0)
        })
    } else {
      this.utility.notify("Kindly fill all input fields to continue!.", 2)
      return
    }
  }

}
