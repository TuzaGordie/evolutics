import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ViewWorkflowModule } from "src/app/Life/Workflow/view-workflow/view-workflow.module";
import { ViewWorkflowService } from "src/app/Life/Workflow/view-workflow/view-workflow.service";
import { SharedModule } from "src/app/Shared/shared.module";
 
import { GeneralViewWorkflowRoutingModule } from "./view-workfllow-routing.module";
 

@NgModule({
    declarations: [
     
    ],
    providers: [
        ViewWorkflowService
    ],
    imports: [
        CommonModule,
        SharedModule,
        GeneralViewWorkflowRoutingModule,ViewWorkflowModule
    ],
})
export class GeneralViewWorkflowModule { }