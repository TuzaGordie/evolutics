import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAccount } from '../Shared/models/account.interface';
import { ApiService } from './api.service';
import { CodeService } from './code.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseAPIURL = environment.apiBaseUrl + '/rest/';

  constructor(private apiService: ApiService, public codeS: CodeService) {}

  getProviderList=()=> {
    return this.codeS.getAllCodeByCodeSubGroup('MM_PROVIDER');
  }

  createAccount(data: IAccount) {
    return this.apiService.post<IAccount>(this.baseAPIURL + 'client/bank/', data);
  }
}
