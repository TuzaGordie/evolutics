import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentBatchUploadRoutingModule } from './agent-batch-upload-routing.module';
import { AgentBatchUploadComponent } from './agent-batch-upload.component';
import { InputTableModule } from 'src/app/Shared/components/input-table/input-table.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { BatchUploadBaseModule } from '../../batch-uploads-comps/batch-upload-base/batch-upload-base.module';


@NgModule({
  declarations: [AgentBatchUploadComponent],
  imports: [
    CommonModule,
    AgentBatchUploadRoutingModule,
    SharedModule,
    BatchUploadBaseModule,
    InputTableModule,
  ],
})
export class AgentBatchUploadModule {}
