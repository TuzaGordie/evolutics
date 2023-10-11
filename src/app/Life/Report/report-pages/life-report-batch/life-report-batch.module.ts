import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LifeReportBatchRoutingModule } from './life-report-batch-routing.module';
import { LifeReportBatchComponent } from './life-report-batch.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';


@NgModule({
  declarations: [
    LifeReportBatchComponent
  ],
  imports: [
    CommonModule,
    LifeReportBatchRoutingModule,SharedModule,ComponentsModule
  ]
})
export class LifeReportBatchModule { }
