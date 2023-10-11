import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FindPolicyComponent } from './find-policy.component';

const routes: Routes = [{ path: '', component: FindPolicyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindPolicyRoutingModule { }
