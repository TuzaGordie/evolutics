import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WorkflowDocumentlistComponent } from 'src/app/Life/Workflow/workflow-create/document-list/workflow-document-list.component';
import { WorkflowScheduleComponent } from 'src/app/Life/Workflow/workflow-create/schedule/workflow-schedule.component';
import { WorkflowTaskComponent } from 'src/app/Life/Workflow/workflow-create/task/workflow-task.component';
import { WorkflowFindtaskListComponent } from 'src/app/Life/Workflow/workflow-find-task-list/workflow-find-task-list.component';
import { WorkflowFindtaskComponent } from 'src/app/Life/Workflow/workflow-find-task/workflow-find-task.component';
import { WorkflowIndexComponent } from 'src/app/Life/Workflow/workflow-index/workflow-index.component';
import { WorkflowOverviewComponent } from 'src/app/Life/Workflow/workflow-overview/workflow-overview.component';
import { appRoutes } from 'src/app/configs/app-routes-configs/app-routes.config';
import { WorkflowsOverviewComponent } from './workflows-overview/workflows-overview.component';
import { ClientDetailsResolver, GroupOwnerDetailsResolver } from '../services/quotation-resolvers.service';
const routes: Routes = [
  { path: '', redirectTo: 'workflow-index', pathMatch: 'full' },
  {
    path: 'workflow-index',
    component: WorkflowsOverviewComponent,
    data: { title: 'WorkFlow' },
  },
  {
    path: appRoutes.general.workflow.find._,
    component: WorkflowFindtaskComponent,
    data: { title: 'Find Workflow Task' },
  },
  {
    path: appRoutes.general.workflow.overview._,
    component: WorkflowOverviewComponent,
    data: { title: 'Workflow Overview' },
  },
  {
    path: 'workflow-find-task-list',
    component: WorkflowFindtaskListComponent,
    data: { title: 'Find Workflow Task' },
  },
  {
    path: appRoutes.general.workflow.task._,
    component: WorkflowTaskComponent,
    data: { title: 'Create Workflow Task' },
  },
  {
    path: 'workflow-document-list',
    component: WorkflowDocumentlistComponent,
    data: { title: 'Document / Work Flow' },
  },
  {
    path: appRoutes.general.workflow.schedule._,
    component: WorkflowScheduleComponent,
    data: { title: 'Create Workflow Schedule' },
  },
  {
    path: 'view',
    loadChildren: () => import('./view-workflow/view-workflow.module').then((m) => m.GeneralViewWorkflowModule),
    data: { title: 'View Workflow' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkflowDeskRoutingModule {}
