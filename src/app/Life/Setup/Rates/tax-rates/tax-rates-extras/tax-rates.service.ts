import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { CodeService } from 'src/app/Services/code.service';
import { ICodeTitle } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { ITaxRate } from './tax-rates.interface';
import { Tax, IRateVersion } from 'src/app/Shared/models/life/setup/rates/tax';


@Injectable()
export class TaxRatesService {
  get baseURL() {
    return environment.apiBaseUrl;
  }
  rateSubgroupCode = 'TAXRATE_GROUP';
  constructor(public apiService: ApiService, private codeS: CodeService) {}

  getRate(code) {
    return this.apiService.get(this.baseURL + '/rest/product/rate/' + code);
  }

  submitRate(data) {
    return this.apiService.post(this.baseURL + '/rest/product/rate/tax', data);
  }

  getRateListGroups = () => {
    return this.codeS.getCodesByCodeSubGroup(this.rateSubgroupCode);
  };

  getTable() {
    return this.apiService.get(this.baseURL + '/rest/product/rate/general/code/desc/category/i');
  };

  getTax() {
    return this.apiService.get(this.baseURL + '/rest/product/rate/tax/code/desc');
  }

  getTaxByGroup(group) {
    return this.apiService.get(this.baseURL + `/rest/product/rate/tax/code/desc/${group}`);
  }

  getTaxByCode = (rateCode: string) => {
    return this.apiService
      .get<Tax>(this.baseURL + `/rest/product/rate/tax/getRateByCode/${rateCode}`)
      .toPromise();
  };

  getRateListByGroup = (groupCode: string) => {
    if (!groupCode) return null;
    return this.apiService.get<ICodeTitle[]>(
      this.baseURL + 'rest/product/rate/tax/getRates/' + groupCode
    );
  };
}
