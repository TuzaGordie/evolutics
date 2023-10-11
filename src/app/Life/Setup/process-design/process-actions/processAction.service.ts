import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';

@Injectable({
    providedIn: 'root'
})
export class ProcessActionService {
    private retryCount: number = 2;

    constructor(private httpClient: ApiService) { }

    getProcessCodes(){
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/process/setup/code/desc`)
    }

    // Show and Index page
    getProcessSetupCompanyCode() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/process/setup/company/code`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getProcessCodesByCompanyCode(companyCode: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/process/setup/codes/${companyCode}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    searchProcessCodes(searchCriteria: string){
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/process/setup/search/${searchCriteria}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getProcessGroupByCompanyCode(companyCode: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/process/setup/process/group/${companyCode}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getProcessActionsCodesByCompanyCode(companyCode: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/process/setup/action/company/${companyCode}`)
            .pipe(
                retry(this.retryCount)
            );
    }
    
    getProcessSetupCodes(processCode: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/process/setup/codes/${processCode}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getProcessSetupByProcessCode(processCode: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/process/setup/${processCode}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getProcessSetupEventByProcessCode(processCode: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/process/setup/event/${processCode}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getProcessSetupActionBy(processCode: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/process/setup/action/${processCode}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    // Create Page
    getCodeAndTitleByCodeSubgroup(code: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/codes/sub/category/${code}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getAllEventList() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/product/event/list`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getAllCorrespondenceCodeAndDescription() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/correspondence/document/desc/codes`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getAllCodeAndDescription() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/workflows/task/code/description`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getAllBatchCodesAndDescription() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/batch/setup/code/desc`)
            .pipe(
                retry(this.retryCount)
            );
    }

    createProcessAction(actionData: any[]) {
        return this.httpClient.post(`${environment.apiBaseUrl}/rest/process/setup/action`, actionData)
            .pipe(
                retry(this.retryCount)
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

