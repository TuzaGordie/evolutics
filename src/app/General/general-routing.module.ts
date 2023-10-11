import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from '../configs/app-routes-configs/app-routes.config';
import { FormLayoutComponent } from '../Layout/form-layout/form-layout.component'; 
import { ESystem } from '../Shared/models/index.model';
import { GeneralHomeComponent } from './general-home/general-home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: { color: 'bg-general', system: ESystem.general },
    component: GeneralHomeComponent,
  },

  {
    path: appRoutes.general.agent._,
    component: FormLayoutComponent,
    loadChildren: () => import('./agent-desk/agent-desk.module').then((m) => m.AgentDeskModule),
  },
  {
    path: appRoutes.general.asset._,
    component: FormLayoutComponent,
    loadChildren: () => import('../General/asset-desk/asset-desk.module').then((m) => m.AssetDeskModule),
  },
  {
    path: appRoutes.general.client._,
    component: FormLayoutComponent,
    loadChildren: () => import('src/app/Life/client-desk/client-desk.module').then((m) => m.LifeClientDeskModule),
  },
  {
    path: appRoutes.general.policy._,
    component: FormLayoutComponent,
    loadChildren: () => import('./policy-desk/policy-desk.module').then((m) => m.PolicyDeskModule),
  },
  {
    path: appRoutes.general.payment._,
    component: FormLayoutComponent,
    data: { title: 'PaymentDesk' },
    loadChildren: () => import('./payment-desk/payment-desk.module').then((m) => m.PaymentDeskModule),
  },
  {
    path: appRoutes.general.quotation._,
    component: FormLayoutComponent,
    loadChildren: () => import('../General/quotation-desk/quotation-desk.module').then((m) => m.QuotationDeskModule),
  },
  {
    path: appRoutes.general.group._,
    component: FormLayoutComponent,
    loadChildren: () => import('../General/group-desk/group-desk.module').then((m) => m.GroupDeskModule),
  },
  {
    path: appRoutes.general.report._,
    component: FormLayoutComponent,
    loadChildren: () => import('../General/report-desk/report-desk.module').then((m) => m.ReportDeskModule),
  },
  {
    path: appRoutes.general.admin._,
    component: FormLayoutComponent,
    loadChildren: () => import('src/app/Life/admin/admin.module').then((m) => m.AdminModule),
  }, 
  { path: '', loadChildren: () => import('src/app/account/account.module').then(m => m.AccountModule) },
  {
    path: appRoutes.general.workflow._,
    component: FormLayoutComponent,
    loadChildren: () => import('./workflow-desk/workflow-desk.module').then((m) => m.WorkflowDeskModule),
  },
  {
    path: appRoutes.general.authorize._,
    component: FormLayoutComponent,
    loadChildren: () => import('./authorize/authorize.module').then((m) => m.AuthorizeModule),
  },
  {
    path: appRoutes.general.setup._,
    component: FormLayoutComponent,
    loadChildren: () => import('./setups/setups.module').then((m) => m.SetupsModule),
  },
  { path: '', loadChildren: () => import('src/app/account/account.module').then(m => m.AccountModule) },
];
console.log('GENERAL ROUTES', routes);
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralRoutingModule {}
