import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { appRoutes } from '../configs/app-routes-configs/app-routes.config';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  appRoutes = appRoutes;
  constructor(public router: Router) {}
  go = (value: string, extra?: NavigationExtras) => {
    this.router.navigate([value], extra);
  };
  routeParams1 = (route: string, param1: string, title?: string): string => {
    return route ? route + '/' + param1 + (this.routeNamer(title) || '') : null;
  };
  routeParams2 = (
    route: string,
    param1: string,
    param2: string,
    title?: string
  ): string => {
    return route + '/' + param1 + '/' + param2 + (this.routeNamer(title) || '');
  };
  routeParams3 = (
    route: string,
    param1: string,
    param2: string,
    param3: string,
    title?: string
  ): string => {
    return (
      route +
      '/' +
      param1 +
      '/' +
      param2 +
      '/' +
      param3 +
      (this.routeNamer(title) || '')
    );
  };
  private routeNamer = (title: string) => {
    return title
      ? '/' +
          title
            .substr(0, 30)
            .unChar('/')
            .trim()
            .toLowerCase()
            .split(' ')
            .filter((x) => x)
            .join('-')
      : '';
  };
}
