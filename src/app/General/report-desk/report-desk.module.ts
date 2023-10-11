import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportDeskRoutingModule } from './report-desk-routing.module'; 
import { ReportService } from 'src/app/Life/Report/report-extras/report.service';
import { UtilityService } from 'src/app/Services/utility.service';

@NgModule({
  declarations: [ ],
  imports: [CommonModule, ReportDeskRoutingModule],
  providers: [ReportService, UtilityService],
})
export class ReportDeskModule {}
