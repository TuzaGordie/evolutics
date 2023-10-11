import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/Services/life/company.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { SLAService } from '../sla.service';

@Component({
  selector: 'app-index-sla',
  templateUrl: './index-sla.component.html',
  styleUrls: ['./index-sla.component.scss'],
})
export class IndexSLAComponent implements OnInit {
  companies: any[] = [];
  groups: any[] = [];
  processCodes: any[] = [];

  params = {
    company: '',
    group: '',
  };

  constructor(
    private slaService: SLAService,
    private companyService: CompanyService,
    private util: UtilityService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.companyService.getCompanyCodeAndDesc().subscribe((data: any) => {
      this.companies = data;
    });
  }

  getGroupsByCompany() {
    this.slaService
      .getProcessGroupByCompany(this.params.company)
      .subscribe((data: any) => {
        this.groups = data;
      });
  }

  show() {
    this.fetchSlaByGroupAndCompany('/show');
  }

  clone() {
    this.fetchSlaByGroupAndCompany('clone');
  }

  fetchSlaByGroupAndCompany(action: string) {
    if (this.params.group && this.params.company) {
      this.slaService
        .getProcessSLaByGroupAndCompany(this.params.group, this.params.company)
        .subscribe(
          () => {
            this.router.navigate([`../${action}`], {
              queryParams: { ...this.params, action },
              relativeTo: this.route,
            });
          },
          () => {
            this.util.notify('No Process SLA found for Group and Company', 0);
          }
        );
    } else {
      this.util.notify('Kindly Select a Group and Company to Proceed.', 0);
    }
  }
}
