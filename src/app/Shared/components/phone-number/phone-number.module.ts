import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputPipesModule } from 'src/app/Shared/pipes/inputs-pipes.pipe';

import { Pipe, PipeTransform } from '@angular/core';
import { BtnModule } from '../btn/btn.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PhoneNumberComponent } from './phone-number.component';
import { InputModule } from '../input/input.module';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { UtilityPipesModule } from '../../pipes/utility.pipe';

@NgModule({
  declarations: [PhoneNumberComponent],
  imports: [
    CommonModule,
    InputPipesModule,
    BtnModule,
    MatTooltipModule,
    InputModule,
    Ng2TelInputModule,
    UtilityPipesModule,
  ],
  exports: [PhoneNumberComponent],
})
export class PhoneNumberModule {}
