import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProviderService {

    reportGroupList: any
    URL = environment.apiBaseUrl + "/rest"
    retryCount = 1;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
    }

    constructor(
        private http: HttpClient
    ) { }

    getProvidersBySubCategory(providerCat: string): Observable<any> {
        return this.http.get(`${this.URL}/client/provider/subCat/${providerCat}`)
            .pipe(
                retry(this.retryCount)
            );
    }

}