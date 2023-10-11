import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FindWorkflowService {
  get baseURL() {
    return environment.apiBaseUrl + '/rest/';
  }
  workflowTaskservice: any = [];
  documentList: any = [];
  fileData: any;
  checkSearchValue: any;

  constructor(public http: HttpClient) {}

  getTaskCodeList() {
    return this.http.get(this.baseURL + 'workflows/task/code');
  }
  getrefList() {
    return this.http.get(this.baseURL + 'codes/sub/category/REF_CATEGORY');
  }

  getSourceList() {
    return this.http.get(this.baseURL + 'codes/WORKFLOW/SOURCE');
  }
  getStatusList() {
    return this.http.get(this.baseURL + 'codes/sub/category/WORKFLOW_STATUS');
  }
  getAssignUser(taskcode: any, busline: any) {
    return this.http.get(
      this.baseURL + 'workflows/user/' + taskcode + '/' + busline
    );
  }
  getAssignUsergroup(taskcode: any, busline: any) {
    return this.http.get(
      this.baseURL + 'workflows/user/group/' + taskcode + '/' + busline
    );
  }
  getDocumentSens() {
    return this.http.get(
      this.baseURL + 'codes/sub/category/DOCUMENT_SENSITIVITY'
    );
  }
  getDocumentCategory() {
    return this.http.get(this.baseURL + 'codes/sub/category/DOCUMENT_CATEGORY');
  }
  getScheduleFrequeny() {
    return this.http.get(this.baseURL + 'codes/sub/category/FREQUENCY');
  }
  getDefaultSla(data: any) {
    return this.http.get(this.baseURL + 'workflows/original/sla/' + data);
  }
  getRefdetails(data: any, refno: any) {
    return this.http.get(
      this.baseURL + 'document/search/details/' + data + '/' + refno
    );
  }
  /*  getClientList(data:any) {
    return this.http.get("https://dev-api-evt.herokuapp.com/cLIENT?CLIENT_NO=" + data)
  } */
  postWorkflowTask(data: any) {
    return this.http.post(this.baseURL + 'workflows', data).subscribe((res) => {
      console.log(res);
    });
  }
  postWorkflowSchedule(data: any) {
    return this.http
      .post(this.baseURL + 'workflows/schedule', data)
      .subscribe((res) => {
        console.log(res);
      });
  }

  getFindWorkflow() {
    return this.http.get(this.baseURL + 'workflows');
  }
  getFindWorkflowByAssigned(data: any) {
    return this.http.get(this.baseURL + 'workflows?assignedBy=' + data);
  }
  getFindWorkflowDescription(data: any) {
    return this.http.get(this.baseURL + 'workflows?taskDescription=' + data);
  }
  getFindWorkflowLevel(data: any) {
    return this.http.get(this.baseURL + 'workflows?slaLevel=' + data);
  }
  getFindWorkflowStatus(data: any) {
    return this.http.get(this.baseURL + 'workflows?status=' + data);
  }
  getCreatedFrom(data: any) {
    return this.http.get(this.baseURL + 'workflows?createdOn=' + data);
  }
  getCreatedTo(data: any) {
    return this.http.get(this.baseURL + 'workflows?createdUser=' + data);
  }
  getFindWorkflowCode(data: any) {
    return this.http.get(this.baseURL + 'workflows?taskCode=' + data);
  }
  getFindWorkflowToAssigned(data: any) {
    return this.http.get(this.baseURL + 'workflows?assignedTo=' + data);
  }
  getStartOn() {
    return this.http.get(this.baseURL + 'workflows/default/start/date/time');
  }
}
