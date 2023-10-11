import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/Services/api.service';
import { GatewayEmail, GatewaySms } from './gateways';

@Injectable({
    providedIn: 'root',
})
export class GateWayService {
    baseURL = environment.apiBaseUrl + '/rest';
    retryCount = 1;
    noRetry = 0;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private apiService: ApiService) { }

    getGatewayEmails() {
        return this.apiService
            .get(`${this.baseURL}/gateway/email`)
            .pipe(retry(this.retryCount));
    }

    getGatewaySms() {
        return this.apiService
            .get(`${this.baseURL}/gateway/sms`)
            .pipe(retry(this.retryCount));
    }

    saveEmail(email: GatewayEmail[]): Observable<GatewayEmail[]> {
        return this.apiService.post<GatewayEmail[]>(`${this.baseURL}/gateway/email`, email)
            .pipe(
                retry(this.retryCount)
            );
    }

    saveSms(sms: GatewaySms[]): Observable<GatewaySms[]> {
        return this.apiService.post<GatewaySms[]>(`${this.baseURL}/gateway/sms`, sms)
            .pipe(
                retry(this.retryCount)
            );
    }

    deleteEmail(id: number) {
        return this.apiService.delete(`${this.baseURL}/gateway/email/${id}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    deleteSms(id: number) {
        return this.apiService.delete(`${this.baseURL}/gateway/sms/${id}`)
            .pipe(
                retry(this.retryCount)
            );
    }

}