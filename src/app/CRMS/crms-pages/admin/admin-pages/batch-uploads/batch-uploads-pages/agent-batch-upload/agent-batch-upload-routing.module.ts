import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentBatchUploadComponent } from './agent-batch-upload.component';

const routes: Routes = [{ path: '', component: AgentBatchUploadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentBatchUploadRoutingModule { }
