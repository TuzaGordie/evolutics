import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnModule } from 'src/app/Shared/components/btn/btn.module';
import { InputModule } from 'src/app/Shared/components/input/input.module';
import { TextCase1Module } from 'src/app/Shared/components/text-case-1/text-case-1.module';
import { InputMatrixModule } from 'src/app/Life/Setup/Rates/general-rates/general-rates-comps/input-matrix/input-matrix.module';
import { GeneralRatesPipesModule } from '../general-rates/general-rates-extras/general-rates.pipe';
import { LoaderModule } from 'src/app/Shared/components/loader/loader.module';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    BtnModule,
    InputModule,
    TextCase1Module,
    InputMatrixModule,
    GeneralRatesPipesModule,
    LoaderModule,
  ],
})
export class RatesSharedModule {}
