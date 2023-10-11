import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProviderModalComponent } from './add-provider-modal.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddProviderModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [AddProviderModalComponent],
})
export class AddProviderModalModule {}
