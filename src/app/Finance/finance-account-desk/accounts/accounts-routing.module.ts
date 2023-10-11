import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { CreateAccountAccounts } from 'src/app/Life/Setup/Account/Accounts/create-accounts/create-accounts.component';
import { IndexAccountAccounts } from 'src/app/Life/Setup/Account/Accounts/index-accounts/index-accounts.component';
import { StartAccountAccounts } from 'src/app/Life/Setup/Account/Accounts/start-accounts/start-accounts.component';

const routes: Routes = [
  { path: '', redirectTo: 'start-account', pathMatch: 'full' },
  {
    path: 'start-account',
    component: StartAccountAccounts,
    data: { title: 'Accounting Desk / Accounts' },
  },
  {
    path: 'create-account',
    component: CreateAccountAccounts,
    data: { title: 'Accounting Desk / Create Account' },
  },
  {
    path: 'index-account',
    component: IndexAccountAccounts,
    data: { title: 'Accounting Desk / Accounts' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
