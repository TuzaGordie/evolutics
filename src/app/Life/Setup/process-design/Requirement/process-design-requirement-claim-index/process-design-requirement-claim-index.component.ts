import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from 'src/app/Services/life/company.service';
import { ProcessService } from 'src/app/Services/process.service';
import { UtilityService } from 'src/app/Services/utility.service';

@Component({
  selector: 'app-process-design-requirement-claim-index',
  templateUrl: './process-design-requirement-claim-index.component.html',
  styleUrls: ['./process-design-requirement-claim-index.component.scss'],
})
export class ProcessDesignRequirementClaimIndexComponent implements OnInit {
  companies: any[] = [];
  claimTypes: any[] = [];
  processCodes: any[] = [];

  claimType: string;
  company: string;
  processCode: string;

  loading = false;
  loadingText = '';

  constructor(
    private processService: ProcessService,
    private router: Router,
    private route: ActivatedRoute,
    private utility: UtilityService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.companyService.getCompanyCodeAndDesc().subscribe((data: any) => {
      this.companies = data;
    });
  }

  getClaimTypes() {
    this.processService.getClaimTypesList().subscribe((data: any) => {
      this.claimTypes = data;
    });
  }

  getProcessCodes() {
    this.processService
      .getProcessCodesByClaimTypes(this.claimType)
      .subscribe((data: any) => {
        this.processCodes = data;
      });
  }

  fetchProcessClaim(action: string) {
    if (this.processCode) {
      this.router.navigate([`../${action}`], {
        queryParams: {
          code: this.processCode,
        },
        relativeTo: this.route,
      });
    } else {
      this.utility.notify('Select a Process Code to continue', 0);
    }
  }

  show() {
    if (!this.processCode) {
      this.utility.notify('Please select a process code', 0, 2000);
      return;
    }
    this.fetchProcessClaim('show');
  }

  clone() {
    if (!this.processCode) {
      this.utility.notify('Please select a process code', 0, 2000);
      return;
    }
    this.fetchProcessClaim('clone');
  }
}
