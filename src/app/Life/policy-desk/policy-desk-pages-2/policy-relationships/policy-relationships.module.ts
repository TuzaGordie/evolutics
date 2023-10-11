import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyRelationshipsRoutingModule } from './policy-relationships-routing.module';
import { PolicyRelationshipsComponent } from './policy-relationships.component';
import { PdSharedModule } from '../../policy-desk-extras/pd-shared.module';
import { TablePlainModule } from '../../../../Shared/components/table-plain/table-plain.module';
import { UtilityPipesModule } from 'src/app/Shared/pipes/utility.pipe';

@NgModule({
  declarations: [PolicyRelationshipsComponent],
  imports: [
    CommonModule,
    PolicyRelationshipsRoutingModule,
    TablePlainModule,
    PdSharedModule,
    UtilityPipesModule,
  ],
})
export class PolicyRelationshipsModule {}
