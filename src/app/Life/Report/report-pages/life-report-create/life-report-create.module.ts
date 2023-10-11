import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LifeReportCreateRoutingModule } from './life-report-create-routing.module';
import { LifeReportCreateComponent } from './life-report-create.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ReportSaveTypeComponent } from './report-save-type/report-save-type.component';
import { UtilityPipesModule } from 'src/app/Shared/pipes/utility.pipe';

@NgModule({
  declarations: [LifeReportCreateComponent, ReportSaveTypeComponent],
  exports: [ReportSaveTypeComponent],
  imports: [
    CommonModule,
    LifeReportCreateRoutingModule,
    SharedModule,
    // MatDialogModule,
    UtilityPipesModule,
  ],
})
export class LifeReportCreateModule {}
