import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreateCorrespondence } from 'src/app/Shared/models/life/setup/correspondence/CreateCorrespondence';
import { PremFreq } from 'src/app/Shared/models/life/setup/premium-freq/PremiumFreq';

@Injectable({
    providedIn: 'root'
})

export class PremFreqService {

    URL = environment.apiBaseUrl + "/rest"
    retryCount = 1;
    noRetry = 0;
    documentCode = "";

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
    }

    constructor(
        private http: HttpClient
    ) { }

    getTemplateCodeAndDescByTemplateCat(templateCat: string): Observable<any> {
        return this.http.get(`${this.URL}/templates/code/desc/${templateCat}`)
            .pipe(
                retry(this.retryCount),

            );
    }

    getPremiumFreqByPremFreq(premFreq: string): Observable<any> {
        return this.http.get(`${this.URL}/premium/frequency/${premFreq}`)
            .pipe(
                retry(this.retryCount),
            );
    }

    createPremFreq(premFreq: any): Observable<PremFreq> {
        return this.http.post<PremFreq>(
            `${this.URL}/premium/frequency/`, premFreq, this.httpOptions
        )
            .pipe(
                retry(this.noRetry),

            );
    }
}