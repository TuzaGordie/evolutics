import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewExpenseComponent } from './expense-pages/receipting/create-new/create-new.component';
import { UnpostedComponent } from './expense-pages/receipting/unposted/unposted.component';
import { UnreconciliedComponent } from './expense-pages/receipting/unreconcilied/unreconcilied.component';

const routes: Routes = [
  {
    path: 'overview',
    loadChildren: () =>
      import('./expense-pages/expense-overview/expense-overview.module').then(
        (m) => m.ExpenseOverviewModule
      ),
    data: { title: 'Receipting Desk / Overview' },
  },

  {
    path: 'create-new',
    data: { title: 'Receipting Desk / Create New' },
    component: CreateNewExpenseComponent,
  },
  {
    path: 'unreconciled',
    data: { title: 'Receipting Desk / Unreconciled' },
    component: UnreconciliedComponent,
  },
  {
    path: 'unposted',
    data: { title: 'Receipting Desk / Unposted' },
    component: UnpostedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpenseDeskRoutingModule {}
