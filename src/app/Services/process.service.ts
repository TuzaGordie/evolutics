import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreateProcessClaim, CreateProcessNb } from '../Life/Setup/process-design/Requirement/process-requirement';

@Injectable({
    providedIn: 'root'
})

export class ProcessService {

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

    getClaimTypesList(){
        return this.http.get(this.URL + "/codes/sub/group/CLAIM_TYPE")
    }

    getProcessClaimCompanyCodes(): Observable<any> {
        return this.http.get(`${this.URL}/process/claim/company/codes`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getProcessClaimTypeByCompanyCode(companyCode: string): Observable<any> {
        return this.http.get(`${this.URL}/process/claim/types/${companyCode}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getProcessCodesByClaimTypes(claimType: string): Observable<any> {
        return this.http.get(`${this.URL}/process/claim/codes/${claimType}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getProcessClaimByCompanyAndClaimType(companyCode: string, claimType: string): Observable<any> {
        return this.http.get(`${this.URL}/process/claim/${companyCode}/${claimType}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getProcessClaimByProcessCode(code: string): Observable<any> {
        return this.http.get(`${this.URL}/process/claim/${code}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    saveProcessReqClaim(createProcessReqClaim: CreateProcessClaim): Observable<CreateProcessClaim> {
        return this.http.post<CreateProcessClaim>(`${this.URL}/process/claim`, createProcessReqClaim)
            .pipe(
                retry(this.retryCount)
            );
    }

    saveProcessNb(createProcessNb: CreateProcessNb): Observable<CreateProcessNb> {
        return this.http.post<CreateProcessNb>(`${this.URL}/process/nb`, createProcessNb)
            .pipe(
                retry(this.retryCount)
            );
    }

    getProcessNbCompanyCodes(): Observable<any> {
        return this.http.get(`${this.URL}/process/nb/company/codes`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getProcessNbProductClass(compnyCode: string): Observable<any> {
        return this.http.get(`${this.URL}/process/nb/prod/class/${compnyCode}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getProcessNbProducts(prodClass: string, companyCode: string): Observable<any> {
        return this.http.get(`${this.URL}/process/nb/product/codes/${prodClass}/${companyCode}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    getProcessNbProcerssCodeAndDescription(productCode: string): Observable<any> {
        return this.http.get(`${this.URL}/process/nb/codes/desc/${productCode}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    fetchProcessNbByCode(processCode: string): Observable<any> {
        return this.http.get(`${this.URL}/process/nb/${processCode}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    deleteProcessClaimBandById(id: number) {
        return this.http.delete(`${this.URL}/process/claim/band/${id}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    deleteProcessClaimReqById(id: number) {
        return this.http.delete(`${this.URL}/process/claim/req/${id}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    deleteProcessNbBandById(id: number) {
        return this.http.delete(`${this.URL}/process/nb/band/${id}`)
            .pipe(
                retry(this.retryCount)
            );
    }

    deleteProcessNbReqById(id: number) {
        return this.http.delete(`${this.URL}/process/nb/req/${id}`)
            .pipe(
                retry(this.retryCount)
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