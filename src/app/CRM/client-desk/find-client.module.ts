import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CRMFindClientComponent } from './find-client/find-crm-client.component';
import { ClientSearchComponent } from './client-search/client-search.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CRMViewClientComponent } from './view-client/view-crm-client.component';
import { EndorsementsComponent } from './clientinfo-buttons/endorsements/endorsements.component';
import { DocumentsComponent } from './clientinfo-buttons/documents/documents.component';
import { WorkflowsComponent } from './clientinfo-buttons/workflows/workflows.component';
import { WebLoginComponent } from './clientinfo-buttons/web-login/web-login.component';
import { UnderwritingEventsComponent } from './clientinfo-buttons/underwriting-events/underwriting-events.component';
import { PoliciesComponent } from './clientinfo-buttons/policies/policies.component';
import { RelationshipsComponent } from './clientinfo-buttons/relationships/relationships.component';
import { BusinessComponent } from './clientinfo-buttons/business/business.component';
import { PendingQuotesComponent } from './clientinfo-buttons/pending-quotes/pending-quotes.component';
import { PendingPaymentsComponent } from './clientinfo-buttons/pending-payments/pending-payments.component';
import { ClientnoteComponent } from './clientnote/clientnote.component';
import { ClientProviderIndexComponent } from './client-provider/client-provider-index/client-provider-index.component';
import { CreateNewProviderComponent } from './client-provider/client-provider-create/client-provider-create.component';


@NgModule({
  declarations: [
    CRMFindClientComponent,
    ClientSearchComponent,
    CRMViewClientComponent,
    EndorsementsComponent,
    DocumentsComponent,
    WorkflowsComponent,
    WebLoginComponent,
    UnderwritingEventsComponent,
    PoliciesComponent,
    RelationshipsComponent,
    BusinessComponent,
    PendingQuotesComponent,
    PendingPaymentsComponent,
    ClientnoteComponent,
    ClientProviderIndexComponent,
    CreateNewProviderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
      SharedModule,
      RouterModule
  ]
})
export class CRMFindClientModule { }
