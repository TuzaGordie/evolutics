import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { iif, Observable, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { ICodeDescription, ICodeTitle } from '../Shared/models/index.model';
import { environment } from 'src/environments/environment';
import { CacheService } from './cache/cache.service';
import { LoggerService } from '../other/logger/logger.service';
import { LocalCacheService } from './cache/local-cache.service';
export interface IResponse {
  message: string;
  result: any;
  status: 'success' | 'error' | 'failure';
  statusCode: 'SM000' | 'SM001' | 'SM002' | 'SM003';
}
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private showRoutes = 0;
  private get headers() {
    return {
      'Content-Type': 'application/json',
    };
  }
  private get fileHeaders() {
    return {
      enctype: 'multipart/form-data',
    };
  }
  retryCount = 0;
  constructor(
    public http: HttpClient,
    public cacheS: CacheService,
    public lCacheS: LocalCacheService
  ) {}

  private logRoutes(
    method: 'get' | 'post' | 'put' | 'delete',
    route,
    ...extras
  ) {
    if (this.showRoutes) {
      console.log(method, route, ...extras);
    }
  }
  private handleRequestError = (err: HttpErrorResponse) => {
    // debugger;
    return throwError(err.error.message);
  };

  //#region POST
  post<T = any>(route: string, body?, options?: any): Observable<T> {
    this.logRoutes('post', route, body);
    return this.http
      .post(
        encodeURI(route),
        body,
        options || {
          headers: new HttpHeaders(this.headers),
          responseType: 'json',
        }
      )
      .pipe(catchError(this.handleRequestError)) as Observable<any>;
  }
  postFile<T = any>(route: string, body: FormData) {
    return this.post<T>(route, body, {
      headers: new HttpHeaders(this.fileHeaders),
      responseType: 'json',
    });
  }
  postString(route: string, body?) {
    console.log('requestCount', ++environment.requestCount);
    return this.post<string>(route, body, {
      headers: new HttpHeaders({
        'Content-Type': 'text/plain',
      }),
      responseType: 'text',
    });
  }
  postStringWithLocalCache(route: string, body: string) {
    return new Observable<string>((res) => {
      const bdy = body?.trim();
      // debugger
      if (this.lCacheS.has(route + '_' + bdy)) {
        res.next(this.lCacheS.getItem<string>(route + '_' + bdy));
      }

      this.postString(route, bdy)
        .toPromise()
        .then((r) => {
          res.next(r);
          this.lCacheS.setItem(route + '_' + bdy, r);
          res.complete();
        })
        .catch((e) => {
          res.error(e);
        });
    });
  }
  //#endregion

  //#region GET
  get = <T = any>(
    route: string,
    parameters?: Object,
    options?: any
  ): Observable<T> => {
    this.logRoutes('get', route, parameters);
    return new Observable<T>((res) => {
      const query = route + this.getRequestParse(parameters);
      // if (this.cacheS.has(query)) {
      //   res.next(this.cacheS.getItem<T>(route));
      // }
      this.http
        .get(
          query,
          options || {
            headers: new HttpHeaders(this.headers),
            responseType: 'json',
          }
        )
        .pipe(
          retry(this.retryCount),
          tap((x) => (this.showRoutes ? console.log(x) : null)),
          map((res: any) => {
            if (Array.isArray(res) && res[0]?.code)
              return res.sort2('code', true);
            return res;
          }),
          catchError(this.handleRequestError)
        )
        .toPromise()
        .then((r) => {
          res.next(r);
          this.cacheS.setItem(query, r);
          res.complete();
        })
        .catch((err) => res.error(err));
    });
  };

  getCodes = <T = ICodeTitle & ICodeDescription>(route: string) =>
    this.get<T[]>(route).pipe(map((res) => this.sortCodes(res)));

  getText = (route: string, parameters?: Object) =>
    this.get<string>(route, parameters, {
      headers: new HttpHeaders(this.headers),
      responseType: 'text',
    });

  getWithLocalCache = <T = any>(
    route: string,
    parameters?: Object,
    options?: any
  ) => {
    return new Observable<T>((res) => {
      const query = route + this.getRequestParse(parameters);
      if (this.lCacheS.has(query)) {
        res.next(this.lCacheS.getItem<T>(route));
      }
      this.get(query, null, options)
        .toPromise()
        .then((r) => {
          // if (!this.cS.has(route))
          res.next(r);
          this.lCacheS.setItem(query, r);
          res.complete();
        });
    });
  };
  private getRequestParse(parameters?: Object) {
    if (!parameters) return '';
    const parameterList: string[] = [];
    for (const key in parameters) {
      if (parameters[key]?.toString()?.trim()) {
        parameterList.push(`${key}=${parameters[key]?.toString()?.trim()}`);
      }
    }
    return parameterList?.length ? '?' + parameterList.join('&') : '';
  }
  //#endregion

  //#region PUT
  put<T = any>(route: string, body?, options?: any): Observable<T> {
    this.logRoutes('put', route, body);
    return this.http
      .put(route, body, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        responseType: 'json',
      })
      .pipe(catchError(this.handleRequestError)) as Observable<any>;
  }
  //#endregion

  //#region DELETE
  delete = <T = any>(route: string, options?) => {
    this.logRoutes('delete', route);
    return this.http
      .delete<T>(
        route,
        options || {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
          responseType: 'json',
        }
      )
      .pipe(catchError(this.handleRequestError)) as Observable<any>;
  };
  deleteWithBody = <T = any>(route: string, body?: any, options?) => {
    this.logRoutes('delete', route);
    const req = new HttpRequest(
      'DELETE',
      route,
      body,
      options || {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        responseType: 'json',
      }
    );
    return this.http
      .request<T>(req)
      .pipe(catchError(this.handleRequestError)) as Observable<any>;
  };
  deleteText = (route: string) =>
    this.delete<string>(route, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text',
    });
  //#endregion

  sortCodes = <T>(data: T[]) => {
    return data?.sort2('code', true)?.sort2('code') as any as T[];
  };
}
