import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindQuotationComponent } from './find-quotation/find-quotation.component';
import { QuotationSearchComponent } from './quotation-search/quotation-search.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewQuotationComponent } from './view-quotation/view-quotation.component';
import { EndorsementsComponent } from './quotationinfo-buttons/endorsements/endorsements.component';
import { DocumentsComponent } from './quotationinfo-buttons/documents/documents.component';
import { WorkflowsComponent } from './quotationinfo-buttons/workflows/workflows.component';
import { WebLoginComponent } from './quotationinfo-buttons/web-login/web-login.component';
import { UnderwritingEventsComponent } from './quotationinfo-buttons/underwriting-events/underwriting-events.component';
import { PoliciesComponent } from './quotationinfo-buttons/policies/policies.component';
import { RelationshipsComponent } from './quotationinfo-buttons/relationships/relationships.component';
import { BusinessComponent } from './quotationinfo-buttons/business/business.component';
import { PendingQuotesComponent } from './quotationinfo-buttons/pending-quotes/pending-quotes.component';
import { PendingPaymentsComponent } from './quotationinfo-buttons/pending-payments/pending-payments.component';
import { QuotationnoteComponent } from './quotationnote/quotationnote.component';
import { NewIndividualQuotationComponent } from './individual-quotation/individual-quotation.component';
import { NewGroupQuotationComponent } from './group-quotation/group-quotation.component';
// import { IndividualQuotationComponent } from './create-individual-quotation/create-individual-quotation.component';



@NgModule({
  declarations: [
    FindQuotationComponent,
    QuotationSearchComponent,
    ViewQuotationComponent,
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
    QuotationnoteComponent,
    NewIndividualQuotationComponent,
    NewGroupQuotationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
      SharedModule,
      RouterModule
  ]
})
export class FindQuotationModule { }
