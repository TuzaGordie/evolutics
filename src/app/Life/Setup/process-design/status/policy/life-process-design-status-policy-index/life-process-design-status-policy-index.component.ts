import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CodeService } from 'src/app/Services/code.service';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-life-process-design-status-policy-index',
  templateUrl: './life-process-design-status-policy-index.component.html',
  styleUrls: ['./life-process-design-status-policy-index.component.scss'],
})
export class LifeProcessDesignStatusPolicyIndexComponent implements OnInit {
  companies: any[] = [];
  statusCodes: any[] = [];

  company: string;
  code: string;

  constructor(
    private companyService: CompanyService,
    private util: UtilityService,
    private codeService: CodeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.companyService.getCompanyCodeAndDesc().subscribe((data: any) => {
      this.companies = data;
    });
  }

  getStatusCodeByCompanyAndCat() {
    this.codeService
      .getStatusCodeByCompanyAndCat('P', this.company)
      .subscribe((data: any) => {
        this.statusCodes = data;
      });
  }

  clone() {
    this.displayStatusCodeByCode('clone');
  }

  show() {
    this.displayStatusCodeByCode('show');
  }

  displayStatusCodeByCode(action: string) {
    if (this.code) {
      this.router.navigate([`../${action}`], {
        queryParams: {
          code: this.code,
        },
        relativeTo: this.route,
      });
    } else this.util.notify('Please select a Policy status code', 0);
  }
}
