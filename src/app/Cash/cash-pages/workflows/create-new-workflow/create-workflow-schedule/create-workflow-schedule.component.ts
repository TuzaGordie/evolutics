import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule,FormBuilder, FormGroup, Validators,FormArray,ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FindWorkflowService } from '../../service/find-workflow.service';

@Component({
  selector: 'app-create-workflow-schedule',
  templateUrl: './create-workflow-schedule.component.html',
  styleUrls: ['./create-workflow-schedule.component.scss']
})
export class CreateWorkflowScheduleComponent implements OnInit {

  workflowScheduleForm:FormGroup=new FormGroup({})
  nbofRef: number = 1
  taskcode:any = []
  reflist:any = []
  schedulelist:any = []
  busline = "L"
  assignUsergroup:any;
  assignUser:any
  refDetails:any
  startdate:any;
  enddate:any;
  newdate:any

  items:any = [1];
  constructor(public formBuilder: FormBuilder,private router:Router,public workflowService: FindWorkflowService) { }

  ngOnInit(): void {
        /* this.workflowService.workflowTaskservice = null */
        this.workflowScheduleForm = new FormGroup({
          code: new FormControl(null,Validators.required),
          scheduleFreq: new FormControl(null,Validators.required),
          startDate: new FormControl(null,Validators.required),
          startTime: new FormControl(null,Validators.required),
          scheduleSlaDays: new FormControl(null,Validators.required),
          scheduleSlaHours: new FormControl(null,Validators.required),
          endDate: new FormControl(null)    ,
          endTime: new FormControl(null,Validators.required),
          nextDueDate: new FormControl(null,Validators.required),
          nextDueTime: new FormControl(null,Validators.required),
          scheduleAssignedToGroup: new FormControl(null,Validators.required),
          scheduleAssignedTo: new FormControl(null,Validators.required),
          refCat: new FormControl(null,Validators.required),
          refNo: new FormControl(null),
          refDetails: new FormControl(null,Validators.required),
          description: new FormControl(null,Validators.required)
          
        })
        this.setTaskCodeScheduleList()
        this.setrefList()
        this.setScheduleFrequeny()
    
        if(this.workflowService.workflowTaskservice ){
          console.log("patch")
    
          this.workflowScheduleForm.patchValue({
            code: this.workflowService.workflowTaskservice.code,
            scheduleFreq: this.workflowService.workflowTaskservice.scheduleFreq,
            status: this.workflowService.workflowTaskservice.status,
            startDate: this.workflowService.workflowTaskservice.startDate,
            startTime: this.workflowService.workflowTaskservice.startTime,
            scheduleSlaDays: this.workflowService.workflowTaskservice.scheduleSlaDays,
            scheduleSlaHours: this.workflowService.workflowTaskservice.scheduleSlaHours,
            endDate: this.workflowService.workflowTaskservice.endDate   ,
            endTime: this.workflowService.workflowTaskservice.endTime,
            nextDueDate: this.workflowService.workflowTaskservice.nextDueDate,
            nextDueTime: this.workflowService.workflowTaskservice.nextDueTime,
            scheduleAssignedToGroup: this.workflowService.workflowTaskservice.scheduleAssignedToGroup,
            scheduleAssignedTo: this.workflowService.workflowTaskservice.scheduleAssignedTo,
            refCat: this.workflowService.workflowTaskservice.refCat,
            refNo: this.workflowService.workflowTaskservice.refNo,
            refDetails: this.workflowService.workflowTaskservice.refDetails,
            description: this.workflowService.workflowTaskservice.description
            
          })
         /*  this.setSortcodeList() */
        }
    }

    call_workflow_task_document_list(){
      this.workflowService.workflowTaskservice = this.workflowScheduleForm.value
      this.router.navigate(['life/workflow/workflow-document-list']);
    }
  /*   incRef(){
      this.nbofRef = this.nbofRef + 1;
    }
  
    refCounter() {
      return new Array(this.nbofRef);
    } */
  
    setTaskCodeScheduleList(){
      this.workflowService.getTaskCodeList().subscribe( res => {
        this.taskcode = res;
        console.log("task code",res)
      })
    }
    setrefList(){
      this.workflowService.getrefList().subscribe( res => {
        this.reflist = res;
        console.log("ref",res)
      })
    }
    setScheduleFrequeny(){
      this.workflowService.getScheduleFrequeny().subscribe( res => {
        this.schedulelist = res;
        console.log("schedulelist",res)
      })
    }
  
    setAssignUsergroup(taskcode:any){
      this.workflowService.getAssignUsergroup(taskcode,this.busline).subscribe( (res:any) => {
       /*  this.assignUsergroup = res[0].userGroup; */
        console.log("assignUsergroup",res)
        this.workflowScheduleForm.patchValue({
          scheduleAssignedToGroup: res[0].userGroup
        });
      })
    }
    
    setAssignUser(taskcode:any){
      this.workflowService.getAssignUser(taskcode,this.busline).subscribe( (res:any) => {
        /* this.assignUser = res[0].user; */
        console.log("assignUser",res)
        this.workflowScheduleForm.patchValue({
          scheduleAssignedTo: res[0].user
        });
      })
    }

    setRefNumber(){
      let selected = this.workflowScheduleForm.get("refCat")?.value
      let selectedref = this.workflowScheduleForm.get("refNo")?.value
      console.log("selected code", selected,selectedref)
      this.workflowService.getRefdetails(selected,selectedref).subscribe( (res:any) => {
        this.refDetails = res;
        console.log("refDetails",res)
      })
    }

    setValues() {
      let selected = this.workflowScheduleForm.get("code")?.value
      this.setAssignUser(selected)
      this.setAssignUsergroup(selected)
    }

    onSubmit(){
      console.log(this.workflowScheduleForm)
      this.startdate = this.workflowScheduleForm.value.startDate + 'T' + this.workflowScheduleForm.value.startTime
      this.enddate = this.workflowScheduleForm.value.endDate + 'T' +  this.workflowScheduleForm.value.endTime
      this.newdate = this.workflowScheduleForm.value.nextDueDate + 'T' + this.workflowScheduleForm.value.nextDueTime
    
     delete this.workflowScheduleForm.value.refDetails
     delete this.workflowScheduleForm.value.startDate
     delete this.workflowScheduleForm.value.startTime
     delete this.workflowScheduleForm.value.endDate
     delete this.workflowScheduleForm.value.endTime
     delete this.workflowScheduleForm.value.nextDueDate
     delete this.workflowScheduleForm.value.nextDueTime
     let data= {   ...this.workflowScheduleForm.value,
                   ...this.workflowService.documentList.value, 
                   ...{busLine:this.busline},
                   ...{lastScheduleOn: this.startdate},
                   ...{lastScheduleCompleteOn: this.enddate},
                   ...{nextScheduleOn: this.newdate }
    }
    const myJSON = JSON.stringify(data);
      console.log(this.workflowService.fileData)
      console.log("data",myJSON)
  
        const uFrm = new FormData();
        
         uFrm.append('workflow-schedules', myJSON);
            
         uFrm.append('file', this.workflowService.fileData)
         console.log('Final form', uFrm);
         this.workflowService.workflowTaskservice = null
         this.workflowService.postWorkflowSchedule(uFrm)
         this.workflowScheduleForm.reset()
    }

  copy() {
    this.items.push(this.items)
 }
 delete(index:any){
this.items.splice(index,1)
 }
}
