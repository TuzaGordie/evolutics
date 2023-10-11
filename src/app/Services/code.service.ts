import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Code, Codes } from 'src/app/Shared/models/life/setup/codes/Codes';
import { CodesGroup } from 'src/app/Shared/models/life/setup/codes/CodesGroup';
import { ApiService } from './api.service';
import { ICodeTitle } from '../Shared/models/index.model';
import { CreateStatusCode } from '../Life/Setup/process-design/status/statuscode';

@Injectable({
  providedIn: 'root',
})
export class CodeService {
  baseURL = environment.apiBaseUrl + '/rest';
  retryCount = 1;
  noRetry = 0;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private apiService: ApiService) {}

  getNumberingByCompanyCode(company: string){
    return this.apiService
      .get(`${this.baseURL}/numbering/${company}`)
      .pipe(retry(this.retryCount));
  }

  getCodesByCodeSubGroup = (codeSubGroup: string) => {
    return this.apiService
      .get<ICodeTitle[]>(`${this.baseURL}/codes/sub/category/${codeSubGroup}`)
      .pipe(
        retry(this.retryCount),
        map((res) => this.apiService.sortCodes(res))
      );
  };

  getCodesByCodeSubGroupAndCat = (codeSubGroup: string, cat: string) => {
    return this.apiService
      .get<ICodeTitle[]>(
        `${this.baseURL}/codes/sub/category/${codeSubGroup}/${cat}`
      )
      .pipe(retry(this.retryCount));
  };

  getCodeTitlesByCodeAndCodeSubGroup = (code: string, codeSubGroup: string) => {
    return this.apiService
      .get<ICodeTitle[]>(`${this.baseURL}/codes/titles/${code}/${codeSubGroup}`)
      .pipe(retry(this.retryCount));
  };

  getCodeGroups = (): Observable<any> => {
    return this.apiService
      .get(`${this.baseURL}/codes/group`)
      .pipe(retry(this.retryCount));
  };

  getAllCodeSubGroups = (): Observable<any> => {
    return this.apiService
      .get(`${this.baseURL}/codes/subgroups`)
      .pipe(retry(this.retryCount));
  };

  getAllCode = (): Observable<any> => {
    return this.apiService.get(`${this.baseURL}/codes`).pipe(retry(this.retryCount));
  };

  getAllCodeByGroup = (group: string): Observable<any> => {
    return this.apiService
      .get(`${this.baseURL}/codes/subgroups/${group}`)
      .pipe(retry(this.retryCount));
  };

  getAllCodeByCodeSubGroup = (codeSubGroup: string) => {
    return this.apiService
      .get<ICodeTitle[]>(`${this.baseURL}/codes/sub/group/${codeSubGroup}`)
      .pipe(retry(this.retryCount),map(r=>this.apiService.sortCodes(r)));
  };

  getAllCodesCodeAndTitle = (): Observable<any> => {
    return this.apiService
      .get(`${this.baseURL}/codes/code/title`)
      .pipe(retry(this.retryCount));
  };

  getAllAccCodes = (): Observable<any> => {
    return this.apiService
      .get(`${this.baseURL}/acc/codes/desc`)
      .pipe(retry(this.retryCount));
  };

  createCodes(codes: any): Observable<Code[]> {
    return this.apiService
      .post<Code[]>(`${this.baseURL}/codes/`, codes)
      .pipe(retry(this.noRetry));
  }

  createCodesGroup = (codesGroup: any): Observable<CodesGroup> => {
    return this.apiService
      .post<CodesGroup>(`${this.baseURL}/codes/group`, codesGroup)
      .pipe(retry(this.noRetry));
  };

  getCodesByGroup_Subgroup = (group: string, sub_group: string) => {
    return this.apiService.get<ICodeTitle[]>(
      this.baseURL + '/codes/' + group + '/' + sub_group
    );
  };

  getStatusCodeByCompanyAndCat = (cat: string, company: string) => {
    return this.apiService.get(this.baseURL + '/status/code/' + company + '/' + cat);
  };

  getStatusCodeByCat = (cat: string) => {
    return this.apiService.get(this.baseURL + '/status/code/description/' + cat);
  };

  getStatusCodeByCode = (code: string) => {
    return this.apiService.get(this.baseURL + '/status/code/' + code);
  };

  deleteStatusDestinationById = (id: number) => {
    return this.apiService.delete(this.baseURL + '/status/code/destination/' + id);
  };

  CreateStatusCode = (
    statusCode: CreateStatusCode,
    statusCat: string
  ): Observable<CreateStatusCode> => {
    return this.apiService
      .post<CreateStatusCode>(
        `${this.baseURL}/status/code/${statusCat}`,
        statusCode
      )
      .pipe(retry(this.noRetry));
  };

  // deleteEmployee(id: number): Observable<any> {
  //     return this.http.delete(`${this.URL}/${id}`, { responseType: 'text' });
  // }

  // update(id: string, employee: any): Observable<employee> {
  //     return this.http.put<employee>(`${this.URL}` + id, employee);
  // }

  // find(id: string): Observable<employee> {
  //     return this.http.get<employee>(`${this.URL}` + id);
  // }

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
