import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FindWorkflowService } from 'src/app/Life/Workflow/service/find-workflow.service';
import { ApiService } from 'src/app/Services/api.service';
import { IWorkflow } from '../service/workflow.interface';
import { ViewWorkflowModule } from './view-workflow.module';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const baseUrl = environment.apiBaseUrl;

@Injectable()
export class ViewWorkflowService {
  constructor(
    private wfService: FindWorkflowService,
    private apiService: ApiService
  ) {}

  currentWfNo: string;

  getWorkflowDetails(wfNo: string): Observable<IWorkflow> {
    this.currentWfNo = wfNo;
    return this.wfService.getShowWorkflow(wfNo);
  }
  getDocumentsByParameters(data: any) {
    return this.wfService.getDocumentsByParameters(data);
  }

  getDocumentDetails() {
    return this.wfService.getDocumentsByWfNo(this.currentWfNo);
  }
  getSnoozeDetails() {
    return this.wfService.getSnoozedWorkflows(this.currentWfNo);
  }
  getSnoozeDuration(wfNo: string) {
    return this.wfService.getSnoozeDuration(wfNo);
  }
  getWorkflowStatuses() {
    return this.wfService.getWorkflowStatuses();
  }
  getWorkflowHistory(wfNo: string) {
    return this.wfService.getWorkflowHistory(wfNo);
  }
  getWorkflowChecklist(wfNo: string) {
    return this.wfService.getWorkflowChecklist(wfNo);
  }
  getNoOfDocuments(wfNo: string) {
    return this.apiService
      .get(baseUrl + '/rest/document/search?refCategory=WF&refNo=' + wfNo)
      .pipe(map((res) => res?.length));
  }
  setError(data) {
    return this.apiService.put(baseUrl + '/rest/workflows/error/set', data);
  }
  escalateWorkFlow(data: any){
    return this.apiService.put(baseUrl +'/rest/workflows/error/manualEscal', data)
  }
  unsetError(wfNo: string) {
    return this.apiService.put(
      baseUrl + '/rest/workflows/error/unset/' + wfNo,
      {}
    );
  }
}
