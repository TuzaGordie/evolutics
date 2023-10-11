import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommissionListComponent } from './commission-list.component';

const routes: Routes = [{ path: '', component: CommissionListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommissionListRoutingModule { }
