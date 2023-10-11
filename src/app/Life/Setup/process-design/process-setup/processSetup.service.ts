import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';



@Injectable({
    providedIn: 'root'
})
export class ProcessSetupService {
    private retryCount: number = 2;

    constructor(private httpClient: ApiService) { }


    getProcessCodes(){
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/process/setup/code/desc`)
    }
    
    getProcessNodes() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/codes/sub/category/PROCESS_NODE`)
    }

    getFutureActivities() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/codes/sub/category/FUTURE_ACTIVITIES`)
    }

    getWorkflowTasks() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/workflows/task/code/description`)
    }

    getProcessSetupCompanyCode() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/process/setup/company/code`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getProcessSetupProcessGroupsByCompany(company: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/process/setup/process/group/${company}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getProcessSetupProductClassByGroup(group: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/process/setup/product/class/${group}`)
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

    getAllProductCodes(){
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/product/code/desc`)
    }

    getProcessSetupProductClassesList() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/codes/sub/category/PRODUCT_CLASS`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getProcessSetupProductCodesByClass(productClass: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/process/setup/product/code/${productClass}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getProductCodesByClass(productClass: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/product/code/desc/class/${productClass}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getProcessCodesAndDescriptionByProductCode(productCode: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/process/setup/code/desc/product/${productCode}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getProcessSetupProcessGroups() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/process/setup/process/group`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getProcessSetupProcessGroupsList() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/codes/sub/category/PROCESS_GROUP`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getCoverAndCodeDescription() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/product/covers/code/desc`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getCodeAndTitleByCodeSubgroupAndCodeCat(codeSubgroup: string, codeCat: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/codes/sub/category/${codeSubgroup}/${codeCat}`)
            .pipe(
                retry(this.retryCount)
            );
    }


    getStatusCodeAndDescriptionStatusCat(statusCat: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/status/code/description/${statusCat}`)
            .pipe(
                retry(this.retryCount)
            );
    }
    getProcessSetupProductClass() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/process/setup/product/class`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getCompanyCodeAndDescription() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/company/code/desc`)
            .pipe(
                retry(this.retryCount)
            );
    }



    getProcessSetupProductCodes() {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/process/setup/product/code`)
            .pipe(
                retry(this.retryCount)
            );
    }



    getProcessSetup(processCode: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/process/setup/process/${processCode}`)
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

    getCodeAndTitleByCodeGroupAndSubgroup(codegroup: string, codeSubgroup: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/codes/${codegroup}/${codeSubgroup}`)
            .pipe(
                retry(this.retryCount)
            );
    }


    getAllCodeAndDescriptionByCompanyCode(companyCode: string) {
        return this.httpClient.get(`${environment.apiBaseUrl}/rest/process/setup/codes/${companyCode}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    createProcess(processObject: {}) {

        return this.httpClient.post(`${environment.apiBaseUrl}/rest/process/setup`, processObject)
            .pipe(
                retry(this.retryCount)
            );
    }

    deleteProcessEventById(id: number) {
        return this.httpClient.delete(`${environment.apiBaseUrl}/rest/process/setup/event/${id}`)
            .pipe(retry(this.retryCount))
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

