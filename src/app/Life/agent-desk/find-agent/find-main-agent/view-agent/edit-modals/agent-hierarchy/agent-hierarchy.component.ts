import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, mergeMap } from 'rxjs/operators';
import { AgentFinderComponent } from 'src/app/General/quotation-desk/new-group-quotation-gb/modals/agent-finder/agent-finder.component';
import { UtilityService } from 'src/app/Services/utility.service';
import { IBtn } from 'src/app/Shared/models/index.model';
import { FindMainAgentService } from '../../../service/find-main-agent.service';
import { FindClientService } from 'src/app/Life/client-desk/service/find-client.service';
import { FullNamePipe } from 'src/app/Life/client-desk/pipes/full-name.pipe';

@Component({
  selector: 'app-agent-hierarchy',
  templateUrl: './agent-hierarchy.component.html',
  styleUrls: ['./agent-hierarchy.component.scss']
})
export class AgentHierarchyComponent implements OnInit {
  agentHierarchyForm: FormArray = new FormArray([])
  showNewRecordForm: boolean = false;
  newRecordForm: FormGroup;
  isCreatingRecord: boolean = false;
  isDeletingRecord = {}; // key-value pairs of record ids and boolean values
  recordStatus = {} // key-value pairs of record ids keys and values of 'VIEW' | 'PENDING' | 'EDITING'
  isUpdatingHierarchyAgentName = {} // key-value pairs of record IDs and boolean values
  isUpdatingHierarchyAgentNo = {} // key-value pairs of record IDs and boolean values
  isLoadingAgentTypesList = false;
  isLoadingAgentName = {};
  isLoading = true;
  agentNo: string;
  hierarchyAgentTypesList: any[];

  viewLinkedAgents: boolean = false;
  linkedAgents: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private utilityService: UtilityService,
    private agentService: FindMainAgentService,
    private clientService: FindClientService,
    private fullNamePipe: FullNamePipe,
  ) { }

  ngOnInit(): void {
    this.agentNo = this.route.snapshot.queryParams.agentNo;
    this.setAgentHierarchyForm()
    this.initializeNewRecordForm()
    // this.setHierarchyAgentTypesList()
  }

  initializeNewRecordForm(){
    this.newRecordForm = this.getNewFormGroup({})
  }

  getNewFormGroup(data){
    return new FormGroup({
      id: new FormControl(data.id),
      agentNo: new FormControl(data.agentNo, Validators.required),
      hierarchyAgentNo: new FormControl(data.hierarchyAgentNo, Validators.required),
      agentName: new FormControl(data.agentName), // hierarchyAgentName
      // hierarchyAgentType: new FormControl(data.hierarchyAgentType, Validators.required),
      // updatedBy: new FormControl(data.updatedBy, Validators.required),
      // updatedOn: new FormControl(data.updatedOn, Validators.required),
    })
  }

  setAgentHierarchyForm(){
    this.agentService.getHierarchyAgents(this.agentNo).subscribe(
      (res: any[]) => {
        if (!Array.isArray(res)) return
        res.forEach( record => {
          this.agentHierarchyForm.push(this.getNewFormGroup(record))
          // fetch the associated name
          const control = this.agentHierarchyForm.at(this.agentHierarchyForm.length - 1)
          this.getAgentName(record.hierarchyAgentNo, control)
        })
      }
    ).add(() => this.isLoading = false)
  }

  onCreateRecord(){
    if (this.newRecordForm.invalid){
      this.newRecordForm.markAllAsTouched()
      return
    }
    this.isCreatingRecord = true;

    this.agentService.createHierarchyAgent(this.newRecordForm.value).subscribe(
      (res: any) => {
        this.agentHierarchyForm.push(this.getNewFormGroup(res));
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
    this.agentService.updateHierarchyAgent(record.value.id, record.value)
    .subscribe(
      (res: any) => {
        record.patchValue(res)
        this.getAgentName(res?.hierarchyAgentNo, record)
        this.utilityService.notify("Recorded updated successfully")
        this.recordStatus[record.value.id] = 'VIEW';
      },
      (err: HttpErrorResponse) => {
        this.utilityService.info("Error: " + err.message, 0)
        this.recordStatus[record.value.id] = 'EDITING';
      }
    )
  }

  // confirmDeleteRecord(record){
  //   const btns: IBtn[] = [
  //     {value: 'Yes', action:() => this.onDeleteRecord(record), type:'primary'},
  //     {value: 'No', action: ()=>{}}
  //   ]
  //   this.utilityService.info("Are you sure you want to delete this record?", 0, '', btns)
  // }

  // onDeleteRecord(record){
  //   this.isDeletingRecord[record.value.id] = true;
  //   this.agentService.deleteHierarchyAgent(record.value.id).subscribe(
  //     (res: any) => {
  //       // TODO remove from local list
  //       this.utilityService.info("Record deleted successfully")
  //       this.isDeletingRecord[record.value.id] = false;
  //     },
  //     (err: HttpErrorResponse) => {
  //       console.log("Error deleting agentHierarchy record: ", err)
  //       this.utilityService.info("Error: " + err.message, 0)
  //       this.isDeletingRecord[record.value.id] = false;
  //     }
  //   )
  // }

  onHierarchyAgentNoChange(form){
    this.isUpdatingHierarchyAgentName[form.value.id] = true;
    this.agentService.getHierarchyAgentNameByHierarchyAgentNo(form.controls.agentNo.value).subscribe(
      (res: string) => {
        form.patchValue({ agentName: res })
        this.isUpdatingHierarchyAgentName[form.value.id] = false;
      },
      (err: HttpErrorResponse) => this.isUpdatingHierarchyAgentName[form.value.id] = false
    )
  }

  // onHierarchyAgentNameChange(form){
  //   this.isUpdatingHierarchyAgentNo[form.value.id] = true;
  //   this.agentService.getHierarchyAgentNoByHierarchyAgentName(form.controls.agentName.value).subscribe(
  //     (res: string) => {
  //       form.patchValue({ hierarchyAgentNo: res})
  //       this.isUpdatingHierarchyAgentNo[form.value.id] = false;
  //     },
  //     (err: HttpErrorResponse) => this.isUpdatingHierarchyAgentNo[form.value.id] = false
  //   )
  // }

  openFindAgentModal(record){
    if (this.recordStatus[record.value.id] != 'EDITING'){ return } // do nothing unless record is in edit mode
    this.utilityService.dialogOpener(
      AgentFinderComponent,
      {},
      ({agentNo, agentName}) => record.patchValue({
        hierarchyAgentNo: agentNo,
        agentName
      })
    )
  }

  getAgentName(agentNo, control){
    // this.isLoadingAgentName[control.value.id] = true;
    // this.agentService.getAgentList(agentNo)
    // .pipe(
    //   mergeMap((agent) => this.clientService.getClientList(agent.agentInformation.clientNo)),
    //   map(client => this.fullNamePipe.transform(client))
    // )
    // .subscribe(
    //   agentName => control.patchValue({ agentName })
    // ).add(() => this.isLoadingAgentName[control.value.id] = false)
  }

  // setHierarchyAgentTypesList(){
  //   this.isLoadingAgentTypesList = true;
  //   this.agentService.getAgentTypesList().subscribe(
  //     (res: any[]) => this.hierarchyAgentTypesList = res
  //   ).add(() => this.isLoadingAgentTypesList = false)
  // }
}
