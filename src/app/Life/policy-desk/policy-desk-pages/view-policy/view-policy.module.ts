import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewPolicyRoutingModule } from './view-policy-routing.module';
import { ViewPolicyComponent } from './view-policy.component';
import { TablePlainModule } from '../../../../Shared/components/table-plain/table-plain.module';
import { TextCase1Module } from '../../../../Shared/components/text-case-1/text-case-1.module';
import { PdSharedModule } from '../../policy-desk-extras/pd-shared.module';
import { ChangeStatusModalModule } from 'src/app/Shared/components/change-status-modal/change-status-modal.module';
import { AgentListModalModule } from 'src/app/Life/life-components/agent-list-modal/agent-list-modal.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { PolicyCoverTableComponent } from './modal/policy-cover-table/policy-cover-table.component';

@NgModule({
  declarations: [ViewPolicyComponent, PolicyCoverTableComponent],
  imports: [
    CommonModule,
    ViewPolicyRoutingModule,
    TextCase1Module,
    TablePlainModule,
    SharedModule,
    ChangeStatusModalModule,AgentListModalModule
  ],
})
export class ViewPolicyModule {}
