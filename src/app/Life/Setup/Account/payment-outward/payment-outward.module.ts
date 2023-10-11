import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { CreatePaymentOutward } from './create/create-payment-outward.component';
import { IndexPaymentOutward } from './index-payment-outward/index-payment-outward.component';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { EPageType } from 'src/app/Shared/models/index.model';

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    path: 'index',
    component: IndexPaymentOutward,
    data: { title: 'Set Up / Accounts  / Payment Outward' },
  },
  {
    path: 'show',
    component: CreatePaymentOutward,
    data: {
      title: 'Set Up / Accounts / Show Payment Outward',
      type: EPageType.showPage,
    },
  },
  {
    path: 'create',
    component: CreatePaymentOutward,
    data: {
      title: 'Set Up / Accounts / Create Payment Outward',
      type: EPageType.createPage,
    },
  },
  {
    path: 'edit',
    component: CreatePaymentOutward,
    data: {
      title: 'Set Up / Accounts / Edit Payment Outward',
      type: EPageType.editPage,
    },
  },
  {
    path: 'clone',
    component: CreatePaymentOutward,
    data: {
      title: 'Set Up / Accounts / Clone Payment Outward',
      type: EPageType.clonePage,
    },
  },
];

@NgModule({
  declarations: [IndexPaymentOutward, CreatePaymentOutward],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ComponentsModule,
  ],
})
export class AccountPaymentOutwardModule {}
