import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyAnnuitiesComponent } from './policy-annuities.component';

const routes: Routes = [{ path: '', component: PolicyAnnuitiesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyAnnuitiesRoutingModule { }
