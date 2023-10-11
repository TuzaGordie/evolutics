import { Type } from '@angular/core';
import { LoadChildrenCallback, Route, Routes } from '@angular/router';
import { EPageType } from '../Shared/models/index.model';
export namespace EVFunctions {
  export function extendRoute(
    route: Route,
    indexComponent?: Type<any>,
    indexLazyModule?: LoadChildrenCallback
  ) {
    const routes: Routes = [
      {
        path: '',
        data: {
          title: route.data?.title,
          type: EPageType.indexPage,
        },
        component: indexComponent,
        loadChildren: indexLazyModule,
      },
      {
        path: 'index',
        data: { title: route.data?.title, type: EPageType.indexPage },
        component: indexComponent,
        loadChildren: indexLazyModule,
      },
      {
        path: 'clone',
        data: {
          title: pageTitler(route.data?.title, 'Clone'),
          type: EPageType.clonePage,
        },
        component: route.component,
        loadChildren: route.loadChildren,
      },
      {
        path: 'create',
        data: {
          title: pageTitler(route.data?.title, 'Create'),
          type: EPageType.createPage,
        },
        component: route.component,
        loadChildren: route.loadChildren,
      },
      {
        path: 'edit',
        data: {
          title: pageTitler(route.data?.title, 'Edit'),
          type: EPageType.editPage,
        },
        component: route.component,
        loadChildren: route.loadChildren,
      },
      {
        path: 'show',
        data: {
          title: pageTitler(route.data?.title, 'Show'),
          type: EPageType.showPage,
        },
        component: route.component,
        loadChildren: route.loadChildren,
      },
    ];
    if (!indexComponent && !indexLazyModule) {
      routes.splice(0, 2);
    }
    return routes;
  }
  function pageTitler(title: string, infix: string) {
    if (!title) return '';
    if (!infix) return title;
    const split = title.split('/'),
      lastSplit = split.pop(),
      prefix = split.join('/');
    return (prefix ? prefix + ' / ' : ' ') + infix + ' ' + lastSplit;
  }
}
