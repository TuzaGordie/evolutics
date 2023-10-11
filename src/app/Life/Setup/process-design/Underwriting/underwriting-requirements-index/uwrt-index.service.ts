
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UwrtReqIndexService {
    private retryCount: number = 0;

    constructor(private httpClient: ApiService) { }


    getUwrtReqCompanyCodes() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/underwriting/req/company/codes`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }

    getRecTypeByCompanyCode(code: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/underwriting/req/types/${code}`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }

    getRecType(companyCode: string, recType: string) {


        return this.httpClient.get(`${environment.apiBaseUrl}/rest/underwriting/req/code/${companyCode}/${recType}`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );



    }

    getUwrReqByReqCodeAndCompanyCodeAndReqType(code: string, companyCode: string, recType: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/underwriting/req/${code}/${companyCode}/${recType}`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }




    handleError(error: { error: { message: string; }; status: any; message: any; }) {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        // window.alert(errorMessage);

        return throwError(errorMessage);
    }
}
