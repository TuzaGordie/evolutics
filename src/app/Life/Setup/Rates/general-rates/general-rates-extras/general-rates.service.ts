import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { CodeService } from 'src/app/Services/code.service';
import { environment } from 'src/environments/environment';
import { IRateEntry, IUnderwritingVal } from '../../rates-extras/rates.model';
import {
  IRateValue,
  IRateValues,
  IRateValuesMetadata,
  IRateValuesQueryMetadata,
} from './general-rates.model';
@Injectable({ providedIn: 'root' })
export class GeneralRatesService {
  private get baseURL() {
    return environment.apiBaseUrl;
  }
  readonly rateCategoryCode = 'RATE_CATEGORY';
  readonly rateSubgroupCode = 'RATE_GROUP';
  constructor(public apiService: ApiService, private codeS: CodeService) {}
  genRate = (data: IRateEntry) => {
    return this.apiService
      .post<IRateEntry>(this.baseURL + '/rest/product/rate/general', data)
      .toPromise();
  };
  getBasicRate = (rateCode: string) => {
    return this.apiService
      .get<IRateEntry>(this.baseURL + `/rest/product/rate/${rateCode}`)
      .toPromise();
  };
  updateRate = (rateCode: string, data: IRateEntry) => {
    return this.apiService
      .put<IRateEntry>(
        this.baseURL + '/rest/product/rate/general/' + rateCode,
        data
      )
      .toPromise();
  };
  submitGenRateValues = (data: IRateValues) => {
    return this.apiService
      .post<IRateValues>(
        this.baseURL + '/rest/product/rate/general/values',
        data
      )
      .toPromise();
  };
  getRateValues = (query: IRateValuesQueryMetadata) => {
    for (const key in query) {
      if (query[key] == null || query[key] == undefined) {
        delete query[key];
      }
    }
    return this.apiService
      .get<IRateValues>(
        this.baseURL + '/rest/product/rate/general/values/keys',
        query
      )
      .toPromise();
  };
  getRateValuesMetadata = (rateCode: string) => {
    return this.apiService
      .get<IRateValuesMetadata[]>(
        this.baseURL + '/rest/product/rate/general/values/metadata/' + rateCode
      ).pipe(catchError(e=>{
        console.error(e);
        return of([] as IRateValuesMetadata[]);
      }))
      .toPromise();
  };
  updateRateValues = (rateCode: string, data: IRateValues) => {
    return this.apiService
      .put<IRateValues>(
        this.baseURL + '/rest/product/rate/general/values/' + rateCode,
        data
      )
      .toPromise();
  };
  underwritingValues: IUnderwritingVal[];
  getUnderwritingValues =async () => {
    return this.underwritingValues|| this.apiService
      .get<IUnderwritingVal[]>(this.baseURL + '/rest/underwriting/req/all')
      .toPromise().then(r=>{
        this.underwritingValues=r;
        return r
      });
  };

  getCategoryList = () => {
    return this.codeS.getAllCodeByCodeSubGroup(this.rateCategoryCode);
  };

  getGroupList = () => {
    return this.codeS.getAllCodeByCodeSubGroup(this.rateSubgroupCode);
  };

  getRateList() {
    return this.apiService.get(
      this.baseURL+'product/rate/general/code/desc/'
    );
  }
  getAllRates = () => {
    return this.apiService
      .get(this.baseURL + '/rest/product/rate/general/code/desc')
      .pipe(map((r) => this.apiService.sortCodes(r)));
  };
  getRatesByCatGroup = (category: string, group: string) => {
    return this.apiService
      .get(
        `${this.baseURL}/rest/product/rate/general/code/desc/${category}/${group}`
      )
      .pipe(map((r) => this.apiService.sortCodes(r)));
  };
  getRatesByGroup = (group: string) => {
    return this.apiService.get(`${this.baseURL}/rest/product/rate/general/${group}`);
  };
  getRatesByCat = (cat: string) => {
    return this.apiService
      .get(`${this.baseURL}/rest/product/rate/general/code/desc/${cat}`)
      .pipe(map((r) => this.apiService.sortCodes(r)));
  };
  getVersionDateBasis = () => {
    return this.codeS.getCodesByGroup_Subgroup('RATE', 'VERSION_DATE_BASIS');
  };
  getExactRules = () => {
    return this.codeS.getCodesByCodeSubGroup('exact_rule');
  };
}
