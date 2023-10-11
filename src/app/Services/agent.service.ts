import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPaymentInfo } from '../Life/agent-desk/new-individual-agent/payment-info/payment-info.inteface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  private baseURL = environment.apiBaseUrl + '/rest/agent/';
  agentTypes:any[];
  constructor(private apiService: ApiService) {}
  getAgentNameByAgentNo = (num: string) => {
    return this.apiService.getText(this.baseURL + `name/${num}`);
  };
  getAgentNoByClientNo = (clientNo: string) => {
    return this.apiService
      .get<{ no: string }>(this.baseURL + `no/${clientNo}`)
      .pipe(map((res) => res?.no));
  };
  getAgentTypes = () => {
    return this.apiService
      .getWithLocalCache<any[]>(`${this.baseURL}setup/type/desc`)
      .pipe(tap((x) => this.agentTypes=x));
  };
  getManagerList = (agentype: string) => {
    return this.apiService.get(this.baseURL + `type/no/full-name/${agentype}`);
  };
  updateAgentPayment = (agentNo: string, paymentInformation: IPaymentInfo) => {
    return this.apiService.put(`${this.baseURL}${agentNo}`, {
      paymentInformation,
    });
  };
  findAllUniqueHierAgent = () => {
    return this.apiService.get<
      {
        hierAgentNo: string;
        agentName: string;
      }[]
    >(this.baseURL + `hierarchy/unique`);
  };
}
