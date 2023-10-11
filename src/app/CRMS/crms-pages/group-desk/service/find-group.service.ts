import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FindGroupService {

  groupInfo:any

  constructor(public http:HttpClient) { }

  getGroupList(data:any) {
    return this.http.get("https://dev-api-evt.herokuapp.com/TestQuotation?QUOTE_NO=" + data)
  }
  getGroupList2() {
    return this.http.get("https://dev-api-evt.herokuapp.com/TestQuotation" )
  }

  getInsuranceList() {
    return this.http.get("https://dev-api-evt.herokuapp.com/INSURANCE_TYPE" )
  }


}
