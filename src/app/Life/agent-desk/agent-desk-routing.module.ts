import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentoverviewsComponent } from './agentoverviews/agentoverviews.component';
import { CreditnotesbalanceComponent } from './creditnotesbalance/creditnotesbalance.component';
import { AgentSearchComponent } from './find-agent/find-main-agent/agent-search/agent-search.component';
import { AgentDocumentsComponent } from './find-agent/find-main-agent/agentinfo-button/agent-documents/agent-documents.component';
import { AgentEndorsementsComponent } from './find-agent/find-main-agent/agentinfo-button/agent-endorsements/agent-endorsements.component';
import { AgentLoanComponent } from './find-agent/find-main-agent/agentinfo-button/agent-loan/agent-loan.component';
import { AgentPoliciesComponent } from './find-agent/find-main-agent/agentinfo-button/agent-policies/agent-policies.component';
import { AgentWebLoginComponent } from './find-agent/find-main-agent/agentinfo-button/agent-web-login/agent-web-login.component';
import { AgentWorkflowsComponent } from './find-agent/find-main-agent/agentinfo-button/agent-workflows/agent-workflows.component';
import { CommissionComponent } from './find-agent/find-main-agent/agentinfo-button/commission/commission.component';
import { CommissiondueComponent } from './find-agent/find-main-agent/agentinfo-button/commissiondue/commissiondue.component';
import { CreditBalanceComponent } from './find-agent/find-main-agent/agentinfo-button/credit-balance/credit-balance.component';
import { ProductionComponent } from './find-agent/find-main-agent/agentinfo-button/production/production.component';
import { AgentnoteComponent } from './find-agent/find-main-agent/agentnote/agentnote.component';
import { FindMainAgentComponent } from './find-agent/find-main-agent/find-main-agent.component';
import { ViewAgentAgentLoanComponent } from './find-agent/find-main-agent/view-agent-agent-loan/view-agent-agent-loan.component';
import { ViewAgentEndorsementsComponent } from './find-agent/find-main-agent/view-agent-endorsements/view-agent-endorsements.component';
import { ViewAgentUnderwritingsEventsComponent } from './find-agent/find-main-agent/view-agent-underwritings-events/view-agent-underwritings-events.component';
import { ViewAgentWebLoginComponent } from './find-agent/find-main-agent/view-agent-web-login/view-agent-web-login.component';
import { ViewAgentWorkflowsComponent } from './find-agent/find-main-agent/view-agent-workflows/view-agent-workflows.component';
import { ViewAgentComponent } from './find-agent/find-main-agent/view-agent/view-agent.component';
import { FindAgentComponent } from './new-individual-agent/find-agent/find-agent.component';
import { NewIndividualAgentComponent } from './new-individual-agent/new-individual-agent.component'; 
import { OverviewComponent } from './overview/overview.component';
import { CreateIndividualClientComponent } from '../client-desk/create-individual-client/allforms/allforms.component';
// import { CRMSCorporateClientComponent } from '../../CRMS/agent-desk/new-corporate-agent/corporate-client/corporate-client.component';
import { appRoutes } from 'src/app/configs/app-routes-configs/app-routes.config';
import { CRMSCorporateClientComponent } from 'src/app/CRMS/crms-pages/agent-desk/new-corporate-agent/corporate-client/corporate-client.component';
import { ERModule } from 'src/app/Reusables/reusable-extras/reusable.model';
import { ViewAgentPendingQuoteComponent } from './find-agent/find-main-agent/view-agent/view-agent-pending-quote/view-agent-pending-quote.component';
import { GetClientTypeResolver } from 'src/app/resolvers/get-client-type.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'find-agent', pathMatch: 'full' },
  { path: 'agent-documents', component: AgentDocumentsComponent },
  {
    path: 'agent-documents',
    component: AgentDocumentsComponent,
    data: { title: 'Agent Desk / Document' },
  },
  { path: 'agent-endorsements', component: AgentEndorsementsComponent },
  {
    path: 'agent-endorsements',
    component: AgentEndorsementsComponent,
    data: { title: 'Agent Desk / Endorsement' },
  },
  // { path: 'agent-loan', component: AgentLoanComponent },
  {
    path: 'agent-loan',
    component: AgentLoanComponent,
    data: { title: 'Agent Desk / Loan' },
  },
  // {
  //   path: 'agent-loan',
  //   component: ViewAgentAgentLoanComponent,
  //   data: { title: 'Agent Desk / Loan' },
  // },
  {
    path: 'agent-note',
    loadChildren: () =>
      import(
        '../../Reusables/reusable-pages/notes/notes.module'
      ).then((m) => m.NotesModule), 
    data: { title: 'View Agent / Note', rModule: ERModule.agent },
  }, 
  {
    path: 'agent-note',
    component: AgentnoteComponent,
    data: { title: 'Agent Desk / Note' },
  },
  {
    path: 'agent-policies',
    component: AgentPoliciesComponent,
    data: { title: 'View Agent / Policies' },
  },
  { path: 'agent-search', component: AgentSearchComponent },
  { path: 'agent-web-login', component: AgentWebLoginComponent },
  {
    path: 'agent-web-login',
    component: AgentWebLoginComponent,
    data: { title: 'Agent Desk / Web-login' },
  },
  { path: 'agent-workflows', component: AgentWorkflowsComponent },
  {
    path: 'agent-workflows',
    component: AgentWorkflowsComponent,
    data: { title: 'Agent Desk / Workflows' },
  }, 
  {
    path: 'commission',
    component: CommissionComponent,
    data: { title: 'View Agent / Commission' },
  },
  {
    path: 'commissiondue',
    component: CommissiondueComponent,
    data: { title: 'View Agent / Commission Due' },
  },  
  {
    path: 'create-index',
    component: FindAgentComponent,
    data: { title: 'Agent Desk / Create New Agent' },
  }, 
  {
    path: 'create',
    resolve:{clientType:GetClientTypeResolver},
    component: NewIndividualAgentComponent,
    data: { title: 'Agent Desk / Create Agent' },
  },   
  { path: 'credit-balance', component: CreditBalanceComponent },
  {
    path: 'credit-notes-balance',
    component: CreditnotesbalanceComponent,
    data: { title: 'Agent Desk / Credit Notes' },
  },
  {
    path: 'documents',
    loadChildren: () =>
      import(
        '../../Reusables/reusable-pages/document-list/document-list.module'
      ).then((m) => m.DocumentListModule),
    data: { title: 'View Agent / Documents', rModule: ERModule.agent },
  }, 
  {
    path: 'endorsements',
    loadChildren: () =>
      import(
        '../../Reusables/reusable-pages/endorsement-list/endorsement-list.module'
      ).then((m) => m.EndorsementListModule),
    data: { title: 'View Agent / Endorsements', rModule: ERModule.agent },
  },
  {
    path: 'endorsements',
    component: ViewAgentEndorsementsComponent,
    data: { title: 'Agent Desk / Endorsements' },
  },

  {
    path: 'pending-quote',
    component: ViewAgentPendingQuoteComponent,
    data: { title: 'Agent Desk / Pending Quote' },
  },
  { path: 'find-agent', component: FindAgentComponent },
  {
    path: 'find-main-agent',
    component: FindMainAgentComponent,
    data: { title: 'Agent Desk / Find Agent' },
  },
  {
    path: 'individual-agent',
    redirectTo:'create' 
  }, 
  {
    path: 'overview',
    component: AgentoverviewsComponent,
    data: { title: 'Agent Desk / Overview' },
  },
  {
    path: 'production',
    component: OverviewComponent,
    data: { title: 'Agent Desk / Production' },
  },
  { path: 'production', component: ProductionComponent },
  {
    path: 'search-agent',
    component: AgentSearchComponent,
    data: { title: 'Agent Desk / Search Agent' },
  }, 
  {
    path: 'underwritingevents',
    component: ViewAgentUnderwritingsEventsComponent,
    data: { title: 'Agent Desk / Underwriting  Events' },
  },
  {
    path: 'view-agent',
    component: ViewAgentComponent,
    data: { title: 'Agent Desk / View Agent' },
  },
  {
    path: 'web-login',
    component: ViewAgentWebLoginComponent,
    data: { title: 'Agent Desk / Web Login' },
  },
  {
    path: 'workflows',
    component: ViewAgentWorkflowsComponent,
    data: { title: 'Agent Desk / Workflows' },
  },
  {
    path: appRoutes.life.agent.find._,
    component: FindMainAgentComponent,
    data: { title: 'Agent Desk / Find Agent' },
  },
];
console.log('LIFE AGENT ROUTES', routes);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentDeskRoutingModule {}
