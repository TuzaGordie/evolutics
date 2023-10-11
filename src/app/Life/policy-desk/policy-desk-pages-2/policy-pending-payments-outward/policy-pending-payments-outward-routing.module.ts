import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyPendingPaymentsOutwardComponent } from './policy-pending-payments-outward.component';

const routes: Routes = [{ path: '', component: PolicyPendingPaymentsOutwardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyPendingPaymentsOutwardRoutingModule { }
