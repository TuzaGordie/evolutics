import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule,FormBuilder, FormGroup, Validators,FormArray,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-workflow-task',
  templateUrl: './workflow-document-list.component.html',
  styleUrls: ['./workflow-document-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class WorkflowDocumentlistComponent implements OnInit {

  constructor(public formBuilder: FormBuilder) { 
    
  }  
  ngOnInit(): void {
  }
 
}
