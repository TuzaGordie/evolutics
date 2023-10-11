import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FindWorkflowService } from '../../service/find-workflow.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilityService } from 'src/app/Services/utility.service';
import { AppService } from 'src/app/Services/app.service';
import { AddDocumentModalComponent } from 'src/app/Reusables/reusable-comps/add-document-modal/add-document-modal.component';
import { IDocMetadata } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-workflow-task',
  templateUrl: './workflow-task.component.html',
  styleUrls: ['./workflow-task.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class WorkflowTaskComponent implements OnInit {
  workflowTaskForm: FormGroup = new FormGroup({
    assignedBy: new FormControl(environment.user?.userDetails?.username),
    assignedTo: new FormControl(null),
    assignedToGroup: new FormControl(null),
    code: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    errorReason: new FormControl(null),
    originalSla: new FormControl(null),
    refCat: new FormControl(null),
    refDetails: new FormControl(null),
    refNo: new FormControl(null),
    revisedSla: new FormControl(null),
    source: new FormControl(null),
    startOn: new FormControl(
      new Date().toJSON().split('T')[0] +
        'T' +
        new Date().toTimeString().split(' ')[0]
    ),
    status: new FormControl('A'),
  });
  nbofRef: number = 1;
  taskcode: any[] = [];
  reflist: any = [];
  source: any = [];
  status: any = [];
  startOnDate: any;
  startOnTime: any;
  readonly busline: string;
  description: any;

  loading: boolean;
  @ViewChild('startOn') startOn: ElementRef<HTMLSelectElement>;
  readonlyassignedToGroup: boolean;
  readonlyassignedTo: boolean;
  taskcodeUser: string;
  taskcodeUserGroup: string;
  users: { fullName: string; userName: string; code: string }[];
  usersGroups: { group: string }[];

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    public workflowService: FindWorkflowService,
    public route: ActivatedRoute,
    public uS: UtilityService,
    public userS: UserService,
    public appS: AppService
  ) {
    this.busline = this.appS.getCurrentSystemMetadata.busline;
  }

  ngOnInit(): void {
    this.getUserGroupsList();
    this.getUserList();
    this.setTaskCodeScheduleList();
    this.setrefList();
    this.setSourceList();
    this.setStatusList();
    // this.setStartOn();
    console.log(this.workflowService.workflowVal);
    this.workflowTaskForm.controls.assignedToGroup;
    if (this.workflowService.workflowVal) {
      this.workflowTaskForm.patchValue(this.workflowService.workflowVal);
    } else {
      this.workflowTaskForm.controls.status.patchValue('A');
      this.workflowTaskForm.controls.status.disable();
    }
  }

  call_workflow_task_document_list() {
    this.workflowService.workflowVal = this.workflowTaskForm.value;
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
  // setStartOn() {
  //   this.workflowService.getStartOn().subscribe((res: any) => {
  //     let date = res;
  //     console.log(date.slice(0, 10));
  //     console.log(date.slice(11));
  //     this.startOnDate = date.slice(0, 10);
  //     this.startOnTime = date.slice(11);
  //     console.log('starton', res);
  //     this.workflowTaskForm.patchValue({
  //       startOn: res,
  //     });
  //   });
  // }
  setAssignUsergroup(taskcode: string) {
    this.workflowService
      .getAssignUsergroup(taskcode, this.busline)
      .subscribe((res) => {
        const assignedToGroup = res[0]?.group;
        if (assignedToGroup != '' && assignedToGroup != null) {
          this.workflowTaskForm.get('assignedToGroup').enable();
          this.workflowTaskForm.get('assignedTo').reset();
          this.workflowTaskForm.get('assignedTo').disable();
          this.workflowTaskForm.patchValue({
            assignedToGroup,
          });
          this.readonlyassignedToGroup = true;
          this.taskcodeUserGroup =
            this.usersGroups?.find((x) => x.group == assignedToGroup) == null
              ? assignedToGroup
              : null;
        }
      });
  }
  setAssignUser(taskCode: string) {
    this.workflowService
      .getAssignUser(taskCode, this.busline)
      .subscribe((res) => {
        const assignedTo = res[0]?.user;
        if (assignedTo != '' && assignedTo != null) {
          this.workflowTaskForm.get('assignedToGroup').reset();
          this.workflowTaskForm.get('assignedToGroup').disable();
          this.workflowTaskForm.get('assignedTo').enable();
          this.workflowTaskForm.patchValue({
            assignedTo,
          });
          this.readonlyassignedTo = true;
          this.taskcodeUser =
            this.users?.find((x) => x.userName == assignedTo) == null
              ? assignedTo
              : null;
        }
      });
  }
  setDefaultSla(taskCode: string) {
    this.workflowService.getDefaultSla(taskCode).subscribe((res) => {
      console.log(res);
      debugger;
      this.workflowTaskForm.patchValue({
        originalSla: res.originalSla,
      });
    });
  }
  setRefNumber() {
    let selected = this.workflowTaskForm.get('refCat')?.value;
    let selectedref = this.workflowTaskForm.get('refNo')?.value;
    console.log('selected code', selected, selectedref);
    this.workflowService
      .getRefdetails(selected, selectedref)
      .subscribe((data: any) => {
        this.workflowTaskForm.patchValue({ refDetails: data });

        console.log('refDetails', data);
      });
  }

  getValues() {
    let taskCode = this.workflowTaskForm.get('code')?.value;
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
      this.workflowTaskForm.get('assignedTo').enable();
      this.workflowTaskForm.get('assignedTo').reset();
      this.workflowTaskForm.get('assignedToGroup').enable();
      this.workflowTaskForm.get('assignedToGroup').reset();
    } else {
      this.setAssignUser(taskCode);
      this.setAssignUsergroup(taskCode);
      this.setDefaultSla(taskCode);
      this.getDescription(taskCode);
    }
  }

  getUserGroupsList() {
    this.workflowService.getUserGroups().subscribe((data) => {
      this.usersGroups = data;
      console.log('usersGroups', data);
    });
  }

  getUserList() {
    this.userS.getAllUserCodeAndFullName().subscribe((data) => {
      this.users = data;
    });
  }

  getDescription(taskCode: string) {
    this.workflowService.getTask(taskCode).subscribe((res) => {
      this.workflowTaskForm.patchValue({
        description: res?.workflowTask?.taskInstructions,
      });
    });
  }

  async onSubmit() {
    this.loading = true;
    try {
      console.log(this.workflowTaskForm);
      // delete this.workflowTaskForm.value.refDetails;
      let data = {
        ...this.workflowService?.documentList?.value,
        ...this.workflowTaskForm?.value,
        ...{ busLine: this.busline },
      };
      data.status = data.status || 'A';
      data.revisedSla = data.revisedSla || data.originalSla;
      debugger;
      const myJSON = JSON.stringify(data);
      const uFrm = new FormData();

      uFrm.append('workflows', myJSON);

      uFrm.append('file', this.workflowService.fileData);
      console.log(uFrm);
      this.workflowService.workflowVal = null;
      const wt = await this.workflowService.postWorkflowTask(uFrm).toPromise();
      this.loading = false;
      await this.uS.info(`Workflow Task ${wt.wfNo} has been created`, 1);
      if (environment.production)
        this.router.navigate(['../view/index'], {
          queryParams: { wfNo: wt.wfNo },
          relativeTo: this.route,
        });
      // this.workflowTaskForm.reset();
    } catch (error) {
      this.loading = false;
      console.log(error);
      this.uS.info('An error occurred', 0);
    }
  }
  ngOnDestroy(): void {
    this.workflowService.reset();
  }
}
