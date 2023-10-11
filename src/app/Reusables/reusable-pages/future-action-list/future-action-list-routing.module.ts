import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FutureActionListComponent } from './future-action-list.component';

const routes: Routes = [{ path: '', component: FutureActionListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FutureActionListRoutingModule { }
