import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { CodeService } from 'src/app/Services/code.service';
import { ICodeTitle } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { IBonusRate } from './bonus-rates.interface';
import { Bonus } from 'src/app/Shared/models/life/setup/rates/bonus';


@Injectable()
export class BonusRatesService {
  get baseURL() {
    return environment.apiBaseUrl;
  }
  rateSubgroupCode = 'BONRATE_GROUP';
  bonusCalcBasis = 'BONUS_CALC_BASIS';

  constructor(public apiService: ApiService, private codeS: CodeService) {}

  getRate(code: string) {
    return this.apiService.get<IBonusRate>(
      this.baseURL + '/rest/product/rate/' + code
    );
  }

  submitRate(data) {
    return this.apiService.post(this.baseURL + '/rest/product/rate/bonus', data);
  }

  getRateListGroups = () => {
    return this.codeS.getCodesByCodeSubGroup(this.rateSubgroupCode);
  };

  getBonusCalsBasis = () => {
    return this.codeS.getCodesByCodeSubGroup(this.bonusCalcBasis);
  };

  getBonusTable = () => {
    return this.apiService.get(this.baseURL + '/rest/product/rate/general/code/desc/BON');
  };

  getBonus = () => {
    return this.apiService.get(this.baseURL + '/rest/product/rate/bonus/code/desc');
  };

  getTableFormat = () => {
    return this.codeS.getCodesByCodeSubGroup('TABLE_FORMAT');
  };

  getBonusByGroup = (group) => {
    return this.apiService.get(this.baseURL + `/rest/product/rate/bonus/code/desc/${group}`);
  };

  getRateListByGroup = (groupCode: string) => {
    return this.apiService.get<ICodeTitle[]>(
      this.baseURL + '/rest/product/rate/bonus/getRates/' + groupCode
    );
  };

  getBonusByCode = (rateCode: string) => {
    console.log('bonus service', rateCode)
    return this.apiService
      .get<Bonus>(this.baseURL + `/rest/product/rate/bonus/getRateByCode/${rateCode}`)
      .toPromise();
  };
}
