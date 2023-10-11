import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormGroupName } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FindProductService {
  insuranceTypeList: any;
  currenciesList: any;
  get baseURL() {
    return environment.apiBaseUrl + '/rest/';
  }

  constructor(public http: HttpClient) {}

  getInsuranceType(data: any) {
    return this.http.get(
      this.baseURL+'codes/sub/category/INS_TYPE'
    );
  }

  getProductClass(data: any) {
    return this.http.get(
      this.baseURL+'product/product/code/desc/' +
        data
    );
  }

  getPolicyBasis(data: any) {
    return this.http.get(
      this.baseURL+'codes/code_title/POLICY_CODE_BASIS' +
        data
    );
  }

  getCodeList(data: any) {
    return this.http.get(
      this.baseURL+'codes/sub/category/' + data
    );
  }
  getCurrenciesList() {
    return this.http.get(
      this.baseURL+'currency/'
    );
  }
  getCompanyList() {
    return this.http.get(
      this.baseURL+'company/code/desc'
    );
  }
  getInterestTableList() {
    return this.http.get('http://dev-api-evt.herokuapp.com/INTRATes');
  }
  getPaymentMethodsList() {
    return this.http.get('http://dev-api-evt.herokuapp.com/PAYOUT_METHODS');
  }
  getCoversList() {
    return this.http.get(
      this.baseURL+'product/covers/code/desc'
    );
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

  getPremiumStatementList() {
    return this.http.get('https://dev-api-evt.herokuapp.com/crm.screen_list');
  }

  getBranch(data: any) {
    return this.http.get(
      this.baseURL+'branch/code/desc'
    );
  }

  submitProductCode(data: any) {
    return this.http.post('http://localhost:3000/STRate', data);
  }
}
