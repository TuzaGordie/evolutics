import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreateUser } from 'src/app/Shared/models/life/user/Users';
import { CreateCrmUserGroup } from 'src/app/Shared/models/life/user/UserGroup';
import { CreateUserMenu } from 'src/app/Shared/models/life/user/UserMenu';
import { ICreateBranch } from 'src/app/ApiModels/branch.interface';
import { Branch } from '../models/branch';
import { ApiService } from 'src/app/Services/api.service';

@Injectable({
    providedIn: 'root'
})

export class BranchService {

    URL = environment.apiBaseUrl + "/rest"
    retryCount = 1;
    noRetry = 0;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
    }

    constructor( 
        private apiService: ApiService,
    ) { }

    getBranchByCompanyAndBranchCode(companyCode: string, branchCode: string): Observable<any> {
        return this.apiService.get(`${this.URL}/branch/${branchCode}/${companyCode}`)
            .pipe(
                retry(this.retryCount),

            );
    }

    getBranchByCompany(companyCode: string): Observable<any> {
        return this.apiService.get(`${this.URL}/branch/code/desc/${companyCode}`)
            .pipe(
                retry(this.retryCount),

            );
    }

    getBranchCompanyCodes(): Observable<any> {
        return this.apiService.get(`${this.URL}/branch/company/codes`)
            .pipe(
                retry(this.retryCount),

            );
    }

    createBranch(payload: Branch): Observable<any> {
        return this.apiService.post<Branch>(
            `${this.URL}/branch/`, payload, this.httpOptions
        )
            .pipe(
                retry(this.noRetry),
            
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

    getCompanies(){
        return this.apiService.get(this.URL + '/company/code/desc')
    }
}