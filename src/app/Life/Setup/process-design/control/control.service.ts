import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { CreateProcessControl } from './control';

@Injectable({
    providedIn: 'root'
})
export class ControlPayoutService {
    private retryCount: number = 2;

    constructor(private httpClient: ApiService) { }

    deletePayoutPayout(id: number){
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/control/payout/payout/${id}`)
        .pipe(
            retry(this.retryCount)
        );
    }

    deletePayoutProduct(id: number){
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/control/payout/product/${id}`)
        .pipe(
            retry(this.retryCount)
        );
    }

    // Show and Index page
    getProcessControlByCompanyCode(companyCode: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/control/payout/${companyCode}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getFileDownloadCodeAndDesc(){
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/file/download/code/desc`)
            .pipe(
                retry(this.retryCount)
            );
    }

    createControlPayout(controlProcessControl: CreateProcessControl) {
        return this.httpClient.post(`${environment.apiBaseUrl}/rest/control/payout`, controlProcessControl)
            .pipe(
                retry(0)
            );
    }

    handleError(error: { error: { message: string; }; status: any; message: any; }) {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        // window.alert(errorMessage);

        return throwError(errorMessage);
    }

}

