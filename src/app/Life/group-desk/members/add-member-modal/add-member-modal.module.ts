import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMemberModalComponent } from './add-member-modal.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ComponentsModule } from 'src/app/Shared/components/components.module';



@NgModule({
  declarations: [
    AddMemberModalComponent
  ],
  imports: [
    CommonModule,SharedModule,ComponentsModule
  ]
})
export class AddMemberModalModule { }
