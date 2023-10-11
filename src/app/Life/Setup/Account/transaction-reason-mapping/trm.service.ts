

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class TransactionMapService {
    private retryCount: number = 2;

    constructor(public httpClient: HttpClient, public apiService: ApiService) { }

    getCompanyCodeAndDesc() {
        return this.apiService.get(`${environment.apiBaseUrl}/rest/company/code/desc`);
    }
    getCodeAndTitleByCodeSubGroup(codeSubgroup: string) {
        return this.apiService.get<any>(
            `${environment.apiBaseUrl}/rest/codes/sub/category/${codeSubgroup}`
        );
    };
    getAllAccountCodesAndDes() {
        return this.apiService.get<any>(
            `${environment.apiBaseUrl}/rest/acc/codes/desc`
        );
    }
    getAllAccountCodes() {
        return this.apiService.get<any>(
            `${environment.apiBaseUrl}/rest/acc/codes`
        );
    }
    createTransactionMap(transactionMap) {
        return this.apiService.post(
            `${environment.apiBaseUrl}/rest/acc/codes/trans/reason/mapping`, transactionMap
        );
    }

    getAccMappingByTransReasonAndCompany(company: string, transReason: string){
        return this.apiService.get<any>(
            `${environment.apiBaseUrl}/rest/acc/codes/trans/mapping/${company}/${transReason}`
        );
    }

}
