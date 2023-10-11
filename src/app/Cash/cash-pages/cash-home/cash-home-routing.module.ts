import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CashHomeComponent } from './cash-home.component';

const routes: Routes = [{ path: '', component: CashHomeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CashHomeRoutingModule { }
