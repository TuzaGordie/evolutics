import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkflowTaskComponent } from './workflow-task.component';
import { Validators, FormBuilder, FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';

@NgModule({  
  imports: [
    FormsModule,    
    ReactiveFormsModule,
    CommonModule   
  ],
  declarations: [
    WorkflowTaskComponent
  ]
})
export class WorkflowTaskModule { }
