import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseOverviewRoutingModule } from './expense-overview-routing.module';
import { ExpenseOverviewComponent } from './expense-overview.component';


@NgModule({
  declarations: [
    ExpenseOverviewComponent
  ],
  imports: [
    CommonModule,
    ExpenseOverviewRoutingModule
  ]
})
export class ExpenseOverviewModule { }
