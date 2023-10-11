import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchesBatchUploadRoutingModule } from './branches-batch-upload-routing.module';
import { BranchesBatchUploadComponent } from './branches-batch-upload.component';
import { InputTableModule } from 'src/app/Shared/components/input-table/input-table.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { BatchUploadBaseModule } from '../../batch-uploads-comps/batch-upload-base/batch-upload-base.module';


@NgModule({
  declarations: [BranchesBatchUploadComponent],
  imports: [
    CommonModule,
    BranchesBatchUploadRoutingModule,
    SharedModule,
    BatchUploadBaseModule,
    InputTableModule,
  ],
})
export class BranchesBatchUploadModule {}
