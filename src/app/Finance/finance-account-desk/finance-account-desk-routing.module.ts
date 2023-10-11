import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  StartAccountLedgerComponent
} from '../../Life/Setup/Account/AccountLedger/start-account-ledger/start-account-ledger.component';
import {
  CreateAccountLedgerComponent
} from '../../Life/Setup/Account/AccountLedger/create-account-ledger/create-account-ledger.component';
import {IndexBudgetComponent} from '../../Life/Setup/Account/Budget/index-budget/index-budget.component';
import {CreateBudgetComponent} from '../../Life/Setup/Account/Budget/create-budget/create-budget.component';
import {
  CreateAccountJournalComponent
} from '../finance-payment-desk/finance-payment-desk-pages/create-account-journal/create-account-journal.component';
import {
  AuthorisePaymentOutwardComponent
} from '../finance-payment-desk/finance-controls/authorize-payment-outward/authorize-payment-outward.component';
import {ClaimDeskComponent} from '../finance-payment-desk/claim-desk/claim-desk.component';
import {
  PolicyAccountingComponent
} from '../finance-payment-desk/finance-controls/policy-accounting/policy-accounting.component';
import {ReceiptComponent} from '../finance-payment-desk/finance-controls/receipt/receipt.component';
import {
  SuspenseSwitchComponent
} from '../finance-payment-desk/finance-controls/suspense-switch/suspense-switch.component';
import {
  CommissionAdjustmentComponent
} from '../finance-payment-desk/finance-controls/commission-adjustment/commission-adjustment.component';
import {CostTypeComponent} from '../finance-payment-desk/finance-cost-accounting/cost-type/cost-type.component';
import {
  AddCostTypeComponent
} from '../finance-payment-desk/finance-cost-accounting/add-cost-type/add-cost-type.component';
import {
  CostCentersComponent
} from '../finance-payment-desk/finance-cost-accounting/cost-centers/cost-centers.component';
import {
  AddCostCenterComponent
} from '../finance-payment-desk/finance-cost-accounting/add-cost-center/add-cost-center.component';
import {
  CostObjectsComponent
} from '../finance-payment-desk/finance-cost-accounting/cost-objects/cost-objects.component';
import {
  AddCostObjectComponent
} from '../finance-payment-desk/finance-cost-accounting/add-cost-object/add-cost-object.component';
import {
  CostAllocationComponent
} from '../finance-payment-desk/finance-cost-accounting/cost-allocation/cost-allocation.component';
import {
  AddCostAllocationComponent
} from '../finance-payment-desk/finance-cost-accounting/add-cost-allocation/add-cost-allocation.component';
import {CostBudgetComponent} from '../finance-payment-desk/finance-cost-accounting/cost-budget/cost-budget.component';
import {CreateExpenseJournalComponent} from './create-expense-journal/create-expense-journal.component';
import {bankAccountRoutes} from 'src/app/Life/Setup/Account/bank/bank-accounts/bank-accounts.module';
import {cloneDeep} from 'lodash-es';
import {bankRoutes} from 'src/app/Life/Setup/Account/bank/bank/bank.module';
import {CompanyAssetsComponent} from "./company-assets/company-assets.component";
import {FinanceFinancialStatementComponent} from "./finance-financial-statement/finance-financial-statement.component";

const bankAccountRoutesClone = cloneDeep(bankAccountRoutes);
bankAccountRoutesClone.forEach(
  (x) => (x.data.title = 'Accounting Desk / ' + x.data.title)
);
const bankRoutesClone = cloneDeep(bankRoutes);
bankRoutesClone.forEach(
  (x) => (x.data.title = 'Accounting Desk / ' + x.data.title)
);
const routes: Routes = [
  {
    path: 'create',
    component: CreateAccountJournalComponent,
    data: { title: 'Accounting Desk / Accounting / Create Account Journal' },
  },
  {
    path: 'create-expense-journal',
    component: CreateExpenseJournalComponent,
    data: { title: 'Accounting Desk / Accounting / Create Expense Journal' },
  },
  {
    path: 'company-assets',
    component: CompanyAssetsComponent,
    data: { title: 'Accounting Desk / Accounting / Company Assets' },
  },
  {
    path: 'financial-statement',
    component: FinanceFinancialStatementComponent,
    data: { title: 'Accounting Desk / Accounting / Financial Statement' },
  },
  {
    path: 'controls/authorize-payment-outward',
    component: AuthorisePaymentOutwardComponent,
    data: { title: 'Controls / Payment Outward' },
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
    data: { title: 'Accounting Desk / Control / Suspense Switch' },
  },
  {
    path: 'controls/auth-com-adjustment',
    component: CommissionAdjustmentComponent,
    data: {
      title: 'Accounting Desk / Control / Authorize Commission Adjustment',
    },
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
  {
    path: 'accounts',
    loadChildren: () =>
      import('./accounts/accounts.module').then((m) => m.AccountsModule),
  },
  {
    path: 'general-ledger-mapping',
    loadChildren: () =>
      import('./general-ledger-mapping/general-ledger-mapping.module').then(
        (m) => m.GeneralLedgerMappingModule
      ),
  },
  {
    path: 'payment-outward',
    loadChildren: () =>
      import(
        '../../Life/Setup/Account/payment-outward/payment-outward.module'
      ).then((m) => m.AccountPaymentOutwardModule),
  },

  {
    path: 'adjustment-account-mapping',
    loadChildren: () =>
      import(
        './adjustment-account-mapping/adjustment-account-mapping.module'
      ).then((m) => m.AdjustmentAccountMappingModule),
  },
  {
    path: 'account-ledger',
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      {
        path: 'index',
        component: StartAccountLedgerComponent,
        data: { title: 'Accounts / Account Ledger' },
      },
      {
        path: 'create',
        component: CreateAccountLedgerComponent,
        data: { title: 'Accounts / Create Account Ledger' },
      },
    ],
  },
  {
    path: 'budget',
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      {
        path: 'index',
        component: IndexBudgetComponent,
        data: { title: 'Accounts / Budget' },
      },
      {
        path: 'create',
        component: CreateBudgetComponent,
        data: { title: 'Accounts / Create Budget' },
      },
    ],
  },
  {
    path: 'bank',
    children: [
      {
        path: 'bank',
        children: bankRoutesClone,
      },
      {
        path: 'bank-account',
        children: bankAccountRoutesClone,
      },
    ],
  },
  {
    path: 'transaction-reason-mapping',
    loadChildren: () =>
      import(
        './transaction-reason-mapping/transaction-reason-mapping.module'
      ).then((m) => m.TransactionReasonMappingModule),
  },
  {
    path: 'financial-statement',
    loadChildren: () =>
      import('./financial-statement/financial-statement.module').then(
        (m) => m.FinancialStatementModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinanceAccountDeskRoutingModule {}
