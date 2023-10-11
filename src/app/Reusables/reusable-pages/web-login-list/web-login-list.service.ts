import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';
import { ERModule } from '../../reusable-extras/reusable.model'; 

@Injectable({
  providedIn: 'root'
})
export class WebLoginListService { 
  private baseURL = environment.apiBaseUrl;

  constructor(public apiService: ApiService) {}

  //#region get WebLogins
  getWebLogins(rModule: ERModule, id: string) {
    if (rModule == ERModule.agent) return this.getAgentWebLogins(id);
    if (rModule == ERModule.client) return this.getClientWebLogins(id);
    if (rModule == ERModule.policy) return this.getPolicyWebLogins(id);
    if (rModule == ERModule.workflow) return this.getWorkflowWebLogins(id);
    else return null;
  }

  getClientWebLogins = (clientNo: string) =>
    this.apiService.get<any[]>(
      this.baseURL + '/rest/client/web_access/' + clientNo
    );
  getAgentWebLogins = (agentNo: string) =>
    this.apiService.get<any[]>(
      this.baseURL + '/rest/document/client/' + agentNo
    );
  getPolicyWebLogins = (policyNo: string) =>
    this.apiService.get<any[]>(
      this.baseURL + '/rest/document/client/' + policyNo
    );
  getWorkflowWebLogins=(workflowNo: string)=> {
    return this.apiService
      .get<any[]>(this.baseURL + '/rest/document/workflows/' + workflowNo);
  }
  //#endregion 
}
