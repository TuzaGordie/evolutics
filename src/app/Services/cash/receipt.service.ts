import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Receipt, CreateBatchReceipt } from 'src/app/Shared/models/cash/receipt';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ReceiptUploadData } from 'src/app/Shared/models/cash/ReceiptUploadData';
import { ApiService } from '../api.service';


@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  private baseURL = environment.apiBaseUrl + "/rest";
  noRetry = 0;
  retryCount = 1;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
  }

  constructor(
    private http: ApiService
  ) { }

  batchSaveReceipt(receiptArray: any): Observable<CreateBatchReceipt> {
    return this.http.post<CreateBatchReceipt>(
      `${this.baseURL}/receipt/batch/insert`, receiptArray, this.httpOptions
    )
      .pipe(
        retry(this.noRetry),
        
      );
  }

  batchFileReceipt(receiptFileUpload: any): Observable<ReceiptUploadData> {
    return this.http.post<ReceiptUploadData>(
      `${this.baseURL}/receipt/file/upload`, receiptFileUpload, this.httpOptions
    )
      .pipe(
        retry(this.noRetry),
        
      );
  }

  saveReceipt(receipt: any): Observable<Receipt> {
    return this.http.post<Receipt>(
      `${this.baseURL}/receipt/`, receipt, this.httpOptions
    )
      .pipe(
        retry(this.noRetry),
        
      );
  }

  updateUnpostedReceiptToPosted(id: number): Observable<Receipt> {
    return this.http.put(
      `${this.baseURL}/receipt/posted/${id}`, {} , this.httpOptions
    )
      .pipe(
        retry(this.noRetry),
        
      );
  }

  postReceipt(receipt: any): Observable<Receipt> {
    return this.http.post<Receipt>(
      `${this.baseURL}/bank/transaction/receipt`, receipt, this.httpOptions
    )
      .pipe(
        retry(this.noRetry),
        
      );
  }

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
