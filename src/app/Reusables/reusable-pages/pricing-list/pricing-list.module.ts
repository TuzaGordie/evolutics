import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricingListRoutingModule } from './pricing-list-routing.module';
import { PricingListComponent } from './pricing-list.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { TablePlainModule } from 'src/app/Shared/components/table-plain/table-plain.module';


@NgModule({
  declarations: [
    PricingListComponent
  ],
  imports: [
    CommonModule,
    PricingListRoutingModule,
    SharedModule,
    TablePlainModule,
  ]
})
export class PricingListModule { }
