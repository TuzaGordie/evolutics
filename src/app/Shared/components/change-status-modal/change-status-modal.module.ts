import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeStatusModalComponent } from './change-status-modal.component';
import { BtnModule } from '../btn/btn.module';
import { SharedModule } from '../../shared.module';

@NgModule({
  declarations: [ChangeStatusModalComponent],
  imports: [CommonModule, BtnModule, SharedModule],
  exports: [ChangeStatusModalComponent],
})
export class ChangeStatusModalModule {}
