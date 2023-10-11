import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyAccountsComponent } from './policy-accounts.component';

const routes: Routes = [{ path: '', component: PolicyAccountsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyAccountsRoutingModule { }
