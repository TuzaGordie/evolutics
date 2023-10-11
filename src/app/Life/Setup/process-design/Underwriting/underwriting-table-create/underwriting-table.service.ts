import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class UnderwritingTableService {
    private retryCount: number = 0;

    constructor(private apiService: ApiService) { }



    findAllTableGroups() {
        return this.apiService.get(`${environment.apiBaseUrl}/rest/codes/sub/group/UWR_GROUP`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }


    getCurrencyCodeAndDescription() {

        return this.apiService.get(`${environment.apiBaseUrl}/rest/currency`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }


    getCodeAndTitleByCodeSubgroup(code: string) {

        return this.apiService.get(`${environment.apiBaseUrl}/rest/codes/sub/category/${code}`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }



    getGeneralRateCodeAndDescriptionByCategory(code: string) {
        return this.apiService.get(`${environment.apiBaseUrl}/rest/product/rate/general/code/desc/${code}`)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
            );
    }


    getUnderwrittenSumAssuredBasisList(){
        return this.getCodeAndTitleByCodeSubgroup('UWR_SA_BASIS')
    }

    createUwrTable(uwrData: {}) {

        return this.apiService.post(`${environment.apiBaseUrl}/rest/underwriting/table`, uwrData)
            .pipe(
                retry(this.retryCount),
                catchError(this.handleError)
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
