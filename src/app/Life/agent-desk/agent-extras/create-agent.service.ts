import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { ICodeDescription } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateAgentService {
  get baseAPIURL() {
    return environment.apiBaseUrl;
  }
  newAccount = new Subject<any>();
  licenseDoc: any;
  agenttypeDoc: any;
  files: any = [];
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
  agenttyp: string;
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

  constructor(public apiService: ApiService) {}

  shareNewAccount(data: any) {
    return this.newAccount.next(data);
  }

  tabChange(tab: any) {
    this.tabs = tab;
    console.log('tabchange', this.tabs);
  }

  clientInfo(data: any) {
    this.clientNoInfo = data;
    this.agentInfoData.clientNo = data;
    this.agentInfoData.name = this.individualClientInfo.agent.name;
    console.log('dsad', this.clientNoInfo);
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
  getPayeeName = (clientNo: string) => {
    return this.apiService.getText(
      this.baseAPIURL + `/rest/client/bank/account-name/${clientNo}`
    );
  };
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
    /*    this.submitPostData(JSON.stringify(allData)).subscribe(res => {
        if(res){

          alert("Successfully created")

        }
      console.log("response",res)
    })  */
  }

  getLicenseTypeList() {
    return this.apiService.get(
      this.baseAPIURL + '/rest/codes/sub/group/LICENSE_TYPE'
    );
  }
  getLicenseAuthorityList() {
    return this.apiService.get(
      this.baseAPIURL + '/rest/codes/sub/group/LICENSE_AUTHORITY'
    );
  }
  getProductClassList() {
    return this.apiService.get(
      this.baseAPIURL + '/rest/codes/sub/group/PRODUCT_CLASS'
    );
  }
  getProductList(productClassCode: string) {
    return this.apiService.get(
      // this.baseAPIURL+`/rest/product/code/desc/class/GC`
      this.baseAPIURL + `/rest/product/code/desc/class/${productClassCode}`
    );
  }
  getManagerList(agentype: string) {
    return this.apiService.get(
      // this.baseAPIURL+`/rest/product/code/desc/class/GC`
      this.baseAPIURL + `/rest/agent/type/no/full-name/${agentype}`
    );
  }

  getAgentName(agentno: string) {
    return this.apiService.get(
      // this.baseAPIURL+`/rest/product/code/desc/class/GC`
      this.baseAPIURL + `/rest/agent/name/${agentno}`,
      { responseType: 'text' }
    );
  }

  getAgentTypeList() {
    return this.apiService.get(this.baseAPIURL + '/rest/agent/setup/type');
  }
  getAgentTypeList2() {
    return this.apiService.get(this.baseAPIURL + '/rest/agent/setup/type/desc');
  }
  getBranchList() {
    return this.apiService.getCodes<ICodeDescription>(this.baseAPIURL + '/rest/branch/code/desc');
  }
  getCompanyList() {
    return this.apiService.getCodes<ICodeDescription>(this.baseAPIURL + '/rest/company/code/desc');
  }
  getCountryList() {
    return this.apiService.getWithLocalCache(this.baseAPIURL + '/rest/location/country');
  }
  getBankCountryList() {
    return this.apiService.getWithLocalCache(this.baseAPIURL + '/rest/location/country');
  }
  getBanknameList(country: any) {
    return this.apiService.getCodes<ICodeDescription>(this.baseAPIURL + '/rest/bank/code/desc/' + country);
  }
  getSortList(bankCode: any) {
    return this.apiService.get(this.baseAPIURL + '/rest/sort/codes/' + bankCode);
  }
  getProviderList() {
    return this.apiService.get(this.baseAPIURL + '/rest/codes/sub/group/MM_PROVIDER');
  }
  getBankBranchList(data: any) {
    return this.apiService.get(
      this.baseAPIURL + '/rest/sort/codes/branch_title/' + data
    );
  }
  getHierarchyList() {
    return this.apiService.get('https://dev-api-evt.herokuapp.com/HIERARCHY_CODE');
  }
  getClientList(data: any) {
    return this.apiService.get(this.baseAPIURL + '/rest/client/view/' + data);
  }
  getFrequencyList() {
    return this.apiService.get(
      this.baseAPIURL + '/rest/codes/sub/category/FREQUENCY'
    );
  }
  getPaymentMethodList() {
    return this.apiService.get(this.baseAPIURL + '/rest/payout/method/code/desc');
  }
  submitPostData(data: any) {
    /*  const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };  */
    return this.apiService.post<any>(this.baseAPIURL + '/rest/agent', data);
  }

  addNewAccountApi(data: any) {
    return this.apiService.post<any>(this.baseAPIURL + '/rest/client/bank/', data);
  }
  getNextBankAccount(data: any) {
    return this.apiService.get(
      this.baseAPIURL + '/rest/client/existing/accounts/' + data
    );
  }
}
