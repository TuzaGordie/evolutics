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

  getLifecyclesList(){
    return this.apiService.get(baseUrl + "/rest/crm/client/lifecycles")
  }

  getClientLifeCycle(id: number){
    return this.apiService.get(baseUrl + "/rest/crm/client/view/lifecycle/" + id)
  }

  submitReport(data:any){
    return this.apiService.post("http://localhost:3000/STRate", data)
  }
  submitLifeCycle(data:any){
      return this.apiService.post<any>(baseUrl + `/rest/crm/client/lifecycle`, data).toPromise();

  }
}
