import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerilListRoutingModule } from './peril-list-routing.module';
import { PerilListComponent } from './peril-list.component';
import { TablePlainModule } from 'src/app/Shared/components/table-plain/table-plain.module';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [
    PerilListComponent
  ],
  imports: [
    CommonModule,
    PerilListRoutingModule,
    TablePlainModule,
SharedModule,
  ]
})
export class PerilListModule { } 