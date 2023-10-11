import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreateBankAccount } from './create-bank-account/create-bank-account.component';
import { IndexBankAccounts } from './index-bank-account/index-bank-account.component';
import { StartBankAccount } from './start-bank-account/start-bank-account.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { clone, cloneDeep } from 'lodash-es';

export const bankAccountRoutes: Routes = [
  {
    path: '',
    redirectTo: 'index-bank-accounts',
    pathMatch: 'full',
    data: { title: 'Bank / Bank Accounts' },
  },
  {
    path: 'index-bank-accounts',
    component: IndexBankAccounts,
    data: { title: 'Bank / Bank Accounts' },
  },
  {
    path: 'start-bank-account',
    component: StartBankAccount,
    data: { title: 'Bank / Bank Accounts' },
  },
  {
    path: 'create-bank-account',
    component: CreateBankAccount,
    data: { title: 'Bank / Bank Accounts' },
  },
];
const routes = cloneDeep(bankAccountRoutes);
routes.forEach(
  (x) => (x.data.title = 'Set Up / Accounts / ' + x.data.title)
);
@NgModule({
  declarations: [IndexBankAccounts, StartBankAccount, CreateBankAccount],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class BankAccountsModule {} 