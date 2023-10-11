import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommissionListRoutingModule } from './commission-list-routing.module';
import { CommissionListComponent } from './commission-list.component';
import { TablePlainModule } from 'src/app/Shared/components/table-plain/table-plain.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MakeAdvancedPaymentModule } from './make-advanced-payment/make-advanced-payment.module';
import { ManualCommissionsModule } from './manual-commissions/manual-commissions.module';


@NgModule({
  declarations: [
    CommissionListComponent
  ],
  imports: [
    CommonModule,
    CommissionListRoutingModule,
    TablePlainModule,
SharedModule,
    ManualCommissionsModule,
    MakeAdvancedPaymentModule,
  ]
})
export class CommissionListModule { }
