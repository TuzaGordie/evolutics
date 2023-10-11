import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LifeReportBatchComponent } from './life-report-batch.component';

const routes: Routes = [{ path: '', component: LifeReportBatchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LifeReportBatchRoutingModule { }
