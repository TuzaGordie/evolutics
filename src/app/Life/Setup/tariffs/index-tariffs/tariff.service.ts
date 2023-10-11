import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment';
import { CreateTariff } from './tariff';


@Injectable({
  providedIn: 'root'
})
export class TariffService {
  http: any;
  URL: any;

  constructor(private httpClient: ApiService) { }

  getGenrateByCategory(cat: {}) {
    return this.httpClient.get(`${environment.apiBaseUrl}/rest/product/rate/general/code/desc/${cat}`)
  }

  getTariffCodeAndDescByGroup(group: {}) {
    return this.httpClient.get(`${environment.apiBaseUrl}/rest/tariff/code/desc/${group}`)
  }

  getTariffByCode(code: string): Observable<any> {
    return this.httpClient.get(`${environment.apiBaseUrl}/rest/tariff/${code}`)
      .pipe(
        retry(2),
      );
  }

  getTariffVersionByCode(code: string): Observable<any> {
    return this.httpClient.get(`${environment.apiBaseUrl}/rest/tariff/versions/${code}`)
      .pipe(
        retry(2),
      );
  }

  getTariffVersionByVersionNoAndCode(versionNo: number, code: string): Observable<any> {
    return this.httpClient.get(`${environment.apiBaseUrl}/rest/tariff/values/${versionNo}/${code}`)
      .pipe(
        retry(2),
      );
  }

  saveTariff(tariff: CreateTariff) {
    return this.httpClient.post(`${environment.apiBaseUrl}/rest/tariff/`, tariff)
  }

  deleteTariffValues(id: number) {
    return this.httpClient.delete(`${environment.apiBaseUrl}/rest/tariff/values/${id}`)
      .pipe(retry(2))
  }
}

