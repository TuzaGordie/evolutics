import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClientService } from '../Services/client.service';

@Injectable({
  providedIn: 'root',
})
export class GetClientTypeResolver implements Resolve<string> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return new Promise<string>((resolve) => {
      const cn = route.queryParams.clientNo;
      const ct = route.queryParams.clientType;
      if (!ct) {
        this.clientS
          .getClientType(cn)
          .toPromise()
          .then((r) => {
            if (r) resolve(r);
          });
      } else {
        resolve(ct);
      }
      // return of(true);
    });
  }
  constructor(public clientS: ClientService) {}
}
