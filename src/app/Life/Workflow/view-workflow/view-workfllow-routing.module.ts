import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RelatedActiveTasksComponent} from './active-tasks/active-tasks.component';
import {ErrorWorkflowComponent} from './error-workflow/error-workflow.component';
import {EscalateWorkflowComponent} from './escalate-workflow/escalate-workflow.component';
import {ReassignWorkflowComponent} from './reassign-workflow/reassign-workflow.component';
import {SnoozeWorkflowComponent} from './snooze-workflow/snooze-workflow.component';
import {ViewWorkflowIndexComponent} from './view-workflow-index/view-workflow-index.component';
import {WorkflowAddDocumnentComponent} from './workflow-add-documnent/workflow-add-documnent.component';
import {WorkflowDocumentsComponent} from './workflow-documents/workflow-documents.component';
import {WorkflowHistoryComponent} from './workflow-history/workflow-history.component';
import {WorkflowSnoozeHistoryComponent} from './workflow-snooze-history/workflow-snooze-history.component';
import {
  WorkfowChecklistViewComponent
} from "./view-workflow-index/workfow-checklist-view/workfow-checklist-view.component";
import {
  WorkfowEscalateViewComponent
} from "./view-workflow-index/workfow-escalate-view/workfow-escalate-view.component";
import {WorkfowErrorViewComponent} from "./view-workflow-index/workfow-error-view/workfow-error-view.component";
import {ERModule} from 'src/app/Reusables/reusable-extras/reusable.model';
import {AgentnoteComponent} from "../../agent-desk/find-agent/find-main-agent/agentnote/agentnote.component";
import {WorkflowAuthorizeComponent} from "./workflow-authorize/workflow-authorize.component";

const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {
    path: 'index',
    component: ViewWorkflowIndexComponent,
    children: [
      {path: 'escalate', data: {title: 'View Workflow / Escalate'}, component: EscalateWorkflowComponent},
      {path: 'error', data: {title: 'View Workflow / Error'}, component: ErrorWorkflowComponent},
    ],
  },
  {
    path: 'history',
    component: WorkflowHistoryComponent,
    children: [{path: 'reassign', component: ReassignWorkflowComponent}],
  },
  {
    path: 'reassign',
    component: ReassignWorkflowComponent,
    data: {title: 'View Workflow / Reassign'}
  },
  {
    path: 'authorize',
    component: WorkflowAuthorizeComponent,
    data: {title: 'View Workflow / Authorize'}

  },
  {
    path: 'documents',
    data: {title: 'View Workflow / Document', rModule: ERModule.workflow},
    loadChildren: () =>
      import(
        '../../../Reusables/reusable-pages/document-list/document-list.module'
        ).then((m) => m.DocumentListModule),
  }, {
    path: 'documents',
    data: {title: 'View Workflow / Document'},
    component: WorkflowDocumentsComponent,
    children: [{path: 'add-document', component: WorkflowAddDocumnentComponent}],
  },
  {
    data: {title: 'View Workflow / Checklist'},
    path: 'checklist',
    component: WorkfowChecklistViewComponent
  },
  {
    data: {title: 'View Workflow / Escalate'},
    path: 'escalate',
    component: WorkfowEscalateViewComponent
  },
  {
    data: {title: 'View Workflow / Error'},
    path: 'error',
    component: WorkfowErrorViewComponent
  },
  {
    data: {title: 'View Workflow / Snooze History'},
    path: 'snooze-history',
    component: WorkflowSnoozeHistoryComponent,
    children: [{path: 'snooze-workflow', component: SnoozeWorkflowComponent}],
  },
  {
    data: {title: 'View Workflow / Related Active Task'},
    path: 'related-active-tasks',
    component: RelatedActiveTasksComponent
  },
  {
    data: {title: 'View Workflow / Note',rModule:ERModule.workflow},
    path: 'note',
    loadChildren: () =>
    import('../../../Reusables/reusable-pages/notes/notes.module').then(
      (m) => m.NotesModule
    ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewWorkflowRoutingModule {
}
