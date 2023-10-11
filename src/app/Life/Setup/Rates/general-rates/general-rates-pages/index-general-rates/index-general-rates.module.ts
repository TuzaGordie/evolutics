import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexGeneralRatesRoutingModule } from './index-general-rates-routing.module';
import { IndexGeneralRatesComponent } from './index-general-rates.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { UtilityPipesModule } from 'src/app/Shared/pipes/utility.pipe';
import { GeneralRatesService } from '../../general-rates-extras/general-rates.service';

@NgModule({
  declarations: [IndexGeneralRatesComponent],
  imports: [
    CommonModule,
    IndexGeneralRatesRoutingModule,
    SharedModule,
    UtilityPipesModule,
  ], providers: [GeneralRatesService]
})
export class IndexGeneralRatesModule {}
