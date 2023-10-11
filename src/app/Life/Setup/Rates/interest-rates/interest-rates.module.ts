import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InterestRatesRoutingModule } from './interest-rates-routing.module';

import { CreateInterestRateComponent } from './interest-rates-pages/create-interest-rates/create-interest-rates.component';

import { SharedModule } from 'src/app/Shared/shared.module'; 
import { InterestRatesService } from './interest-rates-extras/interest-rates.service';
import { UtilityPipesModule } from 'src/app/Shared/pipes/utility.pipe';

@NgModule({
  declarations: [
    CreateInterestRateComponent 
  ],
  imports: [CommonModule, InterestRatesRoutingModule, SharedModule,UtilityPipesModule],
  providers: [InterestRatesService],
})
export class InterestRatesModule {}
