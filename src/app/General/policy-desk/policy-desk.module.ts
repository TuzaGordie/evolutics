import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyDeskRoutingModule } from './policy-desk-routing.module';
import { GeneralViewPolicyGBComponent } from './view-policy-gb/view-policy-gb.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { TablePlainModule } from 'src/app/Shared/components/table-plain/table-plain.module'; 
import { ViewPolicyTotalPaymentRecievedGBComponent } from './buttons/view-policy-total-payment-recieved-gb/view-policy-total-payment-recieved-gb.component';
import { ViewPolicyButttonAccountGBComponent } from './buttons/view-policy-buttton-account-gb/view-policy-buttton-account-gb.component';
import { ViewPolicyButttonCommissionsGBComponent } from './buttons/view-policy-buttton-commissions-gb/view-policy-buttton-commissions-gb.component';
import { ViewPolicyButttonCreditNoteGBComponent } from './buttons/view-policy-buttton-credit-note-gb/view-policy-buttton-credit-note-gb.component';
import { ViewPolicyButttonDocumentsGBComponent } from './buttons/view-policy-buttton-documents-gb/view-policy-buttton-documents-gb.component';
import { ViewPolicyButttonEndorsementsGBComponent } from './buttons/view-policy-buttton-endorsements-gb/view-policy-buttton-endorsements-gb.component';
import { ViewPolicyButttonFutureActionsGBComponent } from './buttons/view-policy-buttton-future-actions-gb/view-policy-buttton-future-actions-gb.component';
import { ViewPolicyButttonNoOfAssetsGBComponent } from './buttons/view-policy-buttton-no-of-assets-gb/view-policy-buttton-no-of-assets-gb.component';
import { ViewPolicyButttonPaymentOutwardGBComponent } from './buttons/view-policy-buttton-payment-outward-gb/view-policy-buttton-payment-outward-gb.component';
import { ViewPolicyButttonPricingGBComponent } from './buttons/view-policy-buttton-pricing-gb/view-policy-buttton-pricing-gb.component';
import { ViewPolicyButttonUndercoverSARGBComponent } from './buttons/view-policy-buttton-undercover-sargb/view-policy-buttton-undercover-sargb.component';
import { ViewPolicyButttonUnderwritingGBComponent } from './buttons/view-policy-buttton-underwriting-gb/view-policy-buttton-underwriting-gb.component';
import { ViewPolicyButttonWorkflowsGBComponent } from './buttons/view-policy-buttton-workflows-gb/view-policy-buttton-workflows-gb.component';
import { ViewPolicyPerilGBComponent } from './buttons/view-policy-peril-gb/view-policy-peril-gb.component';
import { ViewPolicyRelationshipsGBComponent } from './buttons/view-policy-relationships-gb/view-policy-relationships-gb.component';

@NgModule({
  declarations: [
    GeneralViewPolicyGBComponent,
    ViewPolicyTotalPaymentRecievedGBComponent,
    ViewPolicyRelationshipsGBComponent,
    ViewPolicyPerilGBComponent,
    ViewPolicyButttonWorkflowsGBComponent,
    ViewPolicyButttonUnderwritingGBComponent,
    ViewPolicyButttonUndercoverSARGBComponent,
    ViewPolicyButttonPricingGBComponent,
    ViewPolicyButttonPaymentOutwardGBComponent,
    ViewPolicyButttonNoOfAssetsGBComponent,
    ViewPolicyButttonFutureActionsGBComponent,
    ViewPolicyButttonEndorsementsGBComponent,
    ViewPolicyButttonDocumentsGBComponent,
    ViewPolicyButttonCreditNoteGBComponent,
    ViewPolicyButttonCommissionsGBComponent,
    ViewPolicyButttonAccountGBComponent
  ],
  imports: [
    CommonModule,
    PolicyDeskRoutingModule,
    SharedModule,
    ComponentsModule,
    TablePlainModule,
  ],
})
export class PolicyDeskModule {}
