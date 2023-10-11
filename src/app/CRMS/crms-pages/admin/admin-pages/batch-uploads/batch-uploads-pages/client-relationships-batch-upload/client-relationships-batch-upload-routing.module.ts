import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientRelationshipsBatchUploadComponent } from './client-relationships-batch-upload.component';

const routes: Routes = [{ path: '', component: ClientRelationshipsBatchUploadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRelationshipsBatchUploadRoutingModule { }
