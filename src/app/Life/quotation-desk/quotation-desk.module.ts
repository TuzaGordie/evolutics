import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { QuotationDeskRoutingModule } from './quotation-desk-routing.module';

import { AddQuotationDocumentComponent } from './documents/add-document/add-document.component';
import { AuthoriseQuoteComponent } from './authorise-quote/authorise-quote.component';
import { BusinessComponent } from './quotationinfo-buttons/business/business.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import { ChartsModule } from 'ng2-charts';
import { ComponentsModule } from '../../Shared/components/components.module';
import { ConvertToPolicyComponent } from './convert-to-policy/convert-to-policy.component';
import { CreateNewGroupQuotationComponent } from './create-new-group-quotation/create-new-group-quotation.component';
import { CreateNewIndividualQuotationComponent } from './create-new-individual-quotation/create-new-individual-quotation.component';
import { DocumentsComponent } from './quotationinfo-buttons/documents/documents.component';
import { EndorsementsComponent } from './quotationinfo-buttons/endorsements/endorsements.component';
import { FindQuotationComponent } from './find-quotation/find-quotation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenerateDocumentComponent } from './generate-document/generate-document.component';
import { NewGroupQuotationComponent } from './group-quotation/group-quotation.component';
import { NewIndividualQuotationComponent } from './individual-quotation/individual-quotation.component';
import { PendingPaymentsComponent } from './quotationinfo-buttons/pending-payments/pending-payments.component';
import { PendingQuotesComponent } from './quotationinfo-buttons/pending-quotes/pending-quotes.component';
import { PoliciesComponent } from './quotationinfo-buttons/policies/policies.component';
import { QuotationDeskOverviewComponent } from './quotation-desk-overview/quotation-desk-overview.component';
import { QuotationDocumentsComponent } from './documents/documents.component';
import { QuotationnoteComponent } from './quotationnote/quotationnote.component';
import { LifeQuotationPricingComponent } from './quotation-pricing/quotation-pricing.component';
import { LifeQuotationSearchComponent } from './quotation-search/quotation-search.component';
import { RelationshipsComponent } from './quotationinfo-buttons/relationships/relationships.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { TablePlainModule } from '../../Shared/components/table-plain/table-plain.module';
import { TextCase1Module } from '../../Shared/components/text-case-1/text-case-1.module';
import { UnderwritingEventsComponent } from './quotationinfo-buttons/underwriting-events/underwriting-events.component';
import { LifeViewQuotationComponent } from './view-quotation/view-quotation.component';
import { WebLoginComponent } from './quotationinfo-buttons/web-login/web-login.component';
import { WorkflowsComponent } from './quotationinfo-buttons/workflows/workflows.component';
import { CreateNewIndividualQuotationGbSectionsModule } from './create-new-individual-quotation/sections/create-new-individual-quotation-gb-sections.module';
import { CreateAccountModalModule } from '../life-components/create-account-modal/create-account-modal.module';
import { JointOwnerModalModule } from '../life-components/joint-owner-modal/joint-owner-modal.module';
import { ViewClientCompsModule } from '../client-desk/client-desk-comps/view-client-comps/view-client-comps.module';
import {
    QuotationDeskPolicyTabComponent
} from "./create-new-individual-quotation/sections/quotation-desk-policy-tab/quotation-desk-policy-tab.component";
import {
  QuotationDeskPaymentTabComponent
} from "./create-new-individual-quotation/sections/quotation-desk-payment-tab/quotation-desk-payment-tab.component";
import {
  CreateNewIndividualQuotationGbModalsModule
} from "./create-new-individual-quotation/modals/create-new-individual-quotation-gb-modals.module";
import { ViewQuotationAnnuityPayeeComponent } from './view-quotation/view-quotation-annuity-payee/view-quotation-annuity-payee.component';
import { ViewQuotationPaymentComponent } from './view-quotation/view-quotation-payment/view-quotation-payment.component';
import { ViewQuotationRelationshipsComponent } from './view-quotation/view-quotation-relationships/view-quotation-relationships.component';
import { ConvertQuoteModalModule } from '../life-components/convert-quote-modal/convert-quote-modal.module';
import { ViewQuotationTotalPeriodicPremiumComponent } from './view-quotation/view-quotation-total-periodic-premium/view-quotation-total-periodic-premium.component';

@NgModule({
  declarations: [
    AddQuotationDocumentComponent,
    AuthoriseQuoteComponent,
    BusinessComponent,
    ChangeStatusComponent,
    ConvertToPolicyComponent,
    CreateNewGroupQuotationComponent,
    CreateNewIndividualQuotationComponent,
    DocumentsComponent,
    EndorsementsComponent,
    FindQuotationComponent,
    GenerateDocumentComponent,
    NewGroupQuotationComponent,
    NewIndividualQuotationComponent,
    PendingPaymentsComponent,
    PendingQuotesComponent,
    PoliciesComponent,
    QuotationDeskOverviewComponent,
    QuotationDocumentsComponent,
    QuotationnoteComponent,
    LifeQuotationPricingComponent,
    LifeQuotationSearchComponent,
    RelationshipsComponent,
    UnderwritingEventsComponent,
    LifeViewQuotationComponent,
    WebLoginComponent,
    WorkflowsComponent,
    QuotationDeskPolicyTabComponent, 
    QuotationDeskPaymentTabComponent, ViewQuotationAnnuityPayeeComponent, ViewQuotationPaymentComponent, ViewQuotationRelationshipsComponent, ViewQuotationTotalPeriodicPremiumComponent,
  ],
  imports: [
    QuotationDeskRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    FormsModule,
    ChartsModule,
    TablePlainModule,
    TextCase1Module,
    CreateNewIndividualQuotationGbSectionsModule,
    CreateAccountModalModule,
    JointOwnerModalModule,
    ViewClientCompsModule,
    CreateNewIndividualQuotationGbModalsModule,
    ConvertQuoteModalModule
  ],
  providers: [DecimalPipe]
})

export class QuotationDeskModule {}
