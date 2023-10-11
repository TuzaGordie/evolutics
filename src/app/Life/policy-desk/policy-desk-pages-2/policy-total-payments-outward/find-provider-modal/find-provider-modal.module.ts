import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FindProviderModalComponent } from './find-provider-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FindProviderModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [FindProviderModalComponent],
})
export class FindProviderModalModule {}
