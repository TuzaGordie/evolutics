import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateShortTermRatesRoutingModule } from './create-short-term-rates-routing.module';
import { CreateShortTermRatesComponent } from './create-short-term-rates.component';
import { ShortTermRatesService } from '../../short-term-rates-extras/short-term-rates.service';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [
    CreateShortTermRatesComponent
  ],
  imports: [
    CommonModule,
    CreateShortTermRatesRoutingModule, SharedModule
  ], providers: [ShortTermRatesService]
})
export class CreateShortTermRatesModule { }
