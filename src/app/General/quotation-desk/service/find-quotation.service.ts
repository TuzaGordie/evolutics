import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilityService } from 'src/app/Services/utility.service';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { InputService } from '../../../Services/input.service';
import { RouteService } from 'src/app/Services/route.service';
import { Router } from '@angular/router';
import { CurrencyPipe, Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { PageLoaderService } from 'src/app/Services/page-loader.service';
import { ApiService } from 'src/app/Services/api.service';
import { ICover } from 'src/app/Shared/models/covers/cover.interface';

import { LoggerService } from 'src/app/other/logger/logger.service';

@Injectable({
  providedIn: 'root',
})
export class FindQuotationService {
  get baseURL() {
    return environment.apiBaseUrl + '/rest/';
  }
  clientInfo: any;
  quoteInfo: any;
  quotationInfo: any;
  searchedData: any = [];

  constructor(
    public http: HttpClient,
    private _dialog: MatDialog,
    private _snackbar: MatSnackBar,
    public router: Router,
    private _titleS: Title,
    private _location: Location,
    private _inputService: InputService,
    private _routeService: RouteService,
    public pS: PageLoaderService,
    public currencyPipe: CurrencyPipe,
    private apiService: ApiService,
    public loggerService: LoggerService
  ) {
    console.log(this._titleS);
  }

  getCodes() {
    return this.http.get(this.baseURL + `policy/product/code/class/status`);
  }

  getProductClass(insuranceCodeCategory) {
    return this.http.get(
      this.baseURL + `codes/sub/category/product_class/${insuranceCodeCategory}`
    );
  }

  getQuoteStatus() {
    return this.http.get(this.baseURL + `codes/sub/category/quote_status`);
  }

  getProductCodes(productClass: string) {
    return this.http.get(
      this.baseURL + `product/code/desc/class/${productClass}`
    );
  }

  getCreatedBy() {
    return this.http.get(this.baseURL + `users/code/full-name`);
  }

  validateClientNo(clientNo) {
    return this.http.get(this.baseURL + `client/view/${clientNo}`);
  }

  getClientList(data: any) {
    return this.apiService.get(this.baseURL + 'client/view/' + data);
  }

  validate(
    // agentNo?: string,
    quoteNo?: string
    // createdDateFrom?: string,
    // createdDateTo?: string,
    // ownerName?: string,
    // productClass?: string,
    // productCode?: string,
    // status?: string
  ) {
    return this.http.get(
      this.baseURL +
        // `policy/validate?agentNo=${agentNo}&clientNo=${clientNo}&createdDateFrom=${createdDateFrom}&createdDateTo=${createdDateTo}&ownerName=${ownerName}&productClass=${productClass}&productCode=${productCode}&quoteNo=${quoteNo}&status=${status}`
        `policy/validate?quoteNo=${quoteNo}`
    );
  }

  validate2(clientNo?: string) {
    return this.http.get(this.baseURL + `policy/validate?clientNo=${clientNo}`);
  }

  findQuotation(
    agentNo?: string,
    clientNo?: string,
    createdBy?: string,
    createdDateFrom?: string,
    createdDateTo?: string,
    ownerName?: string,
    pageNumber?: number,
    pageSize?: number,
    productClass?: string,
    productCode?: string,
    quoteNo?: string,
    status?: string
  ) {
    console.log(
      'Client Number' +
        `policy/quotes/search?agentNo=${agentNo}&clientNo=${clientNo}&createdBy=${createdBy}&createdDateFrom=${createdDateFrom}&createdDateTo=${createdDateTo}&ownerName=${ownerName}&pageNumber=${pageNumber}&pageSize=${pageSize}&productClass=${productClass}&productCode=${productCode}&quoteNo=${quoteNo}&status=${status}`
    );

    return this.http.get(
      this.baseURL +
        `policy/quotes/search?agentNo=${agentNo}&clientNo=${clientNo}&createdBy=${createdBy}&createdDateFrom=${createdDateFrom}&createdDateTo=${createdDateTo}&ownerName=${ownerName}&pageNumber=${pageNumber}&pageSize=${pageSize}&productClass=${productClass}&productCode=${productCode}&quoteNo=${quoteNo}&status=${status}`
    );
  }

  findQuotationByQuoteNo(quoteNo?: string) {
    return this.http.get(
      this.baseURL + `policy/quotes/search?quoteNo=${quoteNo}`
    );
  }

  getDocument(data: any) {
    return this.http.get(this.baseURL + 'client/document/' + data);
  }

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

  getProductClassesList() {
    return this.http.get(this.baseURL + 'codes/sub/group/PRODUCT_CLASS');
  }

  getProductsList() {
    return this.http.get(this.baseURL + 'product/code/desc');
  }

  getStatusesList() {
    return this.http.get('#');
  }

  getCreatorsList() {
    return this.http.get(this.baseURL + 'users/id/fullname');
  }

  getPolicyCodeByQuoteNo(quoteNo: string) {
    return this.http.get(this.baseURL + 'policy/code/quote/no/' + quoteNo);
  }

  findQuote(parameters: Object) {
    const query = Object.entries(parameters)
      .map(([key, value]) => (value ? `${key}=${value}` : false))
      .filter((item) => !!item)
      .join('&');

    return this.http.get(this.baseURL + 'policy/quotes/search?' + query);
  }

  getClient(clientNo: string) {
    return this.apiService.get(this.baseURL + 'client/view/' + clientNo);
  }

  // getQuote(quoteNo){
  //   return this.http.get(this.baseURL + `policy/view/${quoteNo}`)
  // }
  getQuote = (quoteNo: string) => {
    return this.apiService
      .get(this.baseURL + `policy/view/${quoteNo}`)
      .toPromise();
  };

  // getQuoteCover(quoteNo){
  //   return this.http.get(this.baseURL + `policy/covers/${quoteNo}`)
  // }

  getQuoteCover = (quoteNo: string) => {
    return this.apiService.get<ICover[]>(
      this.baseURL + `policy/covers/${quoteNo}`
    );
  };

  getProductDescription(value) {
    return this.apiService.get(this.baseURL + `product/desc/${value}`);
  }

  getInsuranctType() {
    return this.apiService.get(this.baseURL + `codes/sub/group/INS_TYPE`);
  }
}
