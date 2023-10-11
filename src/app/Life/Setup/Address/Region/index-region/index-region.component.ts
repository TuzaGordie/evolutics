import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { CountryService } from '../../Country/country.service';
import { RegionService } from '../region.service';


@Component({
  selector: 'app-index-region',
  templateUrl: './index-region.component.html',
  styleUrls: ['./index-region.component.scss']
})
export class IndexRegionComponent implements OnInit {

  constructor(private utility: UtilityService, public router: Router,public route:ActivatedRoute, private regionService: RegionService, private countryService: CountryService) { }

  countryGroups: any
  countryGroup: any
  countryCodes: any
  countryRegions: any[] = []
  countryCode: any
  regions: any
  region: string

  message = {
    error: false
  }

  loading = false

  ngOnInit(): void {

    this.regionService.getCountryGroups()
      .subscribe((res) => { this.countryGroups = res })

  }

  getCountryRegion(code: string) {
    this.regionService.getRegionByCountry(code)
      .subscribe((res: any) => { this.countryRegions = res })
  }

  getCountryCodes(group: string): void {
    this.countryService.getCountriesByGroup(group)
      .subscribe((res: any) => { this.countryCodes = res })
  }

  clone(){
    this.fetchRegion("clone")
  }

  show() {
    this.fetchRegion("show")
  }

  fetchRegion(action: string){
    if (this.region.length > 0) {
      this.loading = true
      this.regionService.getRegionByRegion(this.region)
        .subscribe((data: any) => {
          this.loading = false
          localStorage.setItem(action + "RegionData", JSON.stringify(data))
       this.router.navigate(['../show-region'],{relativeTo:this.route})
        }, () => {
          this.loading = false
          this.utility.notify("Internal server error.", 0, 5000)
        })
    } else {
      this.utility.notify("Select a Region cannot be blank.", 2, 5000)
    }
  }

  onNext() {
    this.router.navigate(['../show-region'],{relativeTo:this.route})
    console.log()
  }
}
