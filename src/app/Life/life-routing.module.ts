import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from '../configs/app-routes-configs/app-routes.config';
import { FormLayoutComponent } from '../Layout/form-layout/form-layout.component';

import { CreateNewProviderComponent } from './client-desk/client-provider/client-provider-create/client-provider-create.component';

import { ClientnoteComponent } from './client-desk/clientnote/clientnote.component';
import { CreateIndividualClientComponent } from './client-desk/create-individual-client/allforms/allforms.component';
import { LifeHomeComponent } from './life-home/life-home.component';
import { FindQuotationComponent } from './quotation-desk/find-quotation/find-quotation.component'; 

export const lifeRoutes: Routes = [
  { path: '', component: LifeHomeComponent },
  {
    path: appRoutes.life.policy._,
    component: FormLayoutComponent,
    loadChildren: () =>
      import('./policy-desk/policy-desk.module').then(
        (m) => m.PolicyDeskModule
      ),
  },
  { path: 'allform', component: CreateIndividualClientComponent },
  { path: 'clientnote', component: ClientnoteComponent },

  { path: 'create-client-provider', component: CreateNewProviderComponent },
  { path: 'find-quotation', component: FindQuotationComponent },

  {
    path: appRoutes.life.admin._,
    component: FormLayoutComponent,
    loadChildren: () =>
      import('../Life/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: appRoutes.life.group._,
    component: FormLayoutComponent,
    loadChildren: () =>
      import('./group-desk/group-desk.module').then((m) => m.GroupDeskModule),
  },
  {
    path: appRoutes.life.agent._,
    component: FormLayoutComponent,
    loadChildren: () =>
      import('./agent-desk/agent-desk.module').then((m) => m.AgentDeskModule),
  },
  {
    path: appRoutes.life.authorize._,
    component: FormLayoutComponent,
    loadChildren: () =>
      import('./authorize/authorize.module').then((m) => m.AuthorizeModule),
  },
  {
    path: appRoutes.life.client._,
    component: FormLayoutComponent,
    loadChildren: () =>
      import('./client-desk/client-desk.module').then(
        (m) => m.LifeClientDeskModule
      ),
  },
  {
    path: appRoutes.life.payment._,
    component: FormLayoutComponent,
    data: { title: 'PaymentDesk' },
    loadChildren: () =>
      import('./payment-desk/payment-desk.module').then(
        (m) => m.PaymentDeskModule
      ),
  },
  { path: '', loadChildren: () => import('src/app/account/account.module').then(m => m.AccountModule) },
  {
    path: appRoutes.life.quotation._,
    component: FormLayoutComponent,
    loadChildren: () =>
      import('./quotation-desk/quotation-desk.module').then(
        (m) => m.QuotationDeskModule
      ),
  },
  {
    path: appRoutes.life.report._,
    component: FormLayoutComponent,
    loadChildren: () =>
      import('./Report/report.module').then((m) => m.ReportModule),
  },
  {
    path: appRoutes.life.setup._,
    component: FormLayoutComponent,
    loadChildren: () =>
      import('./Setup/setup.module').then((m) => m.SetupModule),
  },
  {
    path: 'workflow-desk',
    component: FormLayoutComponent,
    data: { title: 'WorkFlow' },
    loadChildren: () =>
      import('./Workflow/workflow.module').then((m) => m.WorkflowModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(lifeRoutes)],
  exports: [RouterModule],
})
export class LifeRoutingModule {}
