import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreateCorrespondence } from 'src/app/Shared/models/life/setup/correspondence/CreateCorrespondence';
import { ApiService } from '../api.service';
import {
  ICodeDescription,
  ICodeTitle,
} from 'src/app/Shared/models/index.model';

@Injectable({
  providedIn: 'root',
})
export class CorrespondenceService {
  URL = environment.apiBaseUrl + '/rest';
  retryCount = 1;
  documentCode = '';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  private baseURL = environment.apiBaseUrl;

  constructor(private apiService: ApiService) {}
  getTableGroupCorrespondence = (tableGroup: string) => {
    return this.apiService.get(
      this.baseURL + `/rest/correspondence/table/group/${tableGroup}`
    );
  };
  generateCorrespondenceFile(queryObj: {
    refCat: string;
    refNo: string;
    documentCode: string;
  }) {
    return this.apiService.get(
      this.baseURL + `/rest/correspondence/generate/notification/text-file`,
      queryObj
    );
  }

  getCommonFields(primary, secondary) {
    return this.apiService
      .getWithLocalCache<any[]>(`${this.URL}/reports/${primary}/all-column`)
      .pipe(map((r) => r.map((x) => x.columnName).sort()));
  }

  getCorrespondenceByDocumentCode(code: string) {
    return this.apiService
      .get<CreateCorrespondence>(`${this.URL}/correspondence/${code}`)
      .pipe(retry(this.retryCount));
  }

  getDocumentCodes(): Observable<any> {
    return this.apiService
      .get(`${this.URL}/correspondence/document/desc/codes`)
      .pipe(retry(this.retryCount));
  }

  getDocumentCodeBySendBy(sendBy: string): Observable<any> {
    return this.apiService
      .get(`${this.URL}/correspondence/document/desc/codes/${sendBy}`)
      .pipe(retry(this.retryCount));
  }

  getDocumentCodeAndDesc(): Observable<any> {
    return this.apiService
      .get(`${this.URL}/correspondence/document/desc/codes`)
      .pipe(retry(this.retryCount));
  }

  getTableName(): Observable<any> {
    return this.apiService
      .get(`${this.URL}/reports/all-table`)
      .pipe(retry(this.retryCount));
  }

  getCodesByCodeSubGroup = (codeSubGroup: string) => {
    return this.apiService
      .getWithLocalCache<ICodeTitle[]>(
        `${this.URL}/codes/sub/category/${codeSubGroup}`
      )
      .pipe(retry(this.retryCount));
  };

  getAllSmsGateways() {
    return this.apiService.get<any[]>(`${this.URL}/gateway/sms/id/url`).pipe(
      retry(this.retryCount),
      map((r) => {
        r.forEach((x) => (x.id = x.id.toString()));
        return r;
      })
    );
  }

  getTemplateCodeByDocumentCode(): Observable<any> {
    this.documentCode = localStorage.getItem(
      'correspondence_document_code_quotation'
    );

    return this.apiService
      .get(`${this.URL}/correspondence/find/template_code/${this.documentCode}`)
      .pipe(retry(this.retryCount));
  }

  getGatewayEmailIdAndSenderEmail(usage: string) {
    return this.apiService
      .get<any[]>(`${this.URL}/gateway/email/id/senderEmail/${usage}`)
      .pipe(
        retry(2),
        map((r) =>
          r.map((g) => {
            g.id = g.id.toString();
            return g;
          })
        )
      );
  }

  createNewCorrespondence(
    createCorrespondence: any
  ): Observable<CreateCorrespondence> {
    return this.apiService
      .post<CreateCorrespondence>(
        `${this.URL}/correspondence/`,
        createCorrespondence,
        this.httpOptions
      )
      .pipe(retry(this.retryCount));
  }

  deleteFilter(id: number): Observable<any> {
    return this.apiService.delete(`${this.URL}/correspondence/filter/${id}`, {
      responseType: 'text',
    });
  }

  deleteJoinTemplate(id: number): Observable<any> {
    return this.apiService.delete(
      `${this.URL}/correspondence/join/template/${id}`,
      {
        responseType: 'text',
      }
    );
  }

  deleteDocLink(id: number): Observable<any> {
    return this.apiService.delete(`${this.URL}/correspondence/doc/link/${id}`, {
      responseType: 'text',
    });
  }

  deleteOutputField(id: number): Observable<any> {
    return this.apiService.delete(
      `${this.URL}/correspondence/output/field/${id}`,
      {
        responseType: 'text',
      }
    );
  }
}
