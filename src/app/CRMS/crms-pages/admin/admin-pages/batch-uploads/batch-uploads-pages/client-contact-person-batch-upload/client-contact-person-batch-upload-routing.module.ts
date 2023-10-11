import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientContactPersonBatchUploadComponent } from './client-contact-person-batch-upload.component';

const routes: Routes = [{ path: '', component: ClientContactPersonBatchUploadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientContactPersonBatchUploadRoutingModule { }
