import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';  
import { CreateSortCode } from './sort-code/create-sort-code/create-sort-code.component';
import { IndexSortCode } from './sort-code/index-sort-code/index-sort-code.component';
import { StartSortCode } from './sort-code/start-sort-code/start-sort-code.component';
import { ComponentsModule } from 'src/app/Shared/components/components.module';

const routes: Routes = [
  {
    path: 'sort-code',
    children: [
      { path: '', redirectTo: 'index-sort-code', pathMatch: 'full' },
      {
        path: 'index-sort-code',
        component: IndexSortCode,
        data: { title: 'Set Up / Accounts  / Bank / Sort Code' },
      },
      {
        path: 'start-sort-code',
        component: StartSortCode,
        data: { title: 'Set Up / Accounts  / Bank / Sort Code' },
      },
      {
        path: 'create-sort-code',
        component: CreateSortCode,
        data: { title: 'Set Up / Accounts  / Bank / Sort Code' },
      },
    ],
  },
  {
    path: 'bank',
    loadChildren: () => import('./bank/bank.module').then((m) => m.BankModule),
  },
  {
    path: 'bank-accounts',
    loadChildren: () =>
      import('./bank-accounts/bank-accounts.module').then(
        (m) => m.BankAccountsModule
      ),
  },
];

@NgModule({
  declarations: [ 
    IndexSortCode,
    StartSortCode,
    CreateSortCode,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ComponentsModule,
  ],
})
export class AccountBankModule {}
