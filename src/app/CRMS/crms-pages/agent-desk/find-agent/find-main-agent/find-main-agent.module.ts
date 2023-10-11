import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CRMSAgentSearchComponent } from './agent-search/agent-search.component';
import { CRMSViewAgentComponent } from './view-agent/view-agent.component';
import { CRMSAgentnoteComponent } from './agentnote/agentnote.component';
import { CRMSAgentinfoButtonComponent } from './agentinfo-button/agentinfo-button.component';
import { CRMSAgentLoanComponent } from './agentinfo-button/agent-loan/agent-loan.component';
import { CRMSCommissionComponent } from './agentinfo-button/commission/commission.component';
import { CRMSProductionComponent } from './agentinfo-button/production/production.component';
import { CRMSCreditBalanceComponent } from './agentinfo-button/credit-balance/credit-balance.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CRMSFindMainAgentComponent } from './find-main-agent.component';
import { CRMSAgentEndorsementsComponent } from './agentinfo-button/agent-endorsements/agent-endorsements.component';
import { CRMSAgentDocumentsComponent } from './agentinfo-button/agent-documents/agent-documents.component';
import { CRMSAgentWorkflowsComponent } from './agentinfo-button/agent-workflows/agent-workflows.component';
import { CRMSAgentWebLoginComponent } from './agentinfo-button/agent-web-login/agent-web-login.component';
import { CRMSAgentPoliciesComponent } from './agentinfo-button/agent-policies/agent-policies.component';
import { ComponentsModule } from '../../../../Shared/components/components.module';
import { CRMAgentViewEndorsmentComponent } from './view-agent/crmagent-view-endorsment/crmagent-view-endorsment.component';
import { CRMAgentViewDocumentComponent } from './view-agent/crmagent-view-document/crmagent-view-document.component';
import { CRMAgentViewWebLoginComponent } from './view-agent/crmagent-view-web-login/crmagent-view-web-login.component';
import { CrmagentViewAgentLoanComponent } from './view-agent/crmagent-view-agent-loan/crmagent-view-agent-loan.component';
import { CRMAgentViewWorkflowsComponent } from './view-agent/crmagent-view-workflows/crmagent-view-workflows.component';
import { CRMAgentViewNoOfPoliciesComponent } from './view-agent/crmagent-view-no-of-policies/crmagent-view-no-of-policies.component';
import { CRMAgentViewTotalCommissionPaidComponent } from './view-agent/crmagent-view-total-commission-paid/crmagent-view-total-commission-paid.component';
import { CRMAgentViewTotalProductionComponent } from './view-agent/crmagent-view-total-production/crmagent-view-total-production.component';
import { CRMAgentCreditNoteBalanceComponent } from './view-agent/crmagent-credit-note-balance/crmagent-credit-note-balance.component';
 

@NgModule({
  declarations: [ 
    CRMSAgentSearchComponent,
    CRMSViewAgentComponent,
    CRMSAgentnoteComponent,
    CRMSAgentinfoButtonComponent,
    CRMSAgentLoanComponent,
    CRMSCommissionComponent,
    CRMSProductionComponent,
    CRMSCreditBalanceComponent,
    CRMSFindMainAgentComponent,
    CRMSAgentEndorsementsComponent,
    CRMSAgentDocumentsComponent,
    CRMSAgentWorkflowsComponent,
    CRMSAgentWebLoginComponent,
    CRMSAgentPoliciesComponent,
    CRMAgentViewEndorsmentComponent,
    CRMAgentViewDocumentComponent,
    CRMAgentViewWebLoginComponent,
    CrmagentViewAgentLoanComponent,
    CRMAgentViewWorkflowsComponent,
    CRMAgentViewNoOfPoliciesComponent,
    CRMAgentViewTotalCommissionPaidComponent,
    CRMAgentViewTotalProductionComponent,
    CRMAgentCreditNoteBalanceComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
  ],
})
export class CRMSFindMainAgentModule {}
