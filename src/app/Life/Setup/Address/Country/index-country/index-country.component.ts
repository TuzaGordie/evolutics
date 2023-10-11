import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from 'src/app/Life/Setup/Address/Country/country.service';
import { UtilityService } from 'src/app/Services/utility.service';


@Component({
  selector: 'app-index-country',
  templateUrl: './index-country.component.html',
  styleUrls: ['./index-country.component.scss']
})
export class IndexCountryComponent implements OnInit {
  constructor(public router: Router,public route:ActivatedRoute, private countryService: CountryService, private utility: UtilityService) { }
  countryGroups: any[] = []
  countryGroup: string
  countryCodes: any[] = []
  countryCode: string

  loading = false

  message = {
    error: false
  }

  country: any = {}
  ngOnInit(): void {

    this.countryService.getCountryGroups()
      .subscribe((res: any) => { this.countryGroups = res })
  }

  getCountryCodes(group: string): void {
    this.countryService.getCountriesByGroup(group)
      .subscribe((res: any) => { this.countryCodes = res })
  }

  show(): void {
    if (this.countryCode.length > 0) {
      this.loading = true
      this.countryService.getCountryByCode(this.countryCode)
        .subscribe((data: any) => {
          this.loading = false
          localStorage.setItem("CountryData", JSON.stringify(data))
this.router.navigate(['../create-country'],{relativeTo:this.route})
        }, () => {
          this.loading = false
          this.utility.notify("Internal server error.", 0, 5000)
        })

    } else {
      this.utility.notify("Select a Country to continue.", 2, 5000)
    }
  }

  onNext() {
     this.router.navigate(['../create-country'],{relativeTo:this.route})
    console.log()
  }


}
