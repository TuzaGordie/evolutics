import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkflowScheduleComponent } from './workflow-schedule.component';
import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { AddDocumentModalModule } from 'src/app/Reusables/reusable-comps/add-document-modal/add-document-modal.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    ComponentsModule,AddDocumentModalModule
  ],
  declarations: [WorkflowScheduleComponent]
})
export class WorkflowScheduleModule {}
