import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkflowScheduleComponent } from './workflow-schedule.component';
import { Validators, FormBuilder, FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';

@NgModule({  
  imports: [
    FormsModule,    
    ReactiveFormsModule,
    CommonModule   
  ],
  declarations: [
    WorkflowScheduleComponent
  ]
})
export class WorkflowScheduleModule { }
