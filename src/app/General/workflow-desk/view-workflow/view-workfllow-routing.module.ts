import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RelatedActiveTasksComponent } from 'src/app/Life/Workflow/view-workflow/active-tasks/active-tasks.component';
import { ErrorWorkflowComponent } from 'src/app/Life/Workflow/view-workflow/error-workflow/error-workflow.component';
import { EscalateWorkflowComponent } from 'src/app/Life/Workflow/view-workflow/escalate-workflow/escalate-workflow.component';
import { ReassignWorkflowComponent } from 'src/app/Life/Workflow/view-workflow/reassign-workflow/reassign-workflow.component';
import { SnoozeWorkflowComponent } from 'src/app/Life/Workflow/view-workflow/snooze-workflow/snooze-workflow.component';
import { ViewWorkflowIndexComponent } from 'src/app/Life/Workflow/view-workflow/view-workflow-index/view-workflow-index.component';
import { WorkflowAddDocumnentComponent } from 'src/app/Life/Workflow/view-workflow/workflow-add-documnent/workflow-add-documnent.component';
import { WorkflowDocumentsComponent } from 'src/app/Life/Workflow/view-workflow/workflow-documents/workflow-documents.component';
import { WorkflowHistoryComponent } from 'src/app/Life/Workflow/view-workflow/workflow-history/workflow-history.component';
import { WorkflowSnoozeHistoryComponent } from 'src/app/Life/Workflow/view-workflow/workflow-snooze-history/workflow-snooze-history.component';
import { ERModule } from 'src/app/Reusables/reusable-extras/reusable.model';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    path: 'index',
    component: ViewWorkflowIndexComponent,
    children: [
      { path: 'escalate', component: EscalateWorkflowComponent },
      { path: 'error', component: ErrorWorkflowComponent },
    ],
  },
  {
    path: 'history',
    component: WorkflowHistoryComponent,
    children: [{ path: 'reassign', component: ReassignWorkflowComponent }],
  },
  
  {
    path: 'documents',
    data: {title: 'View Workflow / Document', rModule: ERModule.workflow},
    loadChildren: () =>
     import(
       '../../../Reusables/reusable-pages/document-list/document-list.module'
     ).then((m) => m.DocumentListModule),
  },  
  {
    path: 'documents',
    component: WorkflowDocumentsComponent,
    children: [{ path: 'add-document', component: WorkflowAddDocumnentComponent }],
  },
  {
    path: 'snooze-history',
    component: WorkflowSnoozeHistoryComponent,
    children: [{ path: 'snooze-workflow', component: SnoozeWorkflowComponent }],
  },
  { path: 'related-active-tasks', component: RelatedActiveTasksComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralViewWorkflowRoutingModule {}
