import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  lifeSetupProductRoutes,
  ProductRoutingModule,
} from './product-routing.module';
// import { ProductComponent } from './product.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';

@NgModule({
  declarations: [ ],
  imports: [
    CommonModule,
    SharedModule,
   ComponentsModule,
      ProductRoutingModule
  ],
})
export class ProductModule {}
