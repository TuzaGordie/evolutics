import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/Shared/shared.module";
import { RelatedActiveTasksComponent } from "./active-tasks/active-tasks.component";
import { ErrorWorkflowComponent } from "./error-workflow/error-workflow.component";
import { EscalateWorkflowComponent } from "./escalate-workflow/escalate-workflow.component";
import { ReassignWorkflowComponent } from "./reassign-workflow/reassign-workflow.component";
import { ViewWorkflowRoutingModule } from "./view-workfllow-routing.module";
import { ViewWorkflowIndexComponent } from "./view-workflow-index/view-workflow-index.component";
import { WorkflowDocumentsComponent } from "./workflow-documents/workflow-documents.component";
import { WorkflowHistoryComponent } from "./workflow-history/workflow-history.component";
import { WorkflowSnoozeHistoryComponent } from "./workflow-snooze-history/workflow-snooze-history.component";
import { WorkflowAddDocumnentComponent } from './workflow-add-documnent/workflow-add-documnent.component';
import { SnoozeWorkflowComponent } from './snooze-workflow/snooze-workflow.component';
import { ViewWorkflowService } from "./view-workflow.service";
import { TimingPipe } from "../service/timing.pipe";
import { ComponentsModule } from "src/app/Shared/components/components.module";
import { WorkfowChecklistViewComponent } from './view-workflow-index/workfow-checklist-view/workfow-checklist-view.component';
import { WorkfowErrorViewComponent } from './view-workflow-index/workfow-error-view/workfow-error-view.component';
import { WorkfowEscalateViewComponent } from './view-workflow-index/workfow-escalate-view/workfow-escalate-view.component';
import { WorkflowAuthorizeComponent } from './workflow-authorize/workflow-authorize.component';

@NgModule({
    declarations: [
        ViewWorkflowIndexComponent,
        WorkflowHistoryComponent,
        WorkflowDocumentsComponent,
        WorkflowSnoozeHistoryComponent,
        RelatedActiveTasksComponent,
        EscalateWorkflowComponent,
        ErrorWorkflowComponent,
        ReassignWorkflowComponent,
        WorkflowAddDocumnentComponent,
        SnoozeWorkflowComponent,
        TimingPipe,
        WorkfowChecklistViewComponent,
        WorkfowErrorViewComponent,
        WorkfowEscalateViewComponent,
        WorkflowAuthorizeComponent,
    ],
    providers: [
        ViewWorkflowService
    ],
    imports: [
        CommonModule,
        SharedModule,ComponentsModule,
        ViewWorkflowRoutingModule
    ],
})
export class ViewWorkflowModule { }