import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CorporateClientBatchUploadComponent } from './corporate-client-batch-upload.component';

const routes: Routes = [{ path: '', component: CorporateClientBatchUploadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CorporateClientBatchUploadRoutingModule { }
