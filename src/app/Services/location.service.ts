import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { ICodeDescription } from '../Shared/models/index.model';
import { ICountryData } from '../ApiModels/location.interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  URL = environment.apiBaseUrl + '/rest/location';
  noRetry = 0;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private apiService: ApiService) {}

  getCountries = ()  => {
    return this.apiService
      .getWithLocalCache<ICountryData[]>(`${this.URL}/country`) 
  };

  getCountryByCode = (countryCode:string)  => {
    return this.apiService
      .getWithLocalCache<ICountryData>(`${this.URL}/country/${countryCode}`)
  };

  getStates = (region: string): Observable<any> => {
    return this.apiService
    .getWithLocalCache<any[]>(`${this.URL}/state/${region}`) 
  };

  getStatesCountry = (country: string) => {
    return this.apiService
    .getWithLocalCache<ICodeDescription[]>(`${this.URL}/state/country/${country}`) 
  };
  getStatesByCode = (code: string) => {
    return this.apiService.getWithLocalCache<any>(
      `${this.URL}/state/info/${code}`
    ); 
  };

  getLGA = (): Observable<any> => {
    return this.apiService
      .get<any>(`${this.URL}/lga`)
      .pipe(retry(this.noRetry));
  };

  getRegion = (country: string): Observable<any> => {
    return this.apiService
    .getWithLocalCache<any[]>(`${this.URL}/region/country/${country}`);
  };

  getTown = (stateCode: string): Observable<any> => {
    return this.apiService
    .getWithLocalCache<any[]>(`${this.URL}/town/${stateCode}`);
  };

  getTownByCode = (townCode: string): Observable<any> => {
    return this.apiService
    .getWithLocalCache<ICodeDescription>(`${this.URL}/town/info/${townCode}`);
  };

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
