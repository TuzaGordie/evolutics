import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { ActivatedRoute } from '@angular/router';
import { ReinsuranceService } from '../reinsurance.service';

@Component({
  selector: 'app-index-treaties',
  templateUrl: './index-treaties.component.html',
  styleUrls: ['./index-treaties.component.scss']
})
export class IndexSetupsReInsuranceTreatiesComponent implements OnInit {
  companyCodeAndDes: any[] = [];
  treatyCategories: any[] = []
  treaties: any[] = []
  loading = false
  treaty: string;
  treatyCategory: string;
  company: string;

  loadingText = ""

  message = {
    error: false
  }

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private reinsuranceService: ReinsuranceService,
    private utility: UtilityService
  ) { }

  ngOnInit(): void {

    this.reinsuranceService.getCodeAndTitleByCodeSubgroup("TREATY_CATEGORY").subscribe(
      (res: any) => {
        this.treatyCategories = res
      }
    )


  }

  getCompanyCodeByCat() {
    this.reinsuranceService.getCompanyCodeByCat(this.treatyCategory)
      .subscribe(
        (res: any) => {
          this.companyCodeAndDes = res
        }
      )
  }

  getTreatiesByCompany() {
    this.reinsuranceService.getAllTreatyCodeAndDescriptionByCompany(this.company)
      .subscribe(
        (res: any) => {
          this.treaties = res
        }
      )
  }

  show() {
    this.fetchTreaty("show")
  }

  clone() {
    this.fetchTreaty("clone")
  }

  fetchTreaty(action: string) {
    if (this.treaty.length > 0) {      
      this.loadingText = "Fetching treaty........"
      this.loading = true
      
      this.reinsuranceService.getTreatyByCode(this.treaty)
        .subscribe(
          (data: any) => {
            this.loading = false
            localStorage.setItem(action + "Treaty", JSON.stringify(data))
            this.router.navigate(['../create-treaties'],{relativeTo:this.route})
          }, () => {
            this.loading = false
            this.utility.notify("Internal server error", 0, 5000)
          }
        )
    } else {
      this.message.error = true
    }
  }

  onNext() {
    this.router.navigate(['../create-treaties'],{relativeTo:this.route})
    console.log()
  }
}