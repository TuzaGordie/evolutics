import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { UtilityService } from 'src/app/Services/utility.service';
import { CommissionCodeService } from '../commission-code.service';

@Component({
  selector: 'app-index-commission-code',
  templateUrl: './index-commission-code.component.html',
  styleUrls: ['./index-commission-code.component.scss']
})
export class IndexSetupsCommissionCodeComponent implements OnInit {

  constructor(public router: Router, public route: ActivatedRoute, private utility: UtilityService, private commissionCodeService: CommissionCodeService,) { }
  selectProduct: any[]
  commTypes: any[]
  commGroup: any[] = []
  unallocatedCommissionCodes: any[] = []
  commGroupValue: string = null
  selectCommCodeValue: string = null
  unallocatedCommCode: string = null

  loading = false

  ngOnInit(): void {
    this.commissionCodeService.getAllCommTypeGroups().subscribe((res: []) => { this.selectProduct = res; })

    // This is the endpoint that needs to be replaced
    this.commissionCodeService.getCommTypesCoverCommCodes()
      .subscribe((res: []) => {
        this.commGroup = res;
      })
  }

  commGroupChange() {

    this.commissionCodeService.getAllCommTypesCodeAndDescriptionByGroup(this.commGroupValue)
      .subscribe((res: []) => {
        this.commTypes = []
        this.commTypes = res;
        if (this.commTypes.length == 0) {
          this.commissionCodeService.getAllCommTypesCodeAndDescription()
            .subscribe((res: any[]) => {
              this.commTypes = res
            })


        }

      })
  }

  commCodeChange() {
    this.commissionCodeService.getCoverCommissionCodes()
      .subscribe((unallres: any[]) => {

        unallres.forEach(ele => {
          this.unallocatedCommissionCodes = this.commTypes.filter((el) => ele != el.commCode)
        })
      })
  }
  // show() {

  //   this.evaluationFunct()
  // }

  show() {
    if (this.unallocatedCommCode == "" && this.selectCommCodeValue == "") {
      this.utility.notify("You need to fill the fields", 0);
    } else if (this.unallocatedCommCode != "") {
      this.router.navigate(
        ["../create-commission-code"],
        {
          queryParams: {
            action: "show",
            code: this.unallocatedCommCode
          },
          relativeTo: this.route
        }
      )
    } else if (this.selectCommCodeValue != "" && this.unallocatedCommCode == "") {
      this.router.navigate(
        ["../create-commission-code"],
        {
          queryParams: {
            action: "show",
            code: this.selectCommCodeValue
          },
          relativeTo: this.route
        }
      )
    }
  }

  clone() {

    if (this.unallocatedCommCode  == "" && this.selectCommCodeValue == "") {
      this.utility.notify("You need to fill the fields", 0);
    } else if (this.unallocatedCommCode != "") {
      this.router.navigate(
        ["../create-commission-code"],
        {
          queryParams: {
            action: "clone",
            code: this.unallocatedCommCode
          },
          relativeTo: this.route
        }
      )
    } else if (this.selectCommCodeValue != "" && this.unallocatedCommCode == "") {
      this.router.navigate(
        ["../create-commission-code"],
        {
          queryParams: {
            action: "clone",
            code: this.selectCommCodeValue
          },
          relativeTo: this.route
        }
      )
    }

  }

  evaluationFunct() {
    if (!this.unallocatedCommCode && !this.selectCommCodeValue) {
      this.utility.notify("You need to fill the fields", 0);
      this.router.navigate(['../index-commission-code'], { relativeTo: this.route });
      return
    }
    else if (this.unallocatedCommCode) {
      this.loading = true
      this.commissionCodeService.getCommType(this.unallocatedCommCode).subscribe(
        (res) => {
          this.loading = false
          localStorage.setItem('commCodeData', JSON.stringify(res))
          this.router.navigate(['../create-commission-code'], { relativeTo: this.route });
        }, () => {
          this.loading = false
          this.utility.notify("Internal server error.", 0);
        }
      )
    } else if (this.selectCommCodeValue && !this.unallocatedCommCode) {
      this.loading = true
      this.commissionCodeService.getCommType(this.selectCommCodeValue).subscribe(
        (res) => {
          this.loading = false
          localStorage.setItem('commCodeData', JSON.stringify(res))
          this.router.navigate(['../create-commission-code'], { relativeTo: this.route });
        }, () => {
          this.loading = false
          this.utility.notify("Internal server error.", 0);
        }
      )
    }
  }

}
