import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextCase1Module } from '../../../Shared/components/text-case-1/text-case-1.module';
import { InputModule } from 'src/app/Shared/components/input/input.module';
import { BtnModule } from 'src/app/Shared/components/btn/btn.module';
import { LoaderModule } from 'src/app/Shared/components/loader/loader.module';
import { InputNGModelModule } from 'src/app/Shared/components/input-NgModel/input-ngmodel.module';
import { EditableTextCaseModule } from 'src/app/Shared/components/editable-text-case/editable-text-case.module';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    BtnModule,
    InputModule,
    InputNGModelModule,
    TextCase1Module,
    BtnModule,
    LoaderModule,
    EditableTextCaseModule,
  ],
})
export class PdSharedModule {}
