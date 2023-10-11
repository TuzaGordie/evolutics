import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexBatchUploadsRoutingModule } from './index-batch-uploads-routing.module';
import { IndexBatchUploadsComponent } from './index-batch-uploads.component';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [
    IndexBatchUploadsComponent
  ],
  imports: [
    CommonModule,
    IndexBatchUploadsRoutingModule,SharedModule
  ]
})
export class IndexBatchUploadsModule { }
