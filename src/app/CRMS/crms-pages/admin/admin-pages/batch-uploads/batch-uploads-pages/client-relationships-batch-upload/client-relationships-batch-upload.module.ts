import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRelationshipsBatchUploadRoutingModule } from './client-relationships-batch-upload-routing.module';
import { ClientRelationshipsBatchUploadComponent } from './client-relationships-batch-upload.component';
import { InputTableModule } from 'src/app/Shared/components/input-table/input-table.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { BatchUploadBaseModule } from '../../batch-uploads-comps/batch-upload-base/batch-upload-base.module';


@NgModule({
  declarations: [
    ClientRelationshipsBatchUploadComponent
  ],
  imports: [
    CommonModule,
    ClientRelationshipsBatchUploadRoutingModule,
    SharedModule,
    BatchUploadBaseModule,
    InputTableModule,
  ]
})
export class ClientRelationshipsBatchUploadModule { }
