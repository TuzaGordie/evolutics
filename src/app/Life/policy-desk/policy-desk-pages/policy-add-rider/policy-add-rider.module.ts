import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyAddRiderRoutingModule } from './policy-add-rider-routing.module';
import { PolicyAddRiderComponent } from './policy-add-rider.component';
import { TablePlainModule } from '../../../../Shared/components/table-plain/table-plain.module';
import { PdSharedModule } from '../../policy-desk-extras/pd-shared.module';
import { SelectCoversModule } from 'src/app/Life/life-components/select-covers/select-covers.module';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [PolicyAddRiderComponent],
  imports: [
    CommonModule,
    PolicyAddRiderRoutingModule,
    TablePlainModule,
    PdSharedModule,
    SelectCoversModule,
    SharedModule
  ],
})
export class PolicyAddRiderModule {}
