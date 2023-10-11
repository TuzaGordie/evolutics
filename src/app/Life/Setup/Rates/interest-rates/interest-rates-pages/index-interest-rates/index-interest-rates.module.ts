import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexInterestRatesRoutingModule } from './index-interest-rates-routing.module';
import { IndexInterestRatesComponent } from './index-interest-rates.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { UtilityPipesModule } from 'src/app/Shared/pipes/utility.pipe';

@NgModule({
  declarations: [IndexInterestRatesComponent],
  imports: [
    CommonModule,
    IndexInterestRatesRoutingModule,
    SharedModule,
    UtilityPipesModule,
  ],
})
export class IndexInterestRatesModule {}
