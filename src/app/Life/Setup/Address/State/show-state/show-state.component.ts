import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { RegionService } from '../../Region/region.service';
import { StateService } from '../state.service';

@Component({
  selector: 'app-show-state',
  templateUrl: './show-state.component.html',
  styleUrls: ['./show-state.component.scss']
})
export class ShowStateComponent implements OnInit {
  countries: any;
  countryGroup: string
  regions: any;
  region: string

  loading = false

  constructor(private utility: UtilityService, public router: Router, private stateService: StateService, private regionService: RegionService) { }
  stateCode: string
  description: string
  id: any

  ngOnInit(): void {

    this.stateService.getCountry().subscribe((res) => { this.countries = res })

    var cloneStateData = JSON.parse(localStorage.getItem("cloneStateData"))
    var showStateData = JSON.parse(localStorage.getItem("showStateData"))

    if (cloneStateData != null) {
      delete cloneStateData.id
      delete cloneStateData.code
      this.countryGroup = cloneStateData.country
      this.description = cloneStateData.description
      this.region = cloneStateData.region

      this.getCountryRegion(this.countryGroup)

      localStorage.removeItem("cloneStateData")
    }

    if (showStateData != null) {
      this.id = showStateData.id
      this.stateCode = showStateData.code
      this.countryGroup = showStateData.country
      this.description = showStateData.description
      this.region = showStateData.region

      this.getCountryRegion(this.countryGroup)

      localStorage.removeItem("showStateData")
    }

  }

  getCountryRegion(code: string) {
    this.regionService.getRegionByCountry(code)
      .subscribe((res: any) => { this.regions = res })
  }

  createNewState() {
    if (this.stateCode.length > 0 && this.countryGroup.length > 0 && this.description.length > 0 && this.region.length > 0) {
      this.loading = true
      this.stateService.createNewState({
        id: this.id,
        code: this.stateCode,
        country: this.countryGroup,
        description: this.description,
        region: this.region
      }).subscribe(
        (res) => {
          this.loading = false
          this.utility.notify("Region created successfully.", 1, 5000)
        }, () => {
          this.loading = false
          this.utility.notify("Internal server error", 0, 5000)
        }
      )
    } else {
      this.utility.notify("Kindly fill all required input field.", 2, 5000)
    }
  }

}
