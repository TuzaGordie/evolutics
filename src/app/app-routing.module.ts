import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AssetsHomeComponent } from './Assets/assets-home/assets-home.component';

import { appRoutes } from './configs/app-routes-configs/app-routes.config';
import { AuthenticationGuard } from './guards/authentication.guard';

import {
  AvailableGuard,
  HomeModuleGuard,
  IsAllowedGuard,
} from './guards/available.guard';
import { ParameterGuard } from './guards/index.guard';
import { DashboardCaseComponent } from './Layout/dashboard-case/dashboard-case.component';
import { ModalsComponent } from './other/modals/modals.component';
import { ESystem } from './Shared/models/index.model';
import { PageNotFoundComponent } from './other/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [HomeModuleGuard, IsAllowedGuard, ParameterGuard],
    children: [
      {
        path: 'login',
        redirectTo: appRoutes.auth.login.pub,
      },

      {
        path: 'modals',
        component: ModalsComponent,
      },
      {
        path: appRoutes.auth._,
        loadChildren: () =>
          import('./Authentication/auth.module').then((m) => m.AuthModule),
      },
      // {
      //   path: 'property-asset',
      //   component: PropAssetsComponent,
      // },
      // { path: 'receipting-overview', component: OverviewComponent },

      {
        path: '',
        canActivate: [AvailableGuard],
        canActivateChild: [AuthenticationGuard],
        component: DashboardCaseComponent,
        children: [
          {
            path: appRoutes.act._,
            canActivate: [AvailableGuard],
            data: {
              color: 'bg-actuarial',
              system: ESystem.actuarial,
              title: 'Actuarial',
            },
            loadChildren: () =>
              import('./Actuarial/actuarial.module').then(
                (m) => m.ActuarialModule
              ),
          },
          {
            path: appRoutes.analytics._,
            canActivate: [AvailableGuard],
            data: {
              color: 'bg-analytics',
              system: ESystem.analytics,
              title: 'Analytics',
            },
            loadChildren: () =>
              import('./Analytics/analytics.module').then(
                (m) => m.AnalyticsModule
              ),
          },
          {
            path: appRoutes.assets._,
            canActivate: [AvailableGuard],
            data: {
              color: 'bg-asset',
              system: ESystem.assets,
              title: 'Assets',
            },
            children: [
              {
                path: '',
                pathMatch: 'full',
                component: AssetsHomeComponent,
                data: { color: 'bg-assets' },
              },
            ],
          },
          {
            path: appRoutes.cash._,
            canActivate: [AvailableGuard],
            data: {
              color: 'bg-cash',
              type: 'cash',
              system: ESystem.cash,
              title: 'Cash',
            },
            loadChildren: () =>
              import('./Cash/cash.module').then((m) => m.CashModule),
          },
          {
            path: appRoutes.crm._,
            canActivate: [AvailableGuard],
            data: { color: 'bg-crm', system: ESystem.crms, title: 'CRM' },
            loadChildren: () =>
              import('./CRMS/crms.module').then((m) => m.CRMSModule),
          },
          {
            path: appRoutes.dbcloner._,
            canActivate: [AvailableGuard],
            data: {
              color: 'bg-dbcloner',
              system: ESystem.dBCloner,
              // type: 'dbcloner',
              title: 'DBCloner',
            },
            loadChildren: () =>
              import('./Dbcloner/dbcloner.module').then(
                (m) => m.DbclonerModule
              ),
          },
          {
            path: appRoutes.document._,
            canActivate: [AvailableGuard],
            data: {
              color: 'bg-document',
              system: ESystem.document,
              title: 'Document',
            },
            loadChildren: () =>
              import('./Document/document.module').then(
                (m) => m.DocumentModule
              ),
          },
          {
            path: appRoutes.finance._,
            canActivate: [AvailableGuard],
            data: {
              color: 'bg-finance',
              system: ESystem.finance,
              title: 'Finance',
            },
            loadChildren: () =>
              import('./Finance/finance.module').then((m) => m.FinanceModule),
          },
          {
            path: appRoutes.general._,
            canActivate: [AvailableGuard],
            data: {
              color: 'bg-general',
              system: ESystem.general,
              title: 'General',
            },
            loadChildren: () =>
              import('./General/general.module').then((m) => m.GeneralModule),
          },
          {
            path: appRoutes.health._,
            canActivate: [AvailableGuard],
            data: {
              color: 'bg-health',
              system: ESystem.health,
              title: 'Health',
            },
            loadChildren: () =>
              import('./Health/health.module').then((m) => m.HealthModule),
          },
          {
            path: appRoutes.human._,
            canActivate: [AvailableGuard],
            data: {
              color: 'bg-primary',
              type: 'human',
              system: ESystem.human,
              title: 'Human',
            },
            loadChildren: () =>
              import('./human/human.module').then((m) => m.HumanModule),
          },
          {
            path: appRoutes.life._,
            canActivate: [AvailableGuard],
            data: {
              color: 'bg-primary',
              type: 'life',
              system: ESystem.life,
              title: 'Life',
            },
            loadChildren: () =>
              import('./Life/life.module').then((m) => m.LifeModule),
          },
        ],
      },
    ],
  },
  {
    path: 'logs',
    loadChildren: () =>
      import('./other/logger/logger.module').then((m) => m.LoggerModule),
  },
  {
    path: 'no-access',
    component: PageNotFoundComponent,
    data: {
      color: 'bg-primary',
      config: {
        status: '401',
        message: 'You do not have access to this page.',
      },
    },
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { color: 'bg-primary' },
  },
];
console.log('routes',routes)

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
