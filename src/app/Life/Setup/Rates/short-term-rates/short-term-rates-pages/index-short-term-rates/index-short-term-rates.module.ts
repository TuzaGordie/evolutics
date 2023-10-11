import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexShortTermRatesRoutingModule } from './index-short-term-rates-routing.module';
import { IndexShortTermRatesComponent } from './index-short-term-rates.component';
import { ShortTermRatesService } from '../../short-term-rates-extras/short-term-rates.service';
import { SharedModule } from 'src/app/Shared/shared.module';
import { UtilityPipesModule } from 'src/app/Shared/pipes/utility.pipe';


@NgModule({
  declarations: [
    IndexShortTermRatesComponent
  ],
  imports: [
    CommonModule,
    IndexShortTermRatesRoutingModule, SharedModule, UtilityPipesModule
  ], providers: [ShortTermRatesService]
})
export class IndexShortTermRatesModule { }
