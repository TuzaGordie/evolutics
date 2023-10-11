import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentInfoComponent } from './payment-info.component';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { CreateAccountModalModule } from 'src/app/Life/life-components/create-account-modal/create-account-modal.module';
 
@NgModule({
  declarations: [PaymentInfoComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    SharedModule,
    CreateAccountModalModule,
    
  ],
  exports: [PaymentInfoComponent],
})
export class PaymentInfoModule {}
