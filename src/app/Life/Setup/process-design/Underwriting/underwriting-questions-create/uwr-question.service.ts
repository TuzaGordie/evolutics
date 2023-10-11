import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UnderwritingQuestionService {
    private retryCount: number = 0;

    constructor(private httpClient: ApiService) { }

    getCodeAndTitleByCodeSubgroup(code: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/codes/sub/category/${code}`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );

    }


    getStatusCode(statusCat: string, companyCode: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/status/code/${statusCat}/${companyCode}`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );

    }

    getCompanyCodeAndDescription() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/company/code/desc`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }

    getUWQuestionCodeAndDescription() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/underwriting/question/codes/desc`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }

    getUWQuestionListCodeAndDescription() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/underwriting/question/list/codes/desc`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }

    getUWQuestionListCodeSubGroup() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/codes/subgroups`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }

    createUnderWritingQuestion(uwrtQData: {}) {
        return this.httpClient.post(`${environment.apiBaseUrl}/rest/underwriting/question`, uwrtQData)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }
    updateUnderWritingQuestion(uwrtQData: {}) {
        return this.httpClient.put(`${environment.apiBaseUrl}/rest/underwriting/question`, uwrtQData)
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
