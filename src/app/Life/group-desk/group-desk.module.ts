import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupDeskRoutingModule } from './group-desk-routing.module'; 

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
import { GroupDeskOverviewComponent } from './group-desk-overview/group-desk-overview.component';
import { ChartsModule } from 'ng2-charts';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { ChangeStatusModalModule } from 'src/app/Shared/components/change-status-modal/change-status-modal.module';
import { TablePlainModule } from 'src/app/Shared/components/table-plain/table-plain.module';
import { AgentListModalModule } from '../life-components/agent-list-modal/agent-list-modal.module';
import { LeadCoinsurerListModalModule } from '../life-components/lead-coinsurer-list-modal/lead-coinsurer-list-modal.module';
import { FieldAggregateModalModule } from '../life-components/field-aggregate-modal/field-aggregate-modal.module';
import { FindClientModalComponent } from './group-desk-overview/find-client-modal/find-client-modal.component';

@NgModule({
  declarations: [ 
    BusinessComponent,
    DocumentsComponent,
    EndorsementsComponent,
    FindGroupComponent,
    GroupDeskOverviewComponent,
    GroupnoteComponent,
    GroupSearchComponent,
    PendingPaymentsComponent,
    PendingQuotesComponent,
    PoliciesComponent,
    RelationshipsComponent,
    UnderwritingEventsComponent,
    ViewGroupComponent,
    WebLoginComponent,
    WorkflowsComponent,
    FindClientModalComponent,
  ],
  imports: [
    CommonModule,
    GroupDeskRoutingModule,
    ChartsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,ComponentsModule,
    TablePlainModule, 
    ChangeStatusModalModule,AgentListModalModule,LeadCoinsurerListModalModule,FieldAggregateModalModule
  ],
})
export class GroupDeskModule {}
