import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/Services/api.service';
import { ICodeTitle } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { TaskSetupService } from '../task-setup-extras/task-setup.service';

@Component({
  selector: 'app-index-task-setup',
  templateUrl: './index-task-setup.component.html',
  styleUrls: ['./index-task-setup.component.scss'],
})
export class IndexSetupsTaskSetupComponent implements OnInit {
  taskSetupForm: FormGroup;
  notAllowed = false;

  workflowGroups = [];
  taskCodes = [];
  get taskcode() {
    return this.taskSetupForm.value.taskCode as string;
  }
  get baseURL() {
    return environment.apiBaseUrl + '/rest/';
  }
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    private fb: FormBuilder,
    private api: ApiService,
    public tS: TaskSetupService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.fetchWorkflowGroups();
    this.fetchTaskCodes();
  }

  createForm() {
    this.taskSetupForm = new FormGroup({
      workflowGroup: new FormControl(),
      taskCode: new FormControl(null, Validators.required),
    });
  }
  get workflowGroup() {
    return this.taskSetupForm?.value?.workflowGroup;
  }
  show() {
    if (this.taskSetupForm.invalid) {
      this.notAllowed = true;
      console.log('taskSetupForm value', this.taskSetupForm.value);
      return;
    }
    this.router.navigate(['../show'], {
      relativeTo: this.route,
      queryParams: { code: this.taskcode },
    });
  }
  clone() {
    if (this.taskSetupForm.invalid) {
      this.notAllowed = true;
      console.log('taskSetupForm value', this.taskSetupForm.value);
      return;
    }
    this.router.navigate(['../clone'], {
      queryParams: { clone: 'true', code: this.taskcode },
      relativeTo: this.route,
    });
  }

  fetchWorkflowGroups() {
    this.api
      .getCodes<ICodeTitle>(this.baseURL + 'codes/sub/group/Workflow_Group')
      .subscribe((data) => {
        this.workflowGroups = data;
      });
  }

  fetchTaskCodes() {
    this.api
      .getCodes<ICodeTitle>(this.baseURL + 'workflows/task/code')
      .subscribe((data) => {
        this.taskCodes = data;
      });
  }
}
