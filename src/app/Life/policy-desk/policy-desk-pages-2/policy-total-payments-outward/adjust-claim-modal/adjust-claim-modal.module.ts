import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdjustClaimModalComponent } from './adjust-claim-modal.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    AdjustClaimModalComponent
  ],
  imports: [
    CommonModule,SharedModule,MatDialogModule,
  ],
  exports: [
    AdjustClaimModalComponent
  ]
})
export class AdjustClaimModalModule { }
