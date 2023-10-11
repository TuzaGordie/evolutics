import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { WorkflowDocumentlistComponent } from './workflow-document-list.component';
import { Validators, FormBuilder, FormGroup,FormControl,ReactiveFormsModule } from '@angular/forms';

@NgModule({  
  imports: [
    FormsModule,    
    ReactiveFormsModule,
    CommonModule   
  ],
  declarations: [
    WorkflowDocumentlistComponent
  ]
})
export class WorkflowTaskModule { }
