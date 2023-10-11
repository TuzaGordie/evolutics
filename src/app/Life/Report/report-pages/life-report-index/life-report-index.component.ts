import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../report-extras/report.service';
import { ReportEndpointService } from '../../report-extras/find-report.service';
import { ICodeTitle } from 'src/app/Shared/models/index.model';
import { FormGroup } from '@angular/forms';
import { configForms } from 'src/app/Shared/models/form.class';
import { IReportGroup } from '../../report-extras/report.model';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { RunReportModalComponent } from '../../report-comps/run-report-modal/run-report-modal.component';
import { RunReportModalService } from '../../report-comps/run-report-modal/run-report-modal.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-life-report-index',
  templateUrl: './life-report-index.component.html',
  styleUrls: ['./life-report-index.component.scss'],
})
export class LifeReportIndexComponent implements OnInit {
  reportList: ICodeTitle[] = [];
  form = new FormGroup({
    reportGroupCode: configForms.default(),
    report: configForms.required( ),
  });
  get code() {
    return this.form.value.report;
  }
  constructor(
    public frS: ReportEndpointService,
    public rS: ReportService,
    public route: ActivatedRoute,
    public uS: UtilityService,
    public runReportS: RunReportModalService
  ) {}

  ngOnInit(): void {
    this.getTableList(); 
  }

  getTableList() {
    this.frS.getCodes('FIELD_FORMAT').subscribe(
      (res: ICodeTitle[]) => {
        this.reportList = res;
        console.log('Report List Info', res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  run() {
    environment.activatedRoute=this.route
    this.runReportS.openModal(this.code) 
  }
  clone() {
    
    this.rS.router.navigate(['../clone'], {
      relativeTo: this.route,
      queryParams: { code: this.code  },
    });
    // this.rS.go(
    //   this.rS.routeParams1(
    //     this.rS.appRoutes.life.report.clone.pub,
    //     reportGroup.code
    //     // reportGroup.reportFormat || '',
    //     // reportGroup.description
    //   )
    // );
  }
  open() {
    
    this.rS.router.navigate(['../show'], {
      relativeTo: this.route,
      queryParams: { code: this.code  },
    });
  }
  edit() {
    
    this.rS.router.navigate(['../edit'], {
      relativeTo: this.route,
      queryParams: { code: this.code  },
    });
  }
}
