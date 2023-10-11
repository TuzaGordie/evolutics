import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentSearchComponent } from './agent-search/agent-search.component';
import { ViewAgentComponent } from './view-agent/view-agent.component';
import { AgentnoteComponent } from './agentnote/agentnote.component';
import { AgentinfoButtonComponent } from './agentinfo-button/agentinfo-button.component';
import { AgentLoanComponent } from './agentinfo-button/agent-loan/agent-loan.component';
import { CommissionComponent } from './agentinfo-button/commission/commission.component';
import { ProductionComponent } from './agentinfo-button/production/production.component';
import { CreditBalanceComponent } from './agentinfo-button/credit-balance/credit-balance.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FindMainAgentComponent } from './find-main-agent.component';
import { AgentEndorsementsComponent } from './agentinfo-button/agent-endorsements/agent-endorsements.component';
import { AgentDocumentsComponent } from './agentinfo-button/agent-documents/agent-documents.component';
import { AgentWorkflowsComponent } from './agentinfo-button/agent-workflows/agent-workflows.component';
import { AgentWebLoginComponent } from './agentinfo-button/agent-web-login/agent-web-login.component';
import { AgentPoliciesComponent } from './agentinfo-button/agent-policies/agent-policies.component';
import { ComponentsModule } from '../../../../Shared/components/components.module';
import { ViewAgentEndorsementsComponent } from './view-agent-endorsements/view-agent-endorsements.component';
import { ViewAgentDocumentsComponent } from './view-agent-documents/view-agent-documents.component';
import { ViewAgentWorkflowsComponent } from './view-agent-workflows/view-agent-workflows.component';
import { ViewAgentWebLoginComponent } from './view-agent-web-login/view-agent-web-login.component';
import { ViewAgentAgentLoanComponent } from './view-agent-agent-loan/view-agent-agent-loan.component';
import { ViewAgentUnderwritingsEventsComponent } from './view-agent-underwritings-events/view-agent-underwritings-events.component';
import { CommissiondueComponent } from './agentinfo-button/commissiondue/commissiondue.component';
import { TopplaceComponent } from './topplace/topplace.component';
import { TotalproductionComponent } from './agentinfo-button/totalproduction/totalproduction.component';
import { ViewAgentPendingQuoteComponent } from './view-agent/view-agent-pending-quote/view-agent-pending-quote.component';
import { AgentPaymentMethodComponent } from './view-agent/edit-modals/agent-payment-method/agent-payment-method.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AgentSalaryStatusComponent } from './view-agent/edit-modals/agent-salary-status/agent-salary-status.component';
import { AgentTypeComponent } from './view-agent/edit-modals/agent-type/agent-type.component';
import { BranchComponent } from './view-agent/edit-modals/branch/branch.component';
import { LicenseCertComponent } from './view-agent/edit-modals/license-cert/license-cert.component';
import { ProductClassPermissionComponent } from './view-agent/edit-modals/product-class-permission/product-class-permission.component';
import { WorkflowPipesModule } from 'src/app/Shared/pipes/workflow-pipes/pipes.module';
import { CreateAccountFormModule } from 'src/app/Life/life-components/create-account-modal/create-account-form/create-account-form.module';
import { AgentHierarchyComponent } from './view-agent/edit-modals/agent-hierarchy/agent-hierarchy.component';
import { PaymentInformationModalModule } from 'src/app/Life/life-components/payment-information-modal/payment-information-modal.module';
import { FullNamePipe } from 'src/app/Life/client-desk/pipes/full-name.pipe';
import { TablePlainModule } from 'src/app/Shared/components/table-plain/table-plain.module';
import { FindItemModule } from 'src/app/Reusables/reusable-comps/find-item/find-item.module';

const comps = [
  AgentSearchComponent,
  ViewAgentComponent,
  AgentnoteComponent,
  AgentinfoButtonComponent,
  AgentLoanComponent,
  CommissionComponent,
  ProductionComponent,
  CreditBalanceComponent,
  FindMainAgentComponent,
  AgentEndorsementsComponent,
  AgentDocumentsComponent,
  AgentWorkflowsComponent,
  AgentWebLoginComponent,
  AgentPoliciesComponent,
  ViewAgentEndorsementsComponent,
  ViewAgentDocumentsComponent,
  ViewAgentWorkflowsComponent,
  ViewAgentWebLoginComponent,
  ViewAgentAgentLoanComponent,
  ViewAgentUnderwritingsEventsComponent,
  CommissiondueComponent,
  TopplaceComponent,
  TotalproductionComponent,
  ViewAgentPendingQuoteComponent,
  // agent edit modals
  AgentPaymentMethodComponent,
  AgentSalaryStatusComponent,
  AgentTypeComponent,
  BranchComponent,
  LicenseCertComponent,
  ProductClassPermissionComponent,
  AgentHierarchyComponent,
];
@NgModule({
  declarations: comps,
  exports: comps,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    MatDialogModule,
    WorkflowPipesModule,
    CreateAccountFormModule,
    PaymentInformationModalModule,
    TablePlainModule,FindItemModule
  ],
  providers: [FullNamePipe]
})
export class FindMainAgentModule {}
