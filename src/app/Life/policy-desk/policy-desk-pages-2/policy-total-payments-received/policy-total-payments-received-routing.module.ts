import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyTotalPaymentsReceivedComponent } from './policy-total-payments-received.component';

const routes: Routes = [{ path: '', component: PolicyTotalPaymentsReceivedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyTotalPaymentsReceivedRoutingModule { }
