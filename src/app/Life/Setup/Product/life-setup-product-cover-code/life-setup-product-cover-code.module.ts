import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LifeSetupProductCoverCodeRoutingModule } from './life-setup-product-cover-code-routing.module';  
import { IndexCoverCodeModule } from './index-cover-code/index-cover-code.module';
import { CreateCoverCodeModule } from './create-cover-code/create-cover-code.module';

@NgModule({
  declarations: [
   
  ],
  imports: [
    CommonModule,
    LifeSetupProductCoverCodeRoutingModule,IndexCoverCodeModule,CreateCoverCodeModule
  ],
})
export class LifeSetupProductCoverCodeModule {}
