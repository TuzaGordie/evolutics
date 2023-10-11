import { IAccountPost, ICreateBank, ICreateSortCode } from './account-model';
import { Injectable } from '@angular/core';
import { IVehicleBrand } from 'src/app/General/setups/codes/vehicles/vehicle-extras/vehicle.model';
import { ApiService } from 'src/app/Services/api.service';
import { ICode, ICodeDescription, ICodeTitle } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { AccCode, AccCodeMapping, AllAccCodes, CreateAccCode } from '../account';

@Injectable({
  providedIn: 'root'
})
export class AccountExtrasService {

  private get baseURL() {
    return environment.apiBaseUrl + '/rest/';
  }
  constructor(private apiService: ApiService) { }

  getAllAccCodes() {
    return this.apiService.get(
      this.baseURL + "acc/codes/mapping"
    );
  }

  getAllAccCodesByCompany(company: string) {
    return this.apiService.get(
      this.baseURL + "acc/codes/mapping/company/" + company
    );
  }

  getAccountMappingByCompanyAndAccCode(company, accCode) {
    return this.apiService.get(
      this.baseURL + `acc/codes/mapping/company/${company}/${accCode}`
    );
  }

  getAccCodeMappingByCompany(company: string) {
    return this.apiService.get(
      this.baseURL + "acc/codes/account/code/mapping/" + company
    );
  }

  getAllAccCodesByGroup(group: string) {
    return this.apiService.get(
      this.baseURL + "acc/codes/group/" + group
    );
  }

  getCodeSubGroup = (value: string) => {
    return this.apiService.get<ICodeTitle[] | ICodeDescription[]>(
      this.baseURL + `codes/sub/category/${value}`
    );
  };

  getAccCodesAndDescriptionByGroup = (group: string) => {
    return this.apiService.get<ICodeTitle[] | ICodeDescription[]>(
      this.baseURL + `acc/codes/desc/group/${group}`
    );
  };

  getAccounts = (groupCode) => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `acc/codes/desc/group/${groupCode}`
    );
  };

  getBanks = () => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `bank/code/desc`
    );
  };

  getBankByBankCode = (code) => {
    return this.apiService.get<any>(
      this.baseURL + `bank/code/${code}`
    )
  }
  getAllAgentsNo = () => {
    return this.apiService.get<any[]>(
      this.baseURL + `agent/no`
    );
  };

  getCompanyCodeAndDesc = () => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `company/code/desc`
    );
  };

  getCurrency = () => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `currency`
    );
  };

  getCountry = () => {
    return this.apiService.getWithLocalCache<ICodeDescription[]>(
      this.baseURL + `location/country/code/desc`
    );
  };

  getCity = () => {
    return this.apiService.getWithLocalCache<ICodeDescription[]>(
      this.baseURL + `location/state`
    );
  };

  getCitiesByRegion = (regionCode: string) => {
    return this.apiService.getWithLocalCache<ICodeDescription[]>(
      this.baseURL + `location/state/${regionCode}`
    );
  };
  getCitiesByCountry = (countryCode: string) => {
    return this.apiService.getWithLocalCache<ICodeDescription[]>(
      this.baseURL + `location/state/country/${countryCode}`
    );
  };

  getRegion = (countryCode: string) => {
    return this.apiService.getWithLocalCache<ICodeDescription[]>(
      this.baseURL + `location/region/country/${countryCode}`
    );
  };

  getTownByCity = (cityCode: String) => {
    return this.apiService.getWithLocalCache<ICodeDescription[]>(
      this.baseURL + `location/town/${cityCode}`
    );
  };

  getSortCode = () => {
    return this.apiService.get<ICode[]>(
      this.baseURL + `sort/codes`
    );
  };

  getBranchTitleByBankCode = (bankCode: string) => {
    return this.apiService.get<ICodeTitle[]>(
      this.baseURL + `sort/codes/branch_title/${bankCode}`
    );
  }


  getBankByCompany = (bankCode: string) => {
    return this.apiService.getWithLocalCache<ICodeDescription[]>(
      this.baseURL + `location/country/code/desc/${bankCode}`
    );
  };

  getBankByCountry = (bankCode: string) => {
    return this.apiService.getWithLocalCache<ICodeDescription[]>(
      this.baseURL + `bank/code/desc/${bankCode}`
    );
  };

  submitBank = (data: ICreateBank) => {
    return this.apiService.post<ICreateBank>(this.baseURL + 'bank/account', data)
  };

  modifyBank(data: ICreateBank, code: string) {
    return this.apiService.post<ICreateBank>(this.baseURL + 'bank/account' + code, data)
  }

  createSortCode = (data) => {
    return this.apiService.post(this.baseURL + 'sort/codes', data)
  };

  modifySortCode(data, code: string) {
    return this.apiService.post(this.baseURL + 'sort/codes' + code, data)
  }

  submitAccountCodes = (data: AllAccCodes) => {
    return this.apiService.post<AllAccCodes>(this.baseURL + 'acc/codes/', data)
  };

  submitAccountPost = (data: CreateAccCode) => {
    return this.apiService.post<CreateAccCode>(this.baseURL + 'acc/codes/', data)
  };

  updateAccountCodesMappingLedger = (data: AccCodeMapping[]) => {
    return this.apiService.post<AccCodeMapping[]>(this.baseURL + 'acc/codes/ledger', data)
  };

  modifyAccountPost(data: IAccountPost, code: string) {
    return this.apiService.post<IAccountPost>(this.baseURL + 'acc/codes/' + code, data)
      .toPromise();
  }

  getAccountbyAccountCode = (accCode) => {
    return this.apiService.get<IAccountPost>(
      this.baseURL + `acc/codes/${accCode}`
    );
  };

  getAccCodesby = (accCode) => {
    return this.apiService.get<AllAccCodes>(
      this.baseURL + `acc/codes/${accCode}`
    );
  };

  getBranchCodeAndDescriptionByCompanyCode = (companyCode) => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + `branch/code/desc/${companyCode}`
    );
  };






}
