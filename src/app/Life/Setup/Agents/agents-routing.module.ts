import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AgentsComponent } from './agents.component';
import { CreateSetupsAgentLoanTypeComponent } from './agent-loan-type/create-agent-loan-type/create-agent-loan-type.component';
import { IndexSetupsAgentLoanTypeComponent } from './agent-loan-type/index-agent-loan-type/index-agent-loan-type.component';
import { StartSetupsAgentLoanTypeComponent } from './agent-loan-type/start-agent-loan-type/start-agent-loan-type.component';
import { CreateSetupsAgentTypeComponent } from './agent-type/create-agent-type/create-agent-type.component';
import { IndexSetupsAgentTypeComponent } from './agent-type/index-agent-type/index-agent-type.component';
import { StartSetupsAgentTypeComponent } from './agent-type/start-agent-type/start-agent-type.component';
import { IndexSetupsAgentBandComponent } from './band/index-agent-band.component';
import { CreateSetupsCommissionCodeComponent } from './commission-code/create-commission-code/create-commission-code.component';
import { IndexSetupsCommissionCodeComponent } from './commission-code/index-commission-code/index-commission-code.component';
import { StartSetupsCommissionCodeComponent } from './commission-code/start-commission-code/start-commission-code.component';
import { CreateSetupsProductGroupingComponent } from './product-grouping/create-product-grouping/create-product-grouping.component';
import { IndexSetupsProductGroupingComponent } from './product-grouping/index-product-grouping/index-product-grouping.component';
import { StartSetupsProductGroupingComponent } from './product-grouping/start-product-grouping/start-product-grouping.component';

export const lifeSetupAgentsRoutes: Routes = [
  {
    path: 'index-agent-type',
    data: { title: 'Agent Type' },
    component: IndexSetupsAgentTypeComponent,
  },
  {
    path: 'start-agent-type',
    data: { title: 'Agent Type' },
    component: StartSetupsAgentTypeComponent,
  },
  {
    path: 'create-agent-type',
    data: { title: 'Agent Type' },
    component: CreateSetupsAgentTypeComponent,
  },
  {
    path: 'index-agent-band',
    data: { title: 'Band' },
    component: IndexSetupsAgentBandComponent,
  },

  {
    path: 'index-product-grouping',
    data: { title: 'Product Grouping' },
    component: IndexSetupsProductGroupingComponent,
  },
  {
    path: 'start-product-grouping',
    data: { title: 'Product Grouping' },
    component: StartSetupsProductGroupingComponent,
  },
  {
    path: 'create-product-grouping',
    data: { title: 'Product Grouping' },
    component: CreateSetupsProductGroupingComponent,
  },

  {
    path: 'index-commission-code',
    data: { title: 'Commission Codes' },
    component: IndexSetupsCommissionCodeComponent,
  },
  {
    path: 'start-commission-code',
    data: { title: 'Commission Codes' },
    component: StartSetupsCommissionCodeComponent,
  },
  {
    path: 'create-commission-code',
    data: { title: 'Commission Codes' },
    component: CreateSetupsCommissionCodeComponent,
  },

  {
    path: 'index-agent-loan',
    data: { title: 'Agent Loan Type' },
    component: IndexSetupsAgentLoanTypeComponent,
  },
  {
    path: 'start-agent-loan',
    data: { title: 'Agent Loan Type' },
    component: StartSetupsAgentLoanTypeComponent,
  },
  {
    path: 'create-agent-loan',
    data: { title: 'Agent Loan Type' },
    component: CreateSetupsAgentLoanTypeComponent,
  },
];
lifeSetupAgentsRoutes.filter((x) => x.data?.title).forEach((x) => (x.data.title = 'Set Up / Agents / ' + x.data.title));

@NgModule({
  imports: [RouterModule.forChild(lifeSetupAgentsRoutes)],
  exports: [RouterModule],
})
export class AgentsRoutingModule {}
