import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { CodeService } from 'src/app/Services/code.service';
import { ICodeTitle } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { IDiscountRate } from './discount-rate.interface';
import { Discount } from 'src/app/Shared/models/life/setup/rates/discount';


@Injectable()
export class DiscountRatesService {
  get baseURL() {
    return environment.apiBaseUrl;
  }
  rateSubgroupCode = 'DISCRATE_GROUP';
  constructor(public apiService: ApiService, private codeS: CodeService) {}

  getRate(code: string) {
    return this.apiService.get<IDiscountRate>(
      this.baseURL + '/rest/product/rate/' + code
    );
  }

  submitRate(data) {
    return this.apiService.post(this.baseURL + '/rest/product/rate/discount', data)
  }

  getRateListGroups = () => {
    return this.codeS.getCodesByCodeSubGroup(this.rateSubgroupCode);
  };

  getRateList = () => {
    return this.apiService.get(this.baseURL + '/rest/product/rate/discount/code/desc');
  };

  getRateListByGroup = (groupCode: string) => {
    if (!groupCode) return null;
    return this.apiService.get<ICodeTitle[]>(
      this.baseURL + '/rest/product/rate/discount/code/desc/' + groupCode
    );
  };

  getDiscountByCode = (rateCode) => {
    return this.apiService
    .get<Discount>(this.baseURL + `/rest/product/rate/discount/${rateCode}`)
    .toPromise();
  };
}
