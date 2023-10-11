import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UnderwritingReqService {
    private retryCount: number = 0;

    constructor(private httpClient: ApiService) { }

    public companyCodeAndDescription: any[] = []
    public codesByCodeSubGroup: any[] = []

    getCompanyCodeAndDescription() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/company/code/desc`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }

    getCodesByCodeSubGroup(codeSubGroup: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/codes/sub/category/${codeSubGroup}`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }


    createUnderWritingReq(underwritingReq: {}) {
        return this.httpClient.post(`${environment.apiBaseUrl}/rest/underwriting/req`, underwritingReq)
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
