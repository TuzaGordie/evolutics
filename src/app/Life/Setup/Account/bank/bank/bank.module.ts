import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CreateBankCode } from './create-bank-code/create-bank-code.component';
import { IndexBank } from './index-bank/index-bank.component';
import { StartBankCode } from './start-bank-code/start-bank-code.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { cloneDeep } from 'lodash-es';

export const bankRoutes: Routes = [
  {
    path: '',
    redirectTo: 'index-bank',
    pathMatch: 'full',
    data: { title: 'Bank / Local Bank List' },
  },
  {
    path: 'index-bank',
    component: IndexBank,
    data: { title: 'Bank / Local Bank List' },
  },
  {
    path: 'start-bank-code',
    component: StartBankCode,
    data: { title: 'Bank / Local Bank List' },
  },
  {
    path: 'create-bank-code',
    component: CreateBankCode,
    data: { title: 'Bank / Local Bank List' },
  },
];
const routes = cloneDeep(bankRoutes);
routes.forEach((x) => (x.data.title = 'Set Up / Accounts / ' + x.data.title));

@NgModule({
  declarations: [IndexBank, StartBankCode, CreateBankCode],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class BankModule {}
