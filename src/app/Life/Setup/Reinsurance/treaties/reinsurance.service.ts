import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReinsuranceService {

  constructor(private httpClient: ApiService) { }


  getAllTreatyCodeAndDescriptionByCompany(reinsCompany: string) {
    return this.httpClient.get(`${environment.apiBaseUrl}/rest/treaty/code/desc/${reinsCompany}`)
  }

  getCompanyCodeAndDescription() {
    return this.httpClient.get(`${environment.apiBaseUrl}/rest/company/code/desc`)
  }

  getTreatyByCode(treatyCode: string) {
    return this.httpClient.get(`${environment.apiBaseUrl}/rest/treaty/${treatyCode}`)
  }

  getCompanyCodeByCat(cat: string) {
    return this.httpClient.get(`${environment.apiBaseUrl}/rest/treaty/reins/company/${cat}`)
  }

  geProfitCodeAndDescription() {
    return this.httpClient.get(`${environment.apiBaseUrl}/rest/reins/profit/share/code/desc`)
  }

  getProviderNoAndFullNameByProviderSubcat(param) {
    return this.httpClient.get(`${environment.apiBaseUrl}/rest/client/provider/subCat/${param}`)
  }

  getGeneralRateCodeAndDescriptionByCategory(param: string) {
    return this.httpClient.get(`${environment.apiBaseUrl}/rest/product/rate/general/code/desc/${param}`)
  }

  getCodeAndTitleByCodeSubgroup(param: string) {
    return this.httpClient.get(`${environment.apiBaseUrl}/rest/codes/sub/category/${param}`)
  }

  getCodeGroupsByCodeSubgroup(param: string) {
    return this.httpClient.get(`${environment.apiBaseUrl}/rest/codes/groups/${param}`)
  }

  getProductCoverCodeAndDescription() {
    return this.httpClient.get(`${environment.apiBaseUrl}/rest/product/covers/code/desc`)
  }

  getProductCoverCodesBasicAndDescriptionByProductCode(value: string) {
    return this.httpClient.get(`${environment.apiBaseUrl}/rest/product/covers/basics/code/desc/${value}`)
  }

  getProductCodeAndDescriptionByBusLineAndProductClass(productClass: string, busLine: string) {
    return this.httpClient.get(`${environment.apiBaseUrl}/rest/product/code/desc/class/${productClass}/${busLine}`)
  }

  createTreaty(treatyData: any) {
    return this.httpClient.post(`${environment.apiBaseUrl}/rest/treaty/`, treatyData)
  }


}
