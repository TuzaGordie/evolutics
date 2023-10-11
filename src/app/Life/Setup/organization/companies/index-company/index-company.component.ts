import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICompanyState } from 'src/app/ApiModels/company.interface';
import { CompanyService } from 'src/app/Services/life/company.service';
import { selectCompanyState } from 'src/app/Store/CompanyAPIStore/company.selector';

@Component({
  selector: 'app-index-company',
  templateUrl: './index-company.component.html',
  styleUrls: ['./index-company.component.scss']
})
export class IndexCompanyOrgComponent implements OnInit {
  companies: any[] = []
  code: string = ""

  message = {
    error: false,
    warning: false
  }

  constructor(
    public router: Router, public route: ActivatedRoute,
    private companyService: CompanyService,
  ) { }

  ngOnInit(): void {
    this.companyService.getCompanyCodeAndDesc()
      .subscribe((data: any) => {
        this.companies = data
      })
  }

  fetchData(action: string) {
    if (this.code.length > 0) {
      this.router.navigate(
        ["../create-company-org"],
        {
          queryParams: {
            action: action,
            code: this.code
          },
          relativeTo: this.route
        }
      )
    } else {
      this.message.error = true
    }

  }

  show(): void {
    this.fetchData("show")
  }

  clone(): void {
    this.fetchData("clone")
  }


}
