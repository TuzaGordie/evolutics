import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog'
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { IBtn } from 'src/app/Shared/models/index.model';
import { FindMainAgentService } from '../../../service/find-main-agent.service';

@Component({
  selector: 'app-agent-salary-status',
  templateUrl: './agent-salary-status.component.html',
  styleUrls: ['./agent-salary-status.component.scss']
})
export class AgentSalaryStatusComponent implements OnInit {
  agentSalaryStatusForm: FormArray = new FormArray([])
  showNewRecordForm: boolean = false
  isCreating: boolean = false;
  newRecordForm: FormGroup;
  isCreatingRecord = false;
  recordStatus = {} // record id keys with value of 'VIEW' | 'PENDING' | 'EDITING'
  isDeletingRecord = {}; // record id keys with boolean values
  agentNo: string;

  constructor(
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private agentService: FindMainAgentService,
  ) { }

  ngOnInit(): void {
    this.agentNo = this.route.snapshot.queryParams.agentNo;
    this.initializeNewRecordForm()
    this.setAgentSalaryStatusForm()
  }

  initializeNewRecordForm(){
    this.newRecordForm = this.getNewFormGroup({})
  }

  getNewFormGroup(data){
    return new FormGroup({
      id: new FormControl(data.id),
      agentNo: new FormControl(data.agentNo, Validators.required),
      salaryStatus: new FormControl(data.salaryStatus, Validators.required),
      date: new FormControl(data.date, Validators.required),
      updatedBy: new FormControl(data.updatedBy, Validators.required),
      updatedOn: new FormControl(data.updatedOn, Validators.required)
    })
  }

  setAgentSalaryStatusForm(){
    this.agentService.getAgentSalaryStatuses(this.agentNo).subscribe(
      (res: any[]) => {
        if (!Array.isArray(res)) return
        res.forEach( record => {
          this.agentSalaryStatusForm.push(this.getNewFormGroup(record))
        })
      }
    )
  }

  onCreateRecord(){
    if (this.newRecordForm.invalid){
      this.newRecordForm.markAllAsTouched()
      return
    }
    this.isCreatingRecord = true;

    this.agentService.createAgentSalaryStatus(this.newRecordForm.value).subscribe(
      (res: any) => {
        this.agentSalaryStatusForm.push(this.getNewFormGroup(res));
        this.isCreatingRecord = false;
      },
      (err: HttpErrorResponse) => {
        this.utilityService.info("Error: " + err.message, 0)
        this.isCreatingRecord = false;
      }
    )

  }

  onUpdateRecord(record){
    if (record.invalid){
      record.markAllAsTouched()
      return
    }
    this.recordStatus[record.value.id] = 'PENDING';
    this.agentService.updateAgentSalaryStatus(record.value.id, record.value).subscribe(
      (res: any) => {
        record.patchValue(res)
        this.recordStatus[record.value.id] = 'VIEW';
      },
      (err: HttpErrorResponse) => {
        this.utilityService.info("Error: " + err.message, 0)
        this.recordStatus[record.value.id] = 'EDITING';
      }
    )
  }

  confirmDeleteRecord(record){
    const btns: IBtn[] = [
      {value: 'Yes', action:() => this.onDeleteRecord(record), type:'primary'},
      {value: 'No', action: ()=>{}}
    ]
    this.utilityService.info("Are you sure you want to delete this record?", 0, '', btns)
  }

  onDeleteRecord(record){
    this.isDeletingRecord[record.value.id] = true;
    this.agentService.deleteAgentSalaryStatus(record.value.id).subscribe(
      (res: any) => {
        this.utilityService.info("Record deleted successfully")
        this.isDeletingRecord[record.value.id] = false;
      },
      (err: HttpErrorResponse) => {
        console.log("Error deleting record: ", err)
        this.utilityService.info("Error: " + err.message, 0)
        this.isDeletingRecord[record.value.id] = false;
      }
    )
  }

  isFieldInvalid(form, fieldName){
    return form.controls[fieldName].touched && form.controls[fieldName].invalid
  }
}
