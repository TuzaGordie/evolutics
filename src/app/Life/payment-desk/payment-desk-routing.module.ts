import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthorizeClaimAdjustments} from './authorize-claim-adjustments/authorize-claim-adjustments.component';
import {AuthorizeCouponComponent} from './authorize-coupon/authorize-coupon.component';
import {AuthorizeCouponCreate} from './authorize-coupon/create/authorize-coupon-create.component';
import {
  AuthorizeCummissionAdjustmentsComponent
} from './authorize-cummission-adjustments/authorize-cummission-adjustments.component';
import {AuthorizeInwardSuspenseComponent} from './authorize-inward-suspense/authorize-inward-suspense.component';
import {AuthorizePaymentOutwardComponent} from './authorize-payment-outward/authorize-payment-outward.component';
import {AuthorizePolicyAccountComponent} from './authorize-policy-account/authorize-policy-account.component';
import {PaymentAgentnoteComponent} from './clientinfo-buttons/agentnote/agentnote.component';
import {PaymentBusinessComponent} from './clientinfo-buttons/business/business.component';
import {PaymentPoliciesComponent} from './clientinfo-buttons/payment-policies/payment-policies.component';
import {PaymentPendingQuotesComponent} from './clientinfo-buttons/pending-quotes/pending-quotes.component';
import {PaymentRelationshipsComponent} from './clientinfo-buttons/relationships/relationships.component';
import {CreateCouponComponent} from './create-coupon/create-coupon.component';
import {PaymentIDScreenComponent} from './payment-idscreen/payment-idscreen.component';
import {PendingClaimsComponent} from './pending-claims/pending-claims.component';
import {ViewClientsComponent} from './pending-claims/view-client/view-client.component';
import {ViewProviderComponent} from './pending-claims/view-provider/view-provider.component';
import {PendingClaimsViewComponent} from './pending-claims/view/pending-claims-view.component';
import {PendingPaymentOutwardsComponent} from './pending-payment-outwards/pending-payment-outwards.component';
import {appRoutes} from 'src/app/configs/app-routes-configs/app-routes.config';
import {ViewClaimNotesComponent} from './pending-claims/view-claim-notes/view-claim-notes.component';
import {QuoteAuthorizationComponent} from "./quote-authorization/quote-authorization.component";
import {
  PendingResinsuranceDecisionComponent
} from "./pending-resinsurance-decision/pending-resinsurance-decision.component";
import {ReinsuranceAuthorizationComponent} from "./reinsurance-authorization/reinsurance-authorization.component";
import {FindCouponComponent} from './find-coupon/find-coupon.component';
import {FindExpenseComponent} from "./find-expense/find-expense.component";
import {DvAuthorizationComponent} from "./dv-authorization/dv-authorization.component";

const routes: Routes = [
  {
    path: appRoutes.life.payment.agentNote._,
    component: PaymentAgentnoteComponent,
    data: {title: 'View Client'},
  },
  {
    path: appRoutes.life.payment.AuthorizeClaimAdjustments._,
    component: AuthorizeClaimAdjustments,
    data: {title: 'Payment / Authorize Claim Adjustments'},
  },
  {
    path: appRoutes.life.payment.authorizeCouponCreate._,
    component: AuthorizeCouponCreate,
    data: {title: 'Payment / Authorize Coupon'},
  },
  {
    path: appRoutes.life.payment.AuthorizeCoupon._,
    component: AuthorizeCouponComponent,
    data: {title: 'Payment / Authorize Coupon'},
  },
  {
    path: appRoutes.life.payment.AuthorizeCommissionAdjustments._,
    component: AuthorizeCummissionAdjustmentsComponent,
    data: {title: 'Payment / Authorize Commission Adjustments'},
  },
  {
    path: appRoutes.life.payment.AuthorizeInwardSuspenseSwitch._,
    component: AuthorizeInwardSuspenseComponent,
    data: {title: 'Payment / Authorize Inward Suspense Switch'},
  },
  {
    path: appRoutes.life.payment.AuthorizePaymentOutward._,
    component: AuthorizePaymentOutwardComponent,
    data: {title: 'Payment / Authorize Payment Outwards'},
  },
  {
    path: appRoutes.life.payment.AuthorizePolicyAccount._,
    component: AuthorizePolicyAccountComponent,
    data: {title: 'Payment / Authorize Policy Account'},
  },
  {
    path: 'business',
    component: PaymentBusinessComponent,
    data: {title: 'View Client'},
  },
  {
    path: appRoutes.life.payment.CreateCoupon._,
    component: CreateCouponComponent,
    data: {title: 'Payment / Create Coupon'},
  },
  {
    path: 'payment-id',
    component: PaymentIDScreenComponent,
    data: {title: 'Payment / Payment ID'},
  },
  {
    path: 'payment-policies',
    component: PaymentPoliciesComponent,
    data: {title: 'View Client'},
  },
  {
    path: 'pending-claims-view',
    component: PendingClaimsViewComponent,
    data: {title: 'Pending Claims'},
  },
  {
    path: appRoutes.life.payment.PendingClaims._,
    component: PendingClaimsComponent,
    data: {title: 'Payment / Pending Claims'},
  },
  {
    path: appRoutes.life.payment.PendingPaymentOutwards._,
    component: PendingPaymentOutwardsComponent,
    data: {title: 'Payment / Pending Payment Outwards'},
  },
  {
    path: 'pendingquotes',
    component: PaymentPendingQuotesComponent,
    data: {title: 'View Client'},
  },
  {
    path: 'quote-authorization',
    component: QuoteAuthorizationComponent,
    data: {title: 'Payment / Quote Authorizaion'},
  },
  {
    path: 'find-coupon',
    component: FindCouponComponent,
    data: {title: 'Payment / Find Coupon'},
  },
  {
    path: 'find-expense',
    component: FindExpenseComponent,
    data: {title: 'Payment / Find Expense'},
  },
  {
    path: 'pending-reinsurance-decisions',
    component: PendingResinsuranceDecisionComponent,
    data: {title: 'Payment / Pending Reinsurance Decision'},
  },
  {
    path: 'reinsurance-authorizations',
    component: ReinsuranceAuthorizationComponent,
    data: {title: 'Payment / Reinsurance Authorizations'},
  },
  {
    path: 'dv-authorizations',
    component: DvAuthorizationComponent,
    data: {title: 'Payment / DV Authorizations'},
  },
  {
    path: 'relationships',
    component: PaymentRelationshipsComponent,
    data: {title: 'View Client'},
  },
  {
    path: 'view-client',
    component: ViewClientsComponent,
    data: {title: 'View Client'},
  },
  {
    path: 'view-provider',
    component: ViewProviderComponent,
    data: {title: 'View Provider'},
  },
  {
    path: 'view-payout',
    data: {title: 'View Payout'},
    loadChildren: () =>
      import('./view-payout/view-payout.module').then(
        (m) => m.ViewPayoutModule
      ),
  },
  {
    path: 'view-claim',
    loadChildren: () =>
      import('./pending-claims/view-claim/view-claim.module').then(
        (m) => m.ViewClaimModule
      ),
    data: {title: 'View Claim'},
  },
  // {
  //   path: 'notes',
  //   component: ViewClaimNotesComponent,
  //   data: { title: 'View Claim / Notes' },
  // },
  {
    path: 'notes',
    data: {title: 'Notes'},
    loadChildren: () =>
      import('../../Reusables/reusable-pages/notes/notes.module').then(
        (m) => m.NotesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentDeskRoutingModule {
}
