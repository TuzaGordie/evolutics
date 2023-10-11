import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexBudgetComponent } from './index-budget/index-budget.component';
import { CreateBudgetComponent } from './create-budget/create-budget.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { RouterModule } from '@angular/router';
import { EVFunctions } from 'src/app/configs/base-functions';

const ROUTES = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    path: 'index',
    component: IndexBudgetComponent,
    data: { title: 'Budget / Index' },
  },
  ...EVFunctions.extendRoute(
    {
      path: '',
      data: { title: 'Budget' },
      component: CreateBudgetComponent,
    },
    IndexBudgetComponent
  ),
];

ROUTES.forEach((x) => {
  x.data?.title ? (x.data.title = 'Set Up / Accounts / ' + x.data.title) : null;
});

@NgModule({
  declarations: [IndexBudgetComponent, CreateBudgetComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
    ComponentsModule,
  ],
})
export class BudgetModule {}
