import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { configForms } from 'src/app/Shared/models/form.class';
import { ReportEndpointService } from '../../report-extras/find-report.service';
import { IReportForm } from '../../report-extras/report.model';
import { ReportService } from '../../report-extras/report.service';

@Component({
  selector: 'app-visualize-report',
  templateUrl: './visualize-report.component.html',
  styleUrls: ['./visualize-report.component.scss'],
})
export class VisualizeReportComponent implements OnInit {
  loading: boolean;
  reportForm: IReportForm;
  reportData: any[];
  fields: string[];
  constructor(
    public frS: ReportEndpointService,
    public rS: ReportService,
    public activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.loading = true;
    const code = this.activatedRoute.snapshot.queryParams?.code;
    if (!code)
      this.rS.router.navigate(['../'], { relativeTo: this.activatedRoute });
    try {
      this.reportForm = await this.frS.getReport(code).toPromise();
      this.reportData = await this.frS.getGenReportData(code).toPromise();
      // this.reportData = testData;
      this.fields = (
        await this.frS.getFieldNames(this.reportForm.primaryTable).toPromise()
      )
        .filter((f) => f.dataType == 'NUMBER')
        .map((x) => x.columnName).sort();
      // console.log('REPORT', this.reportForm, this.reportData,this.fields);
    } catch (e) {
      console.log(e);
      await this.rS.notify('An error occurred', 0);
      this.rS.back();
    }
    this.loading = false;
  }
}
 