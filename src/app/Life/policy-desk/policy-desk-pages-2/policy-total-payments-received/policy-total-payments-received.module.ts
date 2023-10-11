import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyTotalPaymentsReceivedRoutingModule } from './policy-total-payments-received-routing.module';
import { PolicyTotalPaymentsReceivedComponent } from './policy-total-payments-received.component';
import { PdSharedModule } from '../../policy-desk-extras/pd-shared.module';
import { TablePlainModule } from '../../../../Shared/components/table-plain/table-plain.module';
import { SharedModule } from '../../../../Shared/shared.module';

@NgModule({
  declarations: [PolicyTotalPaymentsReceivedComponent],
  imports: [
    CommonModule,
    PolicyTotalPaymentsReceivedRoutingModule,
    PdSharedModule,
    TablePlainModule,
    SharedModule,
  ],
})
export class PolicyTotalPaymentsReceivedModule {}
