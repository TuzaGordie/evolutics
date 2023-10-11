import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectClientCreationTypeComponent } from './select-client-creation-type.component';
import { BtnModule } from 'src/app/Shared/components/btn/btn.module';



@NgModule({
  declarations: [
    SelectClientCreationTypeComponent
  ],
  imports: [
    CommonModule,BtnModule
  ]
})
export class SelectClientCreationTypeModule { }
