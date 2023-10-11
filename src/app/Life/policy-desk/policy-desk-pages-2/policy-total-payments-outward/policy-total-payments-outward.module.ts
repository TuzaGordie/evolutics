import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyTotalPaymentsOutwardRoutingModule } from './policy-total-payments-outward-routing.module';
import { PolicyTotalPaymentsOutwardComponent } from './policy-total-payments-outward.component';
import { PdSharedModule } from '../../policy-desk-extras/pd-shared.module';
import { TablePlainModule } from '../../../../Shared/components/table-plain/table-plain.module';
import { CreatePaymentOutwardComponent } from './create-payment-outward/create-payment-outward.component';
import { PolicyLoanComponent } from './policy-loan/policy-loan.component';
import { RegisterNewClaimComponent } from './register-new-claim/register-new-claim.component';
import { BasicRegisterNewClaimComponent } from './register-new-claim/basic-register-new-claim/basic-register-new-claim.component';
import { DocumentRegisterNewClaimComponent } from './register-new-claim/document-register-new-claim/document-register-new-claim.component';
import { EstimateRegisterNewClaimComponent } from './register-new-claim/estimate-register-new-claim/estimate-register-new-claim.component';
import { AssignProviderComponent } from './register-new-claim/document-register-new-claim/assign-provider/assign-provider.component';
import { UtilityPipesModule } from 'src/app/Shared/pipes/utility.pipe'; 
import { AdjustClaimModalModule } from './adjust-claim-modal/adjust-claim-modal.module';
import { ViewClaimHistoryModalModule } from './view-claim-history-modal/view-claim-history-modal.module';
import { ChangeStatusModalModule } from 'src/app/Shared/components/change-status-modal/change-status-modal.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ChangeStatusModalComponent } from './change-status-modal/change-status-modal.component';
import { AddProviderModalComponent } from './add-provider-modal/add-provider-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FindProviderModalComponent } from './find-provider-modal/find-provider-modal.component';
import { HistoryModalComponent } from './history-modal/history-modal.component';
import { SetPayeeModalComponent } from './set-payee-modal/set-payee-modal.component';
import { ClientDeskPipesModule } from 'src/app/Life/client-desk/pipes/pipes.module';

@NgModule({
  declarations: [
    PolicyTotalPaymentsOutwardComponent,
    CreatePaymentOutwardComponent,
    PolicyLoanComponent,
    RegisterNewClaimComponent,
    BasicRegisterNewClaimComponent,
    DocumentRegisterNewClaimComponent,
    EstimateRegisterNewClaimComponent,
    AssignProviderComponent,
    ChangeStatusModalComponent,
    AddProviderModalComponent,
    FindProviderModalComponent,
    HistoryModalComponent,
    SetPayeeModalComponent,
  ],
  imports: [
    CommonModule,
    PolicyTotalPaymentsOutwardRoutingModule,
    TablePlainModule,
    PdSharedModule,
    UtilityPipesModule,
    AdjustClaimModalModule,
    ViewClaimHistoryModalModule,
    ChangeStatusModalModule,
    SharedModule,
    MatDialogModule,
    MatTooltipModule,
    ClientDeskPipesModule,
  ],
  exports: [
    CreatePaymentOutwardComponent,
    PolicyLoanComponent,
    RegisterNewClaimComponent,
    BasicRegisterNewClaimComponent,
    DocumentRegisterNewClaimComponent,
    EstimateRegisterNewClaimComponent,
    AssignProviderComponent,
  ],
})
export class PolicyTotalPaymentsOutwardModule {}
