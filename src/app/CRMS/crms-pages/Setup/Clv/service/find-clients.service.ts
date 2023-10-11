import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';

const baseUrl = environment.apiBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class FindClientsService {

  reportGroupList:any

  constructor(public apiService: ApiService) { }

  getCodeList(code:any) {
    return this.apiService.get("https://dev-api-evt.herokuapp.com/CODES?CODE_SUBGROUP="+code+"&ACTIVE=1")
  }
  getTableList(tableName:any) {
    return this.apiService.get("https://dev-api-evt.herokuapp.com/INFORMATION_SCHEMA.COLUMNS?TABLE_NAME="+tableName)
  }
  getTableGroupList() {
    return this.apiService.get("https://dev-api-evt.herokuapp.com/crm.TABLE_RELATION_Disticttablegroup")
  }
  getPrimaryTableList(tcode:any) {
    return this.apiService.get("https://dev-api-evt.herokuapp.com/crm.TABLE_RELATION_distinctprimarytable?TABLE_GROUP="+tcode)
  }
  getUserGroupList() {
    return this.apiService.get("https://dev-api-evt.herokuapp.com/LIFE.USER_GROUP")
  }

  getCompaniesList(){
    return this.apiService.get(baseUrl + "/rest/company/code/desc")
  }

  getClvCompaniesList() {
    return this.apiService.get(baseUrl + "/rest/crm/client/clv/group/company")
  }

  getClvGroupingsList(companyCode: string) {
    return this.apiService.get(baseUrl + "/rest/crm/client/clv/group/" + companyCode)
  }

  getCustomerAttributesList(){
    return this.apiService.get(baseUrl + "/rest/codes/sub/group/CUSTOMER_ATTRIBUTES")
  }

  getConditionsList(){
    return this.apiService.get(baseUrl + "/rest/codes/sub/group/OPERATOR")
  }

  getClientClvGrouping(id, clvGroup){
    return this.apiService.get(baseUrl + "/rest/crm/client/view/clv/group/" + id + "/" + clvGroup)
  }

  submitReport(data:any){
    return this.apiService.post("http://localhost:3000/STRate", data)
  }

  submitCLv(data:any){
    return this.apiService.post<any>(baseUrl + `/rest/crm/client/clv/group`, data).toPromise();
  };
}
