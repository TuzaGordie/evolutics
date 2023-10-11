import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';
import { ERModule } from '../../reusable-extras/reusable.model';
import { IDocument } from '../document-list/document.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkflowListService {
  private baseURL = environment.apiBaseUrl;

  constructor(public apiService: ApiService) {}

  //#region get Workflows
  getWorkflows(rModule: ERModule, id: string) {
    if (rModule == ERModule.agent) return this.getAgentWorkflows(id);
    if (rModule == ERModule.client) return this.getClientWorkflows(id);
    if (rModule == ERModule.policy) return this.getPolicyWorkflows(id);
    if (rModule == ERModule.workflow) return this.getWorkflowWorkflows(id);
    else return null;
  }

  getClientWorkflows = (clientNo: string) =>
    this.apiService.get<IDocument[]>(
      this.baseURL + '/rest/workflows/client/' + clientNo
    );
  getAgentWorkflows = (agentNo: string) =>
    this.apiService.get<IDocument[]>(
      this.baseURL + '/rest/document/client/' + agentNo
    );
  getPolicyWorkflows = (policyNo: string) =>
    this.apiService.get<IDocument[]>(
      this.baseURL + '/rest/document/client/' + policyNo
    );
  getWorkflowWorkflows=(workflowNo: string)=> {
    return this.apiService
      .get<IDocument[]>(this.baseURL + '/rest/document/workflows/' + workflowNo);
  }
  //#endregion

  getWorkflowStatusList(){
    return this.apiService.get(this.baseURL + "/rest/codes/sub/category/WORKFLOW_STATUS")
  }
  getSlaLevelsList(){
    return this.apiService.get(this.baseURL + "/rest/codes/sub/category/SLA_LEVEL")
  }

}
