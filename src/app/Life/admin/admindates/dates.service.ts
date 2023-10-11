import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';
import { CreateDdates, Ddates } from './admin-date-direct-debit/ddates';
import { SystemDate } from './admin-date-system/systemdate';


@Injectable({
    providedIn: 'root'
})
export class DateService {
    private retryCount: number = 2;

    constructor(private httpClient: ApiService) { }

    getDdates(): Observable<any> {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/dates/direct/debit`)
            .pipe(
                retry(this.retryCount)
            );
    }

    deleteDdates(id: number): Observable<any> {
        return this.httpClient.delete(`${environment.apiBaseUrl}/rest/dates/direct/debit/${id}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    createDDates(ddDateData: Ddates[]): Observable<Ddates[]> {
        return this.httpClient.post<Ddates[]>(`${environment.apiBaseUrl}/rest/dates/direct/debit`, ddDateData)
            .pipe(
                retry(this.retryCount),
            );
    }

    getSystemDateByCompanyCode(companyCode: string): Observable<any> {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/dates/system/${companyCode}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    createSystemDate(systemDateData: SystemDate): Observable<SystemDate> {
        return this.httpClient.post<SystemDate>(`${environment.apiBaseUrl}/rest/dates/system`, systemDateData)
            .pipe(
                retry(this.retryCount),
            );
    }
}
