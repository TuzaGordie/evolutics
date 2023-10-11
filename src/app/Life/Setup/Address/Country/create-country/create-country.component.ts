import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CountryService } from 'src/app/Life/Setup/Address/Country/country.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { CountryData } from '../country.interface';

@Component({
  selector: 'app-create-country',
  templateUrl: './create-country.component.html',
  styleUrls: ['./create-country.component.scss']
})
export class CreateCountryComponent implements OnInit {
  bankingMethods;
  @ViewChild("f") form: any;

  constructor(
    private countryService: CountryService,
    private utility: UtilityService
  ) { }

  public countryData: CountryData = {
    country: {
      code: "",
      group: "",
      description: "",
      ttCountryName: "",
      bankingMethod: "",
      sortCodeBasis: "",
      phoneNoBasis: "",
      directDebitMethod: "",
      validateSortCode: true,
      postcodePrefix: "",
      bankAccountMinLength: "",
      bankAccountMaxLength: "",
      accValidation: "",
      phoneNoPrefix: 0,
      phoneNoLength: 0,
      addressFormat: "",
      alpha3Code: "",
      isoNumber: 0,
      postCodeLookupAllowed: "",
      premiumTaxRateTable: "",
      premiumTaxTable: "",
      sortCodeOptional: "",
    },
    countryLang: {
      code: "",
      language: ""
    }
  }
  countryGroup
  language
  phoneNoBasis
  sortCodeBasis

  loading = false

  disableCode: boolean = false

  ngOnInit() {
    // 1
    this.countryService.getCountryGroups()
      .subscribe((res) => { this.countryGroup = res })

    // 2
    this.countryService.getCodeAndTitleByCodeSubgroup("BANK_METHOD")
      .subscribe((res) => { this.bankingMethods = res })
    // 3

    // this.countryService.getSortCodeByBankCode("")
    //   .subscribe((res) => { this.sortCodeBasis = res })

    // 4
    this.countryService.getCodeAndTitleByCodeSubgroup("language")
      .subscribe((res) => { this.language = res })

    // 5
    this.countryService.getCodeAndTitleByCodeSubgroup("PHONE_BASIS")
      .subscribe((res) => { this.phoneNoBasis = res })

    let country = JSON.parse(localStorage.getItem("CountryData"))

    if (country != null) {
      this.disableCode = true
      this.countryData.country = country.country
      this.countryData.countryLang = country.countryLang || {}

      localStorage.removeItem("CountryData")
    }

  }

  createCountry() {
    if (this.form.valid) {
      this.loading = true
      this.countryService.createNewCountry(this.countryData)
        .subscribe(
          (res) => {
            this.loading = false
            this.form.reset()
            this.utility.notify("Country created successfully!.", 1, 5000)
          },
          (error: any) => {
            this.loading = false
            this.utility.notify(error?.error?.error, 0, 5000)
          })
    } else {
      this.utility.notify("Kindly fill all requirted fields.", 0, 5000)
    }

  }


}
