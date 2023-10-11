import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { appRoutes } from '../configs/app-routes-configs/app-routes.config';
import { FormLayoutComponent } from '../Layout/form-layout/form-layout.component';
import { FinanceHomeComponent } from './finance-home/finance-home.component';
import { ExpenseSetupComponent } from './finance-setups/expense-setup/expense-setup.component';
import { CostCentersComponent } from './finance-payment-desk/finance-cost-accounting/cost-centers/cost-centers.component';
import { ConstCenterSetupComponent } from './finance-setups/const-center-setup/const-center-setup.component';
import { AllocationSetupComponent } from './finance-setups/allocation-setup/allocation-setup.component';
import {DepreciationSetupComponent} from "./finance-setups/depreciation-setup/depreciation-setup.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FinanceHomeComponent,
    data: { color: 'bg-finance', system: 'finance' },
  },
  {
    path: 'account',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('./finance-account-desk/finance-account-desk.module').then(
        (m) => m.FinanceAccountDeskModule
      ),
  },
  {
    path: appRoutes.life.admin._,
    component: FormLayoutComponent,
    loadChildren: () =>
      import('src/app/Life/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: appRoutes.finance.agent._,
    component: FormLayoutComponent,
    loadChildren: () =>
      import('../Life/agent-desk/agent-desk.module').then(
        (m) => m.AgentDeskModule
      ),
  },
  {
    path: appRoutes.finance.asset._,
    component: FormLayoutComponent,
    loadChildren: () =>
      import('../General/asset-desk/asset-desk.module').then(
        (m) => m.AssetDeskModule
      ),
  },
  {
    path: appRoutes.finance.client._,
    component: FormLayoutComponent,
    loadChildren: () =>
      import('../Life/client-desk/client-desk.module').then(
        (m) => m.LifeClientDeskModule
      ),
  },
  {
    path: appRoutes.finance.report._,
    component: FormLayoutComponent,
    loadChildren: () =>
      import('../Life/Report/report.module').then((m) => m.ReportModule),
  },
  {
    path: appRoutes.finance.payment._,
    component: FormLayoutComponent,
    loadChildren: () =>
      import('./finance-payment-desk/finance-payment-desk.module').then(
        (m) => m.FinancePaymentDeskModule
      ),
  },
  {
    path: appRoutes.finance.policy._,
    component: FormLayoutComponent,
    loadChildren: () =>
      import('../Life/policy-desk/policy-desk.module').then(
        (m) => m.PolicyDeskModule
      ),
  },
  {
    path: 'finance-setups',
    loadChildren: () =>
      import('../Finance/finance-setups/finance-setups.module').then(
        (m) => m.FinanceSetupsModule
      ),
  },
  {
    path: 'quotation',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('./finance-quotation/finance-quotation.module').then(
        (m) => m.FinanceQuotationModule
      ),
  },

  {
    path: '',
    loadChildren: () =>
      import('src/app/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'receipting-desk',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('../Finance/expense-desk/expense-desk.module').then(
        (m) => m.ExpenseDeskModule
      ),
  },
  {
    path: 'workflow-desk',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('src/app/Life/Workflow/workflow.module').then(
        (m) => m.WorkflowModule
      ),
  },
  {
    path: 'setups',
    component: FormLayoutComponent,
    children: [
      {
        path: 'expense-setup',
        component: ExpenseSetupComponent,
        data: { title: 'Setup / Expense Setup' },
      },
      {
        path: 'depreciation',
        component: DepreciationSetupComponent,
        data: {title: 'Setup / Depreciation'},
      },
      {
        path: 'cost-center-setup',
        component: ConstCenterSetupComponent,
        data: { title: 'Setup / Cost Center Setup' },
      },
      {
        path: 'allocation-setup',
        component: AllocationSetupComponent,
        data: { title: 'Setup / Allocation Setup' },
      },
      {
        path: 'accounts',
        loadChildren: () =>
          import('src/app/Life/Setup/Account/account.module').then(
            (m) => m.AccountsModule
          ),
      },
    ],
  },
  {
    path: 'setups',
    component: FormLayoutComponent,
    loadChildren: () =>
      import('src/app/Life/Setup/setup.module').then((m) => m.SetupModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceRoutingModule {}
