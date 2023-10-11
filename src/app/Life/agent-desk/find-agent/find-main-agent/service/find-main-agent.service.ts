import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';
import { IAgentInfo } from '../../../agent-extras/agent.interface';

@Injectable({
  providedIn: 'root',
})
export class FindMainAgentService {
  // agentInfo:IAgentInfo
  get baseUrl() {
    return environment.apiBaseUrl;
  }
  agentInfo: any;
  searchedData: any = [];

  constructor(public apiService: ApiService) {}

  getClientList(clientNo: string) {
    return this.apiService.get(this.baseUrl + '/rest/client/view/' + clientNo);
  }
  getClientList2() {
    return this.apiService.get('https://dev-api-evt.herokuapp.com/cLIENT');
  }
  getEndorsements(data: any) {
    // debugger
    return this.apiService.get(
      this.baseUrl + '/rest/client/endorsements/' + data
    );
  }
  getWebflows(data: any) {
    // debugger
    return this.apiService.get(this.baseUrl + '/rest/client/workflow/' + data);
  }
  getWebLogin(ClientNo: any) {
    return this.apiService.get(
      this.baseUrl + '/rest/client/web_access/' + ClientNo
    );
  }
  getAgentPolicies(agentNo) {
    return this.apiService.get(
      this.baseUrl + '/rest/policy/owned/agent/' + agentNo
    );
  }
  getPolicies() {
    return this.apiService.get(
      'http://dev-api-evt.herokuapp.com/getclientrelpolicy'
    );
  }
  getDocument(data: any) {
    // debugger
    return this.apiService.get(this.baseUrl + '/rest/client/document/' + data);
  }
  getPendingPayments() {
    return this.apiService.get(
      'https://dev-api-evt.herokuapp.com/Pendingpayments '
    );
  }
  getAgentList(data: any) {
    // debugger
    return this.apiService.get<IAgentInfo>(
      this.baseUrl + '/rest/agent/' + data
    );
  }
  getAgentList2(data: any) {
    return this.apiService.get(this.baseUrl + '/rest/agent/view/' + data);
  }
  getAgentList3(data: any) {
    return this.apiService.get(
      'https://dev-api-evt.herokuapp.com/CRM.AGENT?CLIENT_NO=' + data
    );
  }
  updateAgent(agentNo: string, data) {
    return this.apiService.put(this.baseUrl + '/rest/agent/' + agentNo, data);
  }
  getAgentLoan(data: any) {
    return this.apiService.get(
      'https://dev-api-evt.herokuapp.com/AGENT_Loan?AGENT_NO=' + data
    );
  }
  getPendingQuotes(agentNo, busLine) {
    return this.apiService.get(
      this.baseUrl +
        '/rest/agent/pending/quote/' +
        agentNo +
        '?busLine=' +
        busLine
    );
  }
  getnameList(data: any) {
    return this.apiService.get(this.baseUrl + '/rest/agent/search' + data);
  }
  getsearch(query: any) {
    // debugger

    return this.apiService.get(this.baseUrl + '/rest/agent/search', query);
  }
  getCreatedByList(data: any) {
    return this.apiService.get(
      'https://dev-api-evt.herokuapp.com/CRM.AGENT?CREATED_BY=' + data
    );
  }
  getphoneList(data: any) {
    return this.apiService.get(
      'https://dev-api-evt.herokuapp.com/CRM.AGENT?Phonenumber1=' + data
    );
  }
  getemailList(data: any) {
    return this.apiService.get(
      'https://dev-api-evt.herokuapp.com/CRM.AGENT?Email=' + data
    );
  }
  submitPostData(data: any) {
    return this.apiService.post(
      'https://dev-api-evt.herokuapp.com/client_push_data',
      data
    );
  }

  getStatusCodesList() {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/category/AGENT_STATUS'
    );
  }
  getCommissionsList(agentNo) {
    return this.apiService.get(
      this.baseUrl +
        `/rest/statement/%7BagentNo%7D/%7BproviderNo%7D?agentNo=${agentNo}`
    );
  }
  getCommissionTypesList() {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/group/COMM_POSTING_CODE'
    );
  }
  getCommissionEarned(agentNo) {
    return this.apiService.get(
      this.baseUrl + '/rest/commission/agent/earned/' + agentNo
    );
  }
  getCommissionUnEarned(agentNo) {
    return this.apiService.get(
      this.baseUrl + '/rest/commission/agent/unearned/' + agentNo
    );
  }
  getUnprocessedBalance(agentNo) {
    return this.apiService.get(
      this.baseUrl + '/rest/commission/agent/balance/' + agentNo
    );
  }
  getTotalProduction(agentNo) {
    return this.apiService
      .get(this.baseUrl + '/rest/policy/compute/agent/production/' + agentNo)
      .pipe(
        map((res) =>
          Object.values(res).reduce((a, b) => Number(a) + Number(b), 0)
        )
      );
  }
  getProduction(agentNo) {
    return this.apiService.get(
      this.baseUrl + '/rest/policy/compute/agent/production/' + agentNo
    );
  }
  getCommissionDue(agentNo) {
    return this.apiService.get(
      this.baseUrl + `/rest/commission/due/?agentNo=${agentNo}`
    );
  }
  getCommissionPaid(agentNo) {
    return this.apiService.get(this.baseUrl + '' + agentNo);
  }
  getNotesList(agentNo: string) {
    return this.apiService.get(
      this.baseUrl + `/rest/notes/active/AGT/${agentNo}`
    );
  }
  resolveNote({ refCat, refNo, id, resolvedBy }) {
    return this.apiService.put(
      this.baseUrl +
        `/rest/notes/resolve/${refCat}/${refNo}/${id}/${resolvedBy}`,
      {}
    );
  }
  saveNote(note) {
    return this.apiService.post(this.baseUrl + '/rest/notes', note);
  }

  getClientBankAccounts(clientNo: string) {
    // return this.apiService.get(this.baseUrl + "" + agentNo)
    return this.apiService.get(
      this.baseUrl + '/rest/client/existing/accounts/' + clientNo
    );
  }

  getCreditNoteBalance(agentNo) {
    return this.apiService.get(
      this.baseUrl + '/rest/credit/note/os?agentNo=' + agentNo
    );
  }

  getAgentWorkflows(agentNo: string) {
    return this.apiService.get(
      this.baseUrl + '/rest/workflows/ref/AGT/' + agentNo
    );
  }

  getCountriesList() {
    return this.apiService.getWithLocalCache(
      this.baseUrl + '/rest/location/country'
    );
  }

  getProductClasses() {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/category/PRODUCT_CLASS'
    );
  }

  getProduct(productClass: string) {
    return this.apiService.get(
      this.baseUrl + '/rest/product/code/desc/class/' + productClass
    );
  }

  createProductClassPermission(payload) {
    return this.apiService.post(
      `${this.baseUrl}/rest/agent/product-permission?agentNo=${payload.agentNo}&clientNo=${payload.clientNo}`,
      payload
    );
  }

  updateProductClassPermission(id, payload) {
    return this.apiService.post(
      `${this.baseUrl}/rest/agent/product-permission?agentNo=${payload.agentNo}&clientNo=${payload.clientNo}&id=${payload.id}`,
      payload
    );
  }

  getProductClassPermissions(agentNo: string) {
    return this.apiService.get(
      this.baseUrl + '/rest/agent/product-permission?agentNo=ag277'
    );
  }

  deleteProductClassPermission(id) {
    return this.apiService.delete(
      this.baseUrl + '/rest/agent/product-permission/' + id
    );
  }

  getAgentType(agentNo: string) {
    return this.apiService.get(this.baseUrl + '/rest/agent/type/' + agentNo);
  }

  updateAgentType(id, { agentNo, type }) {
    return this.apiService.post(
      `${this.baseUrl}/rest/agent/type?agentNo=${agentNo}&newType=${type}`
    );
  }

  createAgentType(data) {
    return this.apiService.post(this.baseUrl + '', data);
  }

  deleteAgentType(id) {
    return this.apiService.delete(this.baseUrl + '' + id);
  }

  getAgentTypesList() {
    return this.apiService.get(this.baseUrl + '/rest/agent/setup/type/desc');
  }

  createHierarchyAgent(data) {
    return this.apiService.post(this.baseUrl + '', data);
  }

  updateHierarchyAgent(id, { agentNo, hierarchyAgentNo }) {
    return this.apiService.put(
      `${this.baseUrl}/rest/agent/hierarchy?agentNo=${agentNo}&hierarchyManager=${hierarchyAgentNo}`
    );
  }

  getHierarchyAgents(agentNo: string) {
    return this.apiService.get(
      this.baseUrl + '/rest/agent/hierarchy/' + agentNo
    );
  }

  deleteHierarchyAgent(id: string) {
    return this.apiService.delete(this.baseUrl + '' + id);
  }
  getAgentByNo = (agentNo: string) => {
    return this.apiService.getText(
      this.baseUrl + `/rest/agent/${agentNo}`
    );
  };
  getAgentNameByNo = (agentNo: string) => {
    return this.apiService.getText(
      this.baseUrl + `/rest/agent/name/${agentNo}`
    );
  };
  getHierarchyAgentTypesList() {
    return this.apiService.get(this.baseUrl + '');
  }

  getHierarchyAgentNameByHierarchyAgentNo(hierarchyAgentNo: string) {
    return this.apiService.get(this.baseUrl + '' + hierarchyAgentNo);
  }

  getHierarchyAgentNoByHierarchyAgentName(hierarchyAgentName: string) {
    return this.apiService.get(this.baseUrl + '' + hierarchyAgentName);
  }

  getAgentSalaryStatuses(agentNo: string) {
    return this.apiService.get(this.baseUrl + '' + agentNo);
  }

  createAgentSalaryStatus(data) {
    return this.apiService.post(this.baseUrl + '', data);
  }

  updateAgentSalaryStatus(id, data) {
    return this.apiService.put(this.baseUrl + '' + id, data);
  }

  deleteAgentSalaryStatus(id) {
    return this.apiService.delete(this.baseUrl + '' + id);
  }

  getLicenseTypesList() {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/category/LICENSE_TYPE'
    );
  }

  getLicenseAuthoritiesList() {
    return this.apiService.get(
      this.baseUrl + '/rest/codes/sub/category/LICENSE_AUTHORITY'
    );
  }

  createLicenseCert(data) {
    return this.apiService.post(this.baseUrl + '');
  }

  updateLicenseCert(id, data) {
    return this.apiService.put(this.baseUrl + '' + id, data);
  }

  getLicenseCert(agentNo) {
    return this.apiService
      .get(this.baseUrl + '/rest/agent/' + agentNo)
      .pipe(map((agent) => agent.license));
  }

  getBranch(agentNo) {
    return this.apiService.get(
      this.baseUrl + '/rest/agent/branch/code/' + agentNo
    );
  }

  updateBranch(id, data) {
    return this.apiService.put(this.baseUrl + '' + id, data);
  }
}
