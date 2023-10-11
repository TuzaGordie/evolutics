import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FindWorkflowService } from '../../service/find-workflow.service';

@Component({
  selector: 'app-create-workflow-task',
  templateUrl: './create-workflow-task.component.html',
  styleUrls: ['./create-workflow-task.component.scss'],
})
export class CreateWorkflowTaskComponent implements OnInit {
  items: any = [1];
  workflowTaskForm: FormGroup = new FormGroup({});
  nbofRef: number = 1;
  taskcodes: any[] = [];
  reflist: any = [];
  source: any = [];
  status: any = [];
  startOnDate: any;
  startOnTime: any;
  defaultSla: any;
  busline = 'L';
  assignUser: any;
  refDetails: any;
  defaultSlaHour: any;
  originalSla: any;
  revisedSla: any;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    public workflowService: FindWorkflowService
  ) {}

  ngOnInit(): void {
    this.workflowTaskForm = new FormGroup({
      code: new FormControl(null, Validators.required),
      source: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      startDate: new FormControl(null, Validators.required),
      startTime: new FormControl(null, Validators.required),
      defaultSla: new FormControl(null, Validators.required),
      overrideSla: new FormControl(null),
      errorReason: new FormControl(null, Validators.required),
      assignedToGroup: new FormControl(null, Validators.required),
      assignedTo: new FormControl(null, Validators.required),
      refCat: new FormControl(null, Validators.required),
      refNo: new FormControl(null),
      refDetails: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      /* originalSla: new FormControl(null,Validators.required),
      revisedSla: new FormControl(null,Validators.required),
      startOn:new FormControl(null,Validators.required) */
    });

    this.setTaskCodeScheduleList();
    this.setrefList();
    this.setSourceList();
    this.setStatusList();
    this.setStartOn();
    console.log(this.workflowService.workflowTaskservice);
    if (this.workflowService.workflowTaskservice) {
      console.log('patch');

      this.workflowTaskForm.patchValue({
        code: this.workflowService.workflowTaskservice.code,
        source: this.workflowService.workflowTaskservice.source,
        status: this.workflowService.workflowTaskservice.status,
        startDate: this.workflowService.workflowTaskservice.startDate,
        startTime: this.workflowService.workflowTaskservice.startTime,
        defaultSla: this.workflowService.workflowTaskservice.defaultSla,
        overrideSla: this.workflowService.workflowTaskservice.overrideSla,
        errorReason: this.workflowService.workflowTaskservice.errorReason,
        assignedToGroup:
          this.workflowService.workflowTaskservice.assignedToGroup,
        assignedTo: this.workflowService.workflowTaskservice.assignedTo,
        refCat: this.workflowService.workflowTaskservice.refCat,
        refNo: this.workflowService.workflowTaskservice.refNo,
        refDetails: this.workflowService.workflowTaskservice.refDetails,
        description: this.workflowService.workflowTaskservice.description,
      });
      /*  this.setDefaultSla()  */
    }
  }

  call_workflow_task_document_list() {
    this.workflowService.workflowTaskservice = this.workflowTaskForm.value;
    /*  this.originalSla = this.workflowTaskForm.value.defaultSlahour + this.workflowTaskForm.value.defaultSlamin 
    this.revisedSla = this.workflowTaskForm.value.overrideSlahour + this.workflowTaskForm.value.overrideSlamin
   console.log(this.revisedSla,this.originalSla) */
    this.router.navigate(['life/workflow/workflow-document-list']);
  }

  /*  incRef(){
    this.nbofRef = this.nbofRef + 1;
  }

  refCounter() {
    return new Array(this.nbofRef);
  } */

  setTaskCodeScheduleList() {
    this.workflowService.getTaskCodeList().subscribe((res: any) => {
      this.taskcodes = res;
      console.log('task codes', res);
    });
  }
  setrefList() {
    this.workflowService.getrefList().subscribe((res) => {
      this.reflist = res;
      console.log('ref', res);
    });
  }

  setSourceList() {
    this.workflowService.getSourceList().subscribe((res) => {
      this.source = res;
      console.log('source', res);
    });
  }
  setStatusList() {
    this.workflowService.getStatusList().subscribe((res) => {
      this.status = res;
      console.log('status', res);
    });
  }
  setStartOn() {
    this.workflowService.getStartOn().subscribe((res: any) => {
      let date = res;
      console.log(date.slice(0, 10));
      console.log(date.slice(11));
      this.startOnDate = date.slice(0, 10);
      this.startOnTime = date.slice(11);
      console.log('starton', res);
      this.workflowTaskForm.patchValue({
        startDate: this.startOnDate,
        startTime: this.startOnTime,
      });
    });
  }
  setAssignUsergroup(taskcode: any) {
    this.workflowService
      .getAssignUsergroup(taskcode, this.busline)
      .subscribe((res: any) => {
        console.log('assignUsergroup', res);
        this.workflowTaskForm.patchValue({
          assignedToGroup: res[0].userGroup,
        });
      });
  }
  setAssignUser(taskcode: any) {
    this.workflowService
      .getAssignUser(taskcode, this.busline)
      .subscribe((res: any) => {
        /* this.assignUser = res[0].user; */
        console.log('assignUser', res);
        this.workflowTaskForm.patchValue({
          assignedTo: res[0].user,
        });
      });
  }
  setDefaultSla() {
    let selected = this.workflowTaskForm.get('code')?.value;
    this.setAssignUser(selected);
    this.setAssignUsergroup(selected);

    console.log('selected code', selected);
    this.workflowService.getDefaultSla(selected).subscribe((res: any) => {
      console.log(res);
      /*  this.workflowTask.value.defaultSlamin = res.originalSla; */
      this.workflowTaskForm.patchValue({
        defaultSlamin: res.originalSla,
        defaultSlahour: '00',
      });
      /* this.defaultSla = res.originalSla;
      this.defaultSlaHour = '00'; */
      console.log(this.workflowTaskForm.value.defaultSlamin);
    });
  }
  setRefNumber() {
    let selected = this.workflowTaskForm.get('refCat')?.value;
    let selectedref = this.workflowTaskForm.get('refNo')?.value;
    console.log('selected code', selected, selectedref);
    this.workflowService
      .getRefdetails(selected, selectedref)
      .subscribe((res: any) => {
        this.refDetails = res;
        console.log('refDetails', res);
      });
  }
  onSubmit() {
    console.log(this.workflowTaskForm);

    this.originalSla = this.workflowTaskForm.value.defaultSla || '0:0';
    this.revisedSla = this.workflowTaskForm.value.overrideSla || '0:0';
    let starton =
      this.workflowTaskForm.value.startDate +
      'T' +
      this.workflowTaskForm.value.startTime;
    console.log(this.revisedSla, this.originalSla);
    delete this.workflowTaskForm.value.refDetails;
    delete this.workflowTaskForm.value.startDate;
    delete this.workflowTaskForm.value.startTime;
    delete this.workflowTaskForm.value.defaultSla;
    delete this.workflowTaskForm.value.overrideSla;
    let data = {
      ...this.workflowTaskForm.value,
      ...this.workflowService.documentList.value,
      ...{ busLine: this.busline },
      ...{ originalSla: this.originalSla },
      ...{ revisedSla: this.revisedSla },
      ...{ startOn: starton },
    };
    const myJSON = JSON.stringify(data);
    console.log(this.workflowService.fileData);
    console.log('data', myJSON);

    const uFrm = new FormData();

    uFrm.append('workflows', myJSON);

    uFrm.append('file', this.workflowService.fileData);
    console.log(uFrm);
    this.workflowService.workflowTaskservice = null;
    this.workflowService.postWorkflowTask(uFrm);
    this.workflowTaskForm.reset();
  }

  copy() {
    this.items.push(this.items);
  }
  delete(index: any) {
    this.items.splice(index, 1);
  }
}
