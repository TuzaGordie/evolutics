import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowListRoutingModule } from './workflow-list-routing.module';
import { WorkflowListComponent, WorkflowsFilterPipe,SlaLevelColourPipe,FormatMinutesPipe} from './workflow-list.component';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [
    WorkflowListComponent,WorkflowsFilterPipe,SlaLevelColourPipe,FormatMinutesPipe
  ],
  imports: [
    CommonModule,
    WorkflowListRoutingModule,SharedModule
  ]
})
export class WorkflowListModule { }
