import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisualizeReportRoutingModule } from './visualize-report-routing.module';
import { VisualizeReportComponent } from './visualize-report.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { VisualizerModule } from 'src/app/Shared/components/visualizer/visualizer.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { UtilityPipesModule } from 'src/app/Shared/pipes/utility.pipe';
@NgModule({
  declarations: [VisualizeReportComponent],
  imports: [
    CommonModule,
    VisualizeReportRoutingModule,
    SharedModule,
    VisualizerModule,
      UtilityPipesModule
  ],
})
export class VisualizeReportModule {}
