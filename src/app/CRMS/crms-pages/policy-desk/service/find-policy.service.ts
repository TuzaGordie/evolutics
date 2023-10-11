import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FindPolicyService {

  policyInfo:any

  constructor(public http:HttpClient) { }

  getPolicyList(data:any) {
    return this.http.get("https://dev-api-evt.herokuapp.com/TestQuotation?QUOTE_NO=" + data)
  }
  getPolicyList2() {
    return this.http.get("https://dev-api-evt.herokuapp.com/TestQuotation" )
  }

  getInsuranceList() {
    return this.http.get("https://dev-api-evt.herokuapp.com/INSURANCE_TYPE" )
  }


}
