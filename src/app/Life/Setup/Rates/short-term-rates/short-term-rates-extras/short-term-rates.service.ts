import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { CodeService } from 'src/app/Services/code.service';
import { ICodeTitle } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { IShortTermRate } from './short-term-rates.interface';

@Injectable()
export class ShortTermRatesService {
  get baseURL() {
    return environment.apiBaseUrl;
  }
  constructor(public apiService: ApiService) {}

  getRate(code: string) {
    return this.apiService.get<IShortTermRate>(
      this.baseURL + '/rest/product/rate/short/term/' + code
    );
  }

  submitRate(data: IShortTermRate) {
    return this.apiService
      .post<IShortTermRate>(
        this.baseURL + '/rest/product/rate/short/term',
        data
      )
      .toPromise();
  }

  getRateList = () => {
    return this.apiService.get<ICodeTitle[]>(
      this.baseURL + '/rest/product/rate/short/term/code/desc'
    );
  };
}
