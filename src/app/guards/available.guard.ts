import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchService } from '../components/search/search-extras/search.service';
import { AppService } from '../Services/app.service';
import { UserService } from '../Services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AvailableGuard implements CanActivateChild {
  constructor(
    public appS: AppService,
    public router: Router,
    public sS: SearchService
  ) {}
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._guard(route, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._guard(route, state);
  }

  private _guard(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (route.data.system) {
      this.appS.system = route.data.system;
      this.sS.setSystemMenuIndex(route.data.system);
      this.appS.setMetaTheme()
    }
    if (!environment.activeSystems?.length) return true;
    else if (
      environment.activeSystems.includes(route.data.system || this.appS.system)
    )
      return true;
    else {
      this.router.navigateByUrl(this.appS.getFirstAvailableSystem.appRoute.pub);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class IsAllowedGuard implements CanActivateChild, CanActivate {
  constructor(
    public appS: AppService,
    public router: Router,
    public uS: UserService,
    public searchS: SearchService
  ) {}
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._guard(route, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._guard(route, state);
  }

  private _guard(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // if (environment.production) return true;
    const menuItem = this.searchS.menuIndex?.find((x) =>
      location.pathname.startsWith(x.link)
    );
    // debugger
    if (
      !menuItem ||
      !menuItem?.link ||
      !!environment.userMenu?.userMenuConfigDetails?.find(
        (x) => x.slug == menuItem?.id
      )?.access
    )
      return true;
    this.router.navigate(['/no-access'],{skipLocationChange:true});
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class HomeModuleGuard implements CanActivateChild, CanActivate {
  constructor(public appS: AppService, public router: Router) {}
  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._guard(route, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._guard(route, state);
  }

  private _guard(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (state.url == '/')
      this.router.navigateByUrl(this.appS.getFirstAvailableSystem.appRoute.pub);
    return true;
  }
}
