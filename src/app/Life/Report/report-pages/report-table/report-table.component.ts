import { Component, OnInit } from '@angular/core';
import { VisualizeReportComponent } from '../visualize-report/visualize-report.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { configForms } from 'src/app/Shared/models/form.class';
import { ReportEndpointService } from '../../report-extras/find-report.service';
import { IReportForm } from '../../report-extras/report.model';
import { ReportService } from '../../report-extras/report.service';
import { ICodeDescription, TableCol } from 'src/app/Shared/models/index.model';

@Component({
  selector: 'app-report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
})
export class ReportTableComponent extends VisualizeReportComponent {
  displayedColumns: TableCol[]=[]; 
  constructor(
    public frS: ReportEndpointService,
    public rS: ReportService,
    public activatedRoute: ActivatedRoute
  ) {
    super(frS, rS, activatedRoute);
  }

  async ngOnInit() {
    await super.ngOnInit(); 
    this.displayedColumns = this.reportForm?.outputs?.map(
      (x) =>
        new TableCol(
          (x.fieldName as any).replaceAll('_', ' ') || x.fieldName,
          x.fieldName
        )
    ); 
  }
}
