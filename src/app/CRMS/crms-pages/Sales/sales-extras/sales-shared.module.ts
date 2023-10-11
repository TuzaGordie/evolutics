import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtnModule } from 'src/app/Shared/components/btn/btn.module';
import { InputModule } from 'src/app/Shared/components/input/input.module';
import { TextCase1Module } from 'src/app/Shared/components/text-case-1/text-case-1.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, BtnModule, InputModule, TextCase1Module],
  exports: [BtnModule, InputModule, TextCase1Module],
})
export class SalesSharedModule {}
