import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccountModalComponent } from './create-account-modal.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';
import { CreateAccountFormModule } from './create-account-form/create-account-form.module';



@NgModule({
  declarations: [
    CreateAccountModalComponent
  ],
  imports: [
    CommonModule,SharedModule,ComponentsModule,CreateAccountFormModule
  ]
})
export class CreateAccountModalModule { }
