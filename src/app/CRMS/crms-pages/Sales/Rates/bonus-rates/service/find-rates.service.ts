import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FindRatesService {

  insuranceTypeList:any;
  currenciesList:any;

  constructor(public http:HttpClient) { }

  getCodeList(data:any) {
    return this.http.get("https://dev-api-evt.herokuapp.com/CODES?CODE_SUBGROUP="+data)
  }
  getCurrenciesList() {
    return this.http.get("http://dev-api-evt.herokuapp.com/Currency")
  }
  getCompanyList() {
    return this.http.get("http://dev-api-evt.herokuapp.com/Company")
  }
  getInterestTableList() {
    return this.http.get("http://dev-api-evt.herokuapp.com/INTRATes")
  }
  getPaymentMethodsList() {
    return this.http.get("http://dev-api-evt.herokuapp.com/PAYOUT_METHODS")
  }
  getCoversList() {
    return this.http.get("http://dev-api-evt.herokuapp.com/COVERS_BASIC")
  }
  getStatusCodeList(){
    return this.http.get("https://dev-api-evt.herokuapp.com/STATUS_CODE")
  }
  getPaymentInMethodsList(){
    return this.http.get("http://dev-api-evt.herokuapp.com/PAYINMETHODS")
  }
  getCommissionCodesList(val:any){
    return this.http.get("https://dev-api-evt.herokuapp.com/genratesN?RATE_CATEGORY="+val)
  }
  getAgentTypeList(){
    return this.http.get("https://dev-api-evt.herokuapp.com/AGENTTYPE")
  }
  getReinsuranceTreatyList(){
    return this.http.get("https://dev-api-evt.herokuapp.com/crm.treaty")
  }
  getDocCategoryList(){
    return this.http.get("https://dev-api-evt.herokuapp.com/DOC_CAT?DOC_ID=1")
  }
  
  
  
}
