import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../Country/country.service';
import { RegionService } from '../../Region/region.service';
import { StateService } from '../../State/state.service';
import { TownService } from '../town.service';

@Component({
  selector: 'app-index-town',
  templateUrl: './index-town.component.html',
  styleUrls: ['./index-town.component.scss']
})
export class IndexTownComponent implements OnInit {

  constructor(private regionService: RegionService, private stateService: StateService, private countryService: CountryService, private utility: UtilityService, public router: Router,public route:ActivatedRoute, private townService: TownService) { }

  countryGroups: any
  countryRegions: any[] = []
  countryGroup: any
  countryCodes: any  
  countryCode: any
  regions: any
  region: any
  states: any
  state: any
  towns: any
  town: string

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
      .subscribe((res: any) => { this.regions = res })
  }

  getRegionStateByRegion(region: string) {
    this.stateService.getStateByRegion(region)
      .subscribe((res: any) => { this.states = res })
  }

  getCountryCodes(group: string): void {
    this.countryService.getCountriesByGroup(group)
      .subscribe((res: any) => { this.countryCodes = res })
  }

  getTown(state: string): void {
    this.townService.getTown(state)
      .subscribe((res: any) => { this.towns = res })
  }

  show() {
    this.fetchTown("show")
  }

  clone() {
    this.fetchTown("clone")
  }

  fetchTown(action: string) {
    if (this.town.length > 0) {
      this.loading = true
      this.townService.getTownByTown(this.town)
        .subscribe((data: any) => {
          this.loading = false
          localStorage.setItem(action + "TownData", JSON.stringify(data))
          this.router.navigate(['../show-town'],{relativeTo:this.route})
        }, () => {
          this.loading = false
          this.utility.notify("Internal server error.", 0, 5000)
        })
    } else {
      this.utility.notify("Kindly select a town to continue.", 2, 5000)
    }
  }

  onNext() {
    this.router.navigate(['../show-town'],{relativeTo:this.route})
    console.log()
  }
}
