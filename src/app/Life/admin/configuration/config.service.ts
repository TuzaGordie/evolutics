import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';
import { CreateConfig } from './config';


@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private retryCount: number = 2;

    constructor(private apiService: ApiService) { }

    fetchConfigByCompanyCode(companyCode: string) {
        return this.apiService.get<CreateConfig>(environment.apiBaseUrl + "/rest/config/company/" + companyCode)
            .pipe(
                retry(this.retryCount)
            );
    }

    deleteLanguage(id: number) {
        return this.apiService.delete(environment.apiBaseUrl + "/rest/config/language/" + id)
            .pipe(
                retry(this.retryCount)
            );
    }

    saveConfig(configs: CreateConfig[]): Observable<CreateConfig[]> {
        return this.apiService.post<CreateConfig[]>(`${environment.apiBaseUrl}/rest/config/`, configs)
            .pipe(
                retry(this.retryCount),
            );
    }
}
