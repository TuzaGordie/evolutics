import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndividualClientBatchUploadComponent } from './individual-client-batch-upload.component';

const routes: Routes = [{ path: '', component: IndividualClientBatchUploadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndividualClientBatchUploadRoutingModule { }
