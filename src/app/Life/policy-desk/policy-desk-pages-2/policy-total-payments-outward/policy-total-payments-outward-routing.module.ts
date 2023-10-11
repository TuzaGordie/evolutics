import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyTotalPaymentsOutwardComponent } from './policy-total-payments-outward.component';

const routes: Routes = [{ path: '', component: PolicyTotalPaymentsOutwardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyTotalPaymentsOutwardRoutingModule { }
