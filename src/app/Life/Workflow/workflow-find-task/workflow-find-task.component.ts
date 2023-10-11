import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FindWorkflowService } from '../service/find-workflow.service';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from 'src/app/Services/life/users.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-workflow-find-task',
  templateUrl: './workflow-find-task.component.html',
  styleUrls: ['./workflow-find-task.component.scss'],
})
export class WorkflowFindtaskComponent implements OnInit {
  faEye = faEye;
  workflow:any = []
  workflowlistForm: FormGroup
  taskcode:any = []
  status:any = []
  groups: any[] = []
  levelsList: any[] = []
  users:any[] = []
  constructor(
    private router:Router,public route:ActivatedRoute,
    public workflowService: FindWorkflowService,
    private fb: FormBuilder,
    private userService: UsersService
    ) { }

  ngOnInit(): void {
    this.workflowlistForm = this.fb.group({
      wfNo: new FormControl('', Validators.required, this.workflowService.validateWfNo.bind(this.workflowService)),
      groupAssignedTo: new FormControl(null, Validators.required),
      taskCode: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
      level: new FormControl(null, Validators.required),
      assignedBy: new FormControl(null, Validators.required),
      textDescription: new FormControl(null, Validators.required),
      schedule: new FormControl(null),
      createDateFrom: new FormControl(null, Validators.required),
      createDateTo: new FormControl(null, Validators.required),
    });

    this.setStatusList()
    this.setTaskCodeScheduleList()
    this.setGroupAssignedTo()
    this.setLevelsList()
    this.setUsersList()
  }

  call_workflowserach_list() {
    const params = new URLSearchParams();
    const formValue = this.workflowlistForm.value; // this.form should be a FormGroup
    for (const key in formValue) {
      params.append(key, formValue[key]);
    }
    this.router.navigate(['../workflow-find-task-list'], {
      queryParams: this.workflowlistForm.value,
      relativeTo: this.route,
    });
  }

  get workflowNo() {
    return this.workflowlistForm.get('wfNo');
  }
  showWorkflow() {
    const wfNo = this.workflowlistForm.get('wfNo').value;

    if (wfNo) {
      this.router.navigate(['../view/index'], { queryParams: { wfNo } ,    relativeTo:this.route});
      return;
    }
    alert('Workflow No missing, Kindly input a Worfklow No');
  }
  setStatusList() {
    this.workflowService.getStatusList().subscribe((res) => {
      this.status = res;
      console.log('status', res);
    });
  }
  setUsersList() {
    this.workflowService.getUsers().subscribe((res) => {
      this.users = res
      console.log('users', res)
    })
  }
  setTaskCodeScheduleList() {
    this.workflowService.getTaskCodeList().subscribe((res) => {
      this.taskcode = res;
      console.log('task code', res);
    });
  }
  setAssignby() {
    let selected = this.workflowlistForm.get('assignedBy')?.value;
    console.log(selected);
    this.workflowService.getFindWorkflowByAssigned(selected).subscribe((res) => {
      console.log(res);
    });
  }

  setDescription() {
    let selected = this.workflowlistForm.get('description')?.value;
    console.log(selected);
    this.workflowService.getFindWorkflowDescription(selected).subscribe((res) => {
      console.log(res);
    });
  }
  setLevel() {
    let selected = this.workflowlistForm.get('level')?.value;
    console.log(selected);
    this.workflowService.getFindWorkflowLevel(selected).subscribe((res) => {
      console.log(res);
    });
  }
  setStatus() {
    let selected = this.workflowlistForm.get('status')?.value;
    console.log(selected);
    this.workflowService.getFindWorkflowStatus(selected).subscribe((res) => {
      console.log(res);
    });
  }
  setWorkflowtaskcode() {
    let selected = this.workflowlistForm.get('workflowtaskcode')?.value;
    console.log(selected);
    this.workflowService.getFindWorkflowCode(selected).subscribe((res) => {
      console.log(res);
    });
  }
  setGroupAssignedTo() {
    this.userService.getAllUsersGroup().subscribe((data: any[]) => {
      this.groups = data;
    });
  }
  setCreatedFrom() {
    let selected = this.workflowlistForm.get('groupAssignedTo')?.value;
    console.log(selected);
    this.workflowService.getCreatedFrom(selected).subscribe((res) => {
      console.log(res);
    });
  }
  setCreatedTo() {
    let selected = this.workflowlistForm.get('groupAssignedTo')?.value;
    console.log(selected);
    this.workflowService.getCreatedTo(selected).subscribe((res) => {
      console.log(res);
    });
  }
  /*  setWorkflowNo(){
    let selected = this.workflowlistForm.get("workflowNo")?.value
    console.log(selected)
    this.workflowService.getFindWorkflowByAssigned(selected).subscribe(res => {
      console.log(res)
    })
  } */
  setLevelsList(){
    this.workflowService.getLevelsList()
      .subscribe(
        (res: any[]) => this.levelsList = res,
        (err: HttpErrorResponse) => console.log("Error fetching levels list", err)
      )
  }

}
