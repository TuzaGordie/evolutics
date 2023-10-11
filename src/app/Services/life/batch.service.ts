import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreateUser } from 'src/app/Shared/models/life/user/Users';
import { CreateCrmUserGroup } from 'src/app/Shared/models/life/user/UserGroup';
import { CreateUserMenu } from 'src/app/Shared/models/life/user/UserMenu';

@Injectable({
    providedIn: 'root'
})

export class BatchService {

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

    getBatcheCodeDesc(): Observable<any> {
        return this.http.get(`${this.URL}/batch/setup/code/desc`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }

    // deleteEmployee(id: number): Observable<any> {
    //     return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
    // }

    // update(id: string, employee: any): Observable<employee> {
    //     return this.http.put<employee>(`${this.URL}` + id, employee, this.httpOptions);
    // }

    // find(id: string): Observable<employee> {
    //     return this.http.get<employee>(`${this.URL}` + id);
    // }

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