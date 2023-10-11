import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadImageModule } from 'src/app/Shared/components/upload-image/upload-image.module';
import { LifeClientDeskRoutingModule } from './client-desk-routing.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../Shared/components/components.module';
import { MatDialogModule } from '@angular/material/dialog';
import { PDService } from '../policy-desk/policy-desk-extras/policy-desk.service';
import { ChartsModule } from 'ng2-charts';

import { AdjustClaimComponent } from './adjust-claim/adjust-claim.component';
import { ClientBusinessComponent } from './clientinfo-buttons/business/business.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { ClientAssignProviderComponent } from './register-new-claim/client-document-register-new-claim/client-assign-provider/client-assign-provider.component';
import { ClientBasicRegisterNewClaimComponent } from './register-new-claim/client-basic-register-new-claim/client-basic-register-new-claim.component';
import { ClientDocumentRegisterNewClaimComponent } from './register-new-claim/client-document-register-new-claim/client-document-register-new-claim.component';
import { ClientEstimateRegisterNewClaimComponent } from './register-new-claim/client-estimate-register-new-claim/client-estimate-register-new-claim.component';
import { ClientnoteComponent } from './clientnote/clientnote.component';
import { ClientOverviewComponent } from './client-overview/client-overview.component';
import { ClientProviderIndexComponent } from './client-provider/client-provider-index/client-provider-index.component';
import { ClientRegisterNewClaimComponent } from './register-new-claim/register-new-claim.component';
import { ClientSearchComponent } from './client-search/client-search.component';
import { CreateNewProviderComponent } from './client-provider/client-provider-create/client-provider-create.component';
import { ClientEndorsementsComponent } from './clientinfo-buttons/endorsements/endorsements.component';
import { FindClientComponent } from './find-client/find-client.component';
import { FindProviderComponent } from './find-provider/find-provider.component';
import { ClientPendingPaymentsComponent } from './clientinfo-buttons/pending-payments/pending-payments.component';
import { ClientPendingQuotesComponent } from './clientinfo-buttons/pending-quotes/pending-quotes.component';
import { PoliciesComponent } from './clientinfo-buttons/policies/policies.component';
import { RelationshipsComponent } from './clientinfo-buttons/relationships/relationships.component';
import { ClientUnderwritingEventsComponent } from './clientinfo-buttons/underwriting-events/underwriting-events.component';
import { ClientWebLoginComponent } from './clientinfo-buttons/web-login/web-login.component';
import { ClientWorkflowsComponent } from './clientinfo-buttons/workflows/workflows.component';
import { CreateCorporateClientModule } from './create-corporate-client/create-corporate-client.module';
import { CreateIndividualClientModule } from './create-individual-client/create-individual-client.module';
import { LifeClientDeskWebUserCreateComponent } from './web-user/life-client-desk-web-user-create/life-client-desk-web-user-create.component';
import { LifeClientDeskWebUserFindComponent } from './web-user/life-client-desk-web-user-find/life-client-desk-web-user-find.component';
import { PaymentInfoModule } from '../agent-desk/new-individual-agent/payment-info/payment-info.module';
import { ClientDeskPipesModule } from './pipes/pipes.module';
import { ClientProviderTarrifComponent } from './client-provider/client-provider-tarrif/client-provider-tarrif.component';
import { ClientProviderProductMappedComponent } from './client-provider/client-provider-product-mapped/client-provider-product-mapped.component';
import { ClientProviderAccountComponent } from './client-provider/client-provider-account/client-provider-account.component';
import { ClientProviderPendingPaymentComponent } from './client-provider/client-provider-pending-payment/client-provider-pending-payment.component';
import { ClientProviderPayeeComponent } from './client-provider/client-provider-payee/client-provider-payee.component';
import { ClientProviderLicenseComponent } from './client-provider/client-provider-license/client-provider-license.component';
import { ClientProviderBranchesComponent } from './client-provider/client-provider-branches/client-provider-branches.component';
import { ClientProviderContactPersonComponent } from './client-provider/client-provider-contact-person/client-provider-contact-person.component';
import { ClientNotesListComponent } from './client-notes/client-notes.component';
import { ViewClientCompsModule } from './client-desk-comps/view-client-comps/view-client-comps.module';
import { ClientTableViewComponent } from './client-overview/client-table-view/client-table-view.component';
import { MatMenuModule } from '@angular/material/menu';
import { TablePlainModule } from 'src/app/Shared/components/table-plain/table-plain.module';
import { FindItemModule } from 'src/app/Reusables/reusable-comps/find-item/find-item.module';
/* import { ViewClientCorporateComponent } from './view-client-corporate/view-client-corporate.component'; */

@NgModule({
  declarations: [
    AdjustClaimComponent,
    ChangeStatusComponent,
    ClientAssignProviderComponent,
    ClientBasicRegisterNewClaimComponent,
    ClientBusinessComponent,
    ClientDocumentRegisterNewClaimComponent,
    ClientEndorsementsComponent,
    ClientEstimateRegisterNewClaimComponent,
    ClientnoteComponent,
    ClientNotesListComponent,
    ClientOverviewComponent,
    ClientPendingPaymentsComponent,
    ClientPendingQuotesComponent,
    ClientProviderAccountComponent,
    ClientProviderBranchesComponent,
    ClientProviderContactPersonComponent,
    ClientProviderIndexComponent,
    ClientProviderLicenseComponent,
    ClientProviderPayeeComponent,
    ClientProviderPendingPaymentComponent,
    ClientProviderProductMappedComponent,
    ClientProviderTarrifComponent,
    ClientRegisterNewClaimComponent,
    ClientSearchComponent,
    ClientTableViewComponent,
    ClientUnderwritingEventsComponent,
    ClientWebLoginComponent,
    ClientWorkflowsComponent,
    CreateNewProviderComponent,
    FindClientComponent,
    FindProviderComponent,
    LifeClientDeskWebUserCreateComponent,
    LifeClientDeskWebUserFindComponent,
    PoliciesComponent,
    RelationshipsComponent,
    /* ViewClientCorporateComponent, */
  ],
  imports: [
    ChartsModule,
    ClientDeskPipesModule,
    CommonModule,
    ComponentsModule,
    CreateCorporateClientModule,
    CreateIndividualClientModule,
    LifeClientDeskRoutingModule,
    MatDialogModule,
    MatDialogModule,
    MatMenuModule,
    PaymentInfoModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    TablePlainModule,
    UploadImageModule,
    ViewClientCompsModule,
    FindItemModule,
  ],
  providers: [PDService],
})
export class LifeClientDeskModule {}
