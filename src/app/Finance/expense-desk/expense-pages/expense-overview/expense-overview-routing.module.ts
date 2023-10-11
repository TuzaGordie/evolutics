import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseOverviewComponent } from './expense-overview.component';

const routes: Routes = [{ path: '', component: ExpenseOverviewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseOverviewRoutingModule { }
