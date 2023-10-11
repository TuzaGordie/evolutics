

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class AdjustAccountMappingService {
    private retryCount: number = 2;

    constructor(public httpClient: HttpClient, public apiService: ApiService) { }

    getCodeAndTitleByCodeSubGroup(codeSubgroup: string) {
        return this.apiService.get<any>(
            `${environment.apiBaseUrl}/rest/codes/sub/category/${codeSubgroup}`
        );
    };
    getAdjustmentAccountMappingByCompanyCode(companyCode) {
        return this.apiService.get(`${environment.apiBaseUrl}/rest/acc/codes/adjustment/mapping/${companyCode}`);

    }

    getAccountLedgerCodeByAccountCodeAndCompanyCode(accCode, companyCode) {
        return this.apiService.get(`${environment.apiBaseUrl}/rest/acc/codes/account/ledger/${accCode}/${companyCode}`);

    }
    getCompanyCodeAndDesc() {
        return this.apiService.get(`${environment.apiBaseUrl}/rest/company/code/desc`);
    }

    getDefaultAccountCode(company: string) {
        return this.apiService.get<any>(
            `${environment.apiBaseUrl}/rest/acc/codes/company/${company}`
        );
    };

    getDefaultAccountCodes() {
      return this.apiService.get<any>(
          `${environment.apiBaseUrl}/rest/acc/codes`
      );
  };

    saveAdjustmentAccountMapping(adjustmentAccountMapping: any[]) {
        return this.apiService.post<any>(
            `${environment.apiBaseUrl}/rest/acc/codes/adjustment/mapping`, adjustmentAccountMapping
        );

    }

}
