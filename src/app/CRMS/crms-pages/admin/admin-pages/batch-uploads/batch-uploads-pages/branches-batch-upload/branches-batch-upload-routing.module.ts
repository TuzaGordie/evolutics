import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchesBatchUploadComponent } from './branches-batch-upload.component';

const routes: Routes = [{ path: '', component: BranchesBatchUploadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchesBatchUploadRoutingModule { }
