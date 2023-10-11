import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { TransactionMapService } from '../trm.service';

@Component({
  selector: 'app-index-trm',
  templateUrl: './index-trm.component.html',
  styleUrls: ['./index-trm.component.scss'],
})
export class IndexTRMComponent implements OnInit {
  public transReasArray: any[];
  public companyArray: any[];
  public trmForm: FormGroup = new FormGroup({
    company: configForms.required(),
    transReason: configForms.required(),
  });

  constructor(
    private trmService: TransactionMapService,
    private util: UtilityService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.trmService
      .getCodeAndTitleByCodeSubGroup('TRANS_REASON')
      .subscribe((res) => {
        this.transReasArray = res;
      });
    this.trmService
      .getCompanyCodeAndDesc()
      .subscribe((res) => (this.companyArray = res));
  }

  show(code: string) {
    if (!code) {
      this.util.notify('Please select a company', 0, 5000, 'fail');
      return;
    }
    this.router.navigate(['../show'], {
      queryParams: { code: code },
      relativeTo: this.route,
    });
  }

  clone(code: string) {
    if (!code) {
      this.util.notify('Please select a company', 0, 5000, 'fail');
      return;
    }
    this.router.navigate(['../clone'], {
      queryParams: { code: code },
      relativeTo: this.route,
    });
  }
}
