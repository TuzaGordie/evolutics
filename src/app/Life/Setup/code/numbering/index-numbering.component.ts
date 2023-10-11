import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { NumberingService } from 'src/app/Services/life/numbering.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { Numbering, Numberings } from 'src/app/Shared/models/life/setup/numbering';

@Component({
  selector: 'app-index-numbering',
  templateUrl: './index-numbering.component.html',
  styleUrls: ['./index-numbering.component.scss']
})
export class IndexCodeNumberingComponent implements OnInit {

  @ViewChild("f") form: any;

  numberings = new Numberings()
  numbering = new Numbering([])

  loading = false
  loadingText = ""

  numberBasis: any[] = []
  numberCodes: any[] = []
  yearBasis: any[] = []
  integerDigitBasis: any[] = []
  enrolleeSuffBasis: any[] = []
  companyCodes: any[] = []

  company: string

  constructor(
    public router: Router,
    private codeService: CodeService,
    private numberingService: NumberingService,
    private util: UtilityService,
    private companyService: CompanyService
  ) { }

  ngOnInit(): void {
    this.getCompanyCodes()
    this.getNumberBasisByCodegroup()
    this.getYearBasisByCodegroup()
    this.getIntegerDigitBasisByCodegroup()
    this.getEnrolleeSuffBasisByCodegroup()
    this.getNumberCodesByCodegroup()

    this.initializeNumbering()
  }

  initializeNumbering() {
    for (let i = 0; i < 3; i++) {
      let fakeNumbering = new Numberings()
      fakeNumbering.rowId = i
      if (i == 0) fakeNumbering.numberingCode = "PN"
      if (i == 1) fakeNumbering.numberingCode = "RN"
      if (i == 2) fakeNumbering.numberingCode = "EN"

      this.numbering.numberings.push(fakeNumbering)
    }

  }


  getCompanyCodes() {
    this.companyService.getCompanyCodeAndDesc()
      .subscribe((data: any) => {
        this.companyCodes = data
      })
  }

  getNumberingByCompanyCode(code) {
    this.codeService.getNumberingByCompanyCode(code)
      .subscribe((data: Numberings[]) => {
          this.numbering.numberings = data

          if(this.numbering.numberings.length == 0){
            this.initializeNumbering()
          }
      })
  }

  getNumberCodesByCodegroup() {
    this.codeService.getCodesByCodeSubGroup("NUMBERING_CODE")
      .subscribe((data: any) => {
        this.numberCodes = data
      })
  }

  getNumberBasisByCodegroup() {
    this.codeService.getCodesByCodeSubGroup("NUMBERING_BASIS")
      .subscribe((data: any) => {
        this.numberBasis = data
      })
  }

  getYearBasisByCodegroup() {
    this.codeService.getCodesByCodeSubGroup("YEAR_BASIS")
      .subscribe((data: any) => {
        this.yearBasis = data
      })
  }

  getIntegerDigitBasisByCodegroup() {
    this.codeService.getCodesByCodeSubGroup("INTEGER_DIGIT_BASIS")
      .subscribe((data: any) => {
        this.integerDigitBasis = data
      })
  }

  getEnrolleeSuffBasisByCodegroup() {
    this.codeService.getCodesByCodeSubGroup("ENROLLEE_SUFF_BASIS")
      .subscribe((data: any) => {
        this.enrolleeSuffBasis = data
      })
  }

  createNumbering() {
    if (this.company == null) {
      this.util.info("Company is required!", 0)
      return
    }

    this.numbering.numberings.map((obj: Numberings) => {
      obj.busLine = "L"
      obj.companyCode = this.company
      return obj
    })

    this.loading = true
    this.loadingText = "Saving Numberings....."
    this.numberingService.createNumbering(this.numbering.numberings)
      .subscribe((data: Numberings[]) => {
        this.loading = false
        this.numbering.numberings = []

        data.map((num, i) => {
          num.rowId = i
          if (i == 0) num.numberingCode = "PN"
          if (i == 1) num.numberingCode = "RN"
          if (i == 2) num.numberingCode = "EN"

          this.numbering.numberings.push(num)
        })
        this.util.info("Numbering created successfully!.", 1)
      }, () => {
        this.loading = false
        this.util.info("Internal server error.", 0)
      })
  }
}
