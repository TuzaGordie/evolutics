import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule,FormBuilder, FormGroup, Validators,FormArray,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
@Component({
  selector: 'app-workflow-task',
  templateUrl: './workflow-task.component.html',
  styleUrls: ['./workflow-task.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class WorkflowTaskComponent implements OnInit {

  constructor(public formBuilder: FormBuilder,private router:Router) { 
    
  }  
  ngOnInit(): void {
  }
  call_workflow_task_document_list(){
    this.router.navigate(['life/workflow/workflow-document-list']);
  }
}
