import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FindWorkflowService } from '../service/find-workflow.service';

@Component({
  selector: 'app-findtask-workflow',
  templateUrl: './findtask-workflow.component.html',
  styleUrls: ['./findtask-workflow.component.scss']
})
export class FindtaskWorkflowComponent implements OnInit {

  workflow:any = []
  workflowlistForm:FormGroup=new FormGroup({})
  taskcode:any = []
  status:any = []

  constructor(private router:Router, public workflowService: FindWorkflowService) { }

  ngOnInit(): void {
    this.workflowlistForm = new FormGroup({
      workflowNo: new FormControl(null,Validators.required),
      groupAssignedTo: new FormControl(null,Validators.required),
      workflowtaskcode: new FormControl(null,Validators.required),
      status: new FormControl(null,Validators.required),
      level: new FormControl(null,Validators.required),
      assignedBy: new FormControl(null,Validators.required),
      description: new FormControl(null,Validators.required),
      createDateForm: new FormControl(null,Validators.required),
      createDateTo: new FormControl(null,Validators.required)
    })

    this.setStatusList()
    this.setTaskCodeScheduleList()
  }

  
  call_workflowserach_list(){
    const isEmpty = Object.values(this.workflowlistForm.value).every(x => x === null || x === '');

     /*  this.router.navigate(['life/workflow/workflow-find-task-list']); */
     if(isEmpty){
      console.log('true')
      this.workflowService.checkSearchValue = 'true'
      this.router.navigate(['cash/workflow-task-list']);
     }
     else{
      console.log('false')
      this.workflowService.checkSearchValue = 'false'
      this.router.navigate(['cash/workflow-task-list']);
     }
  }
  
 
  setStatusList(){
    this.workflowService.getStatusList().subscribe( res => {
      this.status = res;
      console.log("status",res)
    })
  }

  setTaskCodeScheduleList(){
    this.workflowService.getTaskCodeList().subscribe( res => {
      this.taskcode = res;
      console.log("task code",res)
    })
  }
  setAssignby(){
    let selected = this.workflowlistForm.get("assignedBy")?.value
    console.log(selected)
    this.workflowService.getFindWorkflowByAssigned(selected).subscribe(res => {
      console.log(res)
    })
  }

  setDescription(){
    let selected = this.workflowlistForm.get("description")?.value
    console.log(selected)
    this.workflowService.getFindWorkflowDescription(selected).subscribe(res => {
      console.log(res)
    })
  }
  setLevel(){
    let selected = this.workflowlistForm.get("level")?.value
    console.log(selected)
    this.workflowService.getFindWorkflowLevel(selected).subscribe(res => {
      console.log(res)
    })
  }
  setStatus(){
    let selected = this.workflowlistForm.get("status")?.value
    console.log(selected)
    this.workflowService.getFindWorkflowStatus(selected).subscribe(res => {
      console.log(res)
    })
  }
  setWorkflowtaskcode(){
    let selected = this.workflowlistForm.get("workflowtaskcode")?.value
    console.log(selected)
    this.workflowService.getFindWorkflowCode(selected).subscribe(res => {
      console.log(res)
    })
  }
  setGroupAssignedTo(){
    let selected = this.workflowlistForm.get("groupAssignedTo")?.value
    console.log(selected)
    this.workflowService.getFindWorkflowToAssigned(selected).subscribe(res => {
      console.log(res)
    })
  }
  setCreatedFrom(){
    let selected = this.workflowlistForm.get("groupAssignedTo")?.value
    console.log(selected)
    this.workflowService.getCreatedFrom(selected).subscribe(res => {
      console.log(res)
    })
  }
  setCreatedTo(){
    let selected = this.workflowlistForm.get("groupAssignedTo")?.value
    console.log(selected)
    this.workflowService.getCreatedTo(selected).subscribe(res => {
      console.log(res)
    })
  }
 /*  setWorkflowNo(){
    let selected = this.workflowlistForm.get("workflowNo")?.value
    console.log(selected)
    this.workflowService.getFindWorkflowByAssigned(selected).subscribe(res => {
      console.log(res)
    })
  } */

}
