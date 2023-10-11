import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Currency, CurrencyRate } from 'src/app/Shared/models/life/currency/currency';
import { ApiService } from '../api.service';
import { ICodeDescription } from 'src/app/Shared/models/index.model';

@Injectable({
    providedIn: 'root'
})

export class CurrencyService {

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

    getCurrency()  {
        return this.apiService.get<ICodeDescription[]>(`${this.URL}/currency`)
            .pipe(
                retry(this.retryCount), 
            );
    }

    getCurrencyByCode(code: string)  {
        return this.apiService.get<ICodeDescription[]>(`${this.URL}/currency/${code}`) 
    }

    createCurrencyCode(currency: any): Observable<Currency> {
        return this.apiService.post<Currency>(`${this.URL}/currency/`, currency, this.httpOptions)
            .pipe(
                retry(this.retryCount),
                
            );
    }

    createCurrencyRate(currency: any): Observable<CurrencyRate> {
        return this.apiService.post<CurrencyRate>(`${this.URL}/currency/rate`, currency, this.httpOptions)
            .pipe(
                retry(this.retryCount),
                
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