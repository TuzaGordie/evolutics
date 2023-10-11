import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import {
  IWorkflow,
  IWorkflowDocument,
  IWorkflowSchedule,
} from './workflow.interface';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../Services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ITaskSetup } from '../../Setup/task-setup/task-setup-extras/task-setup.response.interface';
import { AppService } from 'src/app/Services/app.service';

const baseUrl = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root',
})
export class FindWorkflowService {
  workflowVal: any;
  documentList: FormGroup;
  fileData: File;
  checkSearchValue: any;
  self = this;
  constructor(
    private http: HttpClient,
    public apiService: ApiService,
    router: Router,public appS:AppService
  ) {}
  reset() {
    this.workflowVal = null;
    this.documentList = null;
    this.fileData = null;
  }
  getTaskCodeList() {
      // this.apiService.getCodes(baseUrl + '/rest/workflows/task/code').toPromise();
    return this.apiService.getCodes(baseUrl + '/rest/workflows/task/code/description');
  }
  getTask(code: string) {
    return this.apiService.get<ITaskSetup>(
      baseUrl + '/rest/workflows/task/setup/' + code
    );
  }
  getrefList() {
    return this.apiService
      .get(baseUrl + '/rest/codes/sub/category/REF_CATEGORY')
      .pipe(map((res) => this.apiService.sortCodes(res)));
  }

  getSourceList() {
    return this.apiService.getCodes(baseUrl + '/rest/codes/WORKFLOW/SOURCE');
  }
  getUsers() {
    return this.apiService.get(baseUrl + '/rest/users/code/full-name')
  }
  getStatusList() {
    return this.apiService.get(
      baseUrl + '/rest/codes/sub/category/WORKFLOW_STATUS'
    );
  }
  getAssignUser(taskcode: any, busline: any) {
    return this.apiService.get<{user:string}[]>(
      baseUrl + '/rest/workflows/user/' + taskcode + '/' + busline
    );
  }
  getAssignUsergroup(taskcode: any, busline: any) {
    return this.apiService.get<{group:string}[]>(
      baseUrl + '/rest/workflows/user/group/' + taskcode + '/' + busline
    );
  }
  getDocumentSens() {
    return this.apiService.get(
      baseUrl + '/rest/codes/sub/category/DOCUMENT_SENSITIVITY'
    );
  }

  getDocumentBranch() {
    return this.apiService.get(baseUrl + '/rest/branch/code/desc');
  }

  getDocumentCategory() {
    return this.apiService.get(
      baseUrl + '/rest/codes/sub/category/DOCUMENT_CATEGORY'
    );
  }
  getDocumentSubCategory(data) {
    return this.apiService.get(
      baseUrl + `/rest/codes/sub/category/DOCUMENT_SUBCATEGORY/${data}`
    );
  }
  getScheduleFrequeny() {
    return this.apiService.get(baseUrl + '/rest/codes/sub/category/FREQUENCY');
  }
  getDefaultSla(data: any) {
    return this.apiService.get<{originalSla}>(
      baseUrl + '/rest/workflows/original/sla/' + data
    );
  }
  getRefdetails(data: any, refno: any) {
    return this.apiService.getText(
      baseUrl + `/rest/document/search/details/${data}/${refno}`
    );
  }
  getDocumentsByParameters(data: any){
    return this.apiService.get<any[]>(baseUrl + '/rest/document/search', data)
  }
  getDocumentsByWfNo(wfNo: string) {
    return this.apiService
      .get(baseUrl + '/rest/document/workflows/' + wfNo)
      .pipe(shareReplay());
  }
  getSnoozedWorkflows(wfNo: string) {
    return this.apiService
      .get(baseUrl + '/rest/workflows/snooze/auth/' + wfNo)
      .pipe(shareReplay());
  }
  /*  getClientList(data:any) {
     return this.apiService.get("https://dev-api-evt.herokuapp.com/cLIENT?CLIENT_NO=" + data)
   } */
  postWorkflowTask(data: any) {
    return this.apiService.postFile(baseUrl + '/rest/workflows', data);
  }
  postWorkflowSchedule(data: any) {
    return this.apiService.postFile<IWorkflowSchedule>(
      baseUrl + '/rest/workflows/schedule',
      data
    );
  }

  getFindWorkflow(params: string) {
    return this.apiService.get(baseUrl + '/rest/workflows' + params);
  }
  getShowWorkflow(data: string) {
    return this.apiService
      .get<IWorkflow>(baseUrl + '/rest/workflows/' + data)
      .pipe(shareReplay());
  }
  validateWfNo(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.getShowWorkflow(control?.value).pipe(
      map((data) => {
        console.log('checking');
        console.log(!!data);
        return !!data ? null : { valid: true };
      }),
      catchError(() => of(null))
    );
  }
  getFindWorkflowByAssigned(data: any) {
    return this.apiService.get(baseUrl + '/rest/workflows?assignedBy=' + data);
  }
  getFindWorkflowDescription(data: any) {
    return this.apiService.get(
      baseUrl + '/rest/workflows?taskDescription=' + data
    );
  }
  getFindWorkflowLevel(data: any) {
    return this.apiService.get(baseUrl + '/rest/workflows?slaLevel=' + data);
  }
  getFindWorkflowStatus(data: any) {
    return this.apiService.get(baseUrl + '/rest/workflows?status=' + data);
  }
  getCreatedFrom(data: any) {
    return this.apiService.get(baseUrl + '/rest/workflows?createdOn=' + data);
  }
  getCreatedTo(data: any) {
    return this.apiService.get(baseUrl + '/rest/workflows?createdUser=' + data);
  }
  getFindWorkflowCode(data: any) {
    return this.apiService.get(baseUrl + '/rest/workflows?taskCode=' + data);
  }
  getFindWorkflowToAssigned(data: any) {
    return this.apiService.get(baseUrl + '/rest/workflows?assignedTo=' + data);
  }
  getStartOn() {
    return this.apiService.get(
      baseUrl + '/rest/workflows/default/start/date/time'
    );
  }
  getLevelsList() {
    return this.apiService.get(baseUrl + '/rest/codes/code_title/SLA_LEVEL');
  }
  getErrorReasonsList() {
    return this.apiService.get(
      baseUrl + '/rest/codes/sub/category/WF_ERROR_REASON'
    );
  }
  getErrorSeveritiesList() {
    return this.apiService.get(
      baseUrl + '/rest/codes/sub/category/WF_ERROR_LEVEL'
    );
  }
  getUsersList() {
    return this.apiService.get(baseUrl + '/rest/users/id/fullname');
  }
  getUserGroupsList() {
    return this.apiService.get(baseUrl + '/rest/users/group/all');
  }
  getUserGroup(taskCode,busLine=this.appS.getCurrentSystemMetadata?.busline) {
    return this.apiService.get<{group:string}[]>(
      baseUrl + `/rest/workflows/user/group/${taskCode}/${busLine}`
    );
  }

  getUserGroups() {
    return this.apiService.get<{group:string}[]>(baseUrl + `/rest/users/group`);
  }

  getUser() {
    return this.apiService.get(baseUrl + `/rest/users/code/full-name`);
  }

  getDescription(taskCode) {
    return this.apiService.get(
      baseUrl + `/rest/workflows/description/${taskCode}`
    );
  }

  getSnoozeBasesList() {
    return this.apiService.get(baseUrl + '/rest/codes/code_title/SNOOZE_BASIS');
  }
  getSnoozeReasonsList() {
    return this.apiService.get(
      baseUrl + '/rest/codes/code_title/SNOOZE_REASON'
    );
  }
  getSnoozeDuration(wfNo: string) {
    return this.apiService.get(baseUrl + '/rest/workflows/snooze/' + wfNo)
  }
  getWorkflowStatuses() {
    return this.apiService.get(
      baseUrl + '/rest/codes/code_title/WORKFLOW_STATUS'
    );
  }
  getWorkflowHistory(wfNo: string) {
    return this.apiService.get(baseUrl + '/rest/workflows/history/' + wfNo)
  }
  getWorkflowChecklist(wfNo: string){
    return this.apiService.get(baseUrl + '/rest/workflows/checklist/'+ wfNo)
  }
}
