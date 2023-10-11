import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  InputMatrixComponent,
  // xAxisLabelPipe,
  // yAxisLabelPipe,
} from './input-matrix.component';
import { InputModule } from '../../../../../../Shared/components/input/input.module';
import { UtilityPipesModule } from '../../../../../../Shared/pipes/utility.pipe';
import { BtnModule } from '../../../../../../Shared/components/btn/btn.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoaderModule } from 'src/app/Shared/components/loader/loader.module';

@NgModule({
  declarations: [
    InputMatrixComponent,
    //  xAxisLabelPipe, yAxisLabelPipe
  ],
  imports: [
    CommonModule,
    InputModule,
    BtnModule,
    UtilityPipesModule,
    MatTooltipModule,
    LoaderModule,
  ],
  exports: [InputMatrixComponent],
})
export class InputMatrixModule {}
