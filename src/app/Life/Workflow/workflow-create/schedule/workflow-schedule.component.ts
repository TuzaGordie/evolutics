import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgModule } from '@angular/core';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FindWorkflowService } from '../../service/find-workflow.service';
import { UtilityService } from 'src/app/Services/utility.service';
import { AddDocumentModalComponent } from 'src/app/Reusables/reusable-comps/add-document-modal/add-document-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { IDocMetadata } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { AppService } from 'src/app/Services/app.service';
import { configForms } from 'src/app/Shared/models/form.class';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-workflow-schedule',
  templateUrl: './workflow-schedule.component.html',
  styleUrls: ['./workflow-schedule.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkflowScheduleComponent implements OnInit {
  workflowScheduleForm: FormGroup = new FormGroup({
    // endDate: new FormControl(null),
    // endTime: new FormControl(null),
    // nextDueDate: new FormControl(null),
    // nextDueTime: new FormControl(null),
    // startDate: new FormControl(null),
    // startTime: new FormControl(null), 
    code: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    lastScheduleCompleteOn: configForms.default(),
    lastScheduleOn: new FormControl(
      new Date().toJSON().split('T')[0] + 'T' + new Date().toTimeString().split(' ')[0]
    ),
    nextScheduleOn:  new FormControl(
      new Date().toJSON().split('T')[0] + 'T' + new Date().toTimeString().split(' ')[0]
    ),
    refCat: new FormControl(null),
    refDetails: new FormControl(null),
    refNo: new FormControl(null),
    scheduleAssignedTo: new FormControl(null),
    scheduleAssignedToGroup: new FormControl(null),
    scheduleFreq: new FormControl(null),
    scheduleSla: new FormControl(null), 
  });
  nbofRef: number = 1;
  taskcode: any = [];
  reflist: any[] = [];
  schedulelist: any = []; 
  usersGroups: any = [];
  usergroup: any;
  user: any;
  readonly busline: string;
  assignUsergroup: any;
  assignUser: any;
  startdate: any;
  enddate: any;
  newdate: any;

  loading: boolean;
  readonlyassignedToGroup: boolean;
  readonlyassignedTo: boolean;
  taskcodeUser: any;
  taskcodeUserGroup: any;
  users: { fullName: string; userName: string; code: string; }[];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    public workflowService: FindWorkflowService,
    public route: ActivatedRoute,
    public userS: UserService,
    public uS: UtilityService,
    public appS: AppService
  ) {
    this.busline = this.appS.getCurrentSystemMetadata.busline;
  }

  ngOnInit(): void { 
    this.getUserGroupsList();
    this.getUserList();
    this.setTaskCodeScheduleList();
    this.setrefList();
    this.setScheduleFrequeny();

    if (this.workflowService.workflowVal) {
      console.log('patch');

      this.workflowScheduleForm.patchValue(this.workflowService.workflowVal);
   
    }
    this.workflowScheduleForm.controls.lastScheduleOn.valueChanges.subscribe(
      (r) => {
        this.workflowScheduleForm.patchValue({ nextScheduleOn: r });
      }
    );
    this.workflowScheduleForm.controls.refNo.valueChanges.subscribe((r) => {
      this.setRefNumber();
    });
  }
  resetRefNumber() {
    this.workflowScheduleForm.controls.refNo.reset();
  }
  call_workflow_task_document_list() {
    this.workflowService.workflowVal = this.workflowScheduleForm.value;
    this.uS.dialogOpener(
      AddDocumentModalComponent,
      {
        width: '50%',
        maxWidth: '90%',
        maxHeight: '90vh',
        data: {
          document: this.workflowService.documentList?.value,
          file: this.workflowService.fileData,
        },
      },
      (r: { metadataForm: FormGroup; metadata: IDocMetadata; file: File }) => {
        console.log(r);
        this.workflowService.fileData = r.file;
        this.workflowService.documentList = r.metadataForm;
      }
    );
  }

  setTaskCodeScheduleList() {
    this.workflowService.getTaskCodeList().subscribe((res) => {
      this.taskcode = res;
      console.log('task code', res);
    });
  }
  setrefList() {
    this.workflowService.getrefList().subscribe((res) => {
      this.reflist = res;
      console.log('ref', res);
    });
  }
  setScheduleFrequeny() {
    this.workflowService.getScheduleFrequeny().subscribe((res) => {
      this.schedulelist = res;
      console.log('schedulelist', res);
    });
  }

  setAssignUsergroup(taskcode: string) {
    this.workflowService
      .getAssignUsergroup(taskcode, this.busline)
      .subscribe((res) => {
        const scheduleAssignedToGroup = res[0]?.group;
        if (scheduleAssignedToGroup != '' && scheduleAssignedToGroup != null) {
          this.workflowScheduleForm.get('scheduleAssignedToGroup').enable();
          this.workflowScheduleForm.get('scheduleAssignedTo').reset();
          this.workflowScheduleForm.get('scheduleAssignedTo').disable();
          this.workflowScheduleForm.patchValue({
            scheduleAssignedToGroup,
          });
          this.readonlyassignedToGroup = true;
          this.taskcodeUserGroup =
            this.usersGroups?.find((x) => x.group == scheduleAssignedToGroup) == null
              ? scheduleAssignedToGroup
              : null;
        }
      });
  }
  setAssignUser(taskCode: string) {
    this.workflowService
      .getAssignUser(taskCode, this.busline)
      .subscribe((res) => {
        const scheduleAssignedTo = res[0]?.user;
        if (scheduleAssignedTo != '' && scheduleAssignedTo != null) {
          this.workflowScheduleForm.get('scheduleAssignedToGroup').reset();
          this.workflowScheduleForm.get('scheduleAssignedToGroup').disable();
          this.workflowScheduleForm.get('scheduleAssignedTo').enable();
          this.workflowScheduleForm.patchValue({
            scheduleAssignedTo,
          });
          this.readonlyassignedTo = true;
          this.taskcodeUser =
            this.users?.find((x) => x.userName == scheduleAssignedTo) == null
              ? scheduleAssignedTo
              : null;
        }
      });
  }
  setRefNumber() {
    let selected = this.workflowScheduleForm.get('refCat')?.value;
    let selectedref = this.workflowScheduleForm.get('refNo')?.value;
    console.log('selected code', selected, selectedref);
    this.workflowService
      .getRefdetails(selected, selectedref)
      .subscribe((res: any) => {
        this.workflowScheduleForm.patchValue({ refDetails: res });
        console.log('refDetails', res);
      });
  }
  setDefaultSla(taskCode: string) {
    this.workflowService.getDefaultSla(taskCode).subscribe((res) => {
      console.log(res); 
      this.workflowScheduleForm.get('scheduleSla').patchValue(res.originalSla );
    });
  }
  setValues() {
    let taskCode = this.workflowScheduleForm.get('code')?.value;
    this.taskcodeUser = null;
    this.taskcodeUserGroup = null;
    if (
      !taskCode ||
      taskCode == null ||
      taskCode == 'null' ||
      taskCode == undefined
    ) {
      this.readonlyassignedToGroup = false;
      this.readonlyassignedTo = false;
      this.workflowScheduleForm.get('scheduleAssignedTo').enable();
      this.workflowScheduleForm.get('scheduleAssignedTo').reset();
      this.workflowScheduleForm.get('scheduleAssignedToGroup').enable();
      this.workflowScheduleForm.get('scheduleAssignedToGroup').reset();
    } else {
      this.setAssignUser(taskCode);
      this.setAssignUsergroup(taskCode);
      this.setDefaultSla(taskCode);
      this.getDescription(taskCode);
    }
  }
  getDescription(taskCode: string) {
    this.workflowService.getTask(taskCode).subscribe((res) => {
      this.workflowScheduleForm.patchValue({
        description: res?.workflowTask?.taskInstructions,
      });
    });
  }

  getUserGroupsList() {
    this.workflowService.getUserGroups().subscribe((data) => {
      this.usersGroups = data;
      console.log('usersGroups', data);
    });
  }

  getUserList() {
    this.userS.getAllUserCodeAndFullName().subscribe((data) => {
      console.log('users', this.users);
      this.users = data;
      console.log('usersGroups', data);
    });
  }

  formatPayload(data: any) {
    data.scheduleSla = data.scheduleSla
      ? this.uS.hourMinToMinutes2(data.scheduleSla)
      : 0;
  }

  async onSubmit() {
    this.loading = true;
    try {
      let data = {
        ...this.workflowService?.documentList?.value,
        ...this.workflowScheduleForm.value,
        ...{ busLine: this.busline },
      }; 
      this.formatPayload(data)
      const workflowSchedules = JSON.stringify(data);

      const fd = new FormData();
      fd.append('workflow-schedules', workflowSchedules);
      fd.append('file', this.workflowService.fileData);
      this.workflowService.workflowVal = null;
      const ws = await this.workflowService
        .postWorkflowSchedule(fd)
        .toPromise();
      await this.uS.info(
        `Workflow Schedule ${ws.wfNo || ws.id} has been created`,
        1
      );
      if (environment.production) this.workflowScheduleForm.reset();
    } catch (error) {
      console.log(error);
      this.uS.info('An error occurred', 0);
    }

    this.loading = false;
  }
  ngOnDestroy(): void {
    this.workflowService.reset();
  }
}
