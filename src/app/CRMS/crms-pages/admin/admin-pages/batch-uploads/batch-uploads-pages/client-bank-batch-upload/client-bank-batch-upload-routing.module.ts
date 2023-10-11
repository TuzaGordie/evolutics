import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientBankBatchUploadComponent } from './client-bank-batch-upload.component';

const routes: Routes = [{ path: '', component: ClientBankBatchUploadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientBankBatchUploadRoutingModule { }
