import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RunReportModalComponent } from './run-report-modal/run-report-modal.component';
import { SharedModule } from 'src/app/Shared/shared.module';



@NgModule({
  declarations: [
    RunReportModalComponent
  ],
  imports: [
    CommonModule,SharedModule
  ],
  exports: [
    RunReportModalComponent
  ]
})
export class ReportCompsModule { }
