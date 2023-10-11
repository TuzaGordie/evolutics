import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EVFunctions } from 'src/app/configs/base-functions';

import { CreateAccountLedgerComponent } from './AccountLedger/create-account-ledger/create-account-ledger.component';
import { StartAccountLedgerComponent } from './AccountLedger/start-account-ledger/start-account-ledger.component';
import { CreateAdjustAccountMappingComponent } from './AdjustAccountMapping/create-adjust-account-mapping/create-adjust-account-mapping.component';
import { IndexAdjustAccountMappingComponent } from './AdjustAccountMapping/index-adjust-account-mapping/index-adjust-account-mapping.component';
import { CreateBudgetComponent } from './Budget/create-budget/create-budget.component';
import { IndexBudgetComponent } from './Budget/index-budget/index-budget.component';

const routes: Routes = [
  {
    path: 'accounts',
    loadChildren: () =>
      import('./Accounts/accounts.module').then((m) => m.AccountModule),
  },
  {
    path: 'general-ledger-mapping',
    loadChildren: () =>
      import('./general-ledger-mapping/glm.module').then(
        (m) => m.AccountGeneralLedgerMappingModule
      ),
  },
  {
    path: 'payment-outward',
    loadChildren: () =>
      import('./payment-outward/payment-outward.module').then(
        (m) => m.AccountPaymentOutwardModule
      ),
  },
  {
    path: 'adjustment-account-mapping',
    loadChildren: () =>
      import('./AdjustAccountMapping/adjust-account-mapping.module').then(
        (m) => m.AdjustAccountMappingModule
      ),
  },
  {
    path: 'account-ledger',
    loadChildren: () =>
      import('./AccountLedger/account-ledger.module').then(
        (m) => m.AccountLedgerModule
      ),
  },
  {
    path: 'budget',
    loadChildren: () => import('./Budget/budget.module').then(m => m.BudgetModule)
  },
  {
    path: 'bank',
    loadChildren: () =>
      import('./bank/bank.module').then((m) => m.AccountBankModule),
  },
  {
    path: 'transaction-reason-mapping',
    loadChildren: () =>
      import('./transaction-reason-mapping/trm.module').then(
        (m) => m.AccountTransactionReasonMappingModule
      ),
  },
  {
    path: 'financial-statement',
    loadChildren: () =>
      import('./financial-statement/financial-statement.module').then(
        (m) => m.AccountFinancialStatementModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
