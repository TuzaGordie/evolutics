import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FindQuotationService {
  quotationInfo: any;
  searchedData:any = []

  constructor(public http: HttpClient) {}

  getQuotationList(data: any) {
    return this.http.get(
      'https://dev-api-evt.herokuapp.com/TestQuotation?QUOTE_NO=' + data
    );
  }
  getQuotationList2() {
    return this.http.get('https://dev-api-evt.herokuapp.com/TestQuotation');
  }

  getInsuranceList() {
    return this.http.get('https://dev-api-evt.herokuapp.com/INSURANCE_TYPE');
  }


  getQuoteNo(data: any) {
    return this.http.get(
      'https://dev-api-evt.herokuapp.com/TestQuotation?QUOTE_NO=' + data
    );
  }

  getReffererNo(data: any) {
    return this.http.get(
      'https://dev-api-evt.herokuapp.com/TestQuotation?REFERRER_NO=' + data
    );
  }

  getFullName(data: any) {
    return this.http.get(
      'https://dev-api-evt.herokuapp.com/TestQuotation?OWNER_NAME=' + data
    );
  }

  getCreatedByList(data: any) {
    return this.http.get(
      'https://dev-api-evt.herokuapp.com/TestQuotation?CREATED_BY=' + data
    );
  }
}
