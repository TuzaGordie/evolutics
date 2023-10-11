import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JointOwnerModalComponent } from './convert-quote-modal.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';



@NgModule({
  declarations: [
    JointOwnerModalComponent
  ],
  imports: [
    CommonModule,SharedModule,ComponentsModule
  ]
})
export class ConvertQuoteModalModule { }