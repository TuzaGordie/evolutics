import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { IProductDesc } from '../Shared/models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  get baseURL() {
    return environment.apiBaseUrl + '/rest';
  }
  constructor(private apiService: ApiService) {}
  getProductDescByProdCode = (productCode) => {
    return this.apiService
      .get<IProductDesc[]>(`${this.baseURL}/product/desc/${productCode}`)
      .toPromise()
      .then((r) => (r?.length ? r[0].description : null));
  };
  getGenRatesCodeAndDescByCategory(cat: string): Observable<any> {
    return this.apiService.get(
      `${this.baseURL}/product/rate/general/code/desc/${cat}`
    );
  }

  getProductRateCat(cat: string): Observable<any> {
    return this.apiService.get(
      `${this.baseURL}/product/rate/cat/${cat}`
    )
  }

  getTaxRates(){
    return this.apiService.get(
      `${this.baseURL}/product/rate/tax/code/desc`
    )
  }
}
