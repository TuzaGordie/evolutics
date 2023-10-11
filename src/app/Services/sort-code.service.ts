import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  ISortCodeSearchObj,
  ISortCodeSearchResponse,
} from '../Shared/models/sort-code.interface';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class SortCodeService {
  private baseURL = environment.apiBaseUrl;

  constructor(public apiService: ApiService) {}

  search(data: ISortCodeSearchObj) {
    return this.apiService.get<ISortCodeSearchResponse>(
      this.baseURL + '/rest/sort/codes/search',
      data
    );
  }
}
