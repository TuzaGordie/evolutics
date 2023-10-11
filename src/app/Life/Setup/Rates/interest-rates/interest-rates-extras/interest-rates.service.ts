import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { CodeService } from 'src/app/Services/code.service';
import { FetcherService } from 'src/app/Services/fetcher.service';
import { Interest, IRateVersion } from 'src/app/Shared/models/life/setup/rates/interest';


@Injectable()
export class InterestRatesService extends FetcherService {
  key = 'INTRATE_GROUP';
  constructor(public apiService: ApiService, public codeS: CodeService) {
    super(apiService, 'product/rate/interest');
  }

  getCodeGroups = () => {
    return this.codeS.getCodesByCodeSubGroup(this.key);
  };

  getTableFormat = () => {
    return this.codeS.getCodesByCodeSubGroup('TABLE_FORMAT');
  };

  getRates = () => {
    return this.apiService.get(this.baseURL + '/code/desc');
  };

  getInterestByGroup = (rateGroup) => {
    return this.apiService.get(this.apiBaseURL + `product/rate/interest/code/desc/${rateGroup}`)
  }

  getGenRateCategory = () => {
    return this.apiService.get(this.apiBaseURL + 'product/rate/generate/premium');
  };

  getTable() {
    return this.apiService.get(
      this.apiBaseURL + 'product/rate/general/code/desc/category/i'
    );
  }

  getRateCategory = (codeCategory) => {
    return this.apiService.get(
      this.apiBaseURL +
        `product/rate/general/code/desc/category/${codeCategory}`
    );
  };
  getCodeList = (data: string) => {
    return this.apiService.get(this.apiBaseURL + 'codes/sub/category/' + data);
  };

  getInterestByCode = (rateCode) => {
    return this.apiService
    .get<Interest>(this.apiBaseURL + `product/rate/interest/${rateCode}`)
    .toPromise();
  };
  
  getInterestRate(rateCode:string) {
    return this.apiService.get(
      this.apiBaseURL + `product/rate/interest/code/desc/${rateCode}`
    );
  }
  
  submitIntRate(data: any) {
    return this.apiService.post(this.apiBaseURL + 'product/rate/interest', data);
  }

}
