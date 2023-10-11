import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ICodeDescription } from '../Shared/models/index.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  private baseAPIURL = environment.apiBaseUrl + '/rest/';

  constructor(private apiService: ApiService) {}

  getBanksByCountry = (countryCode: string) => {
    return this.apiService.getWithLocalCache<ICodeDescription[]>(this.baseAPIURL + 'bank/code/desc/' + countryCode);
  };
  getSortCodesByBankCode = (bankCode: string) => {
    return this.apiService.getWithLocalCache<{ code: string }[]>(
      this.baseAPIURL + 'sort/codes/' + bankCode
    );
  };
  getSortCodeByBankCode = (bankCode: string) => {
    return this.getSortCodesByBankCode(bankCode).pipe(
      map((x) => (x ? x[0]?.code : null))
    );
  };
  getBankBranchesByBankCode = (bankCode: string) => {
    return this.apiService.getWithLocalCache<{ title: string }[]>(
      this.baseAPIURL + 'sort/codes/branch_title/' + bankCode
    );
  };
  getBankBranchByBankCode = (bankCode: string) => {
    return this.getBankBranchesByBankCode(bankCode).pipe(
      map((x) => (x ? x[0]?.title : null))
    );
  };
}
