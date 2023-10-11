import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FindClientService {
  get baseURL() {
    return environment.apiBaseUrl + '/rest/';
  }
  clientInfo: any;
  providerInfo: any;
  searchedData: any = [];

  constructor(public http: HttpClient) {}

  getClientList(data: any) {
    return this.http.get(
      'https://dev-api-evt.herokuapp.com/cLIENT?CLIENT_NO=' + data
    );
  }

  getProviderInfoList(data: any) {
    return this.http.get(
      'https://dev-api-evt.herokuapp.com/cLIENT?PROVIDER_NO=' + data
    );
  }

  getClientList2() {
    return this.http.get('https://dev-api-evt.herokuapp.com/cLIENT');
  }
  getEndorsements(data: any) {
    return this.http.get(
      'http://dev-api-evt.herokuapp.com/clientEndorse?CLIENT_NO=' + data
    );
  }
  getWebflows(data: any) {
    return this.http.get(
      'http://dev-api-evt.herokuapp.com/ClientWorkflow?CLIENT_NO=' + data
    );
  }
  getWebLogin(data: any) {
    return this.http.get(
      'http://dev-api-evt.herokuapp.com/ClientWebaccess?CLIENT_NO=' + data
    );
  }
  getPolicies() {
    return this.http.get('http://dev-api-evt.herokuapp.com/getclientrelpolicy');
  }
  getRelationship() {
    return this.http.get('http://dev-api-evt.herokuapp.com/getclientrelbycNo');
  }
  getPendingQuotes() {
    return this.http.get('http://dev-api-evt.herokuapp.com/pendingquotes');
  }
  getDocument(data: any) {
    return this.http.get(
      'https://dev-api-evt.herokuapp.com/DOC_CAT?CLIENT_NO=' + data
    );
  }
  getPendingPayments() {
    return this.http.get('https://dev-api-evt.herokuapp.com/Pendingpayments ');
  }
  getProviderList(data: any) {
    return this.http.get(
      'https://dev-api-evt.herokuapp.com/cLIENT?PROVIDER_NO=' + data
    );
  }
  getnameList(data: any) {
    return this.http.get(
      'https://dev-api-evt.herokuapp.com/cLIENT?FULL_NAME=' + data
    );
  }
  getphoneList(data: any) {
    return this.http.get(
      'https://dev-api-evt.herokuapp.com/cLIENT?PHONE_NO_1=' + data
    );
  }
  getemailList(data: any) {
    return this.http.get(
      'https://dev-api-evt.herokuapp.com/cLIENT?EMAIL_ADD_1=' + data
    );
  }
  getEnroleeList(data: any) {
    return this.http.get(
      'https://dev-api-evt.herokuapp.com/cLIENT?REL_ENROLEE_NO=' + data
    );
  }
  getExternalRefList(data: any) {
    return this.http.get(
      'https://dev-api-evt.herokuapp.com/cLIENT?EXTERNAL_REF=' + data
    );
  }
  getCreatedByList(data: any) {
    return this.http.get(
      'https://dev-api-evt.herokuapp.com/cLIENT?CREATED_BY' + data
    );
  }
  submitPostData(data: any) {
    return this.http.post(
      'https://dev-api-evt.herokuapp.com/client_push_data',
      data
    );
  }

  getCodeList(data: any) {
    return this.http.get(
      this.baseURL+'codes/sub/category/' + data
    );
  }

  submitProvider(data: any) {
    return this.http.post(
      this.baseURL+'client/create/provider',
      data
    );
  }
}
