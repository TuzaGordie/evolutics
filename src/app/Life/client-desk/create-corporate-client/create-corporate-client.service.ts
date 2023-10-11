import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { ICodeDescription, ICodeTitle } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { ICorporateClient } from './corporate-client-extras/corporate-client.interface';

@Injectable({
  providedIn: 'root',
})
export class CreateCorporateClientService {
  companyData: any;
  contactData: any;
  directorData: any;
  paymentData: any;
  newPaymentData: any;
  tabs: any = 'companyInfo';
  showBankDetails = false;
  list: any = [];
  get baseURL() {
    return environment.apiBaseUrl + '/rest/';
  }
  constructor(private apiService: ApiService) {}

  companyInfo(data: any) {
    this.companyData = data;
    console.log(this.companyData);
  }
  contactInfo(data: any) {
    this.contactData = data;
    console.log(this.contactData);
  }
  directorInfo(data: any) {
    this.directorData = data;
    console.log(this.directorData);
  }
  /*  paymentInfo(data:any){
    this.paymentData = data;
    console.log(this.paymentData)
   
  } */
  newPaymentInfo(data: any) {
    this.newPaymentData = data;
    console.log(this.newPaymentData);
    let allData = {
      comapanyInfo: this.companyData,
      contactInfo: this.contactData,
      directorInfo: this.directorData,
      newPaymentInfo: this.newPaymentData,
    };

    console.log('alldata', allData);
    /* this.submitPostData(allData).subscribe(res => {
  console.log(res)
}) */
    this.listData();
  }

  tabChange(tab: any) {
    this.tabs = tab;
    console.log('tabchange', this.tabs);
  }
  /* showBankDetail(){
     this.showBankDetails = true;
  }
  closeBankDetails(){
    this.showBankDetails = false;
  } */
  listData() {
    let data = this.newPaymentData;
    this.list.push(data);
    console.log('banklist', this.list);
  }

  getCountryList() {
    return this.apiService.getWithLocalCache(this.baseURL + 'location/country');
  }
  getRegionList(data: any) {
    return this.apiService.getWithLocalCache(this.baseURL + 'location/region/country/' + data);
  }
  getStateList(data: any) {
    return this.apiService.getWithLocalCache(this.baseURL + 'location/state/' + data);
  }
  getTownList(cityCode: string = '') {
    return this.apiService.getWithLocalCache(`${this.baseURL}location/town/${cityCode}`);
  }
  getSectorList() {
    return this.apiService.get(this.baseURL + 'codes/sub/group/SECTOR');
  }
  getSegmentList() {
    return this.apiService.getCodes<ICodeTitle>(this.baseURL +'codes/sub/group/Segment');
  }
  getBanknameList(data: any) {
    return this.apiService.getCodes<ICodeDescription>(this.baseURL + 'bank/code/desc/' + data);
  }
  getSortList(data: any) {
    return this.apiService.get(this.baseURL + 'sort/codes/' + data);
  }
  getBankBranchList(data: any) {
    return this.apiService.get(this.baseURL + 'sort/codes/branch_title/' + data);
  }
  getProviderList() {
    return this.apiService.get(this.baseURL + 'codes/sub/group/MM_PROVIDER');
  }

  getRelationList() {
    return this.apiService.get(this.baseURL + 'codes/sub/group/CLIENT_RELATED_TYPE');
  }
  submitPostData(data: FormData) {
    return this.apiService.postFile<ICorporateClient>(this.baseURL + 'client/corporate', data);
  }
}
