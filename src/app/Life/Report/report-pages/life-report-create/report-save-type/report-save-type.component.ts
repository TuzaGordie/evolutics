import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Btn } from 'src/app/Shared/models/index.model';
import { EReportFormat } from '../../../report-extras/report.model';

@Component({
  selector: 'app-report-save-type',
  templateUrl: './report-save-type.component.html',
  styleUrls: ['./report-save-type.component.scss'],
})
export class ReportSaveTypeComponent implements OnInit {
  choose = (r: EReportFormat) => {
    this.dialogRef.close(r);
  };
  btns: Btn[] = [
    new Btn('Excel', () => this.choose(EReportFormat.excel)),
    new Btn('PDF', () => this.choose(EReportFormat.pdf)),
  ];
  constructor(public dialogRef: MatDialogRef<ReportSaveTypeComponent>) {}

  ngOnInit(): void {}
}
