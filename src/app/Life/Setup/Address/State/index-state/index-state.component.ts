import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../Country/country.service';
import { RegionService } from '../../Region/region.service';
import { StateService } from '../state.service';

@Component({
  selector: 'app-index-state',
  templateUrl: './index-state.component.html',
  styleUrls: ['./index-state.component.scss']
})
export class IndexStateComponent implements OnInit {

  constructor(private utility: UtilityService, public router: Router,public route:ActivatedRoute, private stateService: StateService, private regionService: RegionService, private countryService: CountryService) { }

  countryGroups: any
  countryGroup: any
  countryCodes: any
  countryRegions: any[] = []
  countryCode: any
  regions: any
  region: any
  states: any
  state: string

  loading = false

  message = {
    error: false
  }

  ngOnInit(): void {

    this.regionService.getCountryGroups()
      .subscribe((res) => { this.countryGroups = res })

  }

  getCountryRegion(code: string) {
    this.regionService.getRegionByCountry(code)
      .subscribe((res: any) => { this.countryRegions = res })
  }

  getRegionStateByRegion(region: string) {
    this.stateService.getStateByRegion(region)
      .subscribe((res: any) => { this.states = res })
  }

  getCountryCodes(group: string): void {
    this.countryService.getCountriesByGroup(group)
      .subscribe((res: any) => { this.countryCodes = res })
  }

  show() {
    this.fetchData("show")
  }

  clone() {
    this.fetchData("clone")
  }

  fetchData(action: string) {
    if (this.state.length > 0) {
      this.loading = true
      this.stateService.getStateByStateCode(this.state)
        .subscribe((data: any) => {
          this.loading = false
          localStorage.setItem(action + "StateData", JSON.stringify(data))
          this.router.navigate(['../show-state'],{relativeTo:this.route})
        }, () => {
          this.loading = false
          this.utility.notify("Internal server error", 0, 5000)
        })
    } else {
      this.utility.notify("Select a State cannot be blank", 2, 5000)
    }
  }

  onNext() {
    this.router.navigate(['../show-state'],{relativeTo:this.route})
    console.log()
  }
}
