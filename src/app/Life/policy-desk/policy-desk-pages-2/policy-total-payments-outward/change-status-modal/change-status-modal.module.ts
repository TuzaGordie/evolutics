import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeStatusModalComponent } from './change-status-modal.component';
import { SharedModule } from 'src/app/Shared/shared.module';



@NgModule({
  declarations: [
    ChangeStatusModalComponent
  ],
  imports: [
    CommonModule,SharedModule
  ],
  exports: [
    ChangeStatusModalComponent
  ]
})
export class ChangeStatusModalModule { }
