import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLayoutComponent } from '../Layout/form-layout/form-layout.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./health-pages/health-home/health-home.module').then(
        (m) => m.HealthHomeModule
      ),
  },
  {
    path: 'admin-desk',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('../Life/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'agent-desk',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('../Life/agent-desk/agent-desk.module').then(
        (m) => m.AgentDeskModule
      ),
  },
  {
    path: 'client-desk',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('../Life/client-desk/client-desk.module').then(
        (m) => m.LifeClientDeskModule
      ),
  },
  {
    path: 'group-desk',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('../Life/group-desk/group-desk.module').then(
        (m) => m.GroupDeskModule
      ),
  },
  {
    path: 'quotation-desk',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('../Life/quotation-desk/quotation-desk.module').then(
        (m) => m.QuotationDeskModule
      ),
  },
  {
    path: 'report-desk',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('../Life/Report/report.module').then((m) => m.ReportModule),
  },
  {
    path: 'payment-desk',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('../Life/payment-desk/payment-desk.module').then(
        (m) => m.PaymentDeskModule
      ),
  },
  {
    path: 'policy-desk',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('../Life/policy-desk/policy-desk.module').then(
        (m) => m.PolicyDeskModule
      ),
  },
  {
    path: 'setups',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('../Life/Setup/setup.module').then(
        (m) => m.SetupModule
      ),
  },
  {
    path: 'workflow-desk',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('../Life/Workflow/workflow.module').then(
        (m) => m.WorkflowModule
      ),
  }, 
  { path: '', loadChildren: () => import('src/app/account/account.module').then(m => m.AccountModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HealthRoutingModule {}
