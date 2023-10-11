import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';

@Injectable({
    providedIn: 'root'
})

export class DebitService {

    URL = environment.apiBaseUrl + "/rest"
    retryCount = 1;
    noRetry = 0;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
    }

    constructor(
        private apiService: ApiService
    ) { }

    getDebitNotesByPolicyNo(policyNo: string, policyCode: string): Observable<any> {
        return this.apiService.get(`${this.URL}/debit/note/policy/code/${policyNo}/${policyCode}`)
            .pipe(
                retry(this.retryCount)                
            );
    }

    getDebitNotes(policyNo: string, policyCode: string): Observable<any> {
        return this.apiService.get(`${this.URL}/debit/note/${policyNo}`)
            .pipe(
                map(notes => notes.filter(note => {
                        return note.policyCode == policyCode && note.dnPaid == false
                    })),
                retry(this.retryCount)
            )
    }
}