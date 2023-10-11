import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Log } from 'src/app/other/logger/logger.interface';
import { LoggerService } from 'src/app/other/logger/logger.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggerInterceptorService implements HttpInterceptor {
  constructor(public loggerS: LoggerService) {
    this.exemptList.forEach((x) => (x = x.toLowerCase()));
  }
  readonly exemptList = [
    environment.apiBaseUrl + '/rest/translation',
    environment.apiBaseUrl + '/rest/authentication',
  ];
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      !environment.debug || 
      this.exemptList.find((x) => req.url.startsWith(x) ||!environment.logReq)
    )
      return next.handle(req);
    try {
      let log: Log;
      if (req.method == 'POST' || req.method == 'PUT') {
        log = new Log(req.body, [], null, location.pathname, req.url);
      }
      return next.handle(req).pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse && log) {
              log.isSuccess = true;
              this.loggerS.pushLog(log);
            }
          },
          (e: HttpEvent<any>) => {
            // debugger;
            if (e instanceof HttpErrorResponse && log) {
              log.isSuccess = false;
              this.loggerS.pushLog(log);
            }
          }
        )
      );
    } catch (error) {
      return next.handle(req);
    }
  }
}
