import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LifeSetupProductCodeRoutingModule } from './life-setup-product-code-routing.module';
import { SharedModule } from 'src/app/Shared/shared.module';
 
import { IndexProductCodeComponent } from './index-product-code/index-product-code.component'; 
import { ComponentsModule } from 'src/app/Shared/components/components.module';

@NgModule({
  declarations:[ 
  IndexProductCodeComponent, 
] ,
  imports: [
    CommonModule,
    LifeSetupProductCodeRoutingModule,
    SharedModule,ComponentsModule
  ],
})
export class LifeSetupProductCodeModule {} 