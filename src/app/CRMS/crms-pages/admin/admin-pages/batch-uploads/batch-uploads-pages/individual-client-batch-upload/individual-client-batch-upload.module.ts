import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndividualClientBatchUploadRoutingModule } from './individual-client-batch-upload-routing.module';
import { IndividualClientBatchUploadComponent } from './individual-client-batch-upload.component';
import { SharedModule } from 'src/app/Shared/shared.module';
import { BatchUploadBaseModule } from '../../batch-uploads-comps/batch-upload-base/batch-upload-base.module';
import { InputTableModule } from 'src/app/Shared/components/input-table/input-table.module';

@NgModule({
  declarations: [IndividualClientBatchUploadComponent],
  imports: [
    CommonModule,
    IndividualClientBatchUploadRoutingModule,
    SharedModule,
    BatchUploadBaseModule,
    InputTableModule,
  ],
})
export class IndividualClientBatchUploadModule {}
