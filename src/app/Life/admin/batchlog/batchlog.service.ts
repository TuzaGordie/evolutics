import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class BatchLogService {
    private retryCount: number = 2;

    constructor(private httpClient: ApiService) { }

    getBatchCodesByCat(group: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/batch/setup/code/desc/group/${group}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getBatchLogsByBatchCode(batchCode: string) {

        return this.httpClient.get(`${environment.apiBaseUrl}/rest/batch/log/code/${batchCode}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getBatchLogDetailsByStartDateAndBatchNo(startOn: string, batchNo: string) {

        return this.httpClient.get(`${environment.apiBaseUrl}/rest/batch/log/details/${startOn}/${batchNo}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getBatchLogByBatchNo(batchNo: string) {

        return this.httpClient.get(`${environment.apiBaseUrl}/rest/batch/log/details/${batchNo}`)
            .pipe(
                retry(this.retryCount)
            );
    }
}
