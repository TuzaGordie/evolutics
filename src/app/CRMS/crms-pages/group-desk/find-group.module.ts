import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindGroupComponent } from './find-group/find-group.component';
import { GroupSearchComponent } from './group-search/group-search.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewGroupComponent } from './view-group/view-group.component';
import { EndorsementsComponent } from './groupinfo-buttons/endorsements/endorsements.component';
import { DocumentsComponent } from './groupinfo-buttons/documents/documents.component';
import { WorkflowsComponent } from './groupinfo-buttons/workflows/workflows.component';
import { WebLoginComponent } from './groupinfo-buttons/web-login/web-login.component';
import { UnderwritingEventsComponent } from './groupinfo-buttons/underwriting-events/underwriting-events.component';
import { PoliciesComponent } from './groupinfo-buttons/policies/policies.component';
import { RelationshipsComponent } from './groupinfo-buttons/relationships/relationships.component';
import { BusinessComponent } from './groupinfo-buttons/business/business.component';
import { PendingQuotesComponent } from './groupinfo-buttons/pending-quotes/pending-quotes.component';
import { PendingPaymentsComponent } from './groupinfo-buttons/pending-payments/pending-payments.component';
import { GroupnoteComponent } from './groupnote/groupnote.component';
// import { IndividualGroupComponent } from './create-individual-group/create-individual-group.component';



@NgModule({
  declarations: [
    FindGroupComponent,
    GroupSearchComponent,
    ViewGroupComponent,
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
    GroupnoteComponent
    
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
      SharedModule,
      RouterModule
  ]
})
export class FindGroupModule { }
