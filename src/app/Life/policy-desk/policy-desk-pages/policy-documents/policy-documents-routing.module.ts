import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyDocumentsComponent } from './policy-documents.component';

const routes: Routes = [{ path: '', component: PolicyDocumentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicyDocumentsRoutingModule { }
