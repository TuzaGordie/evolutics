import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FindMainAgentService {

  agentInfo:any
  searchedData:any = []

  constructor(public http:HttpClient) { }

  getClientList(data:any) {
    return this.http.get("https://dev-api-evt.herokuapp.com/cLIENT?CLIENT_NO=" + data)
  }
  getClientList2() {
    return this.http.get("https://dev-api-evt.herokuapp.com/cLIENT" )
  }
  getEndorsements(data:any) {
    return this.http.get("http://dev-api-evt.herokuapp.com/clientEndorse?CLIENT_NO=" + data)
  }
  getWebflows() {
    return this.http.get("http://dev-api-evt.herokuapp.com/ClientWorkflow" )
  }
  getWebLogin() {
    return this.http.get("http://dev-api-evt.herokuapp.com/ClientWebaccess")
  }
  getPolicies() {
    return this.http.get("http://dev-api-evt.herokuapp.com/getclientrelpolicy" )
  }
  getDocument() {
    return this.http.get("https://dev-api-evt.herokuapp.com/DOC_CAT")
  }
  getPendingPayments() {
    return this.http.get("https://dev-api-evt.herokuapp.com/Pendingpayments " )
  }
  getAgentList(data:any) {
    return this.http.get("https://dev-api-evt.herokuapp.com/CRM.AGENT?AGENT_NO=" + data)
  }
  getAgentList2() {
    return this.http.get("https://dev-api-evt.herokuapp.com/CRM.AGENT" )
  }
  getAgentList3(data:any){
    return this.http.get("https://dev-api-evt.herokuapp.com/CRM.AGENT?CLIENT_NO=" + data)
  }
   getAgentLoan(data:any) {
    return this.http.get("https://dev-api-evt.herokuapp.com/AGENT_Loan?AGENT_NO=" + data)
  }
  getPendingQuotes() {
    return this.http.get("http://dev-api-evt.herokuapp.com/pendingquotes" )
  }
  getnameList(data:any){
    return this.http.get("https://dev-api-evt.herokuapp.com/CRM.AGENT?NAME=" + data)
  }
  getCreatedByList(data:any){
    return this.http.get("https://dev-api-evt.herokuapp.com/CRM.AGENT?CREATED_BY=" + data)
  }
   getphoneList(data:any){
    return this.http.get("https://dev-api-evt.herokuapp.com/CRM.AGENT?Phonenumber1=" + data)
  }
  getemailList(data:any){
    return this.http.get("https://dev-api-evt.herokuapp.com/CRM.AGENT?Email=" + data)
  }
  submitPostData(data:any){
    return this.http.post("https://dev-api-evt.herokuapp.com/client_push_data" , data)
  }
}