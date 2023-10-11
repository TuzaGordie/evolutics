import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/Services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { ProcessSetupService } from '../processSetup.service';
import { CompanyService } from 'src/app/Services/life/company.service';

@Component({
  selector: 'app-index-process-setup',
  templateUrl: './index-process-setup.component.html',
  styleUrls: ['./index-process-setup.component.scss'],
})
export class IndexSetupsProcessSetupComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private processSetupService: ProcessSetupService,
    private util: UtilityService,
  ) {}

  public processCodeArray: any[];

  productCode: string;

  processSetupObj = {
    processCode: '',
  };

  searchCriteria = '';

  ngOnInit(): void {
    this.processSetupService.getProcessCodes().subscribe(
      res => this.processCodeArray = res
    )
  }

  show() {
    const code = this.processSetupObj.processCode;
    if (!code) {
      this.util.notify('Please Select a Process Code', 0, 5000, 'fail');
      return;
    }
    this.router.navigate(['../show'], {
      queryParams: { code },
      relativeTo: this.route,
    });
  }

  clone() {
    const code = this.processSetupObj.processCode;
    if (!code) {
      this.util.notify('Please select a process code', 0, 5000, 'fail');
      return;
    }
    this.router.navigate(['../clone'], {
      queryParams: { code },
      relativeTo: this.route,
    });
  }
}
