import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewClaimHistoryModalComponent } from './view-claim-history-modal.component';
import { SharedModule } from 'src/app/Shared/shared.module';



@NgModule({
  declarations: [
    ViewClaimHistoryModalComponent
  ],
  imports: [
    CommonModule,SharedModule
  ],
  exports: [
    ViewClaimHistoryModalComponent
  ]
})
export class ViewClaimHistoryModalModule { }
