import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FindRatesService {
  insuranceTypeList: any;

  currenciesList: any;
  genRatelist: any = [];
  genrateCode: any;
  genRateData: any;
  list: any = [];
  get baseURL() {
    return environment.apiBaseUrl + '/rest/';
  }

  constructor(public http: HttpClient) {}

  getRateCategory() {
    return this.http.get('http://dev-api-evt.herokuapp.com/Currency');
  }
  genrateInfo(data: any) {
    this.genrateCode = data;
    console.log(this.genrateCode);
  }

  genrateDataInfo(data: any) {
    this.genRateData = data;
    console.log(this.genRateData);
    let allData = {
      genrateInfo: this.genrateCode,
      genrateDataInfo: this.genRateData,
    };
    console.log('alldata', allData);
    this.listData;
  }

  listData() {
    let data = this.genrateDataInfo;
    this.list.push(data);
    console.log('rateData', this.list);
  }

  getCodeList(data: any) {
    return this.http.get(
      this.baseURL+'codes/sub/category/' + data
    );
  }
  getCurrenciesList() {
    return this.http.get('http://dev-api-evt.herokuapp.com/Currency');
  }
  getCompanyList() {
    return this.http.get('http://dev-api-evt.herokuapp.com/Company');
  }
  getInterestTableList() {
    return this.http.get('http://dev-api-evt.herokuapp.com/INTRATes');
  }
  getPaymentMethodsList() {
    return this.http.get('http://dev-api-evt.herokuapp.com/PAYOUT_METHODS');
  }
  getCoversList() {
    return this.http.get('http://dev-api-evt.herokuapp.com/COVERS_BASIC');
  }
  getStatusCodeList() {
    return this.http.get('https://dev-api-evt.herokuapp.com/STATUS_CODE');
  }
  getPaymentInMethodsList() {
    return this.http.get('http://dev-api-evt.herokuapp.com/PAYINMETHODS');
  }
  getCommissionCodesList(val: any) {
    return this.http.get(
      'https://dev-api-evt.herokuapp.com/genratesN?RATE_CATEGORY=' + val
    );
  }
  getAgentTypeList() {
    return this.http.get('https://dev-api-evt.herokuapp.com/AGENTTYPE');
  }
  getReinsuranceTreatyList() {
    return this.http.get('https://dev-api-evt.herokuapp.com/crm.treaty');
  }
  getDocCategoryList() {
    return this.http.get('https://dev-api-evt.herokuapp.com/DOC_CAT?DOC_ID=1');
  }

  getRateList() {
    return this.http.get(
      this.baseURL+'codes/category/rates'
    );
  }

  getTestList() {
    return this.http.get('https://dev-api-evt.herokuapp.com/TestQuotation');
  }

  submitGenrate(data: any) {
    return this.http.post(
      this.baseURL+'product/rate/create/general/rate',
      data
    );
  }

  submitIntRate(data: any) {
    return this.http.post(
      this.baseURL+'product/rate/create/interest/rate',
      data
    );
  }

  getGenRateCategory(data: any) {
    return this.http.get(
      this.baseURL+'product/rate/generate/' +
        data
    );
  }

  submitSTRate(data: any) {
    return this.http.post(
      this.baseURL+'product/rate/create/short/term',
      data
    );
  }
}
