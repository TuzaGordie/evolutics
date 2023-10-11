import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { RegionService } from '../region.service';

@Component({
  selector: 'app-show-region',
  templateUrl: './show-region.component.html',
  styleUrls: ['./show-region.component.scss']
})
export class ShowRegionComponent implements OnInit {
  countryCodes: any;

  constructor(public router: Router, private regionService: RegionService, private utility: UtilityService) { }
  regionName: string
  regionCode: string
  countryCode: string
  id: any

  loading = false

  ngOnInit(): void {
    this.regionService.getCountryWithCodeDescIsoAndId()
      .subscribe((res) => { this.countryCodes = res })

    var cloneRegionData = JSON.parse(localStorage.getItem("cloneRegionData"))
    var showRegionData = JSON.parse(localStorage.getItem("showRegionData"))

    if (showRegionData != null) {
      this.id = showRegionData.id
      this.regionCode = showRegionData.code
      this.regionName = showRegionData.description
      this.countryCode = showRegionData.country

      localStorage.removeItem("showRegionData")
    }

    if (cloneRegionData != null) {
      this.regionCode = cloneRegionData.code
      this.regionName = cloneRegionData.description
      this.countryCode = cloneRegionData.country

      localStorage.removeItem("cloneRegionData")
    }
  }

  createRegion() {
    if (this.regionCode.length > 0 && this.countryCode.length > 0 && this.regionName.length > 0) {
      this.loading = true
      this.regionService.createNewRegion({
        "id": this.id,
        "code": this.regionCode,
        "country": this.countryCode,
        "description": this.regionName
      }).subscribe(
        (res) => {
          this.loading = false
          this.utility.notify("Region created successfully.", 1, 5000)
        }, () => {
          this.loading = false
          this.utility.notify("Internal server error", 0, 5000)
        }
      )
    }
    else
      this.utility.notify("Kindly fill all required input.", 2, 5000)
  }

}
