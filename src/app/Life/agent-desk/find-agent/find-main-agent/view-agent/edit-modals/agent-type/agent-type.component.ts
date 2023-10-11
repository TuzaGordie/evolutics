import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { UtilityService } from 'src/app/Services/utility.service';
import { IBtn } from 'src/app/Shared/models/index.model';
import { FindMainAgentService } from '../../../service/find-main-agent.service';

@Component({
  selector: 'app-agent-type',
  templateUrl: './agent-type.component.html',
  styleUrls: ['./agent-type.component.scss']
})
export class AgentTypeComponent implements OnInit {
  agentTypeForm: FormArray = new FormArray([]);
  showNewRecordForm: boolean = false;
  newRecordForm: FormGroup;
  recordStatuses = {}; // id keys and enum values of 'VIEW'|'EDITING'|'PENDING'
  isCreatingRecord: boolean = false;
  isLoadingAgentTypesList: boolean = false;
  isLoadingAgentType: boolean = false;
  agentNo: string;
  agentTypesList: any[];
  gotData: boolean = false;

  constructor(
    private agentService: FindMainAgentService,
    private utilityService: UtilityService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.agentNo = this.route.snapshot.queryParams.agentNo;
    this.setAgentType()
    this.initializeNewRecordForm()
    this.setAgentTypesList()
  }

  initializeNewRecordForm(){
    const typeDate = new Date().toISOString().split('T')[0] // today's date
    this.newRecordForm = this.getNewRecordForm({typeDate})
  }

  onCreateRecord(){
    if (this.newRecordForm.invalid){
      this.newRecordForm.markAllAsTouched()
      return
    }
    this.isCreatingRecord = true
    this.agentService.createAgentType(this.newRecordForm.value).subscribe(
      (res: any) => {
        this.gotData = true;
        this.agentTypeForm.patchValue(res)
        this.newRecordForm.reset();
        this.isCreatingRecord = false;
      },
      (err: HttpErrorResponse) => {
        this.utilityService.info("Error: " + err.message, 0);
        this.isCreatingRecord = false;
      }
    )
  }

  onUpdateRecord(record){
    if (record.invalid){
      record.markAllAsTouched()
      return
    }
    this.recordStatuses[record.value.id] = 'PENDING'
    // TODO these two write operations should be moved to the database query level and executed as a single transaction
    // because with the current implementation, if one call succeeds and the other fails, it will report an error to the user
    // but the database would be in an inconsistent state (the last agentType record would no longer match the type property in agentInfo.agentInformation)
    const addNewAgentTypeRecord$ = this.agentService.updateAgentType(record.value.id, record.value);
    const updateAgentInfoObject$ = this.agentService.getAgentList(this.agentNo).pipe(
      mergeMap(agentInfo => {
        agentInfo.agentInformation.type = record.value.type; // set the new type
        return this.agentService.updateAgent(this.agentNo, agentInfo) // update the agentInfo object itself
      })
    )
    forkJoin([addNewAgentTypeRecord$, updateAgentInfoObject$]).subscribe(
      (res: any) => {
        record.patchValue(res);
        this.recordStatuses[record.value.id] = 'VIEW';
      },
      (err: HttpErrorResponse) => {
        console.log("Error updating agentType: ", err);
        this.utilityService.info("Error: " + err.error?.message, 0);
        this.recordStatuses[record.value.id] = 'EDITING';
      }
    )
  }

  getNewRecordForm(data){
    return new FormGroup({
      agentNo: new FormControl(this.agentNo, Validators.required),
      id: new FormControl(data.id),
      type: new FormControl(data.type, Validators.required),
      typeDate: new FormControl(data.typeDate, Validators.required),
    })
  }

  setAgentType(){
    this.isLoadingAgentType = true
    this.agentService.getAgentType(this.agentNo).subscribe(
      (res: any[]) => {
        if (!Array.isArray(res)) res = [res]; // if API returns a single object, turn it into an array
        res?.forEach(record => {
          this.agentTypeForm.push(this.getNewRecordForm(record))
        })
        this.gotData = true;
      }
    ).add(() => this.isLoadingAgentType = false)
  }

  setAgentTypesList(){
    this.isLoadingAgentTypesList = true;
    this.agentService.getAgentTypesList().subscribe(
      (res: any[]) => this.agentTypesList = res
    ).add(() => this.isLoadingAgentTypesList = false)
  }
}
