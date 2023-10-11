import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { CountryService } from '../../Country/country.service';
import { RegionService } from '../../Region/region.service';
import { StateService } from '../../State/state.service';
import { TownService } from '../town.service';

@Component({
  selector: 'app-show-town',
  templateUrl: './show-town.component.html',
  styleUrls: ['./show-town.component.scss'],
})
export class ShowTownComponent implements OnInit {
  countryGroups: any;
  countryGroup: any;
  countryCodes: any[] = []
  country: string
  regions: any;
  region: string;
  states: any;
  state: string;
  towns: any[];
  town: any;
  id: any

  loading = false

  constructor(
    public router: Router,public route:ActivatedRoute,
    private townService: TownService,
    private countryService: CountryService,
    private regionService: RegionService,
    private utility: UtilityService,
    private stateService: StateService) { }
  code: string;
  description: string;

  ngOnInit(): void {
    this.getCountryCodes()

    var cloneTownData = JSON.parse(localStorage.getItem("cloneTownData"))
    var showTownData = JSON.parse(localStorage.getItem("showTownData"))

    if (cloneTownData != null) {
      delete cloneTownData.id
      delete cloneTownData.code

      this.state = cloneTownData.city
      this.code = cloneTownData.code
      this.country = cloneTownData.country
      this.description = cloneTownData.description
      this.region = cloneTownData.region

      this.fillDrowDowns(this.country, this.region)

      localStorage.removeItem("cloneTownData")
    }

    if (showTownData != null) {
      this.id = showTownData.id
      this.state = showTownData.city
      this.code = showTownData.code
      this.country = showTownData.country
      this.description = showTownData.description
      this.region = showTownData.region

      this.fillDrowDowns(this.country, this.region)

      localStorage.removeItem("showTownData")
    }

  }

  fillDrowDowns(code, region) {
    this.getCountryRegion(code)
    this.getRegionStateByRegion(region)
  }

  getCountryCodes(): void {
    this.countryService.getCountry()
      .subscribe((res: any) => { this.countryCodes = res })
  }

  getCountryRegion(code: string) {
    this.regionService.getRegionByCountry(code)
      .subscribe((res: any) => { this.regions = res })
  }

  getRegionStateByRegion(region: string) {
    this.stateService.getStateByRegion(region)
      .subscribe((res: any) => { this.states = res })
  }

  createTown() {
    if (this.state != null && this.code != null && this.country != null && this.description != null && this.region != null) {
      this.loading = true
      this.townService
        .createNewTown({
          id: this.id,
          city: this.state,
          code: this.code,
          country: this.country,
          description: this.description,
          region: this.region,
        })
        .subscribe((res) => {
          this.loading = false
          this.utility.notify("Town created successfuly.", 1, 5000)
        }, () => {
          this.loading = false
          this.utility.notify("Internal serve error.", 0, 5000)
        });
    } else {
      this.utility.notify("Kindly fill all required input.", 2, 5000)
    }
  }
}
