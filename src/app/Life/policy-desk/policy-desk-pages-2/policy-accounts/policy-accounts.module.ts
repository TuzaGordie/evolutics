import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyAccountsRoutingModule } from './policy-accounts-routing.module';
import { PolicyAccountsComponent } from './policy-accounts.component';
import { PdSharedModule } from '../../policy-desk-extras/pd-shared.module';
import { TablePlainModule } from '../../../../Shared/components/table-plain/table-plain.module';
import { CreateAccountTransactionComponent } from './create-account-transaction/create-account-transaction.component';
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  declarations: [PolicyAccountsComponent, CreateAccountTransactionComponent],
  imports: [
    CommonModule,
    PolicyAccountsRoutingModule,
    PdSharedModule,
    TablePlainModule,
    SharedModule
  ],
  exports: [CreateAccountTransactionComponent],
})
export class PolicyAccountsModule {}
