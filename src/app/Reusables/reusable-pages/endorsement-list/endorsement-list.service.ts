import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';
import { ERModule } from '../../reusable-extras/reusable.model';

@Injectable({
  providedIn: 'root',
})
export class EndorsementListService {
  private baseURL = environment.apiBaseUrl;

  constructor(public apiService: ApiService) {}

  //#region get Endorsements
  getEndorsements(rModule: ERModule, id: string) {
    if (rModule == ERModule.agent) return this.getAgentEndorsements(id);
    if (rModule == ERModule.client) return this.getClientEndorsements(id);
    if (rModule == ERModule.policy) return this.getPolicyEndorsements(id);
    if (rModule == ERModule.workflow) return this.getWorkflowEndorsements(id);
    else return null;
  }

  getActions() {
    return  this.apiService.get<any[]>('');
  }
  getModules() {
    return  this.apiService.get<any[]>('');
  }
  getClientEndorsements = (clientNo: string) =>
    this.apiService.get<any[]>(
      this.baseURL + '/rest/client/endorsements/' + clientNo
    );
  getAgentEndorsements = (agentNo: string) =>
    this.apiService.get<any[]>(this.baseURL + '/rest/document/client/' + agentNo);
  getPolicyEndorsements = (policyNo: string) =>
    this.apiService.get<any[]>(this.baseURL + '/rest/document/client/' + policyNo);
  getWorkflowEndorsements = (workflowNo: string) => {
    return this.apiService.get<any[]>(
      this.baseURL + '/rest/document/workflows/' + workflowNo
    );
  };
  //#endregion
}
