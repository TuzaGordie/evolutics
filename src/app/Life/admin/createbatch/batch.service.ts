import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class BatchService {
    private retryCount: number = 2;

    constructor(private httpClient: ApiService) { }

    getCodesByCodeSubGroup(codeSubGroup: string): Observable<any> {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/codes/sub/category/${codeSubGroup}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    fetchBatchByCode(code: string) {
        return this.httpClient.get(environment.apiBaseUrl + "/rest/batch/" + code)
            .pipe(
                retry(this.retryCount)
            );
    }

    getBatchCodeAndDescByCategory(category: string){
        return this.httpClient.get(environment.apiBaseUrl + "/rest/batch/setup/code/desc/group/" + category)
            .pipe(
                retry(this.retryCount)
            );
    }

    getCompanyCodeAndDescription(): Observable<any> {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/company/code/desc`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getBatchProcessCodeAndDescription() {

        return this.httpClient.get(`${environment.apiBaseUrl}/rest/batch/list`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getAllParameterByProcessCodeAndParameterBasis(processCode: string, parameterBasis: string) {

        return this.httpClient.get(`${environment.apiBaseUrl}/rest/batch/list/parameter/${processCode}/${parameterBasis}`)
            .pipe(
                retry(this.retryCount)
            );
    }


    getAllParametersByProcessCode(data: string) {

        return this.httpClient.get(`${environment.apiBaseUrl}/rest/batch/list/parameter/${data}`)
            .pipe(
                retry(this.retryCount)
            );
    }



    getParameterByProcessCode(processCode: string) {

        return this.httpClient.get(`${environment.apiBaseUrl}/rest/codes/sub/category/${processCode}`)
            .pipe(
                retry(this.retryCount)
            );
    }


    createBatch(batchData: {}): Observable<any> {
        return this.httpClient.post(`${environment.apiBaseUrl}/rest/batch/`, batchData)
            .pipe(
                retry(this.retryCount),
                // 
            );
    }
}
