import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralRatesRoutingModule } from './general-rates-routing.module';
import { UtilityService } from 'src/app/Services/utility.service';
import { GeneralRatesService } from './general-rates-extras/general-rates.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, GeneralRatesRoutingModule],
  providers: [UtilityService],
  exports: [],
})
export class GeneralRatesModule {}
