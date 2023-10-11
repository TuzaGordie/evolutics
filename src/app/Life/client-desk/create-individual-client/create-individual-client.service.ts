import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { CodeService } from 'src/app/Services/code.service';
import { StorageService } from 'src/app/Services/storage.service';
import { ICodeTitle } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { IClientIndividual } from './individual-client-extras/individual-client.interface';

@Injectable({
  providedIn: 'root',
})
export class CreateIndividualClientService {
  identificationData: any;
  personalData: any;
  tabs: any = 'personalInfo';
  employmentData: any;
  paymentData: any;
  nextOfKinData: any;
  showBankDetails = false;
  list: any = [];

  filedata1: any;
  filedata2: any;
  filedata3: any;
  private tempClient: {
    individualForm: FormGroup;
    passport: File;
    idcard: File;
    accProof: File;
  };
  get baseURL() {
    return environment.apiBaseUrl + '/rest/';
  }
  constructor(
    public apiService: ApiService,
    public sS: StorageService,
    public codeS: CodeService
  ) {}
  tempSave(
    individualForm: FormGroup,
    passport: File,
    idcard: File,
    accProof: File
  ) {
    this.tempClient = {
      individualForm,
      passport,
      idcard,
      accProof,
    };
  }
  get getTempSave() {
    return this.tempClient;
  }
  clearTemp() {
    this.tempClient = null;
  }

  tabChange(tab: any) {
    this.tabs = tab;
    console.log('tabchange', this.tabs);
  }
  personalInfo(data: any) {
    this.personalData = data;
    console.log(this.personalData);
  }
  identificationInfo(data: any) {
    this.identificationData = data;
    console.log(this.identificationData);
  }
  employmentInfo(data: any) {
    this.employmentData = data;
    console.log(this.employmentData);
  }
  paymentInfo(data: any) {
    this.paymentData = data;
    console.log(this.paymentData);
  }
  nextOfKinInfo(data: any) {
    this.nextOfKinData = data;
    console.log(this.nextOfKinData);

    this.listData();
    let allData = {
      personalInfo: this.personalData,
      identificationInfo: this.identificationData,
      employmentInfo: this.employmentData,
      paymentInfo: this.paymentData,
      nextOfKinInfo: this.nextOfKinData,
    };

    console.log('alldata', allData);
    console.log(JSON.stringify(allData));
    /* this.submitPostData(allData).subscribe(res => {
  console.log(res)
}) */
  }
  showBankDetail() {
    this.showBankDetails = true;
  }
  closeBankDetails() {
    this.showBankDetails = false;
  }
  listData() {
    let data = this.nextOfKinInfo;
    this.list.push(data);
    console.log('banklist', this.list);
  }
  getCountryList() {
    return this.apiService.getWithLocalCache(this.baseURL + 'location/country');
  }
  getRegionList(countryCode: string = '') {
    const country = countryCode ? `/country/${countryCode}` : '';
    return this.apiService.getWithLocalCache(`${this.baseURL}location/region${country}`);
  }
  getStateList(regionCode: string = '') {
    return this.apiService.getWithLocalCache(
      `${this.baseURL}location/state/${regionCode}`
    );
  }
  getTownList(cityCode: string = '') {
    return this.apiService.getWithLocalCache(`${this.baseURL}location/town/${cityCode}`);
  }
  getSectorList() {
    return this.apiService.get(this.baseURL + 'codes/sub/group/SECTOR');
  }
  getEmploymentStatusList() {
    return this.apiService.get(this.baseURL + 'codes/sub/group/EMPLOYMENT');
  }
  getBanknameList(data: any) {
    return this.apiService.get(this.baseURL + 'bank/code/desc/' + data);
  }
  getSortList(data: any) {
    return this.apiService.get(this.baseURL + 'sort/codes/' + data);
  }
  getIDTypes = () => {
    return this.codeS.getAllCodeByCodeSubGroup('ID_TYPE');
  };
  getBankBranchList(data: any) {
    return this.apiService.getCodes(this.baseURL + 'sort/codes/branch_title/' + data);
  }
  getProviderList() {
    return this.apiService.get(this.baseURL + 'codes/sub/group/MM_PROVIDER');
  }

  getRelationList() {
    return this.apiService.get(this.baseURL + 'codes/sub/group/CLIENT_RELATED_TYPE');
  }
  getOccupationList = (data: string) => {
    return this.apiService.get<ICodeTitle[]>(
      this.baseURL + 'codes/sub/category/OCCUPATION/' + data
    );
  };
  getOccupationGroupList() {
    return this.apiService.get(this.baseURL + 'codes/sub/group/OCCUPATION_GROUP');
  }
  getIncomeBands() {
    return this.apiService.get(this.baseURL + 'codes/sub/group/ANN_INC_BAND');
  }

  getBankCountryList() {
    return this.apiService.getWithLocalCache(this.baseURL + 'location/country');
  }
  submitPostData(data: any) {
    return this.apiService.postFile<IClientIndividual>(
      this.baseURL + 'client/individual',
      data
    );
  }
}
