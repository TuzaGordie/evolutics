import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FutureActionListRoutingModule } from './future-action-list-routing.module';
import { FutureActionListComponent } from './future-action-list.component';
import { TablePlainModule } from 'src/app/Shared/components/table-plain/table-plain.module';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [
    FutureActionListComponent
  ],
  imports: [
    CommonModule,
    FutureActionListRoutingModule,
    TablePlainModule,
SharedModule,
  ]
})
export class FutureActionListModule { }
