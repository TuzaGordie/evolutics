import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CRMSFindClientComponent } from './find-client/c-r-m-s-find-client.component';
import { CRMSAllformsComponent } from './form2/allforms/crm-allforms.component';
import { CRMSCommonComponent } from './form/common/common.component';
import { CRMSClientSearchComponent } from './client-search/client-search.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CRMSViewClientComponent } from './view-client/c-r-m-s-view-client.component';
import { CRMSEndorsementsComponent } from './clientinfo-buttons/endorsements/endorsements.component';
import { CRMSDocumentsComponent } from './clientinfo-buttons/documents/documents.component';
import { CRMSWorkflowsComponent } from './clientinfo-buttons/workflows/workflows.component';
import { CRMSWebLoginComponent } from './clientinfo-buttons/web-login/web-login.component';
import { CRMSUnderwritingEventsComponent } from './clientinfo-buttons/underwriting-events/underwriting-events.component';
import { CRMSPoliciesComponent } from './clientinfo-buttons/policies/policies.component';
import { CRMSRelationshipsComponent } from './clientinfo-buttons/relationships/relationships.component';
import { CRMSBusinessComponent } from './clientinfo-buttons/business/business.component';
import { CRMSPendingQuotesComponent } from './clientinfo-buttons/pending-quotes/pending-quotes.component';
import { CRMSPendingPaymentsComponent } from './clientinfo-buttons/pending-payments/pending-payments.component';
import { CRMSClientnoteComponent } from './clientnote/clientnote.component';
import { CRMSClientProviderIndexComponent } from './client-provider/client-provider-index/client-provider-index.component';
import { CRMSCreateNewProviderComponent } from './client-provider/client-provider-create/client-provider-create.component';
import {ComponentsModule} from "../../../Shared/components/components.module";
import { ClientCRMSOverviewComponent } from './client-crms-overview/client-crms-overview.component';




@NgModule({
  declarations: [
    CRMSAllformsComponent,
    CRMSCommonComponent,
    CRMSFindClientComponent,
    CRMSClientSearchComponent,
    CRMSViewClientComponent,
    CRMSEndorsementsComponent,
    CRMSDocumentsComponent,
    CRMSWorkflowsComponent,
    CRMSWebLoginComponent,
    CRMSUnderwritingEventsComponent,
    CRMSPoliciesComponent,
    CRMSRelationshipsComponent,
    CRMSBusinessComponent,
    CRMSPendingQuotesComponent,
    CRMSPendingPaymentsComponent,
    CRMSClientnoteComponent,
    CRMSClientProviderIndexComponent,
    CRMSCreateNewProviderComponent,
    ClientCRMSOverviewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule
  ],
})
export class CRMFindClientModule { }
