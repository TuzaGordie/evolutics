import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FindClientsService {

  reportGroupList:any

  constructor(public http:HttpClient) { }

  getCodeList(code:any) {
    return this.http.get("https://dev-api-evt.herokuapp.com/CODES?CODE_SUBGROUP="+code+"&ACTIVE=1")
  }
  getTableList(tableName:any) {
    return this.http.get("https://dev-api-evt.herokuapp.com/INFORMATION_SCHEMA.COLUMNS?TABLE_NAME="+tableName)
  }
  getTableGroupList() {
    return this.http.get("https://dev-api-evt.herokuapp.com/crm.TABLE_RELATION_Disticttablegroup")
  }
  getPrimaryTableList(tcode:any) {
    return this.http.get("https://dev-api-evt.herokuapp.com/crm.TABLE_RELATION_distinctprimarytable?TABLE_GROUP="+tcode)
  }
  getUserGroupList() {
    return this.http.get("https://dev-api-evt.herokuapp.com/LIFE.USER_GROUP")
  }
  
  

  submitReport(data:any){
    return this.http.post("http://localhost:3000/STRate", data)
  }
}
