import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyRelationshipsComponent } from './policy-relationships.component';

const routes: Routes = [{ path: '', component: PolicyRelationshipsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyRelationshipsRoutingModule { }
