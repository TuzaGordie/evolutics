import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyPendingPaymentsOutwardRoutingModule } from './policy-pending-payments-outward-routing.module';
import { PolicyPendingPaymentsOutwardComponent } from './policy-pending-payments-outward.component';


@NgModule({
  declarations: [
    PolicyPendingPaymentsOutwardComponent
  ],
  imports: [
    CommonModule,
    PolicyPendingPaymentsOutwardRoutingModule
  ]
})
export class PolicyPendingPaymentsOutwardModule { }
