import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportTableRoutingModule } from './report-table-routing.module';
import { ReportTableComponent } from './report-table.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { TablePlainModule } from 'src/app/Shared/components/table-plain/table-plain.module';

@NgModule({
  declarations: [ReportTableComponent],
  imports: [CommonModule, ReportTableRoutingModule, SharedModule,TablePlainModule],
})
export class ReportTableModule {}
