import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class TableService {

    reportGroupList: any
    URL = environment.apiBaseUrl + "/rest"
    retryCount = 1;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
    }

    constructor(
        private apiService: ApiService
    ) { }

    getCodeList(code: string): Observable<any> {
        return this.apiService.get(`${this.URL}/codes/sub/category/${code}`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }

    getTableColumn(tableName: string) {
        return this.apiService.get(`${this.URL}/reports/${tableName}/all-column`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }

    getTableGroupList() {
        return this.apiService
          .getWithLocalCache(`${this.URL}/reports/table-groups`)
          .pipe(retry(this.retryCount), catchError(this.handleError));
    }

    getPrimaryTableList(tableGroup: string) {
        return this.apiService
          .getWithLocalCache(
            `${this.URL}/reports/secondary-table/${tableGroup}`
          )
          .pipe(retry(this.retryCount), catchError(this.handleError));
    }

    getUserGroupList() {
        return this.apiService.get(`${this.URL}/users/group/L`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }

    getReportList() {
        return this.apiService.get(`${this.URL}/codes/sub/category/REPORT_GROUP%20/L`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }

    getTableGroup() {
        return this.apiService.get(`${this.URL}/reports/all-table-groups`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }


    getPrimaryTableListMain() {
        return this.apiService.get(`${this.URL}/reports/all-primary-table`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }

    getFieldName(data: string) {
        return this.apiService.get(`${this.URL}/reports/${data}/all-column`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }

    getSecondaryList(data: string) {
        return this.apiService.get(`${this.URL}/reports/secondary-table/${data}`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }

    getTableNameList(data: string) {
        return this.apiService.get(`${this.URL}/reports/secondary-table/${data}`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }

    getTableLinkList(data: string, data2: string) {
        return this.apiService.get(`${this.URL}/reports/secondary-table/primary/${data}/${data2}`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }

    getUserGroup() {
        return this.apiService.get(`${this.URL}/users/group/L`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }

    // Error handling 
    handleError(error: { error: { message: string; }; status: any; message: any; }) {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);

        return throwError(errorMessage);
    }
}