import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/Shared/shared.module';
import { RouterModule } from '@angular/router';
import { LicenseComponent } from './license/license.component';
import { AgentInfoComponent } from './agent-info/agent-info.component';
import { FindAgentComponent } from './find-agent/find-agent.component';
import { NewIndividualAgentComponent } from './new-individual-agent.component';
import { ComponentsModule } from '../../../Shared/components/components.module';
import { CreateAccountModalModule } from '../../life-components/create-account-modal/create-account-modal.module';
import { TablePlainModule } from 'src/app/Shared/components/table-plain/table-plain.module';
import { PaymentInfoModule } from './payment-info/payment-info.module';
import { ViewClientCompsModule } from '../../client-desk/client-desk-comps/view-client-comps/view-client-comps.module';
import { AddDocumentModalModule } from 'src/app/Reusables/reusable-comps/add-document-modal/add-document-modal.module';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    NewIndividualAgentComponent,
    FindAgentComponent,
    AgentInfoComponent,
    LicenseComponent,
  ],
  exports: [
    NewIndividualAgentComponent,
    // FindAgentComponent,
    // AgentInfoComponent,
    // LicenseComponent,
  ],
  imports: [
    AddDocumentModalModule,
    CommonModule,
    ComponentsModule,
    CreateAccountModalModule,
    MatMenuModule,
    PaymentInfoModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    ViewClientCompsModule,
  ],
})
export class NewIndividualAgentModule {}
