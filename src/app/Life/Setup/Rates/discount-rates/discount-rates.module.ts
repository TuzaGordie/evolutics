import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountRatesRoutingModule } from './discount-rates-routing.module';
import { UtilityPipesModule } from 'src/app/Shared/pipes/utility.pipe';
import { SharedModule } from 'src/app/Shared/shared.module';
import { CreateDiscountRateComponent } from './discount-rates-pages/create-discount-rates/create-discount-rates.component';
import { IndexDiscountRatesComponent } from './discount-rates-pages/index-discount-rates/index-discount-rates.component';
import { DiscountRatesService } from './discount-rates-extras/discount-rates.service';
import { ComponentsModule } from 'src/app/Shared/components/components.module';

@NgModule({
  declarations: [CreateDiscountRateComponent, IndexDiscountRatesComponent],
  imports: [
    CommonModule,
    DiscountRatesRoutingModule,
    SharedModule,
    UtilityPipesModule,ComponentsModule
  ],providers:[DiscountRatesService]
})
export class DiscountRatesModule {}
