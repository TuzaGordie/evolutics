import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPolicyListComponent } from './search-policy-list.component';

const routes: Routes = [{ path: '', component: SearchPolicyListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchPolicyListRoutingModule { }
