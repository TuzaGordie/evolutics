import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakeAdvancedPaymentComponent } from './make-advanced-payment.component';
import { SharedModule } from 'src/app/Shared/shared.module';
 
@NgModule({
  declarations: [MakeAdvancedPaymentComponent],
  imports: [CommonModule, SharedModule],
  exports: [MakeAdvancedPaymentComponent],
})
export class MakeAdvancedPaymentModule {}
