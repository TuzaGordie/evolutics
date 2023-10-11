import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FindPolicyRoutingModule } from './find-policy-routing.module';
import { FindPolicyComponent } from './find-policy.component';
import { PdSharedModule } from '../../policy-desk-extras/pd-shared.module';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [FindPolicyComponent],
  imports: [
    CommonModule,
    FindPolicyRoutingModule,
    PdSharedModule,
    SharedModule
  ],
})
export class FindPolicyModule {}
