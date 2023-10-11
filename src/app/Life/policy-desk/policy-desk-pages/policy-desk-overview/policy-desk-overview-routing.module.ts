import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyDeskOverviewComponent } from './policy-desk-overview.component';

const routes: Routes = [{ path: '', component: PolicyDeskOverviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyDeskOverviewRoutingModule { }
