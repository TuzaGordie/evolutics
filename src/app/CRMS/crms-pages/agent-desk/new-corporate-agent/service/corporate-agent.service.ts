import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CorporateAgentService {
  tabs: any = 'ownerInfo';
  agentInfoData: any = {
    agentBandBasis: 'string',
    approved: true,
    approvedBy: 'string',
    approvedOn: new Date(),
    clientNo: 'string',
    hierarchyCode: '',
    name: 'string',
    servicingAgent: 'string',
  };
  clientNoInfo: any;
  ownerInfoData: any;
  licenseData: any = {
    certificateNumber: 'string',
    licenceExpiry: 'string',
    licenceStart: 'string',
    licenceType: 0,
    licenseAuthority: 'string',
    licensedCountry: 'string',
  };
  paymentData: any = {
    agentPaymentCurrency: 'string',
    bankNo: 'string',
    commStatementActionBasis: 'string',
    commTaxRate: 0,
    currencyRule: 'string',
    holdPayments: true,
    minPayAmount: 0,
    payAgentCommToAgency: true,
    payeeName: 'string',
    payeeNo: 'string',
    payoutCharge: 0,
    payoutMethod: 'string',
  };
  individualClientInfo: any;
  agenttyp: any;
  branch: any = { branchCode: 'string', companyCode: 'string' };
  permission: any = {
    permissionLogic: 'string',
    product: 'string',
    productClass: 'string',
  };
  bank: any = {
    accName: 'string', //done
    accountType: 'string',
    ammendedBy: 'string',
    ammendedOn: new Date(),
    authBy: 'string',
    bankAccNo: 'string', //done
    bankAdd: 'string', //done
    bankCity: 'string',
    bankCountry: 'string', //done
    bankName: 'string', //done
    bankNo: 'string', //done
    bankSortCd: 'string', //done
    bankSwiftCd: 'string',
    bankTown: 'string',
    blocked: true,
    blockedDate: new Date(),
    createdBy: 'string',
    currency: 'string',
    ddPaymentMethod: 'string',
    iban: 'string',
    mmProvider: 'string',
  };
  get baseURL() {
    return environment.apiBaseUrl + '/rest/';
  }

  constructor(public http: HttpClient, public apiService: ApiService) {}

  tabChange(tab: any) {
    this.tabs = tab;
    console.log('tabchange', this.tabs);
  }

  clientInfo(data: any) {
    console.log('individualClientInfo', this.individualClientInfo);
    this.clientNoInfo = data;
    this.agentInfoData.clientNo = data;
    this.agentInfoData.name = this.individualClientInfo?.agent?.name;
    console.log('dsad crms', this.clientNoInfo);
  }
  ownerInfo(data: any) {
    this.ownerInfoData = data;
    console.log(this.ownerInfoData);
  }
  agentInfo(data: any) {
    (this.agentInfoData.name = data.name),
      // this.agentInfoData.servicingAgent=data.servicingAgent
      console.log('dasda', this.agentInfoData);
  }
  paymentInfo(data: any) {
    console.log(this.paymentData);
  }

  licenseInfoCountry(data: any) {
    this.licenseData.licensedCountry = data.licensedCountry;
  }
  licenseInfo(data: any) {
    this.licenseData.certificateNumber = data.certificateNumber;
    this.licenseData.licenceExpiry = data.licenceExpiry + 'T00:00:00.000Z';
    this.licenseData.licenceStart = data.licenceStart + 'T00:00:00.000Z';
    this.licenseData.licenceType = 0;
    this.licenseData.licenseAuthority = data.licenseAuthority;
    console.log(this.licenseData);
    this.listData();
  }

  agentType(data: any) {
    this.agenttyp = data;
    console.log(this.agenttyp);
  }
  branchInfo(data: any) {
    this.branch.branchCode = data.branchCode;
    this.branch.companyCode = 'string';
  }
  permissionInfo(data: any) {
    this.permission.productClass = data;
  }
  productList(data: any) {
    this.permission.product = data;
  }
  hierarchyCodeManager(data: any) {
    if (data == null) {
      this.agentInfoData.hierarchyCode = 2;
    } else {
      this.agentInfoData.hierarchyCode = data;
    }
  }
  bankInfo(data: any) {
    this.bank.bankCountry = data;
  }
  BankAccNo(data: any) {
    this.bank.bankAccNo = data;
  }
  AccName(data: any) {
    this.bank.accName = data;
  }
  bankSorted(data: any) {
    this.bank.bankSortCd = data;
  }
  bankName(data: any) {
    this.bank.bankName = data;
  }

  bankNoInfo(data: any) {
    this.bank.bankNo = data;
    this.paymentData.bankNo = data;
  }
  //                       listData(){
  // let allData = {
  //   clientInfo: this.clientNoInfo,
  //   ownerInfo: this.ownerInfoData,
  //   agentInfo: this.agentInfoData,
  //   licenseInfo: this.licenseData,
  //   paymentInfo: this.paymentData  }
  // console.log("All data",allData)
  //   this.submitPostData(allData).subscribe(res => {
  //   console.log("response",res)
  // })
  //   }
  listData() {
    let allData = {
      agent: this.agentInfoData,
      agentType: { agentType: this.agenttyp },
      bank: this.bank,

      branch: this.branch, //done
      license: this.licenseData, //done
      payment: this.paymentData,
      permission: this.permission,
    };
    console.log('All data', JSON.stringify(allData));
    //   this.submitPostData(JSON.stringify(allData)).subscribe(res => {
    //     if(res){

    //       alert("Successfully created")

    //     }
    //   console.log("response",res)
    // })
  }

  getLicenseTypeList() {
    return this.http.get(
      this.baseURL+'codes/sub/group/LICENSE_TYPE'
    );
  }
  getLicenseAuthorityList() {
    return this.http.get(
      this.baseURL+'codes/sub/group/LICENSE_AUTHORITY'
    );
  }
  getProductClassList() {
    return this.http.get(
      this.baseURL+'codes/sub/group/PRODUCT_CLASS'
    );
  }
  getProductList(codeSubgroup: any, codeCat: any) {
    return this.http.get(
      this.baseURL+'codes/sub/category/' +
        codeSubgroup +
        '/' +
        codeCat
    );
  }
  getAgentTypeList() {
    return this.http.get(
      this.baseURL+'agent/setup/type'
    );
  }
  getCountryList() {
    return this.apiService.getWithLocalCache(
      this.baseURL+'location/country'
    );
  }
  getBanknameList(country: any) {
    return this.http.get(
      this.baseURL+'bank/code/desc/' + country
    );
  }
  getSortList(bankCode: any) {
    return this.http.get(
      this.baseURL+'sort/codes/' + bankCode
    );
  }
  getProviderList() {
    return this.http.get(
      this.baseURL+'codes/sub/group/MM_PROVIDER'
    );
  }
  getBranchList() {
    return this.http.get(
      this.baseURL+'branch/code/desc'
    );
  }
  getHierarchyList() {
    return this.http.get('https://dev-api-evt.herokuapp.com/HIERARCHY_CODE');
  }
  getClientList(data: any) {
    return this.http.get(
      this.baseURL+'agent/view/' + data
    );
  }
  submitPostData(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token',
      }),
    };
    return this.http.post<any>(
      this.baseURL+'agent/',
      data,
      httpOptions
    );
  }
}
