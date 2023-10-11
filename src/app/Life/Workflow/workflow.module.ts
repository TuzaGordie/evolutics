import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { WorkflowDocumentlistComponent } from 'src/app/Life/Workflow/workflow-create/document-list/workflow-document-list.component';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { TablePlainModule } from 'src/app/Shared/components/table-plain/table-plain.module';
import { TextCase1Module } from 'src/app/Shared/components/text-case-1/text-case-1.module';
import { WorkflowPipesModule } from 'src/app/Shared/pipes/workflow-pipes/pipes.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { WorkflowScheduleComponent } from './workflow-create/schedule/workflow-schedule.component';
import { WorkflowScheduleModule } from './workflow-create/schedule/workflow-schedule.module';
import { WorkflowTaskModule } from './workflow-create/task/workflow-task.module';
import { WorkflowFindtaskListComponent } from './workflow-find-task-list/workflow-find-task-list.component';
import { WorkflowFindtaskComponent } from './workflow-find-task/workflow-find-task.component';
import { WorkflowIndexComponent } from './workflow-index/workflow-index.component';
import { WorkflowOverviewComponent } from './workflow-overview/workflow-overview.component';
//import { WorkflowOverviewComponent } from "./workflow-overview/workflow-overview.component";
import { WorkflowRoutingModule } from './workflow-routing.module';

@NgModule({
  declarations: [
    WorkflowDocumentlistComponent, 
    WorkflowFindtaskListComponent,
    WorkflowFindtaskComponent,
    WorkflowIndexComponent,
    WorkflowOverviewComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WorkflowRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    FormsModule,
    ChartsModule,
    TablePlainModule,
    TextCase1Module,
    WorkflowPipesModule,
    WorkflowTaskModule,
    WorkflowScheduleModule
  ],
})
export class WorkflowModule {}
