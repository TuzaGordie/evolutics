import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SLAService {
  private retryCount: number = 0;

  constructor(private httpClient: ApiService) {}

  getProcessGroupByCompany(companyCode: string) {
    return this.httpClient
      .get(`${environment.apiBaseUrl}/rest/process/sla/groups/${companyCode}`)
      .pipe(retry(this.retryCount));
  }

  getProcessSLaByGroupAndCompany(group: string, companyCode: string) {
    return this.httpClient
      .get(`${environment.apiBaseUrl}/rest/process/sla/${group}/${companyCode}`)
      .pipe(retry(this.retryCount));
  }

  createUwrTable(uwrData: {}) {
    return this.httpClient
      .post(`${environment.apiBaseUrl}/rest/underwriting/table`, uwrData)
      .pipe(retry(this.retryCount));
  }
}
