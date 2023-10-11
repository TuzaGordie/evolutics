import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { DateService } from '../dates.service';
import { SystemDate } from './systemdate';

@Component({
  selector: 'app-admin-date-system',
  templateUrl: './admin-date-system.component.html',
  styleUrls: ['./admin-date-system.component.scss']
})
export class AdminDateSystemComponent implements OnInit {

  @ViewChild('systemForm') form: NgForm
  loading = false
  loadingText = ""

  systemDate = new SystemDate()
  systemStatus: any[] = []
  companies: any[] = []

  constructor(private dateService: DateService, private codeService: CodeService, private companyService: CompanyService, private utility: UtilityService,) { }

  ngOnInit(): void {
    this.companyService.getCompanyCodeAndDesc()
      .subscribe((data: any) => {
        this.companies = data
      })

    this.codeService.getCodesByCodeSubGroup("SYSTEM_STATUS")
      .subscribe((data: any) => {
        this.systemStatus = data
      })
  }

  fetchSystemDates() {
    this.dateService.getSystemDateByCompanyCode(this.systemDate.companyCode)
      .subscribe((data: any) => {
        if (data != null) {
          this.systemDate = data
        } else {
          this.utility.notify("No record found for this company code!.", 1)
        }
      }, () => {
        this.utility.notify("Unable to fetch system Date!.", 0)
      })
  }

  saveSystemDates() {
    if (this.form.valid) {
      this.loading = true
      this.loadingText = "Saving System Date......"
      this.systemDate.busLine = "L"
      this.dateService.createSystemDate(this.systemDate)
        .subscribe((data: any) => {
          this.loading = false
          this.systemDate = data
          this.utility.notify("System Date saved successfully!.", 1)
        }, () => {
          this.loading = false
          this.utility.notify("Unable to save system Date!.", 0)
        })
    } else {
      this.utility.notify("Kindly provide all system date required field to continue!.")
      return
    }
  }

}
