import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexBatchUploadsComponent } from './index-batch-uploads.component';

const routes: Routes = [{ path: '', component: IndexBatchUploadsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexBatchUploadsRoutingModule { }
