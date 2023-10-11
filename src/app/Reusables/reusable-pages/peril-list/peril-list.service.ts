import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';
import { ERModule } from '../../reusable-extras/reusable.model';

@Injectable({
  providedIn: 'root'
})
export class PerilListService {
  private baseURL = environment.apiBaseUrl;

  constructor(public apiService: ApiService) {}

  //#region get Items
  getItems(rModule: ERModule, id: string) {
    if (rModule == ERModule.agent) return this.getAgentItems(id);
    if (rModule == ERModule.client) return this.getClientItems(id);
    if (rModule == ERModule.policy) return this.getPolicyItems(id);
    if (rModule == ERModule.workflow) return this.getWorkflowItems(id);
    else return null;
  }

  getClientItems = (clientNo: string) =>
    this.apiService.get<any[]>(
      this.baseURL + '/rest/client/endorsements/' + clientNo
    );
  getAgentItems = (agentNo: string) =>
    this.apiService.get<any[]>(
      this.baseURL + '/rest/document/client/' + agentNo
    );
  getPolicyItems = (policyNo: string) =>
    this.apiService.get<any[]>(
      this.baseURL + '/rest/document/client/' + policyNo
    );
  getWorkflowItems=(workflowNo: string)=> {
    return this.apiService
      .get<any[]>(this.baseURL + '/rest/document/workflows/' + workflowNo);
  }
  //#endregion
}
