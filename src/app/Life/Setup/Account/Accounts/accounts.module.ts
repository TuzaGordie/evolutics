import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { CreateAccountAccounts } from './create-accounts/create-accounts.component';
import { IndexAccountAccounts } from './index-accounts/index-accounts.component';
import { StartAccountAccounts } from './start-accounts/start-accounts.component';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { EPageType } from 'src/app/Shared/models/index.model';

const routes: Routes = [
  {
    path: 'index-account',
    component: IndexAccountAccounts,
    data: { title: 'Set Up / Accounts / Account Code' },
  },
  {
    path: 'create',
    component: CreateAccountAccounts,
    data: { title: 'Set Up / Accounts / Create Account Code', type: EPageType.createPage },
  },
  {
    path: 'clone',
    component: CreateAccountAccounts,
    data: { title: 'Set Up / Accounts / Clone Account Code', type: EPageType.clonePage },
  },
  {
    path: 'show',
    component: CreateAccountAccounts,
    data: { title: 'Set Up / Accounts / Show Account Code', type: EPageType.showPage },
  },
  {
    path: 'edit',
    component: CreateAccountAccounts,
    data: { title: 'Set Up / Accounts / Edit Account Code', type: EPageType.editPage },
  },
];

@NgModule({
  declarations: [
    StartAccountAccounts,
    CreateAccountAccounts,
    IndexAccountAccounts,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ComponentsModule,
  ],
})
export class AccountModule {}
