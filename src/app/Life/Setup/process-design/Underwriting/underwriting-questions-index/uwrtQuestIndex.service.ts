
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UwrtQuestionIndexService {
    private retryCount: number = 0;

    constructor(private httpClient: ApiService) { }



    getUwrtQuestionCat() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/codes/sub/category/UW_QUEST_SET_CAT`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }

    getUwrtQuestionCodeByCat(code: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/underwriting/question/codes/${code}`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }

    getUwrtQuestionCodeByCode(code: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/underwriting/question/${code}`)
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
