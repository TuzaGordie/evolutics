import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UtilityService } from 'src/app/Services/utility.service';
import { FindMainAgentService } from '../../../service/find-main-agent.service';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {
  branchForm: FormGroup;
  isCreatingRecord: boolean = false;
  recordStatus: 'VIEW' | 'EDITING' | 'PENDING';
  saveStatus: 'CREATE' | 'UPDATE' = 'CREATE';
  agentNo: string;
  isLoading: boolean = true;

  constructor(
    private agentService: FindMainAgentService,
    private route: ActivatedRoute,
    private utilityService: UtilityService,
  ) { }

  ngOnInit(): void {
    this.agentNo = this.route.snapshot.queryParams['agentNo'];
    this.initializeNewRecordForm()
    this.setBranch()
  }

  initializeNewRecordForm(){
    this.branchForm = this.getNewRecordForm({})
  }

  getNewRecordForm(data){
    return new FormGroup({
      agentNo: new FormControl(this.agentNo, Validators.required),
      id: new FormControl(data.id),
      branchCode: new FormControl(data.branchCode, Validators.required),
      companyCode: new FormControl(data.companyCode),
      createdBy: new FormControl(data.createdBy),
      active: new FormControl(data.active),
    })
  }

  onSave(){
    if (this.saveStatus == 'UPDATE'){
      this.onUpdateRecord()
    }else{
      this.onCreateRecord()
    }
  }

  onCreateRecord(){
    if (this.branchForm.invalid){
      this.branchForm.markAllAsTouched()
      return
    }
    this.recordStatus = 'PENDING'
    this.agentService.createLicenseCert(this.branchForm.value).subscribe(
      res => {
        this.branchForm.patchValue(this.getNewRecordForm(res))
        this.utilityService.info("branch created successfully")
        this.recordStatus = 'VIEW'
        this.saveStatus = 'UPDATE' // any future save button presses will trigger update not create
      },
      (err: HttpErrorResponse) => {
        console.log("error fetching branch record", err)
        this.utilityService.info("Error: " + err.message, 0)
        this.recordStatus = 'EDITING'
      }
    )
  }

  onUpdateRecord(){
    if (this.branchForm.invalid){
      this.branchForm.markAllAsTouched()
      return
    }
    this.recordStatus = 'PENDING'
    this.agentService.updateBranch(this.branchForm.value.id, this.branchForm.value).subscribe(
      res => {
        this.branchForm.patchValue(this.getNewRecordForm(res))
        this.utilityService.info("branch updated successfully")
        this.recordStatus = 'VIEW'
      },
      (err: HttpErrorResponse) => {
        console.log("error updating branch record")
        this.utilityService.info("Error: " + err.message, 0)
        this.recordStatus = 'EDITING'
      }
    )
  }

  setBranch(){
    this.agentService.getBranch(this.agentNo).subscribe(
      res => this.branchForm.patchValue(res),
      err => this.utilityService.info("Error fetching branch: " + err.error?.message)
    ).add(() => this.isLoading = false)
  }

  isFieldInvalid(fieldName){
    return this.branchForm.controls[fieldName].touched && this.branchForm.controls[fieldName].invalid
  }
}
