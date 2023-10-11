import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { AccountExtrasService } from '../../accounts-extras/account-extras.service';
import { AccountsService } from '../../accounts-extras/accounts.service';

@Component({
  selector: 'app-index-glm',
  templateUrl: './index-glm.component.html',
  styleUrls: ['./index-glm.component.scss']
})
export class IndexGLMComponent implements OnInit {

  accountGroup: string = ""
  accountCompany: string = ""
  allAccount = false

  disableBtn = false

  accountGroups: any[] = []
  accountCompanies: any[] = []

  constructor(
    public accS: AccountExtrasService,
    public vS: AccountsService,
    private util: UtilityService,
    private router: Router,
    public route: ActivatedRoute,
    private companyService: CompanyService
  ) { }


  ngOnInit(): void {
    this.getCompanies()
    this.getAccountGroups()
  }

  clearOtherFields(index: number) {
    switch (index) {
      case 0:
        this.accountGroup = ""
        this.allAccount = false
        break;
      case 1:
        this.accountCompany = ""
        this.allAccount = false
        break;
      case 2:
        this.accountCompany = ""
        this.accountGroup = ""
        break;

      default:
        break;
    }
  }

  getAccountGroups() {
    this.accS.getAllAccCodes()
      .subscribe((data: any) => {
        this.accountGroups = data.accCodes
      })
  }

  getCompanies() {
    this.companyService.getCompanyCodeAndDesc()
      .subscribe((data: any) => {
        this.accountCompanies = data
      })
  }

  show() {
    if(this.allAccount == false && this.accountGroup.length < 1 && this.accountCompany.length < 1){
      this.util.notify("Kindly select an account group, company or check the All Account to continue!.", 2)
      return
    }
    if (this.allAccount) {
      this.router.navigate(['../GLM-add'], {
        queryParams: { redirect: 'all' }, relativeTo: this.route
      });
    }

    if (this.accountGroup != "") {
      this.router.navigate(['../GLM-add'], {
        queryParams: { redirect: 'group', accountGroup: this.accountGroup }, relativeTo: this.route
      });
    }

    if (this.accountCompany != "") {
      this.router.navigate(['../GLM-add'], {
        queryParams: { redirect: 'company', company: this.accountCompany }, relativeTo: this.route
      });
    }
  }

}
