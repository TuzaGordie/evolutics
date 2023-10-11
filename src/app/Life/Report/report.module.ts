import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { reportRoutes, ReportRoutingModule } from './report-routing.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ReportService } from './report-extras/report.service';
import { UtilityService } from 'src/app/Services/utility.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, ReportRoutingModule],
  providers: [ReportService, UtilityService],
})
export class ReportModule {}
console.log('REPORT ROUTES', reportRoutes);
