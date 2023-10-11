import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Codes } from 'src/app/Shared/models/life/setup/codes/Codes';
import { CodesGroup } from 'src/app/Shared/models/life/setup/codes/CodesGroup';
import { Numbering, Numberings } from 'src/app/Shared/models/life/setup/numbering';

@Injectable({
    providedIn: 'root'
})

export class NumberingService {

    URL = environment.apiBaseUrl + "/rest"
    retryCount = 1;
    noRetry = 0;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
    }

    constructor(
        private http: HttpClient
    ) { }

    createNumbering(numbering: any): Observable<Numberings[]> {
        return this.http.post<Numberings[]>(
            `${this.URL}/numbering/`, numbering, this.httpOptions
        )
            .pipe(
                retry(this.noRetry),
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