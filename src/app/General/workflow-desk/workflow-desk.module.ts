import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowDeskRoutingModule } from './workflow-desk-routing.module';
import { WorkflowsOverviewComponent } from './workflows-overview/workflows-overview.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [WorkflowsOverviewComponent],
  imports: [CommonModule, WorkflowDeskRoutingModule,SharedModule,ComponentsModule,ChartsModule],
})
export class WorkflowDeskModule {}
