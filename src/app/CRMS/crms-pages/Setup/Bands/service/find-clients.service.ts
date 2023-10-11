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

  getCompaniesBandList(){
    return this.apiService.get(baseUrl + "/rest/company/code/desc")
  }


  getCompaniesList (){
    return this.apiService.get(baseUrl + "/rest/company/code/desc");
  };

  getClientBandsList(companyCode: string){
    return this.apiService.get(baseUrl + "/rest/crm/client/view/band/" + companyCode)
  }

  getLifeCyclesList(){
    return this.apiService.get(baseUrl + "/rest/crm/client/lifecycles")
  }

  getSegmentsList(){
    return this.apiService.get(baseUrl + "/rest/crm/client/segments")
  }

  getClvGroupsList(companyCode: string){
    return this.apiService.get(baseUrl + "/rest/crm/client/clv/group/" + companyCode)
  }

  submitReport(data:any){
    return this.apiService.post("http://localhost:3000/STRate", data)
  }

  submitClientBand(data:any){
    return this.apiService.post<any>(baseUrl + `/rest/crm/client/band`, data).toPromise();
  };

}
