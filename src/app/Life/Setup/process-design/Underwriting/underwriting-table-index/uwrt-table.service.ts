
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UwrtTableIndexService {
    private retryCount: number = 0;

    constructor(private httpClient: ApiService) { }

    findAllTableGroups() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/codes/sub/group/UWR_GROUP`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }

    getUwrtTableGroups() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/codes/sub/group/UWR_TABLE`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }


    getUwrtTable(group: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/underwriting/table/${group}`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }


    getuwrtTableCurrency(group: string, table: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/underwriting/table/currency/desc/${group}/${table}`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }


    getuwrtByCurrencyGroupAndTable(currency: string, group: string, table: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/underwriting/table/${currency}/${group}/${table}`)
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
