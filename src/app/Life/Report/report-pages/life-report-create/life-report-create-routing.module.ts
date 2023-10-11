import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LifeReportCreateComponent } from './life-report-create.component';

const routes: Routes = [{ path: '', component: LifeReportCreateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LifeReportCreateRoutingModule { }
