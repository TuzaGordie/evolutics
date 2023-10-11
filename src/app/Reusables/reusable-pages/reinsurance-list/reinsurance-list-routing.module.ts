import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReinsuranceListComponent } from './reinsurance-list.component';

const routes: Routes = [{ path: '', component: ReinsuranceListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReinsuranceListRoutingModule { }
