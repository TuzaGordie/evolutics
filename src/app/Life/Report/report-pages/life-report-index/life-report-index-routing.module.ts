import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LifeReportIndexComponent } from './life-report-index.component';

const routes: Routes = [{ path: '', component: LifeReportIndexComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LifeReportIndexRoutingModule { }
