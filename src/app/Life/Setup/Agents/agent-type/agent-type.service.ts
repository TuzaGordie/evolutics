import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AgentTypeService {
  http: any;
  URL: any;

  constructor(private httpClient: ApiService) { }

  getAgentSetupType() {
    return this.httpClient.get(`${environment.apiBaseUrl}/rest/agent/setup/type/desc`)
  }

  setupAgent(agentData: {}) {
    return this.httpClient.post(`${environment.apiBaseUrl}/rest/agent/setup/type`, agentData)
  }
  getCodeAndTitleByCodeSubgroup(codeSubGroup: string) {
    return this.httpClient.get(`${environment.apiBaseUrl}/rest/codes/sub/category/${codeSubGroup}`)

  }
  getCurrencyCodeAndDescription() {
    return this.httpClient.get(`${environment.apiBaseUrl}/rest/currency`)

  }
  getBranchCodeAndDescription() {
    return this.httpClient.get(`${environment.apiBaseUrl}/rest/branch/code/desc`)

  }

  getCompanyCodeAndDescription() {
    return this.httpClient.get(`${environment.apiBaseUrl}/rest/company/code/desc`)
  }

  getAgentSetupByType(type: string): Observable<any> {
    return this.httpClient.get(`${environment.apiBaseUrl}/rest/agent/setup/type/${type}`)
      .pipe(
        retry(2),
      );
  }
}

