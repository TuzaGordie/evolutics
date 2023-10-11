import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreateCorrespondence } from 'src/app/Shared/models/life/setup/correspondence/CreateCorrespondence';

@Injectable({
    providedIn: 'root'
})

export class WorkflowService {

    URL = environment.apiBaseUrl + "/rest"
    retryCount = 1;
    documentCode = "";

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
    }

    constructor(
        private http: HttpClient
    ) { }

    getWorkflowTaskCode(): Observable<any> {
        return this.http.get(`${this.URL}/workflows/task/code`)
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