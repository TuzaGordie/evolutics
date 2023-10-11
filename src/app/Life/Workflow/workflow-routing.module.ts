import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { appRoutes } from 'src/app/configs/app-routes-configs/app-routes.config';
import { WorkflowDocumentlistComponent } from 'src/app/Life/Workflow/workflow-create/document-list/workflow-document-list.component';
import { WorkflowScheduleComponent } from 'src/app/Life/Workflow/workflow-create/schedule/workflow-schedule.component';
import { WorkflowTaskComponent } from 'src/app/Life/Workflow/workflow-create/task/workflow-task.component';
import { WorkflowFindtaskListComponent } from 'src/app/Life/Workflow/workflow-find-task-list/workflow-find-task-list.component';
import { WorkflowFindtaskComponent } from 'src/app/Life/Workflow/workflow-find-task/workflow-find-task.component';
import { WorkflowIndexComponent } from 'src/app/Life/Workflow/workflow-index/workflow-index.component';
import { WorkflowOverviewComponent } from './workflow-overview/workflow-overview.component';

const routes: Routes = [
  { path: '', redirectTo: 'workflow-index', pathMatch: 'full' },
  {
    path: 'workflow-index',
    component: WorkflowIndexComponent,
    data: { title: 'WorkFlow' },
  },
  {
    path: appRoutes.life.workflow.find._,
    component: WorkflowFindtaskComponent,
    data: { title: 'Find Workflow Task' },
  },
  {
    path: appRoutes.life.workflow.overview._,
    component: WorkflowOverviewComponent,
    data: { title: 'Workflow Overview' },
  },
  {
    path: 'workflow-find-task-list',
    component: WorkflowFindtaskListComponent,
    data: { title: 'Find Workflow Search List' },
  },
  {
    path: appRoutes.life.workflow.task._,
    component: WorkflowTaskComponent,
    data: { title: 'Create Workflow Task' },
  },
  {
    path: 'workflow-document-list',
    component: WorkflowDocumentlistComponent,
    data: { title: 'Create WorkflowTask / Document' },
  },
  {
    path: 'workflow-document-add',
    component: WorkflowDocumentlistComponent,
    data: { title: 'View Workflow / Document' },
  },
  {
    path: appRoutes.life.workflow.schedule._,
    component: WorkflowScheduleComponent,
    data: { title: 'Create Workflow Schedule' },
  },

  {
    path: 'view',
    loadChildren: () =>
      import('./view-workflow/view-workflow.module').then(
        (m) => m.ViewWorkflowModule
      ),
    data: { title: 'View Workflow' },
  },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]

})
export class WorkflowRoutingModule { }
