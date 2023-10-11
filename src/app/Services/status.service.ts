import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICodeDescription } from '../Shared/models/index.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  baseURL = environment.apiBaseUrl;
  constructor(public apiService: ApiService) {}

  getPolicyStatuses = () => this.getStatuses('P');
  getStatuses = (code: string) => {
    return this.apiService.get<ICodeDescription[]>(
      this.baseURL + '/rest/status/code/description/' + code
    );
  };
}
