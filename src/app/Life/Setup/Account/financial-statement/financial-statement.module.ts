import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { IndexAccountClassComponent } from './account-class/index-account-class/index-account-class.component';
import { CreateAccountClassComponent } from './account-class/create-account-class/create-account-class.component';
import { IndexAccountLineComponent } from './account-line/index-account-line/index-account-line.component';
import { CreateAccountLineComponent } from './account-line/create-account-line/create-account-line.component';
import { IndexFinancialStatementComponent } from './financial-statement/index-financial-statement/index-financial-statement.component';
import { CreateFinancialStatementComponent } from './financial-statement/create-financial-statement/create-financial-statement.component';
import { ComponentsModule } from 'src/app/Shared/components/components.module';

const ROUTES: Routes = [
  {
    path: 'account-line',
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      {
        path: 'index',
        component: IndexAccountLineComponent,
        data: {
          title: 'Set Up / Accounts / Financial Statement / Account Line',
        },
      },
      {
        path: 'create',
        component: CreateAccountLineComponent,
        data: {
          title: 'Set Up / Accounts / Financial Statement / Account Line',
        },
      },
    ],
  },
  {
    path: 'account-class',
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      {
        path: 'index',
        component: IndexAccountClassComponent,
        data: {
          title: 'Set Up / Accounts / Financial Statement / Account Class',
        },
      },
      {
        path: 'create',
        component: CreateAccountClassComponent,
        data: {
          title: 'Set Up / Accounts / Financial Statement / Account Class',
        },
      },
    ],
  },
  {
    path: 'financial-statement',
    children: [
      { path: '', redirectTo: 'index', pathMatch: 'full' },
      {
        path: 'index',
        component: IndexFinancialStatementComponent,
        data: {
          title:
            'Set Up / Accounts / Financial Statement / Financial Statement',
        },
      },
      {
        path: 'create',
        component: CreateFinancialStatementComponent,
        data: {
          title:
            'Set Up / Accounts / Financial Statement / Financial Statement',
        },
      },
    ],
  },
];

@NgModule({
  declarations: [
    IndexAccountClassComponent,
    CreateAccountClassComponent,
    IndexAccountLineComponent,
    CreateAccountLineComponent,
    IndexFinancialStatementComponent,
    CreateFinancialStatementComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES),
    ComponentsModule,
  ],
})
export class AccountFinancialStatementModule {}
