import { EditPayoutComponent } from './view-payout/edit-payout/edit-payout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentDeskRoutingModule } from './payment-desk-routing.module';

import { AuthorizeClaimAdjustments } from './authorize-claim-adjustments/authorize-claim-adjustments.component';
import { AuthorizeCouponComponent } from './authorize-coupon/authorize-coupon.component';
import { AuthorizeCouponCreate } from './authorize-coupon/create/authorize-coupon-create.component';
import { AuthorizeCummissionAdjustmentsComponent } from './authorize-cummission-adjustments/authorize-cummission-adjustments.component';
import { AuthorizeInwardSuspenseComponent } from './authorize-inward-suspense/authorize-inward-suspense.component';
import { AuthorizePaymentOutwardComponent } from './authorize-payment-outward/authorize-payment-outward.component';
import { AuthorizePolicyAccountComponent } from './authorize-policy-account/authorize-policy-account.component';
import { PaymentAgentnoteComponent } from './clientinfo-buttons/agentnote/agentnote.component';
import { PaymentBusinessComponent } from './clientinfo-buttons/business/business.component';
import { PaymentPoliciesComponent } from './clientinfo-buttons/payment-policies/payment-policies.component';
import { PaymentPendingQuotesComponent } from './clientinfo-buttons/pending-quotes/pending-quotes.component';
import { PaymentRelationshipsComponent } from './clientinfo-buttons/relationships/relationships.component';
import { CreateCouponComponent } from './create-coupon/create-coupon.component';
import { PaymentIDScreenComponent } from './payment-idscreen/payment-idscreen.component';
import { PendingClaimsComponent } from './pending-claims/pending-claims.component';
import { ViewClientsComponent } from './pending-claims/view-client/view-client.component';
import { ViewProviderComponent } from './pending-claims/view-provider/view-provider.component';
import { PendingClaimsViewComponent } from './pending-claims/view/pending-claims-view.component';
import { PendingPaymentOutwardsComponent } from './pending-payment-outwards/pending-payment-outwards.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { ChangeStatusModalModule } from 'src/app/Shared/components/change-status-modal/change-status-modal.module';
import { PendingPaymentsComponent } from './clientinfo-buttons/pending-payments/pending-payments.component';
import { PayeeModalComponent } from './pending-claims/payee-modal/payee-modal.component';
import { AuthorizationModalComponent } from './pending-claims/authorization-modal/authorization-modal.component';
import { ClaimStatusModalComponent } from './pending-claims/claim-status-modal/claim-status-modal.component';
import { ViewClaimNotesComponent } from './pending-claims/view-claim-notes/view-claim-notes.component';
import { MatDialogModule } from '@angular/material/dialog';
import { QuoteAuthorizationComponent } from './quote-authorization/quote-authorization.component';
import { PendingResinsuranceDecisionComponent } from './pending-resinsurance-decision/pending-resinsurance-decision.component';
import { ReinsuranceAuthorizationComponent } from './reinsurance-authorization/reinsurance-authorization.component';
import { FindCouponComponent } from './find-coupon/find-coupon.component';
import { FindExpenseComponent } from './find-expense/find-expense.component';

@NgModule({
  declarations: [
    AuthorizeClaimAdjustments,
    AuthorizeCouponComponent,
    AuthorizeCouponCreate,
    AuthorizeCummissionAdjustmentsComponent,
    AuthorizeInwardSuspenseComponent,
    AuthorizePaymentOutwardComponent,
    AuthorizePolicyAccountComponent,
    CreateCouponComponent,
    PaymentAgentnoteComponent,
    PaymentBusinessComponent,
    PaymentIDScreenComponent,
    PaymentPendingQuotesComponent,
    PaymentPoliciesComponent,
    PaymentRelationshipsComponent,
    PendingClaimsComponent,
    PendingClaimsViewComponent,
    PendingPaymentsComponent,
    PendingPaymentOutwardsComponent,
    ViewClientsComponent,
    ViewProviderComponent,
    PayeeModalComponent,
    AuthorizationModalComponent,
    ClaimStatusModalComponent,
    ViewClaimNotesComponent,
    EditPayoutComponent,
    QuoteAuthorizationComponent,
    PendingResinsuranceDecisionComponent,
    ReinsuranceAuthorizationComponent,
    FindCouponComponent,
    FindExpenseComponent,
  ],
  imports: [
    CommonModule,
    PaymentDeskRoutingModule,
    SharedModule,
    MatDialogModule,
    ComponentsModule,ChangeStatusModalModule
  ],
})
export class PaymentDeskModule {}
