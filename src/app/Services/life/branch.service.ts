import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreateUser } from 'src/app/Shared/models/life/user/Users';
import { CreateCrmUserGroup } from 'src/app/Shared/models/life/user/UserGroup';
import { CreateUserMenu } from 'src/app/Shared/models/life/user/UserMenu';
import { ICreateBranch } from 'src/app/ApiModels/branch.interface';
import { ICodeDescription } from 'src/app/Shared/models/index.model';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  URL = environment.apiBaseUrl + '/rest';
  retryCount = 1;
  noRetry = 0;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private apiService: ApiService) {}

  getBranchCodeAndDesc() {
    return this.apiService
      .get<ICodeDescription[]>(`${this.URL}/branch/code/desc`)
      .pipe(retry(this.retryCount), catchError(this.handleError));
  }

  getBranchesByCompCode=(companyCode: string) =>{
    return this.apiService.get<ICodeDescription[]>(
      `${this.URL}/branch/code/desc/${companyCode}`
    );
  }

  createBranch(payload: ICreateBranch): Observable<any> {
    console.log('Payload', payload);
    return this.apiService
      .post<CreateUser>(`${this.URL}/branch/`, payload, this.httpOptions)
      .pipe(retry(this.noRetry), catchError(this.handleError));
  }

  // Error handling
  handleError(error: {
    error: { message: string };
    status: any;
    message: any;
  }) {
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
