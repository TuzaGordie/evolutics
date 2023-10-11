import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxRatesRoutingModule } from './tax-rates-routing.module'; 
import { IndexTaxRatesComponent } from './tax-rates-pages/index-tax-rates/index-tax-rates.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { UtilityPipesModule } from 'src/app/Shared/pipes/utility.pipe';
import { TaxRatesService } from './tax-rates-extras/tax-rates.service';
import { CreateTaxRateComponent } from './tax-rates-pages/create-tax-rates/create-tax-rates.component';

@NgModule({
  declarations: [CreateTaxRateComponent, IndexTaxRatesComponent],
  imports: [
    CommonModule,
    TaxRatesRoutingModule,
    SharedModule,
    UtilityPipesModule,
  ],
  providers: [ TaxRatesService ],
})
export class TaxRatesModule {}
