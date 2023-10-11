import { Inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { appRoutes } from '../configs/app-routes-configs/app-routes.config';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class FetcherService {
  key: string;
  appRoutes = appRoutes;
  readonly baseURL = environment.apiBaseUrl + '/rest/';
  apiBaseURL = environment.apiBaseUrl + '/rest/';
  constructor(public apiService: ApiService, @Inject(String) routeKey: string) {
    this.baseURL += routeKey;
  }
}
