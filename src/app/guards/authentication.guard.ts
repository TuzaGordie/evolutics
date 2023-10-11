import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../Authentication/auth-extras/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivateChild {
  constructor(public authS: AuthenticationService, public router: Router) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.guard();
  }
  canActivate(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.guard();
  }
  guard() {
    if (!environment.authenticate) return true;
    else if (this.authS.isLoggedin) {
      return true;
    } else { 
      this.router.navigate(['/auth/login'], { queryParams: { r: location.href.replace(location.origin,'') } });
      return false;
    }
  }
}
