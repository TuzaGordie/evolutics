import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { STATUS_REDIRECTING_ROUTES } from '../redirects';

const ROUTES = [
  {
    path: 'claim',
    loadChildren: () =>
      import('./claim/claim.module').then((m) => m.ClaimModule),
  },

  {
    path: 'payment',
    loadChildren: () =>
      import('./payment/payment.module').then((m) => m.PaymentModule),
  },

  {
    path: 'policy',
    loadChildren: () =>
      import('./policy/policy.module').then((m) => m.PolicyModule),
  },
  ...STATUS_REDIRECTING_ROUTES,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
})
export class StatusModule {}
