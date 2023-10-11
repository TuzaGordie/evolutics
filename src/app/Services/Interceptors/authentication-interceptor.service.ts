import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiService } from '../api.service';

@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor {
  constructor(public router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      environment.authenticate &&
      req.url.startsWith(environment.apiBaseUrl)
    ) {
      if (req.url.includes('rest//rest')) debugger;
      const reqAuth = req.clone({
        url: req.url.includes('rest//rest')
          ? req.url.replace('rest//rest', 'rest')
          : req.url,
        headers: req.headers.set('Authorization', `${environment.token}`),
      });
      return next.handle(reqAuth).pipe(
        tap(
          (event: HttpEvent<any>) => {},
          (e: HttpEvent<any>) => {
            if (e instanceof HttpResponse && e.status == 401) {
              this.router.navigateByUrl('/auth/login');
            }
          }
        )
      );
    } else return next.handle(req);
  }
}
