import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CorporateClientBatchUploadRoutingModule } from './corporate-client-batch-upload-routing.module';
import { CorporateClientBatchUploadComponent } from './corporate-client-batch-upload.component';
import { InputTableModule } from 'src/app/Shared/components/input-table/input-table.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { BatchUploadBaseModule } from '../../batch-uploads-comps/batch-upload-base/batch-upload-base.module';


@NgModule({
  declarations: [CorporateClientBatchUploadComponent],
  imports: [
    CommonModule,
    CorporateClientBatchUploadRoutingModule,
    SharedModule,
    BatchUploadBaseModule,
    InputTableModule,
  ],
})
export class CorporateClientBatchUploadModule {}
