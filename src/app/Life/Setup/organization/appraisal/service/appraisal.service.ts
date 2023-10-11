import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { ApiService } from 'src/app/Services/api.service';

@Injectable({
  providedIn: 'root'
})

export class AppraisalService {
  private baseURL = environment.apiBaseUrl;

  constructor(private http: HttpClient, private apiService: ApiService) { }

  getCompany() {
    return this.apiService.get(this.baseURL + '/rest/company/code/desc');
  }

  getCompanyAppraisalCode(companyCode: any) {
    return this.apiService.get(this.baseURL + `/rest/appraisal/coy/${companyCode}`);
  }

  getDivisionAppraisalCode(companyCode: any) {
    return this.apiService.get(this.baseURL + `/rest/appraisal/division/${companyCode}`);
  }

  getCodeAndDescription(companyCode: any, appraisalLevel = 'D') {
    return this.apiService.get(this.baseURL + `/rest/appraisal/code-desc/${companyCode}/${appraisalLevel}`);
  }

  getSubDivisionAppraisalCode( divLink: string, appraisalLevel = 'S') {
    return this.apiService.get(this.baseURL + `/rest/appraisal/subDivision/${appraisalLevel}/${divLink}`);
  }

  getSubDivisionAppraisalCode2(companyCode: string) {
    return this.apiService.get(this.baseURL + `/rest/appraisal/subdivision/${companyCode}`);
  }

  getIndividualAppraisalCode(subDivLink, appraisalLevel = 'I') {
    return this.apiService.get(this.baseURL + `/rest/appraisal/individual/${appraisalLevel}/${subDivLink}`)
  }

  getTeamAppraisalCode(subDivLink: string, appraisalLevel = 'T') {
    return this.apiService.get(this.baseURL + `/rest/appraisal/team/${appraisalLevel}/${subDivLink}`);
  }

  getVersionNo(appraisalCode: string) {
    return this.apiService.get(this.baseURL + `/rest/appraisal/versionNo/versionDate/${appraisalCode}`);
  }

  getAppraisalCriteria(codeSubgroup: string = 'appraisal_criteria') {
    return this.apiService.get(this.baseURL + `/rest/codes/sub/category/${codeSubgroup}`);
  }

  getAppraisalLevel(codeSubgroup: string = 'appraisal_level') {
    return this.apiService.get(this.baseURL + `/rest/codes/sub/category/${codeSubgroup}`);
  }

  getCondition(codeSubgroup: string = 'appraisal_condition') {
    return this.apiService.get(this.baseURL + `/rest/codes/sub/category/${codeSubgroup}`);
  }

  getProductClass() {
    return this.apiService.get(this.baseURL + `/rest/codes/sub/category/product_class`);
  }

  getHeadOfTeam(companyCode: string ) {
    return this.apiService.get(this.baseURL + `/rest/users/userid/${companyCode}`);
  }

  createIndividualAppraisal(appraisal: any ) {  
    return this.apiService.post(this.baseURL + '/rest/appraisal/individual/setup/', appraisal);
  }

  createTeamAppraisal(appraisal: any ) {  
    return this.apiService.post(this.baseURL + '/rest/appraisal/team/setup/', appraisal);
  }

  createSubDivisionAppraisal(appraisal: any ) {  
    return this.apiService.post(this.baseURL + '/rest/appraisal/subdivision/setup/', appraisal);
  }

  createDivisionAppraisal(appraisal: any ) {  
    return this.apiService.post(this.baseURL + '/rest/appraisal/division/setup/', appraisal);
  }

  createCompanyAppraisal(appraisal: any ) {  
    return this.apiService.post(this.baseURL + '/rest/appraisal/coy/setup/', appraisal);
  }

  createCriteria(criteria: any ) {  
    return this.apiService.post(this.baseURL + '/rest/appraisal/criteria/setup/', criteria);
  }

  getCompanyAppraisalCriteria(companyCode: string){
    return this.apiService.get(this.baseURL + '/rest/appraisal/criteria/' + companyCode)
  }

}
