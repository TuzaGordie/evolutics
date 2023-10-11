import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccountFormComponent } from './create-account-form.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { FindSortCodeModalModule } from 'src/app/Reusables/reusable-comps/find-sort-code-modal/find-sort-code-modal.module';



@NgModule({
  declarations: [
    CreateAccountFormComponent
  ],
  exports: [
    CreateAccountFormComponent
  ],
  imports: [
    CommonModule,SharedModule,FindSortCodeModalModule
  ]
})
export class CreateAccountFormModule { }
