import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimDeskComponent } from './claim-desk/claim-desk.component';
import { AuthorisePaymentOutwardComponent } from './finance-controls/authorize-payment-outward/authorize-payment-outward.component';
import { CommissionAdjustmentComponent } from './finance-controls/commission-adjustment/commission-adjustment.component';
import { PolicyAccountingComponent } from './finance-controls/policy-accounting/policy-accounting.component';
import { ReceiptComponent } from './finance-controls/receipt/receipt.component';
import { SuspenseSwitchComponent } from './finance-controls/suspense-switch/suspense-switch.component';
import { AddCostAllocationComponent } from './finance-cost-accounting/add-cost-allocation/add-cost-allocation.component';
import { AddCostCenterComponent } from './finance-cost-accounting/add-cost-center/add-cost-center.component';
import { AddCostObjectComponent } from './finance-cost-accounting/add-cost-object/add-cost-object.component';
import { AddCostTypeComponent } from './finance-cost-accounting/add-cost-type/add-cost-type.component';
import { CostAllocationComponent } from './finance-cost-accounting/cost-allocation/cost-allocation.component';
import { CostBudgetComponent } from './finance-cost-accounting/cost-budget/cost-budget.component';
import { CostCentersComponent } from './finance-cost-accounting/cost-centers/cost-centers.component';
import { CostObjectsComponent } from './finance-cost-accounting/cost-objects/cost-objects.component';
import { CostTypeComponent } from './finance-cost-accounting/cost-type/cost-type.component';
import { CreateAccountJournalComponent } from './finance-payment-desk-pages/create-account-journal/create-account-journal.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../../Life/payment-desk/payment-desk.module').then(m=>m.PaymentDeskModule),
  },

  {
    path: 'create',
    component: CreateAccountJournalComponent,
    data: { title: 'Accounting Desk / Create Account Journal' },
  },
  {
    path: 'controls/authorize-payment-outward',
    component: AuthorisePaymentOutwardComponent,
    data: { title: 'Payment / Authorize-Payment-Outward' },
  },
  {
    path: 'controls/claim',
    component: ClaimDeskComponent,
    data: { title: 'Payment / Claim' },
  },
  {
    path: 'controls/account',
    component: PolicyAccountingComponent,
    data: { title: 'Payment / Policy-Accounting' },
  },
  {
    path: 'controls/receipt',
    component: ReceiptComponent,
    data: { title: 'Payment / Controls / Receipt' },
  },
  {
    path: 'controls/auth-suspense-switch',
    component: SuspenseSwitchComponent,
    data: { title: 'Payment / Auth-Suspense-Switch' },
  },
  {
    path: 'controls/auth-com-adjustment',
    component: CommissionAdjustmentComponent,
    data: { title: 'Payment / Auth-Commossion-adjustment' },
  },
  {
    path: 'cost-accounting/cost-type',
    component: CostTypeComponent,
    data: { title: 'Cost Accounting / Cost-type' },
  },
  {
    path: 'cost-accounting/add-cost-type',
    component: AddCostTypeComponent,
    data: { title: 'Cost Accounting /Add-Cost-type' },
  },
  {
    path: 'cost-accounting/cost-center',
    component: CostCentersComponent,
    data: { title: 'Cost Accounting / Cost-Center' },
  },
  {
    path: 'cost-accounting/add-cost-center',
    component: AddCostCenterComponent,
    data: { title: 'Cost Accounting / Add-Cost-Center' },
  },
  {
    path: 'cost-accounting/cost-objects',
    component: CostObjectsComponent,
    data: { title: 'Cost Accounting / Cost-Objects' },
  },
  {
    path: 'cost-accounting/add-cost-objects',
    component: AddCostObjectComponent,
    data: { title: 'Cost Accounting / Add-Cost-Objects' },
  },
  {
    path: 'cost-accounting/cost-allocation',
    component: CostAllocationComponent,
    data: { title: 'Cost Accounting / Cost-Allocation' },
  },
  {
    path: 'cost-accounting/create-cost-allocation',
    component: AddCostAllocationComponent,
    data: { title: 'Cost Accounting / Cost-Allocation' },
  },
  {
    path: 'cost-accounting/cost-budget',
    component: CostBudgetComponent,
    data: { title: 'Cost Accounting / Cost-Budget' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinancePaymentDeskRoutingModule {}
