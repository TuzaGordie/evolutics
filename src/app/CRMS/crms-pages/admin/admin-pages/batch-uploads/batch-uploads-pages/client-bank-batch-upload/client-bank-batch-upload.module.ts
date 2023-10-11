import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientBankBatchUploadRoutingModule } from './client-bank-batch-upload-routing.module';
import { ClientBankBatchUploadComponent } from './client-bank-batch-upload.component';
import { InputTableModule } from 'src/app/Shared/components/input-table/input-table.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { BatchUploadBaseModule } from '../../batch-uploads-comps/batch-upload-base/batch-upload-base.module';


@NgModule({
  declarations: [ClientBankBatchUploadComponent],
  imports: [
    CommonModule,
    ClientBankBatchUploadRoutingModule,
    SharedModule,
    BatchUploadBaseModule,
    InputTableModule,
  ],
})
export class ClientBankBatchUploadModule {}
