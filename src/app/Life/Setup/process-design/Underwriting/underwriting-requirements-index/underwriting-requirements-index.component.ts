import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/Services/life/company.service';
import { StorageService } from 'src/app/Services/storage.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { UnderwritingReqService } from '../underwriting-requirements-create/underwriting-req.service';
import { UwrtRequirement } from '../underwriting-requirements-create/uwrt-req.interface';
import { UwrtReqIndexService } from './uwrt-index.service';

@Component({
  selector: 'app-underwriting-requirements-index',
  templateUrl: './underwriting-requirements-index.component.html',
  styleUrls: ['./underwriting-requirements-index.component.scss']
})
export class UnderwritingRequirementsIndexComponent implements OnInit {

  constructor(private companyService: CompanyService, private underwritingReqService: UnderwritingReqService, private route: ActivatedRoute, private uwrtReqIndex: UwrtReqIndexService, private router: Router, private util: UtilityService, private localStorage: StorageService) { }

  public companyArray: any[] = []
  public reqTypeArray: any[] = []
  public requirementArray: any[] = []

  companyValue: string
  reqTypeValue: string
  requirementValue: string

  ngOnInit(): void {
    this.companyService.getCompanyCodeAndDesc().subscribe((res: any[]) => { this.companyArray = res })

    this.underwritingReqService.getCodesByCodeSubGroup("REQ_TYPE")
      .subscribe(
        ((res: []) => {
          this.reqTypeArray = res
        })
      )
  }

  
  onChangeReqType(reqTypeValue: any) {
    this.uwrtReqIndex.getRecType(this.companyValue, reqTypeValue).subscribe((res: any[]) => { this.requirementArray = res })

  }

  show() {
    if (!this.requirementValue) return
    this.localStore("show")

  }
  clone() {
    if (!this.requirementValue) return
    this.localStore("clone")

  }

  localStore(action: string) {

    if (!this.requirementValue || !
      this.companyValue || !
      this.reqTypeValue) {
      this.router.navigate(["life/process-design/underwriting/Requirements-index"])
      this.util.notify("You need to select all fields!", 0, 5000, "fail")

      return
    }

    this.uwrtReqIndex.getUwrReqByReqCodeAndCompanyCodeAndReqType(
      this.requirementValue,
      this.companyValue,
      this.reqTypeValue)
      .subscribe((res: any) => {
        if (res == null) this.util.notify("Data not found!.", 0)

        this.router.navigate(
          ["../Requirements-create"],
          {
            queryParams: {
              action: action,
              reqTypeValue: this.reqTypeValue,
              companyValue: this.companyValue,
              requirementValue: this.requirementValue
            },
            relativeTo: this.route
          }
        )
      },
        () => {
          this.util.notify("Error, Please try again later!", 0, 5000, "fail")
        })
  }
}
