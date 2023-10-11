import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { ReportEndpointService } from '../../report-extras/find-report.service';
import { LifeReportCreateComponent } from '../../report-pages/life-report-create/life-report-create.component';
import { RunReportModalService } from './run-report-modal.service';

@Component({
  selector: 'app-run-report-modal',
  templateUrl: './run-report-modal.component.html',
  styleUrls: ['./run-report-modal.component.scss'],
})
export class RunReportModalComponent
  extends LifeReportCreateComponent
  implements OnInit
{
  loading2: boolean;
  constructor(
    public dialogRef: MatDialogRef<RunReportModalComponent>,
    public frS: ReportEndpointService,
    public route: ActivatedRoute,
    public uS: UtilityService,
    public runReportS: RunReportModalService,
    @Inject(MAT_DIALOG_DATA) public data: { reportCode: string }
  ) {
    super(frS, route, uS);
  }

  async ngOnInit(): Promise<void> {
    this.loading2 = true;
    this.code = this.data.reportCode;
    await super.ngOnInit();
    this.filters.controls.forEach((f: FormGroup) => {
      f.controls.value.reset();
    });
    this.loading2 = false;
  }
  close() {
    this.dialogRef.close();
  }
  async run2() {
    this.loading2 = true;
    try {
      const reportFormData = await super.submitRun();
      if (reportFormData.summary) {
        this.close();
        this.uS.info(
          `Report was ran successfully with ${reportFormData.summary} results.`,
          1,
          null,
          [
            {
              value: 'Parameters',
              icon: 'edit',
              action: () => this.runReportS.openModal(this.code),
            },
            {
              value: 'Screen View',
              icon: 'show',
              action: () => this.screenView(reportFormData?.filePath),
            },
            {
              value: 'Visualize',
              icon: 'filter',
              action: () => this.visualize(reportFormData?.filePath),
            },
            {
              value: 'Download',
              icon: 'download',
              action: (event) => {
                this.onDownload(event, reportFormData?.filePath);
              },
            },
          ]
        );
      } else
        this.uS.info(
          `There was no data matching the criteria specified.<br>Please adjust your filter criteria.`,
          0
        );
    } catch (error) {
      console.error(error);
      this.uS.info(error, 0);
    }
    this.loading2 = false;
  }
}
