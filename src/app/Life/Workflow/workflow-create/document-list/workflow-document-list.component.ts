import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule,FormBuilder, FormGroup, Validators,FormArray,ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FindWorkflowService } from '../../service/find-workflow.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-workflow-task',
  templateUrl: './workflow-document-list.component.html',
  styleUrls: ['./workflow-document-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class WorkflowDocumentlistComponent implements OnInit {

  documentlist:FormGroup=new FormGroup({})
  sesitivity:any= []
  branches:any= []
  category:any= []
  subCategory:any= []
  fileName:any;

  constructor(
    public formBuilder: FormBuilder,
    public workflowService: FindWorkflowService,
    private router: Router, 
    private route: ActivatedRoute
  ) { }  

  ngOnInit(): void {
    this.documentlist = new FormGroup({
      /* file: new FormControl(null,Validators.required), */
      title: new FormControl(null,Validators.required),
      category: new FormControl(null,Validators.required),
      subCategory: new FormControl(null,Validators.required),
      sensitivity: new FormControl(null,Validators.required),
      branch: new FormControl(null,Validators.required),
      boxNo: new FormControl(null,Validators.required),
      
    })
    this.setDocumentCategory()
    this.setDocumentSens()
    this.setDocumentBranch()
  }
  setDocumentCategory(){
    this.workflowService.getDocumentCategory().subscribe( res => {
      this.category = res;
      console.log("category",res)
    })
  }
  setDocumentSubCategory(code){
    this.workflowService.getDocumentSubCategory(code).subscribe( res => {
      this.subCategory = res;
      console.log("sub category",res)
    })
  }
  setDocumentSens(){
    this.workflowService.getDocumentSens().subscribe( res => {
      this.sesitivity = res;
      console.log("sesitivity",res)
    })
  }

  setDocumentBranch(){
    this.workflowService.getDocumentBranch().subscribe( res => {
      this.branches = res;
      console.log("branches",res)
    })
  }
  upload(event:any){
    let file = event.target.files[0];
    console.log("imagefile",file)
    console.log("imagepath",file.name)
    this.fileName = file
    this.workflowService.fileData = file
    console.log(this.workflowService.fileData)
    /* this.documentlist.patchValue({
      file: this.fileName
    }); */

  }
 onSubmit(){
    console.log(this.documentlist)
    this.workflowService.documentList = this.documentlist
    if(!this.workflowService.workflowVal.scheduleFreq)
    {
      // this.router.navigate(['life/workflow/workflow-task']);
      this.router.navigate(['../task'], {relativeTo: this.route});
    }else{
      console.log(this.workflowService.workflowVal.scheduleFreq)
      this.router.navigate(['../schedule'], {relativeTo: this.route});
    }
  }
}
