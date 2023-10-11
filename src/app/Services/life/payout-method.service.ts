import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreateUser } from 'src/app/Shared/models/life/user/Users';
import { CreateCrmUserGroup } from 'src/app/Shared/models/life/user/UserGroup';
import { CreateUserMenu } from 'src/app/Shared/models/life/user/UserMenu';
import { CreatePayInMethod } from 'src/app/Shared/models/life/setup/pay/Payin-Method';

@Injectable({
    providedIn: 'root'
})

export class PayinMethodService {

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

    getPayinMethods(): Observable<any> {
        return this.http.get(`${this.URL}/payin/method/`)
            .pipe(
                retry(this.retryCount),
                
            );
    }

    getPayinMethodsByPayinCode(payinCode: string): Observable<any> {
        return this.http.get(`${this.URL}/payin/method/${payinCode}`)
            .pipe(
                retry(this.retryCount),
                
            );
    }

    getPayinMethodCodesAndDesc(): Observable<any> {
        return this.http.get(`${this.URL}/payin/method/code/desc`)
            .pipe(
                retry(this.retryCount),
                
            );
    }

    getPayOutMethodCodesAndDesc(): Observable<any> {
        return this.http.get(`${this.URL}/payout/method/code/desc`)
            .pipe(
                retry(this.retryCount),
                
            );
    }

    createPayinMethod(payin: any): Observable<CreatePayInMethod> {
        return this.http.post<CreatePayInMethod>(
            `${this.URL}/payin/method/`, payin, this.httpOptions
        )
            .pipe(
                retry(this.noRetry),
                
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