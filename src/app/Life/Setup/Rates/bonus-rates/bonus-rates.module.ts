import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BonusRatesRoutingModule } from './bonus-rates-routing.module';

import { IndexBonusRatesComponent } from './bonus-rates-pages/index-bonus-rates/index-bonus-rates.component'; 
import { CreateBonusRateComponent } from './bonus-rates-pages/create-bonus-rates/create-bonus-rates.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { UtilityPipesModule } from 'src/app/Shared/pipes/utility.pipe';
import { BonusRatesService } from './bonus-rates-extras/bonus-rates.service';

@NgModule({
  declarations: [ 
    IndexBonusRatesComponent, 
    CreateBonusRateComponent,
  ],
  imports: [CommonModule, BonusRatesRoutingModule, SharedModule,ComponentsModule,UtilityPipesModule],
  providers:[BonusRatesService]
})
export class BonusRatesModule {}
