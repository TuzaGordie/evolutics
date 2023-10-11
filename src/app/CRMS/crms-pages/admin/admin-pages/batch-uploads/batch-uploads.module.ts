import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchUploadsRoutingModule } from './batch-uploads-routing.module'; 
import { SharedModule } from 'src/app/Shared/shared.module';

@NgModule({
  declarations: [ ],
  imports: [CommonModule, BatchUploadsRoutingModule,],
})
export class BatchUploadsModule {}
