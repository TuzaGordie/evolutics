import { Route } from '@angular/router';

export const PROCESS_ACTIONS_REDIRECTING_ROUTES: Route[] = [
  {
    path: 'index-process-actions',
    redirectTo: 'process-actions/index',
    pathMatch: 'full',
  },
  {
    path: 'start-process-actions',
    redirectTo: 'process-actions/start',
    pathMatch: 'full',
  },
  {
    path: 'create-process-actions',
    redirectTo: 'process-actions/create',
    pathMatch: 'full',
  },
];

export const PROCESS_SETUP_REDIRECTING_ROUTES: Route[] = [
  {
    path: 'index-process-setup',
    redirectTo: 'process-setup/index',
    pathMatch: 'full',
  },
  {
    path: 'start-process-setup',
    redirectTo: 'process-setup/start',
    pathMatch: 'full',
  },
  {
    path: 'create-process-setup',
    redirectTo: 'process-setup/create',
    pathMatch: 'full',
  },
];

export const STATUS_REDIRECTING_ROUTES: Route[] = [
  {
    path: 'claim-create',
    redirectTo: 'claim/create',
    pathMatch: 'full',
  },
  {
    path: 'claim-index',
    redirectTo: 'claim',
    pathMatch: 'full',
  },
  {
    path: 'payment-create',
    redirectTo: 'payment/create',
    pathMatch: 'full',
  },
  {
    path: 'payment-index',
    redirectTo: 'payment',
    pathMatch: 'full',
  },
  {
    path: 'policy-create',
    redirectTo: 'policy/create',
    pathMatch: 'full',
  },
  {
    path: 'policy-show',
    redirectTo: 'policy/show',
    pathMatch: 'full',
  },
  {
    path: 'policy-index',
    redirectTo: 'policy',
    pathMatch: 'full',
  },
];



export const REQUIREMENT_REDIRECTING_ROUTES: Route[] = [
  {
    path: 'claim-create',
    redirectTo: 'claim/create',
    pathMatch: 'full',
  },
  {
    path: 'claim',
    redirectTo: 'requirement/claims',
    pathMatch: 'full',
  },
  {
    path: 'claim-show',
    redirectTo: 'requirements/claims/show',
    pathMatch: 'full',
  },
  {
    path: 'new-business-create',
    redirectTo: 'requirements/new-business/create',
    pathMatch: 'full',
  },
  {
    path: 'new-business',
    redirectTo: 'requirements/new-business',
    pathMatch: 'full',
  },
  {
    path: 'new-business-show',
    redirectTo: 'requirements/new-business/show',
    pathMatch: 'full',
  },
];
