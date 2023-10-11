import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentInfoModule } from '../../agent-desk/new-individual-agent/payment-info/payment-info.module';
import { PaymentInformationModalComponent } from './payment-information-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/Shared/shared.module';



@NgModule({
  declarations: [
    PaymentInformationModalComponent
  ],
  imports: [
    CommonModule,PaymentInfoModule,MatDialogModule,SharedModule
  ],
  exports: [
    // PaymentInformationModalComponent
  ]
})
export class PaymentInformationModalModule { }
