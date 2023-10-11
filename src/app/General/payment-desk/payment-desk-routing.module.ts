import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { appRoutes } from 'src/app/configs/app-routes-configs/app-routes.config';

// import { AuthorizeClaimAdjustments } from 'src/app/Life/payment-desk/authorize-claim-adjustments/authorize-claim-adjustments.component';
// import { AuthorizeCouponComponent } from 'src/app/Life/payment-desk/authorize-coupon/authorize-coupon.component';
// import { AuthorizeCouponCreate } from 'src/app/Life/payment-desk/authorize-coupon/create/authorize-coupon-create.component';
// import { AuthorizeCummissionAdjustmentsComponent } from 'src/app/Life/payment-desk/authorize-cummission-adjustments/authorize-cummission-adjustments.component';
// import { AuthorizeInwardSuspenseComponent } from 'src/app/Life/payment-desk/authorize-inward-suspense/authorize-inward-suspense.component';
// import { AuthorizePaymentOutwardComponent } from 'src/app/Life/payment-desk/authorize-payment-outward/authorize-payment-outward.component';
// import { AuthorizePolicyAccountComponent } from 'src/app/Life/payment-desk/authorize-policy-account/authorize-policy-account.component';
// import { PaymentAgentnoteComponent } from 'src/app/Life/payment-desk/clientinfo-buttons/agentnote/agentnote.component';
// import { PaymentBusinessComponent } from 'src/app/Life/payment-desk/clientinfo-buttons/business/business.component';
// import { PaymentPoliciesComponent } from 'src/app/Life/payment-desk/clientinfo-buttons/payment-policies/payment-policies.component';
// import { PaymentPendingQuotesComponent } from 'src/app/Life/payment-desk/clientinfo-buttons/pending-quotes/pending-quotes.component';
// import { PaymentRelationshipsComponent } from 'src/app/Life/payment-desk/clientinfo-buttons/relationships/relationships.component';
// import { CreateCouponComponent } from 'src/app/Life/payment-desk/create-coupon/create-coupon.component';
// import { PaymentIDScreenComponent } from 'src/app/Life/payment-desk/payment-idscreen/payment-idscreen.component';
// import { PendingClaimsComponent } from 'src/app/Life/payment-desk/pending-claims/pending-claims.component';
// import { ViewClientsComponent } from 'src/app/Life/payment-desk/pending-claims/view-client/view-client.component';
// import { ViewProviderComponent } from 'src/app/Life/payment-desk/pending-claims/view-provider/view-provider.component';
// import { PendingClaimsViewComponent } from 'src/app/Life/payment-desk/pending-claims/view/pending-claims-view.component';
// import { PendingPaymentOutwardsComponent } from 'src/app/Life/payment-desk/pending-payment-outwards/pending-payment-outwards.component';

const routes: Routes = [
  {
    path: '',
    loadChildren:()=>import('../../Life/payment-desk/payment-desk.module').then(m=>m.PaymentDeskModule), 
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentDeskRoutingModule {}
