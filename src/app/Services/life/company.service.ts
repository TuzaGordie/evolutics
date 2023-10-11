import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry } from 'rxjs/operators';
import { CreateCompany } from 'src/app/Life/Setup/organization/companies/create-company/models/create-company';
import { ICodeDescription } from 'src/app/Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  URL = environment.apiBaseUrl + '/rest';
  retryCount = 1;
  noRetry = 0;

  constructor(private apiService: ApiService) {}

  getCodeAndCompanyCodeTeirCat(tierCat: string): Observable<any> {
    return this.apiService
      .get(`${this.URL}/company/tier/code/companycode/${tierCat}`)
      .pipe(retry(this.retryCount));
  }

  getCompanyCodeByCompanyCode(companyCode: string): Observable<any> {
    return this.apiService
      .get(`${this.URL}/company/${companyCode}`)
      .pipe(retry(this.retryCount));
  }

  getCompanyCodeAndDesc() {
    return this.apiService.getCodes<ICodeDescription>(
      `${this.URL}/company/code/desc`
    );
  }

  getCompanyidAndSenderEmailByCompanyCode(
    companyCode: string
  ): Observable<any> {
    return this.apiService
      .get(`${this.URL}/company/id/sender/email/${companyCode}`)
      .pipe(retry(this.retryCount));
  }

  getCompanyidAndSenderEmail(): Observable<any> {
    return this.apiService
      .get(`${this.URL}/company/id/sender/email`)
      .pipe(retry(this.retryCount));
  }

  createCompany(company: any): Observable<CreateCompany> {
    return this.apiService
      .post<CreateCompany>(`${this.URL}/company/`, company)
      .pipe(retry(this.noRetry));
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
