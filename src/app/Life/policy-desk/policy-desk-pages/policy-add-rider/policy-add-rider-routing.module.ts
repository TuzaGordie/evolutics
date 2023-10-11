import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyAddRiderComponent } from './policy-add-rider.component';

const routes: Routes = [{ path: '', component: PolicyAddRiderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyAddRiderRoutingModule { }
