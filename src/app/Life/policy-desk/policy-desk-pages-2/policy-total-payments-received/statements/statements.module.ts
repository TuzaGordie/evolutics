import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatementsRoutingModule } from './statements-routing.module';
import { StatementsComponent } from './statements.component';
import { PdSharedModule } from '../../../policy-desk-extras/pd-shared.module';
import { TablePlainModule } from '../../../../../Shared/components/table-plain/table-plain.module';

@NgModule({
  declarations: [StatementsComponent],
  imports: [
    CommonModule,
    StatementsRoutingModule,
    PdSharedModule,
    TablePlainModule,
  ],
})
export class StatementsModule {}
