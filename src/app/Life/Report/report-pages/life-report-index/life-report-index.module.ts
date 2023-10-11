import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LifeReportIndexRoutingModule } from './life-report-index-routing.module';
import { LifeReportIndexComponent } from './life-report-index.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { UtilityPipesModule } from 'src/app/Shared/pipes/utility.pipe';
import { ReportCompsModule } from '../../report-comps/report-comps.module';

@NgModule({
  declarations: [LifeReportIndexComponent],
  imports: [
    CommonModule,
    LifeReportIndexRoutingModule,
    SharedModule,
    UtilityPipesModule,
    ReportCompsModule,
  ],
})
export class LifeReportIndexModule {}
