import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputPipesModule } from 'src/app/Shared/pipes/inputs-pipes.pipe';
import { InputBasicComponent } from './input-basic.component';

import { Pipe, PipeTransform } from '@angular/core';
import { BtnModule } from '../btn/btn.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  ErrorMessagePipe,
  ValidationMessageComponent,
} from './validation-message/validation-message.component';
import { DirectivesModule } from '../../directives/index.directive';
import { DayHourMinInputComponent } from './day-hour-min-input/day-hour-min-input.component';
import { UtilityPipesModule } from '../../pipes/utility.pipe';
import { InputTD_RFComponent } from './input-td-rf.component';
import { InputLabelComponent } from './input-label/input-label.component';

@NgModule({
  imports: [
    BtnModule,
    CommonModule,
    DirectivesModule,
    FormsModule,
    InputPipesModule,
    MatTooltipModule,
    ReactiveFormsModule,
    UtilityPipesModule,
  ],
  declarations: [
    DayHourMinInputComponent,
    ErrorMessagePipe,
    InputBasicComponent,
    InputComponent,
    InputTD_RFComponent,
    ValidationMessageComponent,
    InputLabelComponent,
  ],
  exports: [
    BtnModule,
    DayHourMinInputComponent,
    ErrorMessagePipe,
    FormsModule,
    InputBasicComponent,
    InputComponent,
    InputPipesModule,
    InputTD_RFComponent,
    MatTooltipModule,
    ReactiveFormsModule,
    ValidationMessageComponent,
    InputLabelComponent,
  ],
})
export class InputModule {}
